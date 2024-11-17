import { s3Client } from "@/lib/aws-config"
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp"

interface UrlResponse {
  s3Status: "success" | "error"
  fileUrls: string[]
  fileUrl: string
}

// Single file upload to S3 bucket
export async function singleFileUpload(
  file: File,
  folder: string
): Promise<UrlResponse> {
  if (!file) {
    console.error("No file provided for upload.")
    return { s3Status: "error", fileUrls: [], fileUrl: "" }
  }
  console.log(folder)

  const fileName = `${Date.now()}-${file.name}`
  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `${folder}/${fileName}`,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
  }

  const command = new PutObjectCommand(params)

  try {
    await s3Client.send(command)
    const fileUrl = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${folder}/${fileName}`
    return {
      s3Status: "success",
      fileUrl: encodeURI(fileUrl),
      fileUrls: [encodeURI(fileUrl)],
    }
  } catch (err) {
    console.error("Error uploading file:", err)
    return { s3Status: "error", fileUrls: [], fileUrl: "" }
  }
}

// Multiple file upload to S3 bucket (makes use of singleFileUpload function)
export async function fileUpload(
  files: File[],
  folder: string
): Promise<UrlResponse> {
  if (!files || files.length === 0) {
    console.error("No files provided for upload.")
    return { s3Status: "error", fileUrls: [], fileUrl: "" }
  }

  const fileUrls = []

  for (const file of files) {
    const response = await singleFileUpload(file, folder)
    if (response.s3Status === "success" && response.fileUrl) {
      fileUrls.push(response.fileUrl)
    } else {
      return { s3Status: "error", fileUrls: [], fileUrl: "" }
    }
  }

  return {
    s3Status: "success",
    fileUrls: fileUrls,
    fileUrl: fileUrls[0],
  }
}

// Image optimization and upload to S3 bucket using sharp
export async function imageOptimUpload(
  files: File[],
  folder: string,
  size: number = 80,
  width: number = 800
): Promise<UrlResponse> {
  if (!files || files.length === 0) {
    console.error("No files provided for upload.")
    return { s3Status: "error", fileUrls: [], fileUrl: "" }
  }

  try {
    const compressedFiles: File[] = []

    for (const file of files) {
      const buffer = await file.arrayBuffer()
      const optimizedBuffer = await sharp(Buffer.from(buffer))
        .resize(width)
        .jpeg({ quality: size })
        .toBuffer()

      const optimizedFile = new File([optimizedBuffer], file.name, {
        type: "image/jpeg",
      })

      compressedFiles.push(optimizedFile)
    }

    const response = await fileUpload(compressedFiles, folder)
    if (response.s3Status === "error") {
      return { s3Status: "error", fileUrls: [], fileUrl: "" }
    }

    return {
      s3Status: "success",
      fileUrls: response.fileUrls,
      fileUrl: response.fileUrls[0],
    }
  } catch (err) {
    console.error("Error compressing image:", err)
    return { s3Status: "error", fileUrls: [], fileUrl: "" }
  }
}

// ------------------------------------------------------------------------

export async function imageRemove(imageUrl: string): Promise<UrlResponse> {
  const fileName = imageUrl.split("/").pop()
  if (!fileName) {
    console.error("Invalid image URL provided for removal.")
    return { s3Status: "error", fileUrls: [], fileUrl: "" }
  }

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `icons/${fileName}`,
  }

  try {
    await s3Client.send(new DeleteObjectCommand(params))
    return {
      s3Status: "success",
      fileUrls: [],
      fileUrl: "",
    }
  } catch (err) {
    console.error("Error removing file:", err)
    return { s3Status: "error", fileUrls: [], fileUrl: "" }
  }
}
