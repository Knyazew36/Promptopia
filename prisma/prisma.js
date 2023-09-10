import { PrismaClient } from "@prisma/client";

global.prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "development") global.prisma = global.prisma;
module.exports = global.prisma;
