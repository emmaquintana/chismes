"use client"

import { signup } from "@/actions/auth";
import { SignUpInputs } from "@/lib/auth";
import { useState } from "react";

export default function useSignUp() {
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: SignUpInputs) => {
        try {
            setLoading(true);
            // Creates a new FormData object
            const formData = new FormData();

            // Add every field to the formData
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (key === 'birthdate' && value instanceof Date) {
                        formData.append(key, value.toISOString().split('T')[0]); // Formato YYYY-MM-DD
                    } else {
                        formData.append(key, value.toString());
                    }
                }
            });

            await signup(formData);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    return { onSubmit, loading }
}