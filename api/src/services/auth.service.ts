import { prisma } from '@/lib/prisma'
import { AuthSchema } from '@/schemas/auth.schema'
import bcrypt from 'bcrypt'

export async function login({ email, password }: AuthSchema) {
    const user = await prisma.user.findUnique({
        where: { email },
    })


    if (!user) {
        throw new Error('Credenciais inválidas.')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw new Error('Credenciais inválidas')
    }

    const { password: _, ...userWithoutPassword } = user

    return {
        user: userWithoutPassword,
    }
}
