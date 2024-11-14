"use client"

import { useState } from "react"
import { RequestProjectImage } from "@/assets/images"
import Image from "next/image"
import { PhoneIcon } from "@/assets/icons/phone-icon"
import { LocationIcon } from "@/assets/icons/location-icon"
import { MailIcon } from "@/assets/icons/mail-icon"
import { RequestDribbleIcon } from "@/assets/icons/request-dribble-icon"
import { RequestBehanceIcon } from "@/assets/icons/request-behance-icon"
import { SlackIcon } from "@/assets/icons/slack-icon"
import { Button, InputWithLabel } from "@/components/ui"
import { cn } from "@/lib/utils"
import { InputVariants } from "@/components/ui/inputs/input.config"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { IRequestProjectFormData } from "@/utils/types"
import { validateRequestProject } from "@/utils/validateForm"
import { fileUpload } from "@/actions/s3Upload"
import axios from "axios"

export default function InquiryForm() {
  const [requestProjectForm, setRequestProjectForm] =
    useState<IRequestProjectFormData>({
      userId: "",
      email: "",
      name: "",
      message: "",
      projectType: "Illustration",
      budget: "2000-5000 USD",
      attachmentUrl: "",
    })

  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const clearForm = () => {
    setRequestProjectForm({
      userId: "",
      email: "",
      name: "",
      message: "",
      projectType: "Illustration",
      budget: "2000-5000 USD",
      attachmentUrl: "",
    })

    setFile(null)
    setPreviewUrl(null)
  }

  // -------------------------------------------------------------------------------------

  const handleProjectChange = (project: string) => {
    setRequestProjectForm((prevForm) => ({ ...prevForm, projectType: project }))
  }

  const handleBudgetChange = (budget: string) => {
    setRequestProjectForm((prevForm) => ({ ...prevForm, budget }))
  }

  const handleFileChange = (e: any) => {
    const uploadedFile = e.target.files[0]
    setFile(uploadedFile)

    // Preview URL
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile)
      setPreviewUrl(url)
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreviewUrl(null)
  }

  const handleChange = (e: any) => {
    setRequestProjectForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!file) {
      toast.error("Please attach a file.")
      return
    }

    // File upload and validation (returns file url(s))
    const fileUrl = file ? await fileUpload([file], "request-projects") : null
    if (fileUrl?.s3Status === "error" || !fileUrl) {
      toast.error("Error uploading the file. Please try again.")
      return
    }

    const formDataToSend = {
      ...requestProjectForm,
      attachmentUrl: fileUrl?.fileUrls?.[0] ?? "",
      userId: session?.user?.id || "",
    }

    // Form validation
    const validity = validateRequestProject(formDataToSend)
    if (validity === false) {
      toast.error("Please fill all the fields.")
      return
    }

    try {
      const response = await axios.post("/api/request-project", formDataToSend)
      if (response.data.success) {
        toast.success("Your request has been sent successfully.")
      } else {
        toast.error(
          "There was an error sending your request. Please try again."
        )
      }

      clearForm()
    } catch (error) {
      console.error("Error sending request:", error)
      toast.error("There was an error sending your request. Please try again.")
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen justify-center space-x-4 max-w-6xl mx-auto">
      {/* Contact Information Section */}
      <div className="rounded-lg p-6 w-full md:w-1/3 space-y-4 text-center md:text-left h-fit">
        <div className="bg-white py-20 px-10 rounded-2xl">
          <Image
            src={RequestProjectImage}
            alt="Illustration"
            className="w-3/4 mx-auto mb-4"
          />
        </div>
        <p className="text-sm font-extralight flex gap-3 items-center">
          <PhoneIcon /> Whatsapp: +8801723559106
        </p>
        <p className="text-sm font-extralight flex gap-3 items-center">
          <LocationIcon /> Dhaka, Bangladesh
        </p>
        <p className="text-sm font-extralight flex gap-3 items-center">
          <MailIcon /> animoxostudio@gmail.com
        </p>
        <div className="flex justify-start md:justify-start gap-4 mt-4">
          <span className="text-blue-500">
            <SlackIcon />
          </span>
          <span className="text-blue-500">
            <RequestDribbleIcon />
          </span>
          <span className="text-blue-500">
            <RequestBehanceIcon />
          </span>
        </div>
      </div>

      {/* Project Inquiry Form Section */}
      <div className="rounded-lg p-3 w-full md:w-2/3">
        <p className="text-4xl font-normal font-sans mb-2">
          Let&apos;s build an awesome <br /> project together.
        </p>
        <p className="text-gray-600 mb-8">
          Describe your project and leave us your contact info, <br />
          we&apos;ll get back to you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Type */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-secondary-text">
              What is your project about?
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Lottie",
                "Rive",
                "Illustration",
                "Animation",
                "Web Design",
                "UI Design",
                "Branding",
                "Explainer Video",
              ].map((project) => (
                <button
                  key={project}
                  type="button"
                  onClick={() => handleProjectChange(project)}
                  className={`px-4 py-2 rounded-full border ${
                    requestProjectForm.projectType === project
                      ? "border-brand text-brand"
                      : "border-gray-600 text-gray-600"
                  }`}
                >
                  {project}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Estimation */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Budget estimation (USD)
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Under 500 USD",
                "500-1000 USD",
                "1000-2000 USD",
                "2000-5000 USD",
                "5000+ USD",
              ].map((budget) => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => handleBudgetChange(budget)}
                  className={`px-4 py-2 rounded-full border ${
                    requestProjectForm.budget === budget
                      ? "border-brand text-brand"
                      : "border-gray-600 text-gray-600"
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="flex gap-4">
            <InputWithLabel
              label="Email"
              name="email"
              type="email"
              placeholder="Jhonsmith@gmail.com"
              value={requestProjectForm.email}
              onChange={handleChange}
            />
            <InputWithLabel
              label="Name"
              name="name"
              type="text"
              placeholder="Jhon Smith"
              value={requestProjectForm.name}
              onChange={handleChange}
            />
          </div>

          {/* Message Field */}
          <div className="relative w-full">
            <label className="absolute -top-3 left-4 px-1 bg-white text-secondary-text text-sm">
              Your Message
            </label>
            <textarea
              name="message"
              value={requestProjectForm.message}
              onChange={handleChange}
              className={cn(InputVariants())}
              rows={4}
            />
          </div>

          {/* File Attachment with Preview */}
          <div className="flex items-center space-x-4">
            <label className="text-brand cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span>📎 Attach a file</span>
            </label>
            {file && (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src={previewUrl || ""}
                    alt="Uploaded File"
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <button
                    onClick={removeFile}
                    type="button"
                    className="absolute top-1 right-1 bg-gray-700 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <p>{file.name}</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between text-light">
            <Button className="rounded-full" type="submit">
              Send Request
            </Button>
            <p className="text-sm text-gray-500">
              This site is protected by reCAPTCHA and the Google <br />
              <a href="#" className="text-blue-500">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
