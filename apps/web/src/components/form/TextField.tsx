import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFieldContext } from ".";

type Props = {
	label: string;
} & React.ComponentProps<typeof Input>;

export const TextField = ({ label, ...inputProps }: Props) => {
	const field = useFieldContext<string>();
	const errors = field.state.meta.errors;
	return (
		<div className="flex flex-col gap-2">
			<Label htmlFor={field.name}>{label}</Label>
			<Input
				{...inputProps}
				id={field.name}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
			/>
			{errors.length > 0 && (
				<ul className="flex flex-col gap-1">
					{errors.map((error, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: Using any for simplicity
						<li key={i} className="text-destructive text-sm">
							{typeof error === "string" ? error : error?.message}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
