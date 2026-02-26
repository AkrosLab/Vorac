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
  const [pauseTimeout, setPauseTimeout] = useState<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef(0);
  const positionRef = useRef(0); // Use ref for smooth animation without state updates
  const isPausedRef = useRef(false);

  // Create infinite loop by duplicating testimonials
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const cardWidth = 420;
  const centerOffset = testimonials.length * cardWidth;
  
  // Autoplay settings - much slower and smoother
  const baseSpeed = 0.025; // Much slower constant drift (reduced by ~70%)
  const maxSpeed = 0.04; // Hard cap for readability (reduced by ~70%)
  const pauseZone = 40; // Pixels around center where we slow down

  // Sync refs with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    setMounted(true);
    positionRef.current = centerOffset;
    setPosition(centerOffset);
    lastTimeRef.current = performance.now();
    
    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only init and cleanup; centerOffset is constant, pauseTimeout is cleared in cleanup
  }, []);

  // Continuous autoplay animation - optimized for performance
  useEffect(() => {
    let animationId: number | undefined;
    let lastUpdateTime = 0;
    const updateInterval = 1000 / 30; // 30fps for better performance

    const animate = (currentTime: number) => {
      // Skip frame calculation when paused to save CPU
      if (isPausedRef.current) {
        animationId = requestAnimationFrame(animate);
        rafRef.current = animationId;
        return;
      }

      const shouldUpdateState = currentTime - lastUpdateTime >= updateInterval;
      
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
        animationId = requestAnimationFrame(animate);
        rafRef.current = animationId;
        return;
      }

      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16.67, 1.5);
      lastTimeRef.current = currentTime;

      let currentPosition = positionRef.current;
      
      // Calculate distance to nearest center
      const centerCardIndex = Math.round(currentPosition / cardWidth);
      const targetCenter = centerCardIndex * cardWidth;
      const distanceToCenter = Math.abs(currentPosition - targetCenter);
      
      // Slow down in pause zone
      let speed = baseSpeed;
      if (distanceToCenter < pauseZone) {
        const slowdownFactor = distanceToCenter / pauseZone;
        speed = baseSpeed * (0.25 + slowdownFactor * 0.75);
      }
      
      speed = Math.min(speed, maxSpeed);
      
      // Update position
      currentPosition += speed * deltaTime * 60;
      
      // Handle infinite loop
      const totalWidth = testimonials.length * cardWidth;
      if (currentPosition >= totalWidth * 2) {
        currentPosition -= totalWidth;
      } else if (currentPosition < totalWidth) {
        currentPosition += totalWidth;
      }
      
      positionRef.current = currentPosition;
      
      // Update state less frequently to reduce re-renders
      if (shouldUpdateState) {
        setPosition(currentPosition);
        lastUpdateTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
      rafRef.current = animationId;
    };

    // Start animation only if not paused
    if (!isPausedRef.current) {
      lastTimeRef.current = performance.now();
      animationId = requestAnimationFrame(animate);
      rafRef.current = animationId;
    }
    
    return () => {
      if (animationId !== undefined) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  // Resume autoplay after interaction pause
  const resumeAutoplay = useCallback(() => {
    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
    }
    const timeout = setTimeout(() => {
      setIsPaused(false);
    }, 2000); // Resume after 2 seconds of inactivity
    setPauseTimeout(timeout);
  }, [pauseTimeout]);

  // Calculate 3D transform - subtle depth, no blur
  const getCardTransform = (index: number, basePosition: number) => {
    const cardPosition = index * cardWidth;
    const distance = cardPosition - basePosition;
    
    // Normalize distance for calculations
    let normalizedDistance = distance;
    const halfWidth = (testimonials.length * cardWidth) / 2;
    if (normalizedDistance > halfWidth) normalizedDistance -= testimonials.length * cardWidth;
    if (normalizedDistance < -halfWidth) normalizedDistance += testimonials.length * cardWidth;

    // Subtle 3D rotation for film-reel effect
    const rotationY = normalizedDistance * -0.015;
    const rotationZ = normalizedDistance * 0.001;
    
    // Gentle depth and scale - no blur
    const depth = normalizedDistance * -0.1;
    const scale = 1 - Math.abs(normalizedDistance) * 0.0004;
    const clampedScale = Math.max(0.90, Math.min(1, scale));
    
    // Minimal opacity variation - all cards remain readable
    const opacity = 1 - Math.abs(normalizedDistance) * 0.0005;
    const clampedOpacity = Math.max(0.7, Math.min(1, opacity));

    return {
      transform: `translate3d(${distance}px, 0, ${depth}px) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg) scale(${clampedScale})`,
      opacity: clampedOpacity,
      filter: "none", // No blur - all cards sharp
      zIndex: Math.round(100 - Math.abs(normalizedDistance)),
    };
  };

  // Scroll wheel support - pause and resume
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    setIsPaused(true);
    const delta = e.deltaY * 0.08; // Reduced sensitivity
    const newPos = positionRef.current + delta;
    const totalWidth = testimonials.length * cardWidth;
    let wrappedPosition = newPos;
    if (wrappedPosition >= totalWidth * 2) {
      wrappedPosition -= totalWidth;
    } else if (wrappedPosition < totalWidth) {
      wrappedPosition += totalWidth;
    }
    
    positionRef.current = wrappedPosition;
    setPosition(wrappedPosition);
    resumeAutoplay();
  }, [resumeAutoplay]);

  // Find center card index - use positionRef for accuracy
  const centerCardIndex = Math.round(positionRef.current / cardWidth);
  const activeIndex = centerCardIndex % testimonials.length;

  return (
    <section id="reviews" className="relative py-32 sm:py-40 overflow-hidden">
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
        <div className={`mx-auto max-w-3xl text-center mb-20 ${mounted ? "reveal-on-scroll" : ""}`}>
          <h2 className="text-[48px] sm:text-[64px] lg:text-[72px] font-thin tracking-[0.28em] text-[#0a0a0a] uppercase mb-6">
            Our Reputation
          </h2>
          <div className="inline-flex items-center gap-4 bg-white border border-[#0a0a0a]/10 px-6 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
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
          {/* Reel Track */}
          <div
            ref={sliderRef}
            className="relative h-[500px] sm:h-[550px] flex items-center justify-center select-none"
            onWheel={handleWheel}
            style={{
              touchAction: "pan-y pinch-zoom",
            }}
          >
            {infiniteTestimonials.map((testimonial, index) => {
              const transforms = getCardTransform(index, positionRef.current);
              const isActive = index === centerCardIndex;

              return (
              <div
                key={`${testimonial.id}-${index}`}
                className="absolute"
                style={{
                  ...transforms,
                  transition: "none",
                  willChange: Math.abs(index - centerCardIndex) <= 2 ? "transform" : "auto",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                  {/* Review Card */}
                  <div
                    className={`relative w-[380px] sm:w-[420px] bg-white border border-[#0a0a0a]/12 rounded-sm p-8 sm:p-10 ${
                      isActive 
                        ? "shadow-[0_12px_48px_rgba(0,0,0,0.12)]" 
                        : "shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                    }`}
                  >
                    {/* Star Rating */}
                    <div className="mb-6">
                      <StarRating rating={testimonial.rating} />
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="mb-8">
                      <p className="text-base sm:text-lg leading-relaxed text-[#1a1a1a] font-light italic">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                    </blockquote>

                    {/* Customer Info */}
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

                    {/* Focus Indicator */}
                    {isActive && (
                      <div
                        className="absolute inset-0 border border-[#0a0a0a]/8 rounded-sm pointer-events-none"
                        style={{
                          boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.03)",
                          opacity: mounted ? 1 : 0,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const targetPosition = (centerOffset + (index - activeIndex) * cardWidth);
                  positionRef.current = targetPosition;
                  setPosition(targetPosition);
                  setIsPaused(true);
                  resumeAutoplay();
                }}
                className={`relative transition-all duration-600 ${
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
