import type { EvaluationStatus } from "@zyber/server";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { trpc } from "@/lib/trpc";

const STATUS_OPTIONS: Array<{ value: EvaluationStatus; label: string; activeClass: string }> = [
	{
		value: "NotStarted",
		label: "Non commencé",
		activeClass:
			"data-[state=on]:bg-slate-100 data-[state=on]:text-slate-600 data-[state=on]:border-slate-400",
	},
	{
		value: "InProgress",
		label: "En cours",
		activeClass:
			"data-[state=on]:bg-amber-50 data-[state=on]:text-amber-600 data-[state=on]:border-amber-400",
	},
	{
		value: "Achieved",
		label: "Atteint",
		activeClass:
			"data-[state=on]:bg-green-50 data-[state=on]:text-green-700 data-[state=on]:border-green-400",
	},
	{
		value: "NotApplicable",
		label: "Non applicable",
		activeClass:
			"data-[state=on]:bg-slate-50 data-[state=on]:text-slate-400 data-[state=on]:border-slate-300 data-[state=on]:italic",
	},
];

interface MeasureStatusSelectorProps {
	measureId: number;
	serverStatus: EvaluationStatus;
}

export function MeasureStatusSelector({ measureId, serverStatus }: MeasureStatusSelectorProps) {
	const utils = trpc.useUtils();
	const [localStatus, setLocalStatus] = useState<EvaluationStatus | null>(null);
	const displayStatus = localStatus ?? serverStatus;

	const mutation = trpc.evaluation.updateStatus.useMutation({
		onMutate: ({ status }) => {
			const prev = localStatus ?? serverStatus;
			setLocalStatus(status);
			return { prev };
		},
		onError: (_err, _vars, ctx) => {
			setLocalStatus(ctx?.prev ?? null);
		},
		onSettled: () => {
			setLocalStatus(null);
			utils.evaluation.getByAssessment.invalidate();
		},
	});

	function handleValueChange(value: string) {
		if (!value) return;
		mutation.mutate({ measureId, status: value as EvaluationStatus });
	}

	return (
		<ToggleGroup
			type="single"
			value={displayStatus}
			onValueChange={handleValueChange}
			className="flex flex-wrap gap-2"
			aria-label="Statut de la mesure"
		>
			{STATUS_OPTIONS.map((opt) => (
				<ToggleGroupItem
					key={opt.value}
					value={opt.value}
					className={`px-4 py-2 text-sm border rounded-md h-auto ${opt.activeClass}`}
				>
					{opt.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
