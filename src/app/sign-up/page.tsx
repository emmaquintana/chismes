"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpAuthSchema } from "../validations/authSchema";
import { signup } from "@/actions/auth";
import { SignUpInputs } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function Page() {

	const [genderValue, setGenderValue] = useState('noAnswer');
	const { register, setValue, formState: { errors }, handleSubmit } = useForm<SignUpInputs>({
		resolver: zodResolver(signUpAuthSchema),
		defaultValues: {
			gender: 'noAnswer'
		}
	});

	useEffect(() => {
		setValue('gender', genderValue as "masc" | "fem" | "other" | "noAnswer");
	}, [genderValue, setValue]);

	const onSubmit = async (data: SignUpInputs) => {
		try {
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
	};

	return (
		<div className="w-full h-fit">
			<div className="mt-20 flex flex-col gap-4 justify-center items-center h-fit w-full p-6 mx-auto shadow-sm border rounded-lg min-[500px]:w-[360px] md:w-96 min-w-64">
				<h1 className="font-extrabold text-2xl">Registrarse</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
					<div className="flex flex-col gap-1">
						<Label htmlFor="username" className="text-md">Nombre de usuario<span className="text-destructive"> *</span></Label>
						<Input id="username" {...register("username")} placeholder="Min. 6 caracteres - Max. 40 caracteres" className="focus-visible:ring-0 focus:border-primary transition-colors" />
						{errors.username?.message && <p className="text-destructive text-sm">{errors.username.message}</p>}
					</div>
					<div className="flex flex-col gap-1">
						<Label htmlFor="password" className="text-md">Contraseña<span className="text-destructive"> *</span></Label>
						<Input type="password" id="password" placeholder="Min. 6 caracteres - Max. 40 caracteres" {...register("password")} className="focus-visible:ring-0 focus:border-primary transition-colors" />
						{errors.password?.message && <p className="text-destructive text-sm">{errors.password.message}</p>}
					</div>
					<div className="flex flex-col gap-1">
						<Label htmlFor="confirmPassword" className="text-md">Confirmar contraseña<span className="text-destructive"> *</span></Label>
						<Input type="password" id="confirmPassword" {...register("confirmPassword")} className="focus-visible:ring-0 focus:border-primary transition-colors" />
						{errors.confirmPassword?.message && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
					</div>
					<div className="flex flex-col gap-1">
						<Label htmlFor="email" className="text-md">Email<span className="text-destructive"> *</span></Label>
						<Input id="email" {...register("email")} placeholder="example@gmail.com" className="focus-visible:ring-0 focus:border-primary transition-colors" />
						{errors.email?.message && <p className="text-destructive text-sm">{errors.email.message}</p>}
					</div>
					<div className="flex flex-col gap-1">
						<HoverCard>
							<HoverCardTrigger>
								<Label htmlFor="birthdate" className="text-md">Fecha de nacimiento <AiOutlineExclamationCircle className="inline" /><span className="text-destructive"> *</span></Label>
							</HoverCardTrigger>
							<HoverCardContent>
								<p className="text-muted-foreground text-md"><AiOutlineExclamationCircle className="inline" /> Se usará la fecha de nacimiento para calcular su edad</p>
							</HoverCardContent>
						</HoverCard>
						<Input type="date" id="birthdate" {...register("birthdate")} className="w-fit focus-visible:ring-0 focus:border-primary transition-colors" />
						{errors.birthdate?.message && <p className="text-destructive text-sm">{errors.birthdate.message as string}</p>}
					</div>
					<hr className="w-full" />
					<div className="flex gap-1">
						<div className="flex flex-col flex-wrap gap-1">
							<Label htmlFor="firstName" className="text-md">Nombre</Label>
							<Input id="firstName" {...register("firstName")} className="focus-visible:ring-0 focus:border-primary transition-colors" />
						</div>
						<div className="flex flex-col gap-1">
							<Label htmlFor="lastName" className="text-md">Apellido</Label>
							<Input id="lastName" {...register("lastName")} className="focus-visible:ring-0 focus:border-primary transition-colors" />
						</div>
					</div>
					<hr className="w-full" />
					<div className="flex flex-col gap-1">						
						<Label htmlFor="gender" className="text-md">Género</Label>
						<RadioGroup defaultValue="noAnswer" id="gender" {...register("gender")} value={genderValue}
							onValueChange={setGenderValue}>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="masc" id="masc" />
								<Label htmlFor="masc" className="text-md">Masculino</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="fem" id="fem" />
								<Label htmlFor="fem" className="text-md">Femenino</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="other" id="other" />
								<Label htmlFor="other" className="text-md">Otro</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="noAnswer" id="noAnswer" />
								<Label htmlFor="noAnswer" className="text-md">Prefiero no decirlo (soy de closet)</Label>
							</div>
						</RadioGroup>
						{errors.gender?.message && <p className="text-destructive text-sm">{errors.gender.message}</p>}
					</div>
					<hr className="w-full" />
					<p className="text-muted-foreground"><span className="text-destructive"> *</span>: Obligatorio</p>
					<Button type="submit" className="focus-visible:ring-0 focus:border-primary transition-colors">Registrarse</Button>
				</form>
				<p className="text-muted-foreground">¿Ya tenés una cuenta? <Link href="/sign-in" className="text-sky-500">Iniciá sesión</Link></p>
			</div>
		</div>
	);
}