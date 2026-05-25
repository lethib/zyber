import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import { form, useAppForm } from "@/components/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { setToken } from "../lib/auth";
import { trpc } from "../lib/trpc";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();

	const loginForm = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: z.object({
				email: z.email(),
				password: z.string().min(1),
			}),
		},
		onSubmit: async ({ value }) => {
			await login.mutateAsync({ email: value.email, password: value.password }).catch(() => {});
		},
	});

	const login = trpc.auth.login.useMutation({
		onSuccess: (token) => {
			setToken(token);
			navigate({ to: "/dashboard" });
		},
		onError: (err) => {
			if (err.data?.code === "UNAUTHORIZED") {
				toast.error("Identifiants incorrects");
			} else {
				toast.error("Erreur serveur");
			}
		},
	});

	return (
		<div className="min-h-screen flex items-center justify-center bg-muted/40">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Connexion</CardTitle>
				</CardHeader>
				<form.Context form={loginForm}>
					<CardContent className="flex flex-col gap-4">
						<loginForm.AppField
							name="email"
							children={(field) => (
								<field.TextField label="Email" type="email" placeholder="vous@example.com" />
							)}
						/>

						<loginForm.AppField
							name="password"
							children={(field) => (
								<field.TextField label="Mot de passe" type="password" placeholder="••••••••" />
							)}
						/>

						<loginForm.SubmitButton />
					</CardContent>
					<CardFooter className="justify-center">
						<p className="text-sm text-muted-foreground">
							Pas encore de compte ?{" "}
							<Link to="/register" className="text-foreground underline underline-offset-4">
								S'inscrire
							</Link>
						</p>
					</CardFooter>
				</form.Context>
			</Card>
		</div>
	);
}
