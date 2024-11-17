import z from "zod"

export const addIconSchema = z.object({
  iconStyle: z.string().min(1),
  license: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).min(1),
})

export const preAddIconSchema = z.object({
  iconStyle: z.string().min(1),
  license: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).min(1),
})

export const addProductSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  packagePrice: z.number().min(1),
  discount: z.number(),
  graphicFileIncluded: z.string().min(1),
  compatibility: z.string().min(1),
  tags: z.array(z.string()).min(1),
  keyFeatures: z.array(z.string()),
})

export const filesSchema = z.object({
  thumbnailFile: z.array(z.instanceof(File)).min(1),
  illustrationFile: z.array(z.instanceof(File)).min(1),
  animationFile: z.array(z.instanceof(File)).min(1),
  featureImageFiles: z.array(z.instanceof(File)).min(1),
  productViewImageFiles: z.array(z.instanceof(File)).min(1),
})

export const requestProjectSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1, { message: "Name is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  attachmentUrl: z.string().min(1, { message: "A file is required" }),
  projectType: z.string().min(1, { message: "Project type is required" }),
  budget: z.string().min(1, { message: "Budget is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
})
