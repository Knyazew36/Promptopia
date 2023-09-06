import { PrismaClient } from "@prisma/client";
const prisma = PrismaClient();
export const GET = async (request) => {
  try {
    await prisma.$connect();
    console.log("prompt all connect");

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

//TODO: https://www.google.com/search?q=next+prisma&oq=next+prisma&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQIxgnMgkIAhAjGCcYigUyCQgDEAAYQxiKBTIJCAQQABhDGIoFMgkIBRAAGEMYigUyCQgGEAAYQxiKBTIGCAcQRRg80gEIMzczOWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:87ee6f7c,vid:8DiT-LdYXC0
