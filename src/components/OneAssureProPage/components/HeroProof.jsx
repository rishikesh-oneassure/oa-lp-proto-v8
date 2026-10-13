import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const BEAT_MS = 5600;

const beats = [
  {
    kicker: "01",
    label: "Review",
    title: "Free policy review",
    body: "Already have a policy? We walk you through what it really covers, flag the gaps and exclusions, and tell you honestly whether to stay with it or move.",
  },
  {
    kicker: "02",
    label: "Advice",
    title: "A recommendation with a reason",
    body: "Plans matched to your family, health and budget, with a clear reason behind every pick.",
  },
  {
    kicker: "03",
    label: "Claims",
    title: "Someone stays for the claim",
    body: "A dedicated claims team stays with you for as long as you hold the policy, from filing to insurer follow-ups.",
  },
];

export default function HeroProof({ className }) {
  const rootRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const frozen = reduceMotion || held || !inView;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (frozen) return undefined;
    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % beats.length);
    }, BEAT_MS);
    return () => window.clearTimeout(id);
  }, [frozen, index]);

  return (
    <div
      ref={rootRef}
      className={cn("mt-8", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="What OneAssure offers"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
      }}
    >
      <div className="flex border-b border-primary-800/15">
        {beats.map((beat, beatIndex) => {
          const active = beatIndex === index;
          return (
            <button
              key={beat.kicker}
              type="button"
              onClick={() => setIndex(beatIndex)}
              aria-current={active ? "true" : undefined}
              className={cn(
                "relative min-h-11 flex-1 cursor-pointer pb-3 text-center transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-800 md:pb-4",
                beatIndex === 0 && "text-left",
                beatIndex === beats.length - 1 && "text-right",
                active ? "text-neutral-1100" : "text-neutral-500 hover:text-neutral-800",
              )}
            >
              <span className="block text-[0.65rem] tracking-[0.18em] text-primary-800">
                {beat.kicker}
              </span>
              <span className="mt-1 block text-sm font-medium md:text-base">
                {beat.label}
              </span>
              <span
                className={cn(
                  "absolute right-0 -bottom-px left-0 h-px transition-colors duration-300",
                  active ? "bg-primary-800" : "bg-transparent",
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid">
        {beats.map((beat, beatIndex) => {
          const active = beatIndex === index;
          return (
            <article
              key={beat.kicker}
              className={cn(
                "col-start-1 row-start-1 max-w-xl",
                active ? "pitch-play z-10" : "pointer-events-none invisible",
              )}
              aria-hidden={!active}
            >
              <h2
                className="pitch-item text-xl leading-tight font-medium tracking-tight text-neutral-1100 md:text-2xl"
                style={{ animationDelay: "40ms" }}
              >
                {beat.title}
              </h2>
              <p
                className="pitch-item mt-2 text-sm leading-relaxed text-neutral-800 md:text-base"
                style={{ animationDelay: "120ms" }}
              >
                {beat.body}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
