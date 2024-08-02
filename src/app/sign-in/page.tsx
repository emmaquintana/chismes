"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import useSignIn from "@/custom-hooks/useSignIn";
import LoadingIcon from "@/components/loading-icon";

export default function Page() {

	const { onSubmit, handleSubmit, errors, register, loading, isSubmitSuccessful, isSubmitted } = useSignIn();

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
						<Link href="/reset-password" className="text-sky-500 text-md">Olvidé mi contraseña</Link>
					</div>
					{errors.root?.message && <p className="text-sm text-destructive animate-fade-in">{errors.root.message}</p>}
					<Button type="submit" className="focus-visible:ring-0 focus:border-primary transition-colors">
						{!loading && !isSubmitSuccessful &&
							<>Iniciar sesión</>
						}
						{loading &&
							<div className='flex gap-2 items-center justify-center h-fit'>
								<LoadingIcon className='text-lg text-white font-bold' />
								<p>Iniciar sesión</p>
							</div>
						}
						{!loading && isSubmitted && isSubmitSuccessful &&
							<>Redirigiendo...</>							
						}
					</Button>
				</form>
				<div className="w-full text-center">
					<p className="text-muted-foreground">¿Aún no tenés una cuenta?</p>
					<Link href="/sign-up" className="text-sky-500">Creá una cuenta</Link>
				</div>
			</div>
		</div>
	);
}