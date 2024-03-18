import prisma from "~/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await prisma.product.create({
    include: {rating:true},
    data: {
      ...body,
    },
  });
  if (!result)
    return Response.json({
      message: "error",
      status: 500,
    });
  return Response.json(result);
}

export async function GET(req: Request) {
  const result = await prisma.product.findMany({
    include: { rating: true },
  });

  return Response.json(result);
}
