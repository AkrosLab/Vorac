"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, CheckCircle2 } from "lucide-react";
import { serviceOptions } from "@/lib/data";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedService?: string;
  triggerElement?: HTMLElement | null;
}

interface FormData {
  name: string;
  contactNumber: string;
  email: string;
  postcode: string;
  service: string;
  details: string;
}

interface FormErrors {
  name?: string;
  contactNumber?: string;
  email?: string;
  service?: string;
  details?: string;
}

export const BookingModal = ({
  open,
  onOpenChange,
  preselectedService,
  triggerElement,
}: BookingModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contactNumber: "",
    email: "",
    postcode: "",
    service: preselectedService || "",
    details: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Update service when preselectedService changes
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  // Focus first input when modal opens
  useEffect(() => {
    if (open && !isSuccess) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [open, isSuccess]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        postcode: "",
        service: preselectedService || "",
        details: "",
      });
      setErrors({});
      setIsSuccess(false);
    }
  }, [open, preselectedService]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^(\+44|0)[1-9]\d{8,9}$/.test(formData.contactNumber.replace(/\s+/g, ""))) {
      newErrors.contactNumber = "Please enter a valid UK phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.details.trim()) {
      newErrors.details = "Details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log payload to console
    console.log("Booking submission:", formData);

    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Restore focus to trigger element
    if (triggerElement) {
      setTimeout(() => {
        triggerElement.focus();
      }, 100);
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent
        className="max-w-[900px] w-[calc(100%-2rem)] h-[90vh] max-h-[90vh] p-0 flex flex-col overflow-hidden [&>button]:hidden"
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
        onInteractOutside={handleClose}
        aria-modal="true"
        role="dialog"
        aria-labelledby="booking-modal-title"
        aria-describedby="booking-modal-description"
      >
        {/* Header Bar */}
        <div className="bg-[#1a1a1a] text-white px-8 py-8 sm:py-12 flex-shrink-0 relative min-h-[120px] sm:min-h-[160px]">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded-none p-1 border border-transparent hover:border-white/20"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="text-center max-w-2xl mx-auto">
            <DialogTitle
              asChild
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
              id="booking-modal-title"
            >
              <h2>Make a Booking</h2>
            </DialogTitle>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto bg-muted/30">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-foreground mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Thanks — we'll be in touch shortly</h3>
              <p className="text-muted-foreground">
                We've received your booking request and will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-12" noValidate>
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Two-column layout on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      ref={nameInputRef}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="First Name, Surname"
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="mt-2 rounded-none border border-black/20"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-destructive" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div>
                    <Label htmlFor="contactNumber" className="text-sm font-medium">
                      Contact Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="07400 123456"
                      required
                      aria-invalid={!!errors.contactNumber}
                      aria-describedby={errors.contactNumber ? "contactNumber-error" : undefined}
                      className="mt-2 rounded-none border border-black/20"
                    />
                    {errors.contactNumber && (
                      <p id="contactNumber-error" className="mt-1 text-sm text-destructive" role="alert">
                        {errors.contactNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@server.co.uk"
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="mt-2 rounded-none border border-black/20"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Postcode */}
                  <div>
                    <Label htmlFor="postcode" className="text-sm font-medium">
                      Postcode
                    </Label>
                    <Input
                      id="postcode"
                      name="postcode"
                      type="text"
                      value={formData.postcode}
                      onChange={handleChange}
                      placeholder="SW3 0TP"
                      className="mt-2 rounded-none border border-black/20"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <Label htmlFor="service" className="text-sm font-medium">
                    Service <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? "service-error" : undefined}
                    className="mt-2 flex h-9 w-full rounded-none border border-black/20 bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="service-error" className="mt-1 text-sm text-destructive" role="alert">
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Details */}
                <div>
                  <Label htmlFor="details" className="text-sm font-medium">
                    DETAILS ABOUT THE ISSUE YOU'RE HAVING <span className="text-destructive">*</span>
                  </Label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe the issue you are experiencing, when it happens, etc"
                    required
                    aria-invalid={!!errors.details}
                    aria-describedby={errors.details ? "details-error" : undefined}
                    className="mt-2 flex w-full rounded-none border border-black/20 bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                  {errors.details && (
                    <p id="details-error" className="mt-1 text-sm text-destructive" role="alert">
                      {errors.details}
                    </p>
                  )}
                </div>

                {/* Consent */}
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    By using this form you agree to the{" "}
                    <Link href="/policy/terms" className="text-foreground underline hover:text-foreground/80">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/policy/privacy" className="text-foreground underline hover:text-foreground/80">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90"
                  >
                    {isSubmitting ? "Submitting..." : "SEND BOOKING REQUEST"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

