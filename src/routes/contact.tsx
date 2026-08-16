import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CoralButton, WhatsAppLinkButton, WhatsAppFab } from "@/components/site/sections";
import { RegulatoryNotice } from "@/components/site/RegulatoryNotice";
import { siteConfig } from "@/config/site";

const title = "Contact Us | Square Up Any Debt";
const description =
  "Contact Square Up Any Debt by email, phone or WhatsApp, or submit a short confidential enquiry to be connected with FCA-authorised and regulated partners.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-cream">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
            <p className="eyebrow">Contact</p>
            <h1 className="mt-3 text-4xl text-foreground sm:text-5xl">
              We're <span className="text-forest">Easy to Reach.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Whether you'd like to start an enquiry or simply ask a question first, you can contact
              us in whichever way feels most comfortable.
            </p>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-hairline bg-cream p-6">
                <Mail className="h-5 w-5 text-forest" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-semibold text-foreground">Email</h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 block break-all text-sm text-muted-foreground hover:text-forest"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="rounded-xl border border-hairline bg-cream p-6">
                <Phone className="h-5 w-5 text-forest" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-semibold text-foreground">Phone</h2>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="mt-2 block text-sm text-muted-foreground hover:text-forest"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-hairline bg-background p-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-forest inline-block" />
                Our Office
              </h2>
              <address className="mt-2 text-sm not-italic leading-relaxed text-muted-foreground">
                Suite 4.01, 4th Floor Capital House, 25 Chapel Street, London, England, NW1 5DH
              </address>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CoralButton to="/enquiry">Make an Enquiry</CoralButton>
              <WhatsAppLinkButton />
            </div>
          </div>
        </section>

        <RegulatoryNotice />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
