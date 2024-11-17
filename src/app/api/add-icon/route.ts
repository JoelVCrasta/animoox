import { NextRequest, NextResponse } from "next/server"
import { fileUpload } from "@/lib/s3Upload"
import { IIconFormData } from "@/utils/types"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  const body = await req.formData()

  const iconFiles = body.getAll("files") as File[]

  if (!iconFiles) {
    return NextResponse.json({
      success: false,
      message: "Please provide all the files",
    })
  }

  try {
    const iconUrls = await fileUpload(iconFiles, "icons")

    if (iconUrls.s3Status === "error") {
      return NextResponse.json({
        success: false,
        message: "Error uploading files",
      })
    }

    const data: IIconFormData = {
      iconStyle: body.get("iconStyle") as string,
      license: body.get("license") as string,
      category: body.get("category") as string,
      tags: body.getAll("tags") as string[],
      files: iconUrls.fileUrls,
    }

    await db.icon.create({
      data,
    })

    return NextResponse.json({
      success: true,
      message: "Icon added successfully",
    })
  } catch (err) {
    console.error("Error adding icon:", err)
    return NextResponse.json({
      success: false,
      message: "Error adding icon",
    })
  }
}
