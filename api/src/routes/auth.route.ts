import { authSchema } from "@/schemas/auth.schema";
import { login } from "@/services/auth.service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = authSchema.parse(request.body)

    try {
        const user = await login({ email, password })

        const token = await reply.jwtSign({
            user: user.user,
        }, {
            sub: user.user.id,
            expiresIn: '7d',
        })

        return reply.status(200).send({
            user: user.user,
            token,
        })
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(401).send({
                message: error.message,
            })
        }
        throw error

    }
}
