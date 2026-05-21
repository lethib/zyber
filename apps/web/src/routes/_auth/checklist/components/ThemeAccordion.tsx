import type { EvaluationStatus, Measure } from "@zyber/server";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { THEME_LABELS } from "@/lib/measureTranslations";
import { MeasureListItem } from "./MeasureListItem";

export const THEME_ORDER = [
	"AwarenessAndTraining",
	"KnowYourInformationSystem",
	"AuthenticateAndControlAccess",
	"SecureWorkstations",
	"SecureNetwork",
	"SecureAdministration",
	"ManageMobility",
	"MaintainSystemUpToDate",
	"MonitorAuditRespond",
	"GoFurther",
] as const;

export const THEME_META: Record<string, { label: string; slug: string }> = {
	AwarenessAndTraining: {
		label: THEME_LABELS.AwarenessAndTraining,
		slug: "awareness-and-training",
	},
	KnowYourInformationSystem: {
		label: THEME_LABELS.KnowYourInformationSystem,
		slug: "know-your-is",
	},
	AuthenticateAndControlAccess: {
		label: THEME_LABELS.AuthenticateAndControlAccess,
		slug: "authenticate-and-control-access",
	},
	SecureWorkstations: { label: THEME_LABELS.SecureWorkstations, slug: "secure-workstations" },
	SecureNetwork: { label: THEME_LABELS.SecureNetwork, slug: "secure-network" },
	SecureAdministration: { label: THEME_LABELS.SecureAdministration, slug: "secure-administration" },
	ManageMobility: { label: THEME_LABELS.ManageMobility, slug: "manage-mobility" },
	MaintainSystemUpToDate: {
		label: THEME_LABELS.MaintainSystemUpToDate,
		slug: "maintain-system-up-to-date",
	},
	MonitorAuditRespond: { label: THEME_LABELS.MonitorAuditRespond, slug: "monitor-audit-respond" },
	GoFurther: { label: THEME_LABELS.GoFurther, slug: "go-further" },
};

interface ThemeAccordionProps {
	measures: Measure[];
	statusMap: Map<number, EvaluationStatus>;
	value: string[];
	onValueChange: (values: string[]) => void;
}

export function ThemeAccordion({ measures, statusMap, value, onValueChange }: ThemeAccordionProps) {
	const measuresByTheme = THEME_ORDER.reduce<Record<string, Measure[]>>((acc, theme) => {
		acc[theme] = measures.filter((m) => m.theme === theme);
		return acc;
	}, {});

	return (
		<Accordion type="multiple" value={value} onValueChange={onValueChange}>
			{THEME_ORDER.map((theme) => {
				const meta = THEME_META[theme];
				const themeMs = measuresByTheme[theme] ?? [];
				const total = themeMs.length;
				const evaluated = themeMs.filter((m) => {
					const s = statusMap.get(m.id);
					return s !== undefined && s !== "NotStarted";
				}).length;
				const pct = total > 0 ? (evaluated / total) * 100 : 0;

				return (
					<AccordionItem key={theme} value={meta.slug}>
						<AccordionTrigger className="hover:no-underline px-1">
							<div className="flex flex-1 items-center gap-4 mr-2">
								<span className="text-sm font-medium text-left">{meta.label}</span>
								<span className="text-xs text-muted-foreground shrink-0">
									{evaluated}/{total}
								</span>
								<Progress value={pct} className="w-24 h-1.5" />
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-0">
							<div className="divide-y divide-border">
								{themeMs.map((m) => (
									<MeasureListItem
										key={m.id}
										measure={m}
										status={statusMap.get(m.id) ?? "NotStarted"}
										themeSlug={meta.slug}
									/>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}
