import { createFileRoute } from "@tanstack/react-router";
import { Heart, ShieldCheck, Eye } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaBand, WhatsAppFab } from "@/components/site/sections";
import { RegulatoryNotice } from "@/components/site/RegulatoryNotice";

const title = "About Us | Square Up Any Debt";
const description =
  "Square Up Any Debt is a UK lead provider. We pass enquiries to regulated partners who provide debt advice — we do not advise ourselves.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-cream">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20 lg:px-8">
            <p className="eyebrow">About us</p>
            <h1 className="mt-3 text-4xl text-foreground sm:text-5xl">
              Connecting People With <span className="text-forest">Trusted Financial Support</span>
            </h1>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2.5">
                <span className="h-6 w-1 rounded-full bg-forest inline-block" />
                Who We Are
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                At Square Up Any Debt, we help people experiencing financial difficulties take the first step towards finding regulated debt support. We operate as an intermediary and referral service, collecting some initial information about your circumstances and, where appropriate and with your consent, securely passing your details to an FCA-authorised and regulated firm that can carry out a full assessment and provide regulated debt advice.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Our role is simply to make the introduction clear and straightforward. Square Up Any Debt does not provide regulated debt advice. The authorised firm will assess your circumstances and, where appropriate, explain the available options, eligibility requirements, risks and any applicable fees.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You are always free to ask questions, consider your options and decide what is right for you. There is no obligation to enter into a debt solution.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2.5">
                <span className="h-6 w-1 rounded-full bg-forest inline-block" />
                Our reason for being
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Talking about money worries isn’t always easy. We make finding regulated support simpler, clearer and less overwhelming. Instead of navigating countless websites or trying to make sense of confusing financial terms, we help you take the first step towards speaking with an authorised and regulated adviser who can explain your options.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="eyebrow">Why Choose Us</p>
              <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">
                <span className="text-forest">Trusted Guidance.</span> Clear Options. A Better Way Forward.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-2xl border border-border/50 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-forest/30">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-forest-foreground">
                  <Heart className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">Empathy first</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Money worries are emotional, not just financial. Every enquiry is treated with care and understanding, never simply as a sales lead.
                </p>
              </div>
              <div className="group rounded-2xl border border-border/50 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-forest/30">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-forest-foreground">
                  <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">Regulated support</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We only refer to firms authorised and regulated by the Financial Conduct Authority.
                </p>
              </div>
              <div className="group rounded-2xl border border-border/50 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-forest/30">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-forest-foreground">
                  <Eye className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">Always transparent</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We’re upfront about what we do, what we don’t do, and how your information is handled at every stage.
                </p>
              </div>
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
