"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serviceOptions } from "@/lib/data";
import { CheckCircle2, Search, Target, X, ChevronDown } from "lucide-react";

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

export function openVoracQuoteModal(detail?: Partial<Pick<FormData, "service" | "postcode">>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("vorac:open-quote", { detail }));
}

export const QuoteForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    if (!formData.phone.trim()) newErrors.phone = "Contact number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.service) newErrors.service = "Service is required";
    if (!formData.details.trim()) newErrors.details = "Details are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      closeModal();
    }, 2000);
  };

  return (
    <section id="quote-form" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className={`mb-16 text-center ${mounted ? "reveal-on-scroll" : ""}`}>
            <h2 className="heading-precision text-4xl sm:text-6xl font-thin tracking-[0.16em] text-[#0a0a0a] uppercase mb-6">
              Request a Quote
            </h2>
            <p className="text-base text-[#1a1a1a] font-light leading-relaxed">
              Select your service and postcode to get started with London&apos;s premium trade team.
            </p>
          </div>

          <div className={`rounded-none border border-[#0a0a0a]/20 pearl-surface p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)] ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr_auto] md:items-center">
              <div className="flex items-center gap-3 rounded-none border border-[#0a0a0a]/20 bg-white px-5 py-3 focus-within:border-[#0a0a0a]/30 transition-all duration-200">
                <Search className="h-4 w-4 text-[#0a0a0a]/50" />
                <select
                  value={barService}
                  onChange={(e) => setBarService(e.target.value)}
                  className="h-9 w-full bg-transparent text-sm text-[#0a0a0a] outline-none cursor-pointer appearance-none font-light"
                >
                  <option value="" className="bg-white">I need help with...</option>
                  {serviceOptions.map((o) => (
                    <option key={o.value} value={o.value} className="bg-white text-[#0a0a0a]">{o.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 rounded-none border border-[#0a0a0a]/20 bg-white px-5 py-3 focus-within:border-[#0a0a0a]/30 transition-all duration-200">
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
                className="btn-precision h-12 w-full rounded-none bg-white text-[#0a0a0a] hover:bg-[#f8f8f8] font-light px-8 text-xs tracking-[0.08em] uppercase border border-[#0a0a0a]/20 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              >
                Request Quote
              </Button>
            </div>

          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0a0a]/70 backdrop-blur-sm animate-in fade-in duration-300" onMouseDown={closeModal} />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-hidden rounded-none pearl-surface shadow-2xl animate-in zoom-in-95 fade-in duration-300 flex flex-col border border-[#0a0a0a]/20">
            
            {/* Simplified Modal Header */}
            <div className="relative bg-white px-6 py-5 border-b border-[#0a0a0a]/8 shrink-0 flex items-center justify-between">
              <h3 className="text-xl font-light tracking-[0.08em] text-[#0a0a0a] uppercase">Request a Quote</h3>
              <button 
                onClick={closeModal} 
                className="rounded-none p-2 text-[#0a0a0a]/50 hover:text-[#0a0a0a] hover:bg-[#f8f8f8] transition-all border border-transparent hover:border-[#0a0a0a]/20"
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
                  <h4 className="text-2xl font-light text-[#0a0a0a] mb-3 tracking-[0.08em] uppercase">Request Sent</h4>
                  <p className="text-[#1a1a1a] text-sm font-extralight">We&apos;ll be in touch within 60 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="John Doe" 
                        className="h-11 rounded-none border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] text-sm px-4 focus:ring-[#0a0a0a]/30 focus:border-[#0a0a0a]/30 font-light" 
                      />
                      {errors.name && <p className="text-[10px] font-light text-red-600 uppercase tracking-wider mt-1">{errors.name}</p>}
                    </div>
                    
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="07400 123456" 
                        className="h-11 rounded-none border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] text-sm px-4 focus:ring-[#0a0a0a]/30 focus:border-[#0a0a0a]/30 font-light" 
                      />
                      {errors.phone && <p className="text-[10px] font-light text-red-600 uppercase tracking-wider mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="john@example.com" 
                        className="h-11 rounded-none border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] text-sm px-4 focus:ring-[#0a0a0a]/30 focus:border-[#0a0a0a]/30 font-light" 
                      />
                      {errors.email && <p className="text-[10px] font-light text-red-600 uppercase tracking-wider mt-1">{errors.email}</p>}
                    </div>
                    
                    <div className="space-y-1.5">
                      <Label htmlFor="postcode" className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]">Postcode</Label>
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
                      <Label htmlFor="service" className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]">Service Required</Label>
                      <input type="hidden" name="service" value={formData.service} />
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setSelectOpen(!selectOpen)}
                          className={`w-full h-11 rounded-none border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] text-sm px-4 flex items-center justify-between font-light transition-all ${
                            selectOpen ? 'border-[#0a0a0a]/20 ring-1 ring-[#0a0a0a]/20' : 'hover:border-[#0a0a0a]/20'
                          } ${errors.service ? 'border-red-500/50' : ''}`}
                          aria-expanded={selectOpen}
                          aria-haspopup="listbox"
                        >
                          <span className={formData.service ? '' : 'text-[#1a1a1a]/60'}>
                            {formData.service ? serviceMap.get(formData.service) : 'Select a service'}
                          </span>
                          <ChevronDown className={`h-4 w-4 text-[#0a0a0a]/50 transition-transform ${selectOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {selectOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-[#0a0a0a]/20 rounded-none shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-h-60 overflow-auto">
                            {serviceOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleServiceSelect(option.value)}
                                className={`w-full text-left px-4 py-2.5 text-sm font-light text-[#0a0a0a] hover:bg-[#f8f8f8] transition-colors ${
                                  formData.service === option.value ? 'bg-[#f8f8f8]' : ''
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.service && <p className="text-[10px] font-light text-red-600 uppercase tracking-wider mt-1">{errors.service}</p>}
                    </div>
                    
                    <div className="space-y-1.5">
                      <Label htmlFor="details" className="text-[10px] font-light uppercase tracking-[0.16em] text-[#1a1a1a]">Issue Details</Label>
                      <textarea 
                        id="details" 
                        name="details" 
                        value={formData.details} 
                        onChange={handleChange} 
                        rows={4} 
                        placeholder="Describe the problem..." 
                        className="w-full rounded-none border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] text-sm p-4 focus:ring-[#0a0a0a]/30 focus:border-[#0a0a0a]/30 outline-none resize-none font-light" 
                      />
                      {errors.details && <p className="text-[10px] font-light text-red-600 uppercase tracking-wider mt-1">{errors.details}</p>}
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="btn-precision w-full h-11 rounded-none bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] font-light text-sm tracking-[0.08em] uppercase active:scale-95 disabled:opacity-50 transition-all border border-[#0a0a0a]/20"
                    >
                      {isSubmitting ? "Sending..." : "Send Quote Request"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
