import { NextRequest, NextResponse } from "next/server"
import { IPackFormData } from "@/utils/types"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  const body: IPackFormData = await req.json()
  const {
    title,
    subtitle,
    category,
    description,
    packagePrice,
    discount,
    thumbnailUrl,
    illustrationUrl,
    animationUrl,
    featureImageUrl,
    productViewImageUrl,
    graphicFileIncluded,
    compatibility,
    tags,
    keyFeatures,
  } = body

  try {
<<<<<<< HEAD
    await db.pack.create({
=======
    await db.packs.create({
>>>>>>> d82d0149b20df6b95777d18d23730e0b6f50cccc
      data: {
        title,
        subtitle,
        category,
        description,
        packagePrice,
        discount,
        thumbnailUrl,
        illustrationUrl,
        animationUrl,
        featureImageUrl,
        productViewImageUrl: { set: productViewImageUrl },
        graphicFileIncluded,
        compatibility,
        tags: { set: tags },
        keyFeatures: { set: keyFeatures },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Pack added successfully",
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error adding product",
    })
  }
}
