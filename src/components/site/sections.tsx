import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Heart,
  Leaf,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Shield,
  Star,
} from "lucide-react";
import { useState } from "react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import howItWorksImg from "@/assets/how-it-works.jpg";
import { Reveal } from "@/components/site/Reveal";
import { MoneyHelperLink } from "@/components/site/RegulatoryNotice";
import { faqs, features, solutions, steps, whatsappLink } from "@/config/site";

/* ---------------- Shared bits ---------------- */

export function CoralButton({
  children,
  to,
  className = "",
}: {
  children: React.ReactNode;
  to: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-coral px-5 py-3 text-sm font-medium text-coral-foreground transition-colors hover:bg-coral-hover ${className}`}
    >
      {children}
    </Link>
  );
}

export function WhatsAppLinkButton({
  variant = "outline",
  className = "",
}: {
  variant?: "outline" | "solid";
  className?: string;
}) {
  const styles =
    variant === "solid"
      ? "bg-whatsapp text-forest-foreground hover:bg-whatsapp-hover"
      : "border border-hairline bg-background text-foreground hover:bg-cream";
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors ${styles} ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      Chat on WhatsApp
    </a>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-whatsapp text-forest-foreground shadow-[var(--shadow-float)] transition-colors hover:bg-whatsapp-hover"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}

/* ---------------- Hero ---------------- */

const trustPoints = ["No obligation to proceed", "Confidential & no-pressure", "Free enquiry service"];

export function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20 lg:px-8">
        <div>
          <h1 className="text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-[3.4rem]">
            <span className="text-forest">Struggling With Debt?</span> See What Options May Be Available
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Get free debt advice from <MoneyHelperLink />.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            You may have options that could make managing your finances easier. Connect with a regulated adviser to discuss your circumstances and understand what support may be available.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            If you would like to make an enquiry with us, CLICK DEBT HELP and we can explain what happens next. A member of our team will take the time to understand your situation and collect some initial information before connecting you with the right support.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CoralButton to="/enquiry">
              DEBT HELP
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CoralButton>
            <WhatsAppLinkButton />
          </div>
          <div className="mt-4 max-w-xl space-y-1.5 text-[11px] leading-relaxed text-muted-foreground">
            <p>
              A debt solution may not be suitable for everyone. Fees may apply and entering into a debt solution can affect your credit file and ability to obtain credit. You should consider all available options before deciding whether to proceed.
            </p>
            <p>
              Free, impartial debt advice is available. You can get free, impartial and not-for-profit debt advice from{" "}
              <MoneyHelperLink />{" "}
              before deciding whether to use a commercial debt solution.
            </p>
          </div>
        </div>




        <div className="relative">
          <img
            src={heroPortrait}
            alt="A woman smiling after speaking to a regulated debt adviser"
            width={912}
            height={1104}
            className="aspect-[4/3] w-full rounded-2xl object-cover object-top shadow-[var(--shadow-soft)] sm:aspect-[5/4] lg:aspect-[4/3]"
          />
          <div className="absolute right-3 top-3 flex items-center gap-2 rounded-xl bg-background/95 px-3 py-2 shadow-[var(--shadow-float)] sm:right-4 sm:top-4">
            <div className="flex -space-x-2" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-6 w-6 rounded-full border-2 border-background bg-cream-deep"
                />
              ))}
            </div>
            <div className="leading-tight">
              <span className="flex text-coral" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </span>
              <span className="text-[10px] text-muted-foreground">Rated by real people</span>
            </div>
          </div>

        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <ul className="grid divide-y divide-hairline overflow-hidden rounded-xl border border-hairline bg-cream/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {trustPoints.map((t) => (
            <li
              key={t}
              className="flex items-center justify-center gap-2.5 px-4 py-4 text-center text-sm text-foreground"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-forest/40 bg-background">
                <Check className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>

  );
}

/* ---------------- (TrustBand removed for FCA compliance) ---------------- */

/* ---------------- Why people choose us ---------------- */

const featureIcons = { heart: Heart, shield: Shield, leaf: Leaf } as const;

export function Features() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="eyebrow">Why people choose us</p>
        <h2 className="mt-3 max-w-lg text-3xl leading-tight text-foreground sm:text-4xl">
          <span className="text-forest">No judgement. No pressure.</span>
          <br className="hidden sm:block" /> Just help understanding your debt options and what you can do next.
        </h2>


        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = featureIcons[f.icon];
            const filled = i === 1;
            return (
              <Reveal
                as="article"
                key={f.title}
                delay={i * 90}
                className={`group card-lift rounded-xl border p-6 ${
                  filled
                    ? "border-forest bg-forest text-forest-foreground"
                    : "border-hairline bg-cream hover:border-forest/30"
                }`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                    filled ? "bg-forest-foreground/10" : "bg-background"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${filled ? "text-forest-foreground" : "text-forest"}`}
                    aria-hidden="true"
                  />
                </span>
                <h3 className={`mt-5 text-lg font-semibold ${filled ? "text-forest-foreground" : "text-foreground"}`}>
                  {f.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    filled ? "text-forest-foreground/75" : "text-muted-foreground"
                  }`}
                >
                  {f.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <img
          src={howItWorksImg}
          alt="A regulated adviser preparing to discuss debt options"
          width={1200}
          height={1008}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
        />
        <div>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
            A simple <span className="text-forest">three-step journey</span>
            <br className="hidden sm:block" /> towards understanding your options.
          </h2>

          <ol className="mt-8 space-y-6">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="flex gap-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest text-xs text-forest-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Link
            to="/how-it-works"
            className="mt-8 inline-flex items-center gap-2 text-sm text-forest underline-offset-4 hover:underline"
          >
            Learn more about the process
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Debt solutions ---------------- */

export function Solutions() {
  return (
    <section id="debt-solutions" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="eyebrow">UK debt solutions</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <h2 className="max-w-lg text-3xl leading-tight text-foreground sm:text-4xl">
            Options a <span className="text-forest">regulated adviser</span>
            <br className="hidden sm:block" /> may discuss.
          </h2>
          <Link
            to="/enquiry"
            className="inline-flex items-center gap-2 text-sm text-forest underline-offset-4 hover:underline"
          >
            View all solutions
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal
              as="article"
              key={s.title}
              delay={i * 70}
              className="group relative bg-background p-6 transition-colors duration-300 hover:bg-cream"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-coral transition-transform duration-300 group-hover:scale-x-100" />
              <h3 className="font-display text-lg font-semibold tracking-tight text-forest">
                {s.title}
                <span className="mt-2 block h-0.5 w-10 rounded-full bg-coral/70 transition-all duration-300 group-hover:w-16" />
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-forest opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Discuss this option
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Every solution has different eligibility criteria, costs and consequences. Only an
          FCA-authorised and regulated adviser can confirm which option, if any, may be suitable for
          your circumstances.
        </p>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20 text-center">
        <p className="eyebrow">Frequently asked</p>
        <h2 className="mt-3 text-center text-3xl text-foreground sm:text-4xl">
          <span className="text-forest">Frequently Asked</span> Questions
        </h2>


        <div className="mt-10 divide-y divide-hairline border-y border-hairline">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 text-left"
                  >
                    <span className="min-w-0 font-medium text-foreground sm:text-base">{f.q}</span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    )}
                  </button>
                </h3>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {f.a.split("\n\n").map((para, idx) => (
                      <p
                        key={idx}
                        className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

export function CtaBand() {
  return (
    <section className="bg-forest">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-display text-3xl italic text-forest-foreground sm:text-4xl lg:text-5xl">
          When you're ready, we're here.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-forest-foreground/75 sm:text-base">
          Send a short, confidential enquiry and we’ll connect you with a regulated partner who can explain your options, with no pressure or obligation.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CoralButton to="/enquiry">
            Make an Enquiry
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CoralButton>
          <a
            href="tel:+447700900123"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-forest-foreground/25 px-5 py-3 text-sm font-medium text-forest-foreground transition-colors hover:bg-forest-dark"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            +44 7700 900123
          </a>
        </div>
        <div className="mx-auto mt-5 max-w-xl space-y-1.5 text-[11px] leading-relaxed text-forest-foreground/80">
          <p>
            A debt solution may not be suitable for everyone. Fees may apply and entering into a debt solution can affect your credit file and ability to obtain credit. You should consider all available options before deciding whether to proceed.
          </p>
          <p>
            Free, impartial debt advice is available. You can get free, impartial and not-for-profit debt advice from{" "}
            <MoneyHelperLink />{" "}
            before deciding whether to use a commercial debt solution.
          </p>
        </div>
      </div>
    </section>
  );
}
