import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormContext } from "./FormContext";
import { SubmitButton } from "./SubmitButton";
import { TextField } from "./TextField";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldComponents: { TextField },
	formComponents: { SubmitButton },
	fieldContext,
	formContext,
});

export const form = {
	Context: FormContext,
};
