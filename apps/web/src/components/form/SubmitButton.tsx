import { Button } from "../ui/button";
import { useFormContext } from ".";

export const SubmitButton = () => {
	const form = useFormContext();
	return (
		<Button type="submit" disabled={form.state.isSubmitting} className="w-full">
			{form.state.isSubmitting ? "Connexion..." : "Se connecter"}
		</Button>
	);
};
