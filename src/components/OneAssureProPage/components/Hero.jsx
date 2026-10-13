import HeroImpact from "@/components/OneAssureProPage/components/HeroImpact";
import HeroProof from "@/components/OneAssureProPage/components/HeroProof";
import { Button } from "@/components/UI/Button";
import { BodySmall, HeadingMedium } from "@/components/UI/Typography";
import { cn } from "@/lib/utils";

const insurers = [
  { name: "HDFC ERGO", src: "/insurer-logos/01-logo-hdfc-22e6758170.png" },
  { name: "Star Health", src: "/insurer-logos/03-star-logo-27881f1158.png" },
  { name: "Care", src: "/insurer-logos/21-logo-care-health-insurance-2c0265102e.svg" },
  { name: "LIC", src: "/insurer-logos/26-lic-logo-4c4bf55bdf.png" },
  { name: "Niva Bupa", src: "/insurer-logos/08-thumbnail-niva-health-insurance-logo-a32bd384cc.png" },
];

const fieldClass =
  "h-12 w-full min-w-0 rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-1100 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-neutral-500 focus:border-primary-800 focus:ring-2 focus:ring-primary-800/15";

export default function Hero() {
  return (
    <div
      id="hero"
      className="relative h-fit w-full -mt-24 pt-36 pb-16 md:left-1/2 md:w-screen md:-translate-x-1/2 md:-mt-31.5 md:pt-43.5 md:pb-24 lg:-mt-31 lg:pt-43"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/pro-hero-background.jpg)",
            filter: "blur(24px)",
            transform: "scale(1.06)",
          }}
        />
      </div>

      <div className="relative z-1 mx-auto grid w-full max-w-6xl items-stretch gap-8 px-6 md:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] md:gap-x-14 lg:px-2">
        <div className="flex min-w-0 flex-col md:h-full">
          <p className="text-[0.7rem] tracking-[0.22em] text-primary-800 uppercase">
            Certified advice · No fees · No pressure
          </p>
          <h1 className="mt-3 max-w-lg text-[2rem] leading-[1.15] font-medium tracking-tight text-neutral-1100 md:text-[2.75rem] md:leading-[1.12]">
            Not sure what cover to buy?
            <span className="mt-1 block text-primary-800">
              Talk to an expert first.
            </span>
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-800">
            Unbiased guidance from a certified insurance expert, before you
            buy and after you claim.
          </p>
          <HeroProof />
          <HeroImpact />
        </div>

        <form
          className="z-5 flex h-full w-full min-w-0 flex-col rounded-3xl bg-white px-6 py-6 shadow-lg md:px-7 md:py-7"
          onSubmit={(event) => event.preventDefault()}
        >
          <HeadingMedium as="h2" className="text-neutral-1100" weight="medium">
            Book your free call
          </HeadingMedium>
          <BodySmall className="mt-1 text-neutral-700">
            Share a few details. A certified expert calls you back.
          </BodySmall>

          <label className="mt-5 block text-sm font-medium text-neutral-1100">
            Your name
            <input
              type="text"
              name="name"
              autoComplete="name"
              className={cn(fieldClass, "mt-1.5")}
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-neutral-1100">
            Mobile number
            <span className="mt-1.5 flex h-12 overflow-hidden rounded-xl border border-neutral-300 transition-[border-color,box-shadow] duration-200 focus-within:border-primary-800 focus-within:ring-2 focus-within:ring-primary-800/15">
              <span className="flex items-center border-r border-neutral-300 bg-primary-50 px-3 text-sm text-neutral-800">
                +91
              </span>
              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="10-digit mobile number"
                className="min-w-0 flex-1 bg-white px-3 text-base text-neutral-1100 outline-none placeholder:text-neutral-500"
              />
            </span>
          </label>

          <label className="mt-4 block text-sm font-medium text-neutral-1100">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              className={cn(fieldClass, "mt-1.5")}
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-neutral-1100">
            What do you need
            <select
              name="need"
              defaultValue="What do you need"
              className={cn(fieldClass, "mt-1.5")}
            >
              <option value="What do you need">What do you need</option>
              <option value="Policy Review">Policy Review</option>
              <option value="Personalized Recommendation">
                Personalized Recommendation
              </option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="Term Insurance">Term Insurance</option>
            </select>
          </label>

          <Button
            type="submit"
            className="mt-5 h-12 w-full rounded-xl text-base hover:scale-100"
          >
            Book my free call
          </Button>

          <div className="min-h-5 flex-1" />
          <div className="border-t border-neutral-200 pt-5">
            <p className="text-[0.7rem] tracking-[0.16em] text-neutral-700 uppercase">
              Compared across
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              {insurers.map((insurer) => (
                <img
                  key={insurer.name}
                  src={insurer.src}
                  alt={insurer.name}
                  className="h-6 w-auto max-w-16 object-contain"
                />
              ))}
              <p className="shrink-0 text-xs text-neutral-700">30+</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
