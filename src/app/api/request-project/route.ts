import { db } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log("Order body:", body)

  try {
    await db.order.create({ data: body })

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("Error creating Order:", error)
    return NextResponse.json({
      success: false,
      message: "Error creating Order",
    })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get("productId")
  try {
    if (productId) {
      // Fetch single product by productId
      const product = await db.product.findUnique({ where: { productId } })
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        )
      }
      return NextResponse.json(product)
    } else {
      // Fetch all products
      const products = await db.product.findMany()
      return NextResponse.json(products)
    }
  } catch (error) {
    console.error("Error fetching product(s):", error)
    return NextResponse.json(
      { error: "Failed to retrieve product(s)" },
      { status: 500 }
    )
  }
}
