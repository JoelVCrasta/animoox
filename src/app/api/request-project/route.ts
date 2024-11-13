import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data)
    const newOrder = await db.order.create({ data });
    return NextResponse.json(newOrder);
  } catch (error) {
    console.error('Error creating Order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    try {
      if (productId) {
        // Fetch single product by productId
        const product = await db.product.findUnique({ where: { productId } });
        if (!product) {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
      } else {
        // Fetch all products
        const products = await db.product.findMany();
        return NextResponse.json(products);
      }
    } catch (error) {
      console.error('Error fetching product(s):', error);
      return NextResponse.json({ error: 'Failed to retrieve product(s)' }, { status: 500 });
    }
  }