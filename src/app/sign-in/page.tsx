"use client";

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authSignInSchema } from "../validations/authSchema";
import { SignInInputs } from "@/lib/auth";

export default function Page() {

	const { register, handleSubmit, formState: { errors }, setError } = useForm<SignInInputs>({
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

	return (
		<div className="flex flex-col justify-center items-center w-full h-dvh">
			<div className="flex flex-col gap-4 justify-center items-center h-fit w-full p-6 shadow-sm border rounded-lg min-[500px]:w-[360px] sm:w-72 md:w-96 min-w-64">
				<h1 className="font-extrabold text-2xl">Iniciar sesión</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
					<div className="flex flex-col gap-1">
						<Label htmlFor="username" className="text-md">Nombre de usuario</Label>
						<Input required={true} id="username" className="focus-visible:ring-0 focus:border-primary transition-colors" {...register("username")} />		
						{errors.username?.message && <p className="text-sm text-destructive">{errors.username.message}</p>}					
					</div>
					<div className="flex flex-col gap-1">
						<Label htmlFor="password" className="text-md">Contraseña</Label>
						<Input required={true} type="password" id="password" className="focus-visible:ring-0 focus:border-primary transition-colors" {...register("password")} />												
						{errors.password?.message && <p className="text-sm text-destructive">{errors.password.message}</p>}					
					</div>					
					{errors.root?.message && <p className="text-sm text-destructive">{errors.root.message}</p>}
					<Button type="submit" className="focus-visible:ring-0 focus:border-primary transition-colors">Iniciar sesión</Button>
				</form>
				<div className="w-full text-center">
					<p className="text-muted-foreground">¿Aún no tenés una cuenta?</p>
					<Link href="/sign-up" className="text-sky-500">Creá una cuenta</Link>
				</div>
			</div>
		</div>
	);
}