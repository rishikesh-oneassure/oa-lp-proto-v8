import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { LiaHandshake } from "react-icons/lia";
import { PiScales, PiSignature, PiUserGear } from "react-icons/pi";

const SCENE_MS = 4500;

const insurerPairs = [
  [
    { name: "HDFC ERGO", src: "/insurer-sq-logos/hdfc-ergo-sq-logo.jpg" },
    { name: "Star Health", src: "/insurer-sq-logos/star-sq-logo.png" },
  ],
  [
    {
      name: "Care Health",
      src: "/insurer-sq-logos/care-sq-logo.png",
    },
    {
      name: "Niva Bupa",
      src: "/insurer-sq-logos/niva-bupa-sq-logo.png",
    },
  ],
  [
    { name: "LIC", src: "/insurer-logos/26-lic-logo-4c4bf55bdf.png" },
    {
      name: "ICICI Prudential",
      src: "/insurer-logos/29-icici-prudential-logo.png",
    },
  ],
];

const scenes = [
  {
    title: "Independent",
    body: "Plans compared across insurers",
    Icon: PiScales,
  },
  {
    title: "Personalised",
    body: "Built around your family and budget",
    Icon: PiUserGear,
  },
  {
    title: "Claims Handled With You",
    body: "Filing to insurer follow-ups",
    Icon: PiSignature,
  },
  {
    title: "Support for life",
    body: "Our dedicated claims team",
    Icon: LiaHandshake,
  },
];

const claimSteps = ["Filed", "With the insurer", "Follow-up"];
const supportPoints = ["Filing", "Insurer follow-ups", "Escalations"];
const familyPoints = [
  { label: "Family", value: "You and your parents" },
  { label: "Health", value: "What you already have" },
  { label: "Budget", value: "A premium you can keep" },
];

function InsurerMock({ pair }) {
  const rows = insurerPairs[pair % insurerPairs.length];

  return (
    <div key={pair} className="flex h-full min-h-0 flex-1 flex-col gap-2.5">
      {rows.map((row, rowIndex) => (
        <div
          key={row.name}
          className="pitch-item flex flex-1 items-center gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-[0_8px_24px_rgba(20,32,51,0.08)]"
          style={{ animationDelay: `${rowIndex * 90}ms` }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-50">
            <img src={row.src} alt="" className="h-6 w-6 object-contain" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-neutral-1100">
              {row.name}
            </span>
            <span className="mt-1.5 flex gap-1">
              <span className="h-1.5 w-12 rounded-full bg-neutral-200" />
              <span className="h-1.5 w-7 rounded-full bg-neutral-200" />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function FamilyMock() {
  return (
    <div className="pitch-item flex h-full min-h-0 flex-1 flex-col justify-between rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(20,32,51,0.08)]">
      <div className="flex flex-1 flex-col justify-between gap-3">
        {familyPoints.map((point) => (
          <div
            key={point.label}
            className="flex items-center justify-between gap-3"
          >
            <span className="text-sm font-semibold text-neutral-1100">
              {point.label}
            </span>
            <span className="truncate text-xs text-neutral-700">
              {point.value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-100">
        <div className="pitch-bar h-full w-[72%] rounded-full bg-secondary-400" />
      </div>
    </div>
  );
}

function ClaimsMock({ step }) {
  return (
    <div className="pitch-item flex h-full min-h-0 flex-1 flex-col rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(20,32,51,0.08)]">
      <p className="text-sm font-semibold text-neutral-1100">Claim filed</p>
      <div className="mt-3 flex flex-1 flex-col justify-between gap-2">
        {claimSteps.map((label, stepIndex) => {
          const active = stepIndex === step;
          return (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors duration-500",
                active
                  ? "bg-neutral-1100 text-white"
                  : "bg-neutral-50 text-neutral-800",
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  active ? "bg-white" : "bg-neutral-300",
                )}
              />
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SupportMock() {
  return (
    <div className="pitch-item flex h-full min-h-0 flex-1 flex-col rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(20,32,51,0.08)]">
      <p className="text-sm font-semibold text-neutral-1100">Still with you</p>
      <div className="mt-3 flex flex-1 flex-col justify-between gap-2.5">
        {supportPoints.map((point) => (
          <div
            key={point}
            className="flex items-center gap-2 text-sm text-neutral-900"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary-100 text-secondary-700">
              <span className="text-[11px] leading-none">✓</span>
            </span>
            {point}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroPitch({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [pair, setPair] = useState(0);
  const [claimStep, setClaimStep] = useState(0);
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
      setIndex((current) => (current + 1) % scenes.length);
    }, SCENE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || index !== 0) return undefined;
    const id = setInterval(() => {
      setPair((current) => (current + 1) % insurerPairs.length);
    }, 1800);
    return () => clearInterval(id);
  }, [index, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || index !== 2) return undefined;
    setClaimStep(0);
    const id = setInterval(() => {
      setClaimStep((current) => (current + 1) % claimSteps.length);
    }, 1200);
    return () => clearInterval(id);
  }, [index, reduceMotion]);

  return (
    <div
      className={cn(
        "relative grid overflow-hidden rounded-2xl bg-primary-800 shadow-lg",
        className,
      )}
      aria-label="Why OneAssure"
    >
      {scenes.map((scene, sceneIndex) => {
        const active = sceneIndex === index;
        const Icon = scene.Icon;

        return (
          <div
            key={scene.title}
            className={cn(
              "col-start-1 row-start-1 flex h-full flex-col px-6 pt-6 pb-12 transition-opacity duration-500 ease-out md:px-7 md:pt-7",
              active
                ? "pitch-play z-10 opacity-100"
                : "pointer-events-none opacity-0",
            )}
            aria-hidden={!active}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3
                  className="pitch-item text-2xl font-semibold tracking-tight text-white"
                  style={{ animationDelay: "40ms" }}
                >
                  {scene.title}
                </h3>
                <p
                  className="pitch-item mt-1 text-sm text-white/80 md:text-base"
                  style={{ animationDelay: "120ms" }}
                >
                  {scene.body}
                </p>
              </div>
              <span
                className="pitch-item flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 md:h-14 md:w-14"
                style={{ animationDelay: "80ms" }}
              >
                <Icon className="h-6 w-6 text-white md:h-7 md:w-7" />
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col pt-5">
              <div
                className="flex h-full min-h-0 w-full flex-1 flex-col"
                style={{ animationDelay: "200ms" }}
              >
                {sceneIndex === 0 && <InsurerMock pair={pair} />}
                {sceneIndex === 1 && <FamilyMock />}
                {sceneIndex === 2 && <ClaimsMock step={claimStep} />}
                {sceneIndex === 3 && <SupportMock />}
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-1.5">
        {scenes.map((scene, sceneIndex) => (
          <button
            key={scene.title}
            type="button"
            aria-label={scene.title}
            aria-current={sceneIndex === index ? "true" : undefined}
            onClick={() => setIndex(sceneIndex)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              sceneIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
