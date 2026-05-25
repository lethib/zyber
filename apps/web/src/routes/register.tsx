import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import { form, useAppForm } from "@/components/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { setToken } from "../lib/auth";
import { trpc } from "../lib/trpc";

export const Route = createFileRoute("/register")({
	component: RegisterPage,
});

function RegisterPage() {
	const navigate = useNavigate();

	const registerForm = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: z.object({
				email: z.email(),
				password: z.string().min(8),
			}),
		},
		onSubmit: async ({ value }) => {
			await register.mutateAsync({ email: value.email, password: value.password });
		},
	});

	const register = trpc.auth.register.useMutation({
		onSuccess: (token) => {
			setToken(token);
			navigate({ to: "/dashboard" });
		},
		onError: (err) => {
			if (err.data?.code === "CONFLICT") {
				registerForm.setFieldMeta("email", (meta) => ({
					...meta,
					errorMap: { ...meta.errorMap, onServer: "Email déjà utilisé" },
				}));
			} else {
				toast.error("Erreur serveur");
			}
		},
	});

	return (
		<div className="min-h-screen flex items-center justify-center bg-muted/40">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Créer un compte</CardTitle>
				</CardHeader>
				<form.Context form={registerForm}>
					<CardContent className="flex flex-col gap-4">
						<registerForm.AppField
							name="email"
							children={(field) => (
								<field.TextField label="Email" type="email" placeholder="vous@exemple.com" />
							)}
						/>
						<registerForm.AppField
							name="password"
							children={(field) => (
								<field.TextField
									label="Mot de passe"
									type="password"
									placeholder="8 caractères min."
								/>
							)}
						/>
						<registerForm.SubmitButton />
					</CardContent>
					<CardFooter className="justify-center">
						<p className="text-sm text-muted-foreground">
							Déjà un compte ?{" "}
							<Link to="/login" className="text-foreground underline underline-offset-4">
								Se connecter
							</Link>
						</p>
					</CardFooter>
				</form.Context>
			</Card>
		</div>
	);
}
