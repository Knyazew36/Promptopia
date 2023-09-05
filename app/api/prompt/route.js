import prisma from "@utils/database";

export const GET = async (request) => {
  try {
    await prisma.$connect();
    const prompts = await prisma.prompt.findMany({
      include: { creator: true },
    });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
