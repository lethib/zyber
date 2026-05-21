import type { EvaluationStatus } from "@zyber/server";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { THEME_META, THEME_ORDER } from "@/routes/_auth/checklist/components/ThemeAccordion";
import { PlanActionItem } from "./PlanActionItem";

export function PlanActionList() {
	const utils = trpc.useUtils();
	const { data = [], isLoading } = trpc.planAction.getItems.useQuery();

	const mutation = trpc.evaluation.updateStatus.useMutation({
		onMutate: async ({ measureId, status }) => {
			await utils.planAction.getItems.cancel();
			const prev = utils.planAction.getItems.getData();
			utils.planAction.getItems.setData(undefined, (old) => {
				if (!old) return old;
				if (status === "Achieved" || status === "NotApplicable") {
					return old.filter((item) => item.measureId !== measureId);
				}
				return old.map((item) => (item.measureId === measureId ? { ...item, status } : item));
			});
			return { prev };
		},
		onError: (_err, _vars, ctx) => {
			utils.planAction.getItems.setData(undefined, ctx?.prev);
			toast.error("Erreur de synchronisation — réessayez");
		},
		onSuccess: () => {
			utils.planAction.getItems.invalidate();
			utils.dashboard.getScore.invalidate();
			utils.dashboard.getThemeBreakdown.invalidate();
		},
	});

	function handleStatusChange(measureId: number, status: EvaluationStatus) {
		mutation.mutate({ measureId, status });
	}

	if (isLoading) {
		return (
			<div className="space-y-3">
				{Array.from({ length: 5 }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: mandatory
					<Skeleton key={i} className="h-14 w-full rounded-lg" />
				))}
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
				Plan d&apos;action vide — toutes les mesures sont conformes
			</div>
		);
	}

	const byTheme = THEME_ORDER.reduce<Record<string, typeof data>>((acc, theme) => {
		const items = data.filter((item) => item.theme === theme);
		if (items.length > 0) acc[theme] = items;
		return acc;
	}, {});

	const activeThemes = THEME_ORDER.filter((theme) => byTheme[theme]?.length);

	return (
		<div className="flex flex-col gap-4">
			{activeThemes.map((theme) => {
				const meta = THEME_META[theme];
				return (
					<div key={theme}>
						{/* Theme section header */}
						<div className="flex items-center gap-3 mb-5">
							<span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase whitespace-nowrap">
								{meta.label}
							</span>
							<div className="flex-1 h-px bg-zinc-100" />
						</div>

						{/* Items for this theme */}
						<div className="divide-y divide-zinc-100 rounded-lg border border-zinc-100 bg-white">
							{byTheme[theme].map((item) => (
								<PlanActionItem
									key={item.measureId}
									item={item}
									themeSlug={meta.slug}
									onStatusChange={handleStatusChange}
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}
