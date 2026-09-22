import { ExternalLink, Info } from "lucide-react";

export function MoneyHelperLink({
  className = "",
  size = "normal",
}: {
  className?: string;
  size?: "normal" | "large";
}) {
  const isLarge = size === "large";
  return (
    <a
      href="https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 font-semibold text-[#3d5afe] underline underline-offset-2 hover:text-[#3d5afe]/80 ${className}`}
    >
      <span
        className={`font-sans font-bold tracking-tight ${
          isLarge ? "text-base sm:text-lg" : "text-inherit"
        }`}
      >
        <span className="text-[#3d5afe]">Money</span>
        <span className="text-[#e4007c]">Helper</span>
      </span>
      <ExternalLink
        className={`${isLarge ? "h-3.5 w-3.5" : "h-[0.9em] w-[0.9em] shrink-0"}`}
        aria-hidden="true"
      />
    </a>
  );
}

export function MoneyHelperBanner() {
  return (
    <div className="bg-[#f0f4f8] border-b border-hairline">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-2 gap-y-1 px-4 py-2.5 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        <span className="inline-flex items-center flex-wrap justify-center gap-x-1.5 gap-y-1">
          <span>Free, impartial debt advice is available.</span>
          <span>You can get free, impartial and not-for-profit debt advice from</span>{" "}
          <MoneyHelperLink size="large" />{" "}
          <span>before deciding whether to use a commercial debt solution.</span>
        </span>
      </div>
    </div>
  );
}

export function RegulatoryNotice() {
  return (
    <section className="bg-cream-deep/70">
      <div className="mx-auto flex max-w-5xl gap-3 px-4 py-6 sm:px-6 lg:px-8">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div className="space-y-1 text-xs leading-relaxed text-muted-foreground">
          <p>
            We are a lead provider and pass enquiries to companies authorised and regulated by the
            Financial Conduct Authority. We do not provide debt advice ourselves. Fees, risks, eligibility &amp; alternatives will be explained before you decide. We may receive referral fees.
          </p>
          <p className="text-coral inline-flex flex-wrap items-center gap-x-1 gap-y-0.5">
            <span>A debt solution may not be suitable in every situation, and fees may apply. Free, impartial debt advice is available. You can get free, impartial and not-for-profit debt advice from</span>{" "}
            <MoneyHelperLink />{" "}
            <span>before deciding whether to use a commercial debt solution.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function MoneyHelperStrip() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <h3 className="font-display text-xl text-navy-foreground sm:text-2xl">
          Free, impartial debt advice is available
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-navy-foreground/75 inline-flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5">
          <span>You can get free, impartial and not-for-profit debt advice from</span>{" "}
          <MoneyHelperLink />{" "}
          <span>before deciding whether to use a commercial debt solution.</span>
        </p>
      </div>
    </section>
  );
}
