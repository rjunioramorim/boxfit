import { FastifyInstance } from "fastify";
import { authenticate } from "./routes/auth.route";

export async function appRoutes(app: FastifyInstance) {

    app.post('/auth/login', authenticate)
}
