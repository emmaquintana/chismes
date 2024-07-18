import z from 'zod';

export const createChismeSchema = z.object({
    title: z.string().min(12, {        
        message: "El titulo debe tener al menos 12 caracteres"
    }).max(92, {
        message: "El titulo no debe tener más de 92 caracteres"
    }),
    desc: z.string().min(42, {
        message: "La descripción debe tener al menos 42 caracteres"
    }).max(2048, {
        message: "La descripción no debe tener más de 2048 caracteres"
    })
});

export const updateChismeSchema = z.object({
    title: z.string().min(12, {        
        message: "El titulo debe tener al menos 12 caracteres"
    }).max(92, {
        message: "El titulo no debe tener más de 92 caracteres"
    }),
    desc: z.string().min(42, {
        message: "La descripción debe tener al menos 42 caracteres"
    }).max(2048, {
        message: "La descripción no debe tener más de 2048 caracteres"
    }),
    chismeId: z.string().min(0)
});