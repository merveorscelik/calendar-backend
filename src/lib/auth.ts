import { AuthOptions, getServerSession, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/db'

import { verify } from "./hashing";

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials: {
                email: string;
                password: string;
            } | undefined): Promise<User | null> => {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const passwordMatch = await verify(credentials.password, user.password);

                if (!passwordMatch) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/sign-in",
        error: "/auth/sign-in?hasError=true",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
                id: token.id,
            }
        })
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const getSession = async () => await getServerSession(authOptions);

export { authOptions, getSession }

