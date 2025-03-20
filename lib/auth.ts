import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { getAccessToken, createAuth0User, getAuth0UserByEmail } from "@/lib/auth0";

//Hashes a given password securely

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

//Registers a user in Auth0 and Prisma database
export async function registerUser(email: string, password: string, name: string, phone?: string) {
    const accessToken = await getAccessToken();

    // Check if the user exists in Auth0
    let auth0User = await getAuth0UserByEmail(accessToken, email);
    if (!auth0User) {
        auth0User = await createAuth0User(accessToken, {
            email,
            password,
            name,
            connection: "Username-Password-Authentication",
        });
    }

    // Check if the user exists in Prisma (DB)
    let dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) {
        const hashedPassword = await hashPassword(password);
        dbUser = await createUserInDB(email, name, hashedPassword, phone);
    }

    return dbUser;
}

//Creates a new user in Prisma database
export async function createUserInDB(email: string, name: string, hashedPassword: string, phone?: string) {
    return await prisma.user.create({
        data: {
            email,
            name,
            phone: phone || null,
            password: hashedPassword,
            role: Role.USER,
        },
    });
}
