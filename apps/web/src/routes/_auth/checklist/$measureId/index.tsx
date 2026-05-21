import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { THEME_META } from "../components/ThemeAccordion";
import { MeasureStatusSelector } from "./components/MeasureStatusSelector";

export const Route = createFileRoute("/_auth/checklist/$measureId/")({
	validateSearch: (search: Record<string, unknown>) => ({
		returnTheme: typeof search.returnTheme === "string" ? search.returnTheme : undefined,
	}),
	component: MeasureDetailPage,
});

const LEVEL_LABELS: Record<string, string> = {
	Standard: "Standard",
	Renforce: "Renforcé",
};

function MeasureDetailPage() {
	const { measureId } = Route.useParams();
	const { returnTheme } = Route.useSearch();
	const navigate = useNavigate();

	const measureIdInt = parseInt(measureId, 10);

	const { data: measures, isLoading: measuresLoading } = trpc.measure.getAll.useQuery();
	const { data: assessment, isLoading: assessmentLoading } =
		trpc.evaluation.getByAssessment.useQuery();

	const isLoading = measuresLoading || assessmentLoading;

	const currentMeasure = measures?.find((m) => m.id === measureIdInt) ?? null;

	const themeMeasures = (measures ?? [])
		.filter((m) => m.theme === currentMeasure?.theme)
		.sort((a, b) => a.order - b.order);

	const idx = themeMeasures.findIndex((m) => m.id === measureIdInt);
	const prevMeasure = idx > 0 ? themeMeasures[idx - 1] : null;
	const nextMeasure = idx < themeMeasures.length - 1 ? themeMeasures[idx + 1] : null;

	const serverStatus =
		assessment?.evaluationItems.find((i) => i.measureId === measureIdInt)?.status ?? "NotStarted";
	const serverComment =
		assessment?.evaluationItems.find((i) => i.measureId === measureIdInt)?.comment ?? "";

	const [localComment, setLocalComment] = useState(serverComment);
	const savedCommentRef = useRef(serverComment);

	const utils = trpc.useUtils();

	useEffect(() => {
		const newServerComment =
			assessment?.evaluationItems.find((i) => i.measureId === measureIdInt)?.comment ?? "";
		setLocalComment(newServerComment);
		savedCommentRef.current = newServerComment;
	}, [assessment, measureIdInt]);

	const commentMutation = trpc.evaluation.updateComment.useMutation({
		onSuccess: () => {
			savedCommentRef.current = localComment;
			utils.evaluation.getByAssessment.invalidate();
		},
		onError: () => {
			toast.error("Erreur de synchronisation — réessayez");
		},
	});

	function handleCommentBlur() {
		if (localComment === savedCommentRef.current) return;
		commentMutation.mutate({ measureId: measureIdInt, comment: localComment });
	}

	function handleReturnToChecklist() {
		navigate({
			to: "/checklist",
			search: { theme: returnTheme },
		});
	}

	function handleNavigate(id: number) {
		navigate({
			to: "/checklist/$measureId",
			params: { measureId: String(id) },
			search: { returnTheme },
		});
	}

	if (isLoading) {
		return (
			<div className="px-6 py-8 space-y-4 max-w-3xl">
				<Skeleton className="h-5 w-48" />
				<Skeleton className="h-8 w-96" />
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-10 w-full" />
			</div>
		);
	}

	if (!currentMeasure) {
		return (
			<div className="px-6 py-8">
				<p className="text-sm text-muted-foreground">Mesure introuvable.</p>
				<Button variant="ghost" className="mt-4" onClick={handleReturnToChecklist}>
					← Retour à la checklist
				</Button>
			</div>
		);
	}

	const themeMeta = THEME_META[currentMeasure.theme];

	return (
		<div className="px-6 py-8">
			<Breadcrumb className="mb-8">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink onClick={handleReturnToChecklist} className="cursor-pointer">
							Checklist
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{themeMeta?.label ?? currentMeasure.theme}</BreadcrumbPage>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Mesure {currentMeasure.order}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="space-y-8">
				{/* Header */}
				<div className="space-y-3">
					<div className="flex items-center gap-3">
						<Badge variant="outline" className="shrink-0 text-xs">
							{LEVEL_LABELS[currentMeasure.level] ?? currentMeasure.level}
						</Badge>
						<span className="text-xs text-muted-foreground">Mesure {currentMeasure.order}</span>
					</div>
					<h1 className="text-xl font-semibold text-zinc-900 leading-snug">
						{currentMeasure.title}
					</h1>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{currentMeasure.description}
					</p>
				</div>

				{/* Status */}
				<div className="space-y-3 pt-2 border-t border-border">
					<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
						Statut
					</p>
					<MeasureStatusSelector measureId={measureIdInt} serverStatus={serverStatus} />
				</div>

				{/* Comment */}
				<div className="space-y-3 pt-2 border-t border-border">
					<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
						Commentaire
					</p>
					<Textarea
						value={localComment}
						onChange={(e) => setLocalComment(e.target.value)}
						onBlur={handleCommentBlur}
						placeholder="Ajoutez un commentaire sur cette mesure…"
						className="resize-none min-h-25 text-sm"
						aria-label="Commentaire de la mesure"
					/>
				</div>

				{/* Navigation */}
				<div className="flex items-center justify-between pt-4 border-t border-border">
					<Button
						variant="outline"
						size="sm"
						onClick={() => prevMeasure && handleNavigate(prevMeasure.id)}
						disabled={!prevMeasure}
					>
						← Précédent
					</Button>
					<span className="text-xs text-muted-foreground">
						{idx + 1} / {themeMeasures.length}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() => nextMeasure && handleNavigate(nextMeasure.id)}
						disabled={!nextMeasure}
					>
						Suivant →
					</Button>
				</div>
			</div>
		</div>
	);
}
