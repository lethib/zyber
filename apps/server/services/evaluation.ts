import { prisma } from "@db/src";
import type { EvaluationStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export class EvaluationService {
	private readonly organizationId: string;

	constructor(organizationId: string) {
		this.organizationId = organizationId;
	}

	async getItems() {
		const assessment = await prisma.assessment.upsert({
			where: { organizationId: this.organizationId },
			create: { organizationId: this.organizationId },
			update: {},
		});
		const evaluationItems = await prisma.evaluationItem.findMany({
			where: { assessmentId: assessment.id },
			include: { measure: true },
			orderBy: { measure: { order: "asc" } },
		});
		return { assessmentId: assessment.id, evaluationItems };
	}

	private async requireAssessment() {
		const assessment = await prisma.assessment.findUnique({
			where: { organizationId: this.organizationId },
		});
		if (!assessment) throw new TRPCError({ code: "FORBIDDEN" });
		return assessment;
	}

	private async updateItem(
		measureId: number,
		data: { status?: EvaluationStatus; comment?: string },
	) {
		const assessment = await this.requireAssessment();
		return prisma.evaluationItem.upsert({
			where: { assessmentId_measureId: { assessmentId: assessment.id, measureId } },
			create: { assessmentId: assessment.id, measureId, ...data },
			update: data,
		});
	}

	async updateStatus(measureId: number, status: EvaluationStatus) {
		return this.updateItem(measureId, { status });
	}

	async updateComment(measureId: number, comment: string) {
		return this.updateItem(measureId, { comment });
	}
}
