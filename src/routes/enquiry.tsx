import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/sections";
import { RegulatoryNotice } from "@/components/site/RegulatoryNotice";
import { EnquiryForm } from "@/components/site/EnquiryForm";

const title = "Make an Enquiry | Square Up Any Debt";
const description =
  "Complete our short, confidential form and we'll pass your details to FCA-authorised and regulated partners who can discuss your UK debt options.";

export const Route = createFileRoute("/enquiry")({
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
  component: EnquiryPage,
});

function EnquiryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-b from-cream to-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl text-foreground sm:text-5xl">Make an Enquiry</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Complete the form below and we'll pass your details to FCA-authorised and regulated
              partners who can discuss your options.
            </p>
          </div>
        </section>
        <section className="bg-background pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <EnquiryForm />
          </div>
        </section>
        <RegulatoryNotice />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
