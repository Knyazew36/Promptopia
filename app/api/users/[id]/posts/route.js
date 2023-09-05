import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request, { params }) => {
  try {
    await prisma.$connect();

    const prompts = await prisma.prompt.findMany({
      include: {
        creator: true,
      },
      where: {
        userId: +params.id,
      },
    });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
