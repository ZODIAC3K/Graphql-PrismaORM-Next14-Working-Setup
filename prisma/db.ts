// This file is used to instantiate the PrismaClient instance and export it for use in the rest of the application.
// location is root/prisma/db.ts



import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ["query"],
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
console.log(process.env.NODE_ENV !== "production" ? "PrismaClient instantiated" : "PrismaClient already instantiated")