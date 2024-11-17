import { NextRequest, NextResponse } from "next/server"
import { IPackFormData } from "@/utils/types"
import { db } from "@/lib/db"
import { fileUpload, imageOptimUpload } from "@/lib/s3Upload"

export async function POST(req: NextRequest) {
  const body = await req.formData()

  const thumbnailFile = body.get("thumbnailFile") as File | null
  const illustrationFile = body.get("illustrationFile") as File | null
  const animationFile = body.get("animationFile") as File | null
  const featureImageFiles = body.getAll("featureImageFiles") as File[]
  const productViewImageFiles = body.getAll("productViewImageFiles") as File[]

  if (
    !thumbnailFile ||
    !illustrationFile ||
    !animationFile ||
    !featureImageFiles ||
    !productViewImageFiles
  ) {
    return NextResponse.json({
      success: false,
      message: "Please provide all the files",
    })
  }

  try {
    const thumbnailUrl = await imageOptimUpload(
      [thumbnailFile],
      "products/thumbnails",
      80,
      250
    )
    const illustrationUrl = await fileUpload(
      [illustrationFile],
      "products/illustrations"
    )
    const animationUrl = await fileUpload(
      [animationFile],
      "products/animations"
    )
    const featureImageUrl = await imageOptimUpload(
      featureImageFiles,
      "products/features",
      85,
      478
    )
    const productViewImageUrl = await imageOptimUpload(
      productViewImageFiles,
      "products/product-views",
      85,
      478
    )

    if (
      thumbnailUrl.s3Status === "error" ||
      illustrationUrl.s3Status === "error" ||
      animationUrl.s3Status === "error" ||
      featureImageUrl.s3Status === "error" ||
      productViewImageUrl.s3Status === "error"
    ) {
      return NextResponse.json({
        success: false,
        message: "Error uploading the files",
      })
    }

    const data: IPackFormData = {
      title: body.get("title") as string,
      subtitle: body.get("subtitle") as string,
      category: body.get("category") as string,
      description: body.get("description") as string,
      packagePrice: Number(body.get("packagePrice")),
      discount: Number(body.get("discount")),
      thumbnailUrl: thumbnailUrl.fileUrls[0],
      illustrationUrl: illustrationUrl.fileUrls[0],
      animationUrl: animationUrl.fileUrls[0],
      featureImageUrl: featureImageUrl.fileUrls[0],
      productViewImageUrl: productViewImageUrl.fileUrls,
      graphicFileIncluded: body.get("graphicFileIncluded") as string,
      compatibility: body.get("compatibility") as string,
      tags: body.getAll("tags") as string[],
      keyFeatures: body.getAll("keyFeatures") as string[],
    }

    await db.pack.create({ data })
    return NextResponse.json({
      success: true,
      message: "Product added successfully",
    })
  } catch (err) {
    console.error("Error adding product:", err)
    return NextResponse.json({
      success: false,
      message: "Error adding product",
    })
  }
}
