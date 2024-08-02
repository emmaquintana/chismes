"use client";

import { updateChisme } from "@/actions/chisme";
import { useState } from "react";

export default function useEditChisme() {

    const [loading, setLoading] = useState(false);
    const [confirmDialogIsDisplayed, setConfirmDialogIsDisplayed] = useState(false);
    const [formData, setFormData] = useState(null);

    const onSubmit = async (data: any) => {
        setFormData(data);
        setConfirmDialogIsDisplayed(true);
    }

    const handleConfirm = async () => {
        try {
            setConfirmDialogIsDisplayed(false);

            if (formData) {
                setLoading(true);
                const formDataObj = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        formDataObj.append(key, value.toString());
                    }
                });

                const result = await updateChisme(formDataObj);
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, onSubmit, handleConfirm, confirmDialogIsDisplayed, setConfirmDialogIsDisplayed, formData, setFormData }
}