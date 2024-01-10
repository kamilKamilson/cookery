import { PrismaClient } from "@prisma/client";

export let db: PrismaClient;

const globalWithPrisma = globalThis as typeof globalThis & {
  prisma?: undefined | PrismaClient;
};

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  db = globalWithPrisma.prisma;
}
