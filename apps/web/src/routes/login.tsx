import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setToken } from "../lib/auth";
import { trpc } from "../lib/trpc";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [clientError, setClientError] = useState<string | null>(null);

	const login = trpc.auth.login.useMutation({
		onSuccess: (token) => {
			setToken(token);
			navigate({ to: "/dashboard" });
		},
		onError: (err) => {
			if (err.data?.code === "UNAUTHORIZED") {
				setClientError("Identifiants incorrects");
			} else {
				setClientError("Erreur serveur");
			}
		},
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setClientError(null);
		login.mutate({ email, password });
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-muted/40">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Connexion</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="flex flex-col gap-4">
						{clientError && <p className="text-sm text-destructive">{clientError}</p>}
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="vous@exemple.com"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="password">Mot de passe</Label>
							<Input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
							/>
						</div>
						<Button type="submit" disabled={login.isPending} className="w-full">
							{login.isPending ? "Connexion..." : "Se connecter"}
						</Button>
					</CardContent>
					<CardFooter className="justify-center">
						<p className="text-sm text-muted-foreground">
							Pas encore de compte ?{" "}
							<Link to="/register" className="text-foreground underline underline-offset-4">
								S'inscrire
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
