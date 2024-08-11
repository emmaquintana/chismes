import z from 'zod';

const genders = ["masc", "fem", "other", "noAnswer"] as const;

export const userValidationsNumbers = {
    username: {
        MIN: 6,
        MAX: 40
    },
    password: {
        MIN: 6,
        MAX: 40
    },
    firstName: {
        MIN: 0,
        MAX: 16
    },
    lastName: {
        MIN: 0,
        MAX: 16
    }
}

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

export const resetPasswordSchema = z.object({
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
    slug: z.string().min(0)
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas deben coincidir",
    path: ["confirmPassword"]
})

export const editFirstNameSchema = z.object({
    firstName: z.string()
        .min(userValidationsNumbers.firstName.MIN, {
            message: `El nombre debe tener al menos ${userValidationsNumbers.firstName.MIN} caracteres`
        })
        .max(userValidationsNumbers.firstName.MAX, {
            message: `El nombre no debe tener más de ${userValidationsNumbers.firstName.MAX} caracteres`
        }),
    userId: z.string()
});

export const editLastNameSchema = z.object({
    lastName: z.string()
        .min(userValidationsNumbers.lastName.MIN, {
            message: `El apellido debe tener al menos ${userValidationsNumbers.lastName.MIN} caracteres`
        })
        .max(userValidationsNumbers.lastName.MAX, {
            message: `El apellido no debe tener más de ${userValidationsNumbers.lastName.MAX} caracteres`
        }),
    userId: z.string()
});

export const editUsernameSchema = z.object({
    username: z.string()
        .min(userValidationsNumbers.username.MIN, {
            message: `El nombre de usuario debe tener al menos ${userValidationsNumbers.username.MIN} caracteres`
        })
        .max(userValidationsNumbers.username.MAX, {
            message: `El nombre de usuario no debe tener más de ${userValidationsNumbers.username.MAX} caracteres`
        }),
    userId: z.string()
});

export const editEmailSchema = z.object({
    email: z.string().email({
        message: "No es un email válido"
    }),
    userId: z.string()
});