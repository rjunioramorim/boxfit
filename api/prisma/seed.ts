import { prisma } from '../src/lib/prisma'
import bcrypt from 'bcrypt'

async function main() {
    const password = await bcrypt.hash('password', 10)
    await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@admin.com',
            password,
            role: 'ADMIN',
            isActive: true,
        }
    })
    console.log('Admin user created')

    await prisma.user.create({
        data: {
            name: 'User',
            email: 'user@user.com',
            password,
            role: 'USER',
            isActive: true,
        }
    })
    console.log('User user created')
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })