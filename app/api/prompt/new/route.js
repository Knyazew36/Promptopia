import prisma from "prisma/prisma";

export const POST = async (req, res) => {
  console.log("new");
  const { userId, prompt, tag } = await req.json();
  try {
    prisma.$connect();
    const newPrompt = await prisma.prompt.create({
      data: {
        userId,
        prompt,
        tag,
      },
    });

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
