import { prisma } from "@db/src";
import {
	type EvaluationItem,
	EvaluationStatus,
	type Measure,
	type MeasureLevel,
	MeasureTheme,
} from "@prisma/client";

export class OrganizationScore {
	organizationId: string;

	constructor(organizationId: string) {
		this.organizationId = organizationId;
	}

	async getScore(level?: MeasureLevel) {
		const assessment = await prisma.assessment.findUnique({
			where: { organizationId: this.organizationId },
		});
		if (!assessment) return { percentage: 0, achieved: 0, total: 42 };

		const measureFilter = level ? { measure: { level } } : {};

		const [achieved, notApplicable, totalMeasures] = await Promise.all([
			prisma.evaluationItem.count({
				where: { assessmentId: assessment.id, status: EvaluationStatus.Achieved, ...measureFilter },
			}),
			prisma.evaluationItem.count({
				where: {
					assessmentId: assessment.id,
					status: EvaluationStatus.NotApplicable,
					...measureFilter,
				},
			}),
			prisma.measure.count({ where: level ? { level } : {} }),
		]);

		const total = totalMeasures - notApplicable;
		if (total === 0) return { percentage: 100, achieved: 0, total: 0 };
		return { percentage: Math.round((achieved / total) * 100), achieved, total };
	}

	async getThemeBreakdown(level?: MeasureLevel) {
		const [allMeasures, assessment] = await Promise.all([
			prisma.measure.findMany({ where: { level: level }, orderBy: { order: "asc" } }),
			prisma.assessment.findUnique({
				where: { organizationId: this.organizationId },
				include: { evaluationItems: true },
			}),
		]);

		if (!assessment?.evaluationItems) return;

		return Object.values(MeasureTheme).map((theme) => {
			const themeMeasures = allMeasures.filter((m) => m.theme === theme);

			const score = this.computeScore(themeMeasures, assessment.evaluationItems);

			return {
				theme,
				score,
				belowStandard: score.percentage < 100,
			};
		});
	}

	private computeScore(
		measures: Measure[],
		evaluationItems: EvaluationItem[],
	): { percentage: number; achieved: number; total: number } {
		const itemByMeasureId = new Map((evaluationItems ?? []).map((i) => [i.measureId, i]));
		const applicable = measures.filter(
			(m) => itemByMeasureId.get(m.id)?.status !== EvaluationStatus.NotApplicable,
		);
		if (applicable.length === 0) return { percentage: 100, achieved: 0, total: 0 };
		const achieved = applicable.filter(
			(m) => itemByMeasureId.get(m.id)?.status === EvaluationStatus.Achieved,
		).length;
		return {
			percentage: Math.round((achieved / applicable.length) * 100),
			achieved,
			total: applicable.length,
		};
	}
}
