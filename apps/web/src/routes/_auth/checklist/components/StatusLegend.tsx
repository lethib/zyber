import { Badge } from "@/components/ui/badge";

const STATUS_ITEMS = [
	{ label: "Non commencé", className: "text-slate-400 border-slate-300" },
	{ label: "En cours", className: "text-amber-500 border-amber-300" },
	{ label: "Atteint", className: "text-green-600 border-green-300" },
	{ label: "Non applicable", className: "text-slate-300 border-slate-200 italic" },
];

export function StatusLegend() {
	return (
		<div className="flex flex-wrap gap-2">
			{STATUS_ITEMS.map(({ label, className }) => (
				<Badge key={label} variant="outline" className={className}>
					{label}
				</Badge>
			))}
		</div>
	);
}
