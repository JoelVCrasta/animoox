"use client"

import { useState, useEffect } from "react"
import BlogUploadForm from "@/components/blog-upload-form"
import HeadingInfo from "@/components/HeadingInfo"
import type { IPackFormData, IPackFiles } from "@/utils/types"
import { validateAddProduct, validateFiles } from "@/utils/validateForm"
import { fileUpload, imageOptimUpload } from "@/lib/s3Upload"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"

const AddPack = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<IPackFiles>({
    thumbnailFile: null,
    illustrationFile: null,
    animationFile: null,
    featureImageFiles: null,
    productViewImageFiles: null,
  })

  const [packFormData, setPackFormData] = useState<IPackFormData>({
    title: "",
    subtitle: "",
    category: "",
    description: "",
    packagePrice: 0,
    discount: 0,
    thumbnailUrl: "",
    illustrationUrl: "",
    animationUrl: "",
    featureImageUrl: "",
    productViewImageUrl: [],
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
      thumbnailUrl: "",
      illustrationUrl: "",
      animationUrl: "",
      featureImageUrl: "",
      productViewImageUrl: [],
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

  const handlePublishProduct = async () => {
    setLoading(true)

    const isFilesValid = validateFiles(files)
    if (isFilesValid === false) {
      toast.error("Please upload all the files.")
      setLoading(false)
      return
    }

    try {
      const illustrationFileUrls = await fileUpload(
        files.illustrationFile as File[],
        "packs/illustrations"
      )
      const animationFileUrls = await fileUpload(
        files.animationFile as File[],
        "packs/animations"
      )
      const thumbnailFileUrls = await imageOptimUpload(
        files.thumbnailFile as File[],
        "packs/thumbnails",
        0.5,
        250
      )
      const featureImageFileUrls = await imageOptimUpload(
        files.featureImageFiles as File[],
        "packs/features"
      )
      const productViewImageFileUrls = await imageOptimUpload(
        files.productViewImageFiles as File[],
        "packs/product-views"
      )

      if (
        illustrationFileUrls.s3Status === "error" ||
        animationFileUrls.s3Status === "error" ||
        thumbnailFileUrls.s3Status === "error" ||
        featureImageFileUrls.s3Status === "error" ||
        productViewImageFileUrls.s3Status === "error"
      ) {
        toast.error("Error uploading the files")
        setLoading(false)
        return
      }

      const updatedPackData = {
        ...packFormData,
        illustrationUrl: illustrationFileUrls.fileUrls?.[0] || "",
        animationUrl: animationFileUrls.fileUrls?.[0] || "",
        thumbnailUrl: thumbnailFileUrls.fileUrls?.[0] || "",
        featureImageUrl: featureImageFileUrls.fileUrls?.[0] || "",
        productViewImageUrl: productViewImageFileUrls.fileUrls || [],
      }

      console.log("updatedPackData", updatedPackData)

      const validity = validateAddProduct(updatedPackData)
      if (validity === false) {
        setLoading(false)
        return
      }

      const response = await axios.post("/api/add-pack", updatedPackData)
      if (response.data.success) {
        console.log(response.data)
        toast.success("Icon uploaded successfully")
      } else {
        toast.error("Error uploading the icon")
      }

      setLoading(false)
      /* clearForm() */
    } catch (err) {
      console.error(err)
      toast.error("Error uploading the icon file")
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

        <BlogUploadForm
          packFormData={packFormData}
          setPackFormData={setPackFormData}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </section>
  )
}

export default AddPack
