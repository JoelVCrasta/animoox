"use client"

import { useState, useEffect } from "react"
import IconUploadForm from "@/components/IconUploadForm"
import HeadingInfo from "@/components/HeadingInfo"
import type { IIconFormData } from "@/utils/types"
import { fileUpload } from "@/lib/s3Upload"
import toast, { Toaster } from "react-hot-toast"
import { validateIconForm } from "@/utils/validateForm"
import axios from "axios"

const AddIcon = () => {
  const [files, setFiles] = useState<File[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [iconFormData, setIconFormData] = useState<IIconFormData>({
    iconStyle: "",
    license: "",
    category: "",
    tags: [],
    files: [],
  })

  const clearForm = () => {
    setIconFormData({
      iconStyle: "",
      license: "",
      category: "",
      tags: [],
      files: [],
    })

    setFiles(null)
  }

  useEffect(() => {
    const iconFormDataDraft = localStorage.getItem("iconFormData")
    if (iconFormDataDraft) {
      setIconFormData(JSON.parse(iconFormDataDraft))
    }

    localStorage.removeItem("iconFormData")
  }, [])

  const handleSaveAsDraft = async () => {
    localStorage.setItem("iconFormData", JSON.stringify(iconFormData))
    toast.success("Saved as draft")
  }

  const handlePublishProduct = async () => {
    setLoading(true)

    const isFormValid = validateIconForm(iconFormData)
    if (!files || !isFormValid) {
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("iconStyle", iconFormData.iconStyle)
    formData.append("license", iconFormData.license)
    formData.append("category", iconFormData.category)
    iconFormData.tags.forEach((tag) => formData.append("tags", tag))
    files.forEach((file) => formData.append("files", file))

    try {
      const response = await axios.post("/api/add-icon", formData)
      if (response.data.success) {
        toast.success(response.data.message)
        clearForm()
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full">
      <Toaster />
      <div className="w-full p-4 md:px-10">
        <HeadingInfo
          title="Add the icon information below"
          handleSaveAsDraft={handleSaveAsDraft}
          handlePublishProduct={handlePublishProduct}
          loading={loading}
        />

        <IconUploadForm
          iconFormData={iconFormData}
          setIconFormData={setIconFormData}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </section>
  )
}

export default AddIcon
