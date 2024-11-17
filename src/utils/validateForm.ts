import { toast } from "react-hot-toast"
import {
  addIconSchema,
  addProductSchema,
  filesSchema,
  preAddIconSchema,
  requestProjectSchema,
} from "@/utils/zodSchema"
import type {
  IIconFormData,
  IPackFormData2,
  IPackFiles,
  IRequestProjectFormData,
} from "@/utils/types"

export const validateIconForm = (data: IIconFormData) => {
  try {
    addIconSchema.parse(data)
    return true
  } catch (err) {
    toast.error("Please fill all the fields.")
    return false
  }
}

export const validatePreAddIcon = (data: IIconFormData) => {
  try {
    preAddIconSchema.parse(data)
    return true
  } catch (err) {
    toast.error("Please fill all the fields.")
    return false
  }
}

export const validateAddProduct = (data: IPackFormData2) => {
  try {
    addProductSchema.parse(data)
    return true
  } catch (err) {
    toast.error("Please fill all the fields.")
    return false
  }
}

export const validateFiles = (data: IPackFiles) => {
  try {
    filesSchema.parse(data)
    return true
  } catch (err) {
    toast.error("Please upload all the files.")
    return false
  }
}

export const validateRequestProject = (data: IRequestProjectFormData) => {
  try {
    requestProjectSchema.parse(data)
    return true
  } catch (err) {
    toast.error("Please fill all the fields.")
    return false
  }
}
