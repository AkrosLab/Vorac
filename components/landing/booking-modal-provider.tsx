"use client";

import { useState, useEffect } from "react";
import { BookingModal, openVoracBookingModal } from "@/components/landing/booking-modal";

/**
 * Provides the booking modal globally and listens for "vorac:open-booking".
 * Include once in the root layout so "Make a Booking" works on every page.
 */
export function BookingModalProvider() {
  const [open, setOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handler = () => {
      setTriggerElement(document.activeElement as HTMLElement | null);
      setOpen(true);
    };
    window.addEventListener("vorac:open-booking", handler);
    return () => window.removeEventListener("vorac:open-booking", handler);
  }, []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setTriggerElement(null);
  };

  return (
    <BookingModal
      open={open}
      onOpenChange={handleOpenChange}
      triggerElement={triggerElement}
    />
  );
}

export { openVoracBookingModal };
