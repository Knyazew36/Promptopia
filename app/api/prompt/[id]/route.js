import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (request, { params }) => {
  try {
    await prisma.$connect();
    console.log("prompt id connect");
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: +params.id,
      },
    });
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt by id", { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await prisma.$connect();
    console.log("path connect");

    const existingPrompt = await prisma.prompt.findUnique({
      where: {
        id: +params.id,
      },
    });

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    await prisma.prompt.update({
      where: {
        id: +params.id,
      },
      data: {
        prompt,
        tag,
      },
    });

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update  prompts", { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await prisma.$connect();
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!prompt) return new Response("Prompt not found", { status: 404 });
    await prisma.prompt.delete({
      where: {
        id: +params.id,
      },
    });

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
