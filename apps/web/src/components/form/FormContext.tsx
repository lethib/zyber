interface FormAPI {
	AppForm: React.ComponentType<React.PropsWithChildren>;
	handleSubmit: () => void | Promise<void>;
}

interface Props {
	form: FormAPI;
	children: React.ReactNode;
	className?: string;
}

export function FormContext({ form, children, className }: Props) {
	return (
		<form.AppForm>
			<form
				className={className}
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				{children}
			</form>
		</form.AppForm>
	);
}
