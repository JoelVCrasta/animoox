"use client"

import { useState, useEffect } from "react"
import PackUploadForm from "@/components/PackUploadForm"
import HeadingInfo from "@/components/HeadingInfo"
import type { IPackFormData2, IPackFiles } from "@/utils/types"
import { validateAddProduct, validateFiles } from "@/utils/validateForm"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"

const AddProduct = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<IPackFiles>({
    thumbnailFile: null,
    illustrationFile: null,
    animationFile: null,
    featureImageFiles: null,
    productViewImageFiles: null,
  })

  const [packFormData, setPackFormData] = useState<IPackFormData2>({
    title: "",
    subtitle: "",
    category: "",
    description: "",
    packagePrice: 0,
    discount: 0,
    graphicFileIncluded: "",
    compatibility: "",
    tags: [],
    keyFeatures: [],
  })

  const clearForm = () => {
    setPackFormData({
      title: "",
      subtitle: "",
      category: "",
      description: "",
      packagePrice: 0,
      discount: 0,
      graphicFileIncluded: "",
      compatibility: "",
      tags: [],
      keyFeatures: [],
    })

    setFiles({
      thumbnailFile: null,
      illustrationFile: null,
      animationFile: null,
      featureImageFiles: null,
      productViewImageFiles: null,
    })
  }

  useEffect(() => {
    const packFormDataDraft = localStorage.getItem("packFormData")
    if (packFormDataDraft) {
      setPackFormData(JSON.parse(packFormDataDraft))
    }

    localStorage.removeItem("packFormData")
  }, [])

  const handleSaveAsDraft = () => {
    localStorage.setItem("packFormData", JSON.stringify(packFormData))
    toast.success("Saved as draft")
  }

  /* 
    submit handler for publishing the product
    1. validate the files
    2. validate the form data
    3. create a form data object
    4. make a post request to the server
  */
  const handlePublishProduct = async () => {
    setLoading(true)

    const isFileValid = validateFiles(files)
    const isFormValid = validateAddProduct(packFormData)
    if (isFileValid === false || isFormValid === false) {
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("title", packFormData.title)
    formData.append("subtitle", packFormData.subtitle)
    formData.append("category", packFormData.category)
    formData.append("description", packFormData.description)
    formData.append("packagePrice", String(packFormData.packagePrice))
    formData.append("discount", String(packFormData.discount))
    formData.append("graphicFileIncluded", packFormData.graphicFileIncluded)
    formData.append("compatibility", packFormData.compatibility)
    packFormData.tags.forEach((tag) => {
      formData.append("tags", tag)
    })
    packFormData.keyFeatures.forEach((keyFeature) => {
      formData.append("keyFeatures", keyFeature)
    })
    if (files.thumbnailFile) {
      formData.append("thumbnailFile", files.thumbnailFile[0])
    }
    if (files.illustrationFile) {
      formData.append("illustrationFile", files.illustrationFile[0])
    }
    if (files.animationFile) {
      formData.append("animationFile", files.animationFile[0])
    }
    if (files.featureImageFiles) {
      formData.append("featureImageFiles", files.featureImageFiles[0])
    }
    if (files.productViewImageFiles) {
      files.productViewImageFiles.forEach((file) => {
        formData.append("productViewImageFiles", file)
      })
    }

    try {
      const response = await axios.post("/api/add-product", formData)
      if (response.data.success) {
        toast.success(response.data.message)
        clearForm()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error adding product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex">
      <Toaster />

      <div className="w-full p-4 md:p-10">
        <HeadingInfo
          title="Add the pack information below"
          handleSaveAsDraft={handleSaveAsDraft}
          handlePublishProduct={handlePublishProduct}
          loading={loading}
        />

        <PackUploadForm
          packFormData={packFormData}
          setPackFormData={setPackFormData}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </section>
  )
}

export default AddProduct
