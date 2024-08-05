"use client";

import { obtainChisme, updateChisme } from "@/actions/chisme";
import { useEffect, useState } from "react";

export default function useEditChisme(chismeId: number) {

    const [loading, setLoading] = useState(false);
    const [{ title, desc }, setTitleDesc] = useState({
        title: '',
        desc: ''
    });

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const formDataObj = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formDataObj.append(key, value.toString());
                }
            });            
            const result = await updateChisme(formDataObj);
            
            setTitleDesc({
                title: data.title,
                desc: data.desc
            });
        } catch (error) {
            console.error(error);            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const f = async () => {
            const chisme = await obtainChisme(chismeId);
            setTitleDesc({
                desc: chisme?.desc!,
                title: chisme?.title!
            });
        }
        f();
    }, []);

    return { loading, onSubmit, values: { title, desc } }
}