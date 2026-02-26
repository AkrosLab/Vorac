"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, CheckCircle2 } from "lucide-react"
import { serviceOptions } from "@/lib/data"
import { useState, useEffect, useRef } from "react"
import emailjs from "@emailjs/browser"
import * as validator from "validator"
import { isValidPhoneNumber } from "libphonenumber-js"

export function openVoracBookingModal() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent("vorac:open-booking"))
}

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  preselectedService?: string
  triggerElement?: HTMLElement | null
}

interface FormData {
  name: string
  contactNumber: string
  email: string
  postcode: string
  service: string
  details: string
}

interface FormErrors {
  name?: string
  contactNumber?: string
  email?: string
  service?: string
  details?: string
}

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_6163799"
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_inehvaz"
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "nfNQkIWLHIAj3x-ia"

export const BookingModal = ({ open, onOpenChange, preselectedService, triggerElement }: BookingModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contactNumber: "",
    email: "",
    postcode: "",
    service: preselectedService || "",
    details: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  /* ==============================
     EFFECTS
  ============================== */

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }))
    }
  }, [preselectedService])

  useEffect(() => {
    if (open && !isSuccess) {
      setTimeout(() => nameInputRef.current?.focus(), 100)
    }
  }, [open, isSuccess])

  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        postcode: "",
        service: preselectedService || "",
        details: "",
      })
      setErrors({})
      setIsSuccess(false)
    }
  }, [open, preselectedService])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  /* ==============================
     VALIDATION (validator + libphonenumber-js)
  ============================== */

  const isValidUkPhone = (raw: string): boolean => {
    if (!raw || !raw.trim()) return false
    return isValidPhoneNumber(raw.trim(), "GB")
  }

  const isValidEmail = (email: string): boolean => {
    const trimmed = email.trim()
    if (!trimmed || trimmed.length > 254) return false
    return validator.isEmail(trimmed, {
      allow_utf8_local_part: true,
      require_tld: true,
      allow_ip_domain: false,
    })
  }

  const validate = (data?: FormData): { valid: boolean; newErrors: FormErrors } => {
    const d = data ?? formData
    const newErrors: FormErrors = {}

    if (!d.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!d.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required"
    } else if (!isValidUkPhone(d.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid UK phone number (e.g. 07123 456789 or +44 7123 456789)"
    }

    if (!d.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(d.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!d.service) {
      newErrors.service = "Please select a service"
    }

    if (!d.details.trim()) {
      newErrors.details = "Details are required"
    }

    setErrors(newErrors)
    return { valid: Object.keys(newErrors).length === 0, newErrors }
  }

  /* ==============================
     SUBMIT (EMAILJS)
  ============================== */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting) return

    const form = e.currentTarget
    const dataFromForm: FormData = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "",
      contactNumber: (form.elements.namedItem("contactNumber") as HTMLInputElement)?.value ?? "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
      postcode: (form.elements.namedItem("postcode") as HTMLInputElement)?.value ?? "",
      service: (form.elements.namedItem("service") as HTMLSelectElement)?.value ?? "",
      details: (form.elements.namedItem("details") as HTMLTextAreaElement)?.value ?? "",
    }

    const { valid, newErrors } = validate(dataFromForm)

    if (!valid) {
      const firstErrorKey = Object.keys(newErrors)[0]
      if (firstErrorKey) {
        setTimeout(() => {
          document.getElementById(firstErrorKey)?.focus()
        }, 0)
      }
      return
    }

    try {
      setIsSubmitting(true)

      const serviceLabel = serviceOptions.find((o) => o.value === dataFromForm.service)?.label ?? dataFromForm.service

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: dataFromForm.name,
          contact_number: dataFromForm.contactNumber,
          phone: dataFromForm.contactNumber,
          email: dataFromForm.email,
          postcode: dataFromForm.postcode || "N/A",
          service: serviceLabel,
          service_id: dataFromForm.service,
          details: dataFromForm.details,
          submitted_at: new Date().toLocaleString("en-GB"),
          page_url: typeof window !== "undefined" ? window.location.href : "",
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )

      setIsSuccess(true)
    } catch (error) {
      console.error("EmailJS error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ==============================
     HANDLERS
  ============================== */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name as keyof FormErrors]
        return copy
      })
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    if (triggerElement) {
      setTimeout(() => triggerElement.focus(), 100)
    }
  }

  /* ==============================
     UI
  ============================== */

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className="max-w-[900px] w-[calc(100%-2rem)] h-[90vh] p-0 flex flex-col overflow-hidden [&>button]:hidden"
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
      >
        <div className="bg-[#1a1a1a] text-white px-8 py-8 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 inline-flex size-10 items-center justify-center border border-white/15"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center">
            <DialogTitle asChild>
              <h2 className="text-4xl font-bold">Make a Booking</h2>
            </DialogTitle>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-muted/30">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
              <CheckCircle2 className="h-16 w-16 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Thanks — we&apos;ll be in touch shortly</h3>
              <p>We&apos;ve received your booking request.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm font-medium text-[#1a1a1a]">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  ref={nameInputRef}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  className={errors.name ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="contactNumber" className="text-sm font-medium text-[#1a1a1a]">
                  Phone
                </Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="UK phone number"
                  aria-invalid={!!errors.contactNumber}
                  className={errors.contactNumber ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {errors.contactNumber && <p className="text-xs text-red-600">{errors.contactNumber}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium text-[#1a1a1a]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  aria-invalid={!!errors.email}
                  className={errors.email ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="postcode" className="text-sm font-medium text-[#1a1a1a]">
                  Postcode (optional)
                </Label>
                <Input
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="e.g. SW1A 1AA"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="service" className="text-sm font-medium text-[#1a1a1a]">
                  Service
                </Label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  aria-invalid={!!errors.service}
                  className={`w-full border p-2 rounded-none bg-white ${
                    errors.service ? "border-red-500" : "border-[#0a0a0a]/[0.12]"
                  }`}
                >
                  <option value="">Select service</option>
                  {serviceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-xs text-red-600">{errors.service}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="details" className="text-sm font-medium text-[#1a1a1a]">
                  Details
                </Label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your issue..."
                  aria-invalid={!!errors.details}
                  className={`w-full border p-2 rounded-none resize-none ${
                    errors.details ? "border-red-500" : "border-[#0a0a0a]/[0.12]"
                  }`}
                />
                {errors.details && <p className="text-xs text-red-600">{errors.details}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Send Booking Request"}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
