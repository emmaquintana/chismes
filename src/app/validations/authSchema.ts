import z from 'zod';

const genders = ["masc", "fem", "other", "noAnswer"] as const;

export const signUpAuthSchema = z.object({
    username: z.string().min(6, {
        message: "El nombre de usuario debe tener al menos 6 caracteres"
    }).max(40, {
        message: "El nombre de usuario no debe tener más de 40 caracteres"
    }),
    email: z.string().email({
        message: "Ingresa un email válido"
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"
    }).max(40, {
        message: "La contraseña no debe tener más de 40 caracteres"
    }),
    confirmPassword: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"
    }).max(40, {
        message: "La contraseña no debe tener más de 40 caracteres"
    }),
    firstName: z.string().min(0),
    lastName: z.string().min(0),
    gender: z.enum(genders, {
        errorMap: (issue, ctx) => {
            console.log("Gender value received:", ctx.data);
            return { message: "Selecciona un valor válido para el género" };
          }
    }),
    birthdate: z.string()
        .refine((dateString) => {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
        }, { message: "La fecha proporcionada no es válida." })
        .transform((dateString) => new Date(dateString))
        .refine((date) => {
            const today = new Date();
            const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
            return date <= eighteenYearsAgo;
        }, { message: "Debes tener al menos 18 años de edad." })
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas deben coincidir",
    path: ["confirmPassword"]
});

export const authSignInSchema = z.object({
    username: z.string().min(0, {
        message: "Debes ingresar un nombre de usuario"
    }),
    password: z.string().min(0, {
        message: "Debes ingresar una contraseña"
    })
});