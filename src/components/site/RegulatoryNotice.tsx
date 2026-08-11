import { Info } from "lucide-react";

export function RegulatoryNotice() {
  return (
    <section className="bg-cream-deep/70">
      <div className="mx-auto flex max-w-5xl gap-3 px-4 py-6 sm:px-6 lg:px-8">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div className="space-y-1 text-xs leading-relaxed text-muted-foreground">
          <p>
            We are a lead provider and pass enquiries to companies authorised and regulated by the
            Financial Conduct Authority. We do not provide debt advice ourselves.
          </p>
          <p className="text-coral">
            A debt solution may not be suitable in every situation, and fees may apply. Free,
            impartial guidance is also available from MoneyHelper.
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
        <p className="font-display text-lg text-navy-foreground">
          Free advice is available from{" "}
          <span className="font-sans text-xl font-bold tracking-tight">
            <span className="text-[#3d5afe]">Money</span>
            <span className="text-[#e4007c]">Helper</span>
          </span>
        </p>

        <p className="mt-3 text-xs leading-relaxed text-navy-foreground/55">
          You can get free, independent and impartial debt advice from MoneyHelper, StepChange or
          Citizens Advice. You do not have to use a commercial provider, and you should always
          compare your options before making a decision about your money.
        </p>
      </div>
    </section>
  );
}
