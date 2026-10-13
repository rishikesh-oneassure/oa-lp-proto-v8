import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { LiaHandshake, LiaUserCheckSolid } from "react-icons/lia";

const SCENE_MS = 5000;

const services = [
  {
    title: "Free Policy Review",
    description:
      "Already have a policy? We walk you through what it really covers, flag the gaps and exclusions, and tell you honestly whether to stay with it or move.",
    Icon: HiOutlineDocumentCheck,
  },
  {
    title: "Personalised Recommendation",
    description:
      "Plans matched to your family, health and budget, with a clear reason behind every pick.",
    Icon: LiaUserCheckSolid,
  },
  {
    title: "Lifetime Dedicated Claims Support",
    description:
      "Our dedicated claims team stays with you for as long as you hold the policy, from filing to insurer follow-ups and escalations.",
    Icon: LiaHandshake,
  },
];

export default function HeroServices({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % services.length);
    }, SCENE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      className={cn(
        "relative grid overflow-hidden rounded-2xl bg-primary-800 shadow-lg",
        className,
      )}
      aria-label="What you get with OneAssure"
    >
      {services.map((service, serviceIndex) => {
        const active = serviceIndex === index;
        const Icon = service.Icon;

        return (
          <div
            key={service.title}
            className={cn(
              "col-start-1 row-start-1 flex flex-col px-6 pt-6 pb-12 transition-opacity duration-500 ease-out md:px-7 md:pt-7",
              active ? "pitch-play z-10 opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={!active}
          >
            <div className="flex items-start gap-3">
              <span
                className="pitch-item flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15"
                style={{ animationDelay: "40ms" }}
              >
                <Icon className="h-6 w-6 text-white" />
              </span>
              <div className="min-w-0">
                <h3
                  className="pitch-item text-xl font-semibold tracking-tight text-white"
                  style={{ animationDelay: "80ms" }}
                >
                  {service.title}
                </h3>
                <p
                  className="pitch-item mt-2 text-sm leading-relaxed text-white/80 md:text-base"
                  style={{ animationDelay: "160ms" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-1.5">
        {services.map((service, serviceIndex) => (
          <button
            key={service.title}
            type="button"
            aria-label={service.title}
            aria-current={serviceIndex === index ? "true" : undefined}
            onClick={() => setIndex(serviceIndex)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              serviceIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
