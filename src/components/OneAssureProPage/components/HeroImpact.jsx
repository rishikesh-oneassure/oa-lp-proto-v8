import { cn } from "@/lib/utils";

const metrics = [
  {
    value: "4.9",
    suffix: "/5",
    label: "Google ratings",
  },
  {
    value: "30",
    suffix: "K+",
    label: "Lives insured",
  },
  {
    prefix: "Rs.",
    value: "1.5",
    suffix: "Cr+",
    label: "Claims filed in FY26",
  },
  {
    value: "IRDAI",
    label: "License no. 756",
  },
];

export default function HeroImpact({ className }) {
  return (
    <div className={cn("mt-8 flex flex-1 flex-col justify-end", className)}>
      <div>
        <div className="flex items-center gap-4">
          <p className="shrink-0 text-[0.65rem] tracking-[0.22em] text-primary-800 uppercase">
            Our impact
          </p>
          <span className="h-px flex-1 bg-primary-800/20" aria-hidden="true" />
        </div>

        <dl className="mt-5 grid w-full grid-cols-2 justify-items-center gap-y-7 text-center md:flex md:items-stretch md:justify-between md:gap-0 md:text-left">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "flex w-full flex-col items-center whitespace-nowrap md:w-auto md:flex-1 md:px-6",
                index === 0 && "md:items-start md:pl-0",
                index === metrics.length - 1 && "md:items-end md:pr-0 md:text-right",
                index > 0 &&
                  index < metrics.length - 1 &&
                  "md:items-center md:text-center",
                index > 0 && "md:border-l md:border-primary-800/15",
              )}
            >
              <dd className="text-[1.65rem] leading-none font-medium tracking-tight text-primary-800 md:text-[1.85rem]">
                {metric.prefix ? (
                  <span className="mr-1 align-baseline text-sm font-normal tracking-normal">
                    {metric.prefix}
                  </span>
                ) : null}
                {metric.value}
                {metric.suffix ? (
                  <span className="ml-0.5 text-base font-normal tracking-normal">
                    {metric.suffix}
                  </span>
                ) : null}
              </dd>
              <dt className="mt-2 text-[0.65rem] tracking-[0.12em] text-neutral-700 uppercase">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
