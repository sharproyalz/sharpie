import prisma from "~/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await prisma.checkout.create({
      data: {
        ...body,
      },
    });

    const moveCartItem = await prisma.cart.deleteMany({});

    if (!result) {
      return Response.json({
        message: "Error: Checkout history not found",
        status: 404,
      });
    }

    return Response.json(result);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return Response.json({
      message: "Error: Validation failed",
      status: 400,
      error: error, // Include the error message in the response
    });
  }
}

export async function GET(req: Request) {
  try {
    const result = await prisma.checkout.findMany();

    if (!result) {
      return Response.json({
        message: "Error: Checkout history not found",
        status: 404,
      });
    }

    return Response.json(result);
  } catch (error) {
    console.error("Error fetching checkout history:", error);
    return Response.json({
      message: "Error fetching checkout history",
      status: 500,
    });
  }
}
