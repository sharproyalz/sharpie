import prisma from "~/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await prisma.cart.create({
      data: {
        ...body,
      },
    });

    return Response.json(result);
  } catch (err) {
    return err;
  }
}

export async function GET(req: Request) {
  try {
    const result = await prisma.cart.findMany();

    if (!result) {
      return Response.json({
        message: "Error: Cart not found",
        status: 404,
      });
    }

    return Response.json(result);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return Response.json({
      message: "Error fetching cart",
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Assuming the ID is provided as a query parameter
    const body = await req.json();

    // Update the existing cart item with the new data
    const updatedCartItem = await prisma.cart.update({
      where: {
        productId: parseInt(id as string),
      },
      data: {
        ...body, // Update with new properties
      },
    });

    return Response.json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return Response.json({ message: "Error updating cart item", status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Assuming the ID is provided as a query parameter

    const deletedCartItem = await prisma.cart.delete({
      where: {
        productId: parseInt(id as string),
      },
    });

    return Response.json(deletedCartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return Response.json({ message: "Error updating cart item", status: 500 });
  }
}
