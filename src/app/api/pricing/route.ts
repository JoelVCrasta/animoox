import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface PricingPlan {
  type: string;
  price: number;
  save: number;
  discount: number;
  duration: string;
  description: string;
  features: string[];
  status: string;
}

export async function POST(request: Request) {
  try {
    const body: PricingPlan = await request.json();
    if (!body.type) {
      return NextResponse.json({ error: "Type is required" }, { status: 400 });
    }
    if (!body.duration) {
      return NextResponse.json(
        { error: "Duration is required" },
        { status: 400 }
      );
    }
    const existingPlan = await db.pricing.findUnique({
      where: {
        type: body.type,
      },
    });

    let pricingPlan;

    if (existingPlan) {
      pricingPlan = await db.pricing.update({
        where: {
          id: existingPlan.id,
        },
        data: {
          price: body.price,
          save: body.save,
          discount: body.discount,
          duration: body.duration,
          description: body.description,
          features: body.features,
          status: body.status,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        message: "Pricing plan updated successfully",
        data: pricingPlan,
      });
    } else {
      pricingPlan = await db.pricing.create({
        data: {
          type: body.type,
          price: body.price,
          save: body.save,
          discount: body.discount,
          duration: body.duration,
          description: body.description,
          features: body.features,
          status: body.status || "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(
        {
          message: "Pricing plan created successfully",
          data: pricingPlan,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error in pricing plan API:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const pricingPlans = await db.pricing.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(pricingPlans);
  } catch (error) {
    console.error("Error fetching pricing plans:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
