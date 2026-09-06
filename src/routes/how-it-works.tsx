import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaBand, WhatsAppFab } from "@/components/site/sections";
import { RegulatoryNotice } from "@/components/site/RegulatoryNotice";
import { Reveal } from "@/components/site/Reveal";

const title = "How It Works | Square Up Any Debt";
const description =
  "From a short enquiry form to speaking with a regulated adviser — here's exactly what to expect when you get in touch with Square Up Any Debt.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

const journey = [
  {
    title: "Tell us a little about your situation",
    body: "Our short enquiry form takes just a few minutes to complete. We’ll ask for some basic details, such as your name, contact details, postcode, employment status and an estimate of your outstanding debt. You won’t need to provide bank details or sensitive financial information at this stage.",
  },
  {
    title: "We connect you with the right support",
    body: "With your consent, your enquiry may be passed to an FCA-authorised and regulated partner who can provide debt advice. We don’t make recommendations or decide which solution is right for you — that’s something a qualified adviser will discuss with you based on your individual circumstances.",
  },
  {
    title: "Talk things through with an adviser",
    body: "An authorised adviser will get in touch, usually within one working day, to understand your situation and talk through the options that may be available. There’s no pressure to proceed, no judgement, and you’re free to stop the conversation at any time.",
  },
];

const rolePoints = [
  "We don’t provide regulated debt advice.",
  "We don’t recommend or choose a debt solution for you.",
  "We don’t decide what’s suitable for your circumstances.",
  "We may connect you with FCA-authorised and regulated firms who can provide the advice and support you need.",
];

function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-cream">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
            <p className="eyebrow">The process</p>
            <h1 className="mt-3 text-4xl text-foreground sm:text-5xl">
              How It <span className="text-forest">Works</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              We know that reaching out about debt can feel like a big step. That’s why we’ve made
              the process as simple and straightforward as possible. From completing the short form
              to speaking with a regulated adviser, here’s what you can expect.
            </p>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            {journey.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 90}
                className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8"
              >
                <div className="flex items-center gap-3 sm:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest sm:mb-3">
                    Step {i + 1}
                  </p>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest text-sm font-semibold text-forest-foreground shadow-sm">
                    {i + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h2 className="text-2xl font-semibold text-foreground">{s.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="rounded-xl border border-hairline bg-background p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2.5">
                <span className="h-6 w-1 rounded-full bg-forest inline-block" />
                Our role, explained simply
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We believe it’s important to be clear about what we do and how we can help.
              </p>
              <ul className="mt-6 space-y-3">
                {rolePoints.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Our aim is simply to make that first step easier and help you get connected with the
                right support.
              </p>
            </div>
          </div>
        </section>

        <CtaBand />
        <RegulatoryNotice />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
