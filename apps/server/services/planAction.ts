import { prisma } from "@db/src";
import { EvaluationStatus, MeasureTheme } from "@prisma/client";

const THEME_ORDER: MeasureTheme[] = [
	MeasureTheme.SensibiliserEtFormer,
	MeasureTheme.ConnaitreLeSystemeDInformation,
	MeasureTheme.AuthentifierEtControlerLesAcces,
	MeasureTheme.SecuriserLesPostes,
	MeasureTheme.SecuriserLeReseau,
	MeasureTheme.SecuriserLAdministration,
	MeasureTheme.GererLeNomadisme,
	MeasureTheme.MaintenirLeSystemeDInformationAJour,
	MeasureTheme.SuperviserAuditerReagir,
	MeasureTheme.PourAllerPlusLoin,
];

export class PlanActionService {
	private readonly organizationId: string;

	constructor(organizationId: string) {
		this.organizationId = organizationId;
	}

	async getItems() {
		const assessment = await prisma.assessment.findUnique({
			where: { organizationId: this.organizationId },
		});
		if (!assessment) return [];

		const items = await prisma.evaluationItem.findMany({
			where: {
				assessmentId: assessment.id,
				status: { notIn: [EvaluationStatus.Achieved, EvaluationStatus.NotApplicable] },
			},
			include: {
				measure: { select: { id: true, title: true, theme: true, order: true } },
			},
		});

		return items
			.sort((a, b) => {
				const themeA = THEME_ORDER.indexOf(a.measure.theme);
				const themeB = THEME_ORDER.indexOf(b.measure.theme);
				if (themeA !== themeB) return themeA - themeB;
				return a.measure.order - b.measure.order;
			})
			.map((item) => ({
				measureId: item.measure.id,
				measureTitle: item.measure.title,
				theme: item.measure.theme,
				measureOrder: item.measure.order,
				status: item.status,
			}));
	}
}
