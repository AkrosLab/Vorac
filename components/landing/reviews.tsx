"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

/**
 * Continuous Autoplay Film Reel Testimonial Carousel
 * 
 * A slow, continuous, infinite film-reel style slider that moves on its own
 * with premium smoothness. Perfect readability with subtle pauses at center.
 * No hover interactions, no edge panning - just calm, continuous motion.
 */

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 transition-colors ${
            i < rating 
              ? "fill-[#0a0a0a] text-[#0a0a0a]" 
              : "fill-[#0a0a0a]/15 text-[#0a0a0a]/15"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export const Reviews = () => {
  const [mounted, setMounted] = useState(false);
  const [, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef(0);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create infinite loop by duplicating testimonials
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const cardWidth = 420;
  const gap = 24;
  const segmentWidth = testimonials.length * (cardWidth + gap);

  // Constant speed for smooth flow (no pause zone)
  const pixelsPerMs = 0.028;

  // Sync refs with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    setMounted(true);
    positionRef.current = segmentWidth;
    setPosition(segmentWidth);
    lastTimeRef.current = performance.now();
    if (trackRef.current) {
      trackRef.current.style.transform = `translate(-50%, 0) translate3d(${-segmentWidth}px, 0, 0)`;
    }
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [segmentWidth]);

  // Smooth constant flow: update track transform every frame via ref (no state throttle)
  useEffect(() => {
    let animationId: number | undefined;
    let lastUpdateTime = 0;
    const dotSyncInterval = 150; // Only sync state for dots at low frequency

    const animate = (currentTime: number) => {
      if (isPausedRef.current) {
        animationId = requestAnimationFrame(animate);
        rafRef.current = animationId;
        return;
      }

      if (lastTimeRef.current === 0) lastTimeRef.current = currentTime;
      const deltaMs = Math.min(currentTime - lastTimeRef.current, 50);
      lastTimeRef.current = currentTime;

      let currentPosition = positionRef.current + pixelsPerMs * deltaMs;

      // Infinite loop: one segment width
      if (currentPosition >= segmentWidth) currentPosition -= segmentWidth;
      if (currentPosition < 0) currentPosition += segmentWidth;
      positionRef.current = currentPosition;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate(-50%, 0) translate3d(${-currentPosition}px, 0, 0)`;
      }

      if (currentTime - lastUpdateTime >= dotSyncInterval) {
        setPosition(currentPosition);
        lastUpdateTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
      rafRef.current = animationId;
    };

    if (!isPausedRef.current) {
      lastTimeRef.current = performance.now();
      animationId = requestAnimationFrame(animate);
      rafRef.current = animationId;
    }

    return () => {
      if (animationId !== undefined) cancelAnimationFrame(animationId);
    };
  }, [isPaused, segmentWidth]);

  // Resume autoplay after interaction pause
  const resumeAutoplay = useCallback(() => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    const timeout = setTimeout(() => {
      setIsPaused(false);
    }, 2000); // Resume after 2 seconds of inactivity
    pauseTimeoutRef.current = timeout;
  }, []);

  // Scroll wheel support - pause and resume
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setIsPaused(true);
    let newPos = positionRef.current + e.deltaY * 0.08;
    if (newPos >= segmentWidth) newPos -= segmentWidth;
    if (newPos < 0) newPos += segmentWidth;
    positionRef.current = newPos;
    setPosition(newPos);
    if (trackRef.current) {
      trackRef.current.style.transform = `translate(-50%, 0) translate3d(${-newPos}px, 0, 0)`;
    }
    resumeAutoplay();
  }, [resumeAutoplay, segmentWidth]);

  const cardStep = cardWidth + gap;
  const activeIndex = Math.round(positionRef.current / cardStep) % testimonials.length;

  return (
    <section id="reviews" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Our Reputation Background Image */}
      <div className="absolute inset-0" style={{ transform: 'scale(0.95)' }}>
        <Image
          src="/images/services background image.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={85}
        />
        {/* Top and bottom fade gradients */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #fafafa 0%, transparent 15%, transparent 85%, #fafafa 100%)'
          }}
        />
      </div>
      
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className={`mx-auto max-w-3xl text-center mb-16 ${mounted ? "reveal-on-scroll" : ""}`}>
          <h2 className="section-title text-[40px] sm:text-[56px] lg:text-[64px] tracking-[0.22em] mb-6">
            Our Reputation
          </h2>
          <div className="inline-flex items-center gap-4 bg-white border border-[#0a0a0a]/[0.08] px-5 py-2.5">
            <StarRating rating={5} />
            <span className="text-sm font-light text-[#0a0a0a] tracking-[0.02em]">4.8/5</span>
            <span className="h-4 w-px bg-[#0a0a0a]/20" aria-hidden="true" />
            <span className="text-xs text-[#1a1a1a] font-extralight tracking-[0.02em]">1,200+ clients</span>
          </div>
        </div>

        {/* Continuous Film Reel Container */}
        <div
          ref={containerRef}
          className="relative"
          style={{
            perspective: "1800px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Smooth sliding track - transform updated every frame via ref */}
          <div
            ref={sliderRef}
            className="relative h-[500px] sm:h-[550px] overflow-hidden select-none flex items-center"
            onWheel={handleWheel}
            style={{ touchAction: "pan-y pinch-zoom" }}
          >
            <div
              ref={trackRef}
              className="absolute left-1/2 flex items-center gap-6 will-change-transform"
              style={{
                transform: `translate(-50%, 0) translate3d(${-positionRef.current}px, 0, 0)`,
              }}
            >
              {infiniteTestimonials.map((testimonial, index) => {
                const centerTrackIndex = Math.round(positionRef.current / cardStep) % infiniteTestimonials.length;
                const isActive = index === centerTrackIndex;
                return (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className="flex-shrink-0"
                    style={{ width: cardWidth }}
                  >
                    <div
                      className={`relative w-[380px] sm:w-[420px] bg-white border border-[#0a0a0a]/[0.08] p-8 sm:p-10 transition-shadow duration-300 ${
                        isActive
                          ? "shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
                          : "shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                      }`}
                    >
                      <div className="mb-6">
                        <StarRating rating={testimonial.rating} />
                      </div>
                      <blockquote className="mb-8">
                        <p className="text-base sm:text-lg leading-relaxed text-[#1a1a1a] font-light italic">
                          &ldquo;{testimonial.text}&rdquo;
                        </p>
                      </blockquote>
                      <div className="border-t border-[#0a0a0a]/8 pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-light text-[#0a0a0a] mb-1 tracking-[0.01em]">
                              {testimonial.name}
                            </p>
                            <p className="text-xs text-[#1a1a1a] font-extralight tracking-[0.02em]">
                              {testimonial.location}
                            </p>
                          </div>
                          <div className="text-[10px] font-light uppercase tracking-[0.12em] text-[#1a1a1a]/60 bg-[#0a0a0a]/5 px-3 py-1.5 rounded-sm">
                            {testimonial.service}
                          </div>
                        </div>
                      </div>
                      {isActive && mounted && (
                        <div
                          className="absolute inset-0 border border-[#0a0a0a]/8 rounded-sm pointer-events-none"
                          style={{ boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.03)" }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  let targetPosition = positionRef.current + (index - activeIndex) * cardStep;
                  if (targetPosition >= segmentWidth) targetPosition -= segmentWidth;
                  if (targetPosition < 0) targetPosition += segmentWidth;
                  positionRef.current = targetPosition;
                  setPosition(targetPosition);
                  if (trackRef.current) {
                    trackRef.current.style.transform = `translate(-50%, 0) translate3d(${-targetPosition}px, 0, 0)`;
                  }
                  setIsPaused(true);
                  resumeAutoplay();
                }}
                className={`relative transition-all duration-300 outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 focus-visible:ring-offset-2 rounded-none ${
                  index === activeIndex ? "w-10" : "w-6"
                }`}
                aria-label={`Go to review ${index + 1}`}
              >
                <div
                  className={`h-0.5 bg-[#0a0a0a] transition-all duration-600 ${
                    index === activeIndex ? "opacity-100" : "opacity-25 hover:opacity-40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
