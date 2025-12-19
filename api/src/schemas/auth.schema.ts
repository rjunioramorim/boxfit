import { z } from 'zod'

export const authSchema = z.object({
    email: z.email('Digite um email válido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 8 caracteres'),
})

export type AuthSchema = z.infer<typeof authSchema>