import { useNavigate } from "@tanstack/react-router";
import type { EvaluationStatus, Measure } from "@zyber/server";
import { Badge } from "@/components/ui/badge";
import { MEASURE_TRANSLATIONS } from "@/lib/measureTranslations";

const STATUS_CONFIG: Record<EvaluationStatus, { label: string; className: string }> = {
	NotStarted: { label: "Non commencé", className: "text-slate-400 border-slate-300" },
	InProgress: { label: "En cours", className: "text-amber-500 border-amber-300" },
	Achieved: { label: "Atteint", className: "text-green-600 border-green-300" },
	NotApplicable: { label: "Non applicable", className: "text-slate-300 border-slate-200 italic" },
};

interface MeasureListItemProps {
	measure: Measure;
	status?: EvaluationStatus;
	themeSlug: string;
}

export function MeasureListItem({
	measure,
	status = "NotStarted",
	themeSlug,
}: MeasureListItemProps) {
	const navigate = useNavigate();
	const { label, className } = STATUS_CONFIG[status];

	function handleClick() {
		navigate({
			to: "/checklist/$measureId",
			params: { measureId: String(measure.id) },
			search: { returnTheme: themeSlug },
		});
	}

	return (
		<div
			onClick={handleClick}
			className="flex items-center justify-between py-3 px-4 hover:bg-muted/50 cursor-pointer rounded-sm"
		>
			<span className="text-sm text-foreground">
				{MEASURE_TRANSLATIONS[measure.order]?.title ?? measure.title}
			</span>
			<Badge variant="outline" className={`shrink-0 ml-4 ${className}`}>
				{label}
			</Badge>
		</div>
	);
}
