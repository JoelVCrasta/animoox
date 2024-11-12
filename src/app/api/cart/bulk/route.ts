// app/api/cart/bulk/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId, productIds } = await request.json();

  // Validate input
  if (!userId || !Array.isArray(productIds)) {
    return NextResponse.json({ error: 'User ID is required and productIds must be an array' }, { status: 400 });
  }

  // Fetch the existing cart items
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { cartItems: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Merge existing cartItems with new productIds and remove duplicates
  const updatedCartItems = Array.from(new Set([...user.cartItems, ...productIds]));

  // Update the user's cartItems with the combined list
  await db.user.update({
    where: { id: userId },
    data: { cartItems: updatedCartItems },
  });

  return NextResponse.json({ message: 'Cart items updated successfully', cartItems: updatedCartItems });
}
