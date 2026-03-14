"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serviceOptions } from "@/lib/data";
import { CheckCircle2, Search, Target, X, ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";
import * as validator from "validator";
import { isValidPhoneNumber } from "libphonenumber-js";

interface FormData {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  service: string;
  details: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  postcode?: string;
  service?: string;
  details?: string;
}

export function openVoracQuoteModal(
  detail?: Partial<Pick<FormData, "service" | "postcode">>,
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("vorac:open-quote", { detail }));
}

export const QuoteForm = ({
  showSection = true,
}: {
  showSection?: boolean;
}) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [barService, setBarService] = useState("");
  const [barPostcode, setBarPostcode] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    postcode: "",
    service: "",
    details: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastActiveEl, setLastActiveEl] = useState<HTMLElement | null>(null);
  const [selectOpen, setSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const serviceMap = useMemo(() => {
    const m = new Map<string, string>();
    serviceOptions.forEach((o) => m.set(o.value, o.label));
    return m;
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const serviceId = hash.replace("#", "");
    if (serviceOptions.some((opt) => opt.value === serviceId)) {
      setBarService(serviceId);
      setFormData((prev) => ({ ...prev, service: serviceId }));
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ service?: string; postcode?: string }>;
      const nextService = ce.detail?.service ?? "";
      const nextPostcode = ce.detail?.postcode ?? "";
      setLastActiveEl(document.activeElement as HTMLElement);
      setIsOpen(true);
      setIsSuccess(false);
      setErrors({});
      if (nextService) setBarService(nextService);
      if (nextPostcode) setBarPostcode(nextPostcode);
      setFormData((prev) => ({
        ...prev,
        service: nextService || prev.service || barService,
        postcode: nextPostcode || prev.postcode || barPostcode,
      }));
    };
    window.addEventListener("vorac:open-quote", handler);
    return () => window.removeEventListener("vorac:open-quote", handler);
  }, [barService, barPostcode]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectOpen) {
          setSelectOpen(false);
        } else {
          setIsOpen(false);
          setIsSubmitting(false);
          setErrors({});
          setTimeout(() => lastActiveEl?.focus?.(), 0);
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, selectOpen, lastActiveEl]);

  // Close select when clicking outside
  useEffect(() => {
    if (!selectOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setIsSubmitting(false);
    setErrors({});
    setTimeout(() => lastActiveEl?.focus?.(), 0);
  };

  const openFromBar = () => {
    setLastActiveEl(document.activeElement as HTMLElement);
    setIsOpen(true);
    setIsSuccess(false);
    setErrors({});
    setFormData((prev) => ({
      ...prev,
      service: barService,
      postcode: barPostcode,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  };

  const handleServiceSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
    setSelectOpen(false);
    if (errors.service) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.service;
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Contact number is required";
    } else if (!isValidPhoneNumber(formData.phone.trim(), "GB")) {
      newErrors.phone =
        "Please enter a valid UK phone number (e.g. 07123 456789 or +44 7123 456789)";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !validator.isEmail(formData.email.trim(), {
        require_tld: true,
        allow_ip_domain: false,
      })
    ) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.service) newErrors.service = "Service is required";
    if (!formData.details.trim()) newErrors.details = "Details are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;
      const serviceLabel = serviceMap.get(formData.service) ?? formData.service;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          phone: formData.phone,
          contact_number: formData.phone,
          email: formData.email,
          postcode: formData.postcode || "N/A",
          service: serviceLabel,
          service_id: formData.service,
          service_label: serviceLabel,
          details: formData.details,
          submitted_at: new Date().toLocaleString("en-GB"),
          page_url: typeof window !== "undefined" ? window.location.href : "",
        },
        { publicKey: PUBLIC_KEY },
      );
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeModal();
      }, 2000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSubmitError("Something went wrong. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showSection && (
        <section id="quote-form" className="py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div
                className={`mb-14 text-center ${
                  mounted ? "reveal-on-scroll" : ""
                }`}
              >
                <h2 className="heading-precision text-3xl sm:text-4xl font-extralight tracking-[0.16em] text-[#0a0a0a] uppercase mb-5">
                  Request a Quote
                </h2>
                <p className="text-sm text-[#1a1a1a] font-light leading-relaxed tracking-[0.02em]">
                  Select your service and postcode to get started with
                  London&apos;s premium trade team.
                </p>
              </div>

              <div
                className={`border border-[#0a0a0a]/[0.08] bg-white p-6 sm:p-8 ${
                  mounted ? "reveal-on-scroll" : ""
                }`}
                style={{ animationDelay: "100ms" }}
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr_auto] md:items-center">
                  <div className="flex items-center gap-3 border border-[#0a0a0a]/[0.12] bg-white px-4 py-2.5 focus-within:border-[#0a0a0a]/[0.2] transition-colors">
                    <Search className="h-4 w-4 text-[#0a0a0a]/50" />
                    <select
                      value={barService}
                      onChange={(e) => setBarService(e.target.value)}
                      className="h-9 w-full bg-transparent text-sm text-[#0a0a0a] outline-none cursor-pointer appearance-none font-light"
                    >
                      <option value="" className="bg-white">
                        I need help with...
                      </option>
                      {serviceOptions.map((o) => (
                        <option
                          key={o.value}
                          value={o.value}
                          className="bg-white text-[#0a0a0a]"
                        >
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3 border border-[#0a0a0a]/[0.12] bg-white px-4 py-2.5 focus-within:border-[#0a0a0a]/[0.2] transition-colors">
                    <Target className="h-4 w-4 text-[#0a0a0a]/50" />
                    <Input
                      value={barPostcode}
                      onChange={(e) => setBarPostcode(e.target.value)}
                      placeholder="Enter postcode"
                      className="h-9 border-0 px-0 shadow-none bg-transparent text-sm text-[#0a0a0a] placeholder:text-[#1a1a1a] focus-visible:ring-0 font-light"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={openFromBar}
                    size="lg"
                    className="w-full uppercase tracking-[0.1em] border-[#0a0a0a]/12 hover:border-[#0a0a0a]/20 bg-white text-[#0a0a0a] hover:bg-white"
                  >
                    Request Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-[#0a0a0a]/70 backdrop-blur-sm animate-in fade-in duration-300"
            onMouseDown={closeModal}
          />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-hidden bg-white shadow-[0_24px_48px_rgba(0,0,0,0.12)] animate-in zoom-in-95 fade-in duration-300 flex flex-col border border-[#0a0a0a]/[0.08]">
            {/* Simplified Modal Header */}
            <div className="relative bg-white px-6 py-5 border-b border-[#0a0a0a]/[0.06] shrink-0 flex items-center justify-between">
              <h3 className="text-xl font-light tracking-[0.08em] text-[#0a0a0a] uppercase">
                Request a Quote
              </h3>
              <button
                onClick={closeModal}
                className="inline-flex size-9 items-center justify-center border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/20 hover:bg-[#f8f8f8] text-[#0a0a0a]/70 hover:text-[#0a0a0a] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 focus-visible:ring-offset-1 rounded-none"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto grow bg-white p-6">
              {isSuccess ? (
                <div className="rounded-none p-8 text-center">
                  <div className="h-16 w-16 rounded-none bg-[#0a0a0a] flex items-center justify-center mx-auto mb-6 border border-[#0a0a0a]/20">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-light text-[#0a0a0a] mb-3 tracking-[0.08em] uppercase">
                    Request Sent
                  </h4>
                  <p className="text-[#1a1a1a] text-sm font-extralight">
                    We will review your request and will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="h-11 rounded-none border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] text-sm px-4 focus:ring-[#0a0a0a]/30 focus:border-[#0a0a0a]/30 font-light"
                      />
                      {errors.name && (
                        <p className="text-[10px] font-light text-red-600 uppercase tracking-wider mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="phone"
                        className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="07400 123456"
                        className="h-11 rounded-none border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] text-sm px-4 focus:ring-[#0a0a0a]/30 focus:border-[#0a0a0a]/30 font-light"
                      />
                      {errors.phone && (
                        <p className="text-[10px] font-light text-red-600 uppercase tracking-wider mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="h-11 rounded-none border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] text-sm px-4 focus:ring-[#0a0a0a]/30 focus:border-[#0a0a0a]/30 font-light"
                      />
                      {errors.email && (
                        <p className="text-[10px] font-light text-red-600 uppercase tracking-wider mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="postcode"
                        className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]"
                      >
                        Postcode
                      </Label>
                      <Input
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        placeholder="SW1A 1AA"
                        className="h-11 rounded-none border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] text-sm px-4 focus:ring-[#0a0a0a]/30 focus:border-[#0a0a0a]/30 font-light"
                      />
                    </div>

                    <div className="space-y-1.5" ref={selectRef}>
                      <Label
                        htmlFor="service"
                        className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]"
                      >
                        Service Required
                      </Label>
                      <input
                        type="hidden"
                        name="service"
                        value={formData.service}
                      />
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setSelectOpen(!selectOpen)}
                          className={`w-full h-11 flex items-center justify-between border text-left text-sm px-4 font-light transition-all outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 focus-visible:ring-offset-1 rounded-none bg-white text-[#0a0a0a] border-[#0a0a0a]/12 hover:border-[#0a0a0a]/20 ${
                            selectOpen
                              ? "border-[#0a0a0a]/25 ring-1 ring-[#0a0a0a]/15"
                              : ""
                          } ${errors.service ? "border-red-400/50" : ""}`}
                          aria-expanded={selectOpen}
                          aria-haspopup="listbox"
                        >
                          <span
                            className={
                              formData.service ? "" : "text-[#1a1a1a]/60"
                            }
                          >
                            {formData.service
                              ? serviceMap.get(formData.service)
                              : "Select a service"}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-[#0a0a0a]/50 transition-transform ${
                              selectOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {selectOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-[#0a0a0a]/20 rounded-none shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-h-60 overflow-auto">
                            {serviceOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() =>
                                  handleServiceSelect(option.value)
                                }
                                className={`w-full text-left px-4 py-2.5 text-sm font-light text-[#0a0a0a] border-b border-[#0a0a0a]/6 last:border-0 hover:bg-[#f8f8f8] transition-colors ${
                                  formData.service === option.value
                                    ? "bg-[#f5f5f5]"
                                    : ""
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.service && (
                        <p className="text-[10px] font-light text-red-600 uppercase tracking-wider mt-1">
                          {errors.service}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="details"
                        className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]"
                      >
                        Issue Details
                      </Label>
                      <textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe the problem..."
                        className="w-full rounded-none border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] text-sm p-4 focus:ring-[#0a0a0a]/30 focus:border-[#0a0a0a]/30 outline-none resize-none font-light"
                      />
                      {errors.details && (
                        <p className="text-[10px] font-light text-red-600 uppercase tracking-wider mt-1">
                          {errors.details}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 space-y-4">
                    {submitError && (
                      <p className="text-[10px] font-light text-red-600 uppercase tracking-wider">
                        {submitError}
                      </p>
                    )}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      className="w-full uppercase tracking-[0.1em] border-[#0a0a0a] bg-[#0a0a0a] hover:bg-[#1a1a1a] hover:border-[#1a1a1a] text-white"
                    >
                      {isSubmitting
                        ? "Sending..."
                        : "Send Quote Reqadjasndoadsuest"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
