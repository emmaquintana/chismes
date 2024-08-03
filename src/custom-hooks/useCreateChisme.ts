"use client"

import { createChisme } from '@/actions/chisme';
import { useState } from 'react'

function useCreateChisme() {
	const [loading, setLoading] = useState(false);
	let result = null;

	const onSubmit = async (data: any) => {
		try {
			setLoading(true);
			// Creates a new  FormData object
			const formData = new FormData();

			// Add every object to the FormData
			Object.entries(data).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					formData.append(key, value.toString());
				}
			});

			result = await createChisme(formData);
		} catch (error) {
			console.error(error);
		}
		finally {
			setLoading(false);
		}
	}

	return { loading, onSubmit, result };
}

export default useCreateChisme