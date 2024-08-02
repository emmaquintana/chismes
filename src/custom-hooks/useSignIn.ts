"use client"

import { login } from "@/actions/auth";
import { authSignInSchema } from "@/app/validations/authSchema";
import { SignInInputs } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useSignIn() {

    const { setError, register, handleSubmit, formState: { errors, isSubmitting: loading, isSubmitSuccessful, isSubmitted, isValidating } } = useForm<SignInInputs>({
        resolver: zodResolver(authSignInSchema)
    });

    const onSubmit = async (data: SignInInputs) => {
        try {
            // Creates a new  FormData object
            const formData = new FormData();

            // Add every object to the FormData
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            const result = await login(formData);
            if (result.error) {
                setError("root", {
                    type: "manual",
                    message: result.error
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { onSubmit, loading, register, handleSubmit, errors, isSubmitSuccessful, isSubmitted, isValidating };
}