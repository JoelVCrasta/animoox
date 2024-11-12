// app/api/cart/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userId = request.url.split('?')[1]; // Extract userId from query parameters

  // Get cart items for the user
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { cartItems: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user.cartItems);
}

export async function POST(request: Request) {
  const { userId, productId } = await request.json();

  // Add a productId to the user's cart
  if (!userId || !productId) {
    return NextResponse.json({ error: 'User ID and Product ID are required' }, { status: 400 });
  }

  const user = await db.user.update({
    where: { id: userId },
    data: {
      cartItems: {
        push: productId,
      },
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  const { userId, productId } = await request.json();

  // Remove a productId from the user's cart
  if (!userId || !productId) {
    return NextResponse.json({ error: 'User ID and Product ID are required' }, { status: 400 });
  }

  const user = await globalThis.prisma?.user.update({
    where: { id: userId },
    data: {
      cartItems: {
        // @ts-ignore
        set: (await globalThis.prisma?.user.findUnique({
          where: { id: userId },
          select: { cartItems: true },
        })).cartItems.filter((item) => item !== productId),
      },
    },
  });

  return NextResponse.json(user);
}
