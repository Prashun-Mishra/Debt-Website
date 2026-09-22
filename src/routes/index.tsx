import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  CtaBand,
  Faq,
  Features,
  Hero,
  HowItWorks,
  Solutions,
  WhatsAppFab,
} from "@/components/site/sections";
import { MoneyHelperBanner, MoneyHelperStrip, RegulatoryNotice } from "@/components/site/RegulatoryNotice";

const title = "Square Up Any Debt | Free UK Debt Enquiry Service";
const description =
  "A calmer conversation about your debt. We connect you with regulated partners who can discuss UK debt solutions — no judgement, no pressure.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MoneyHelperBanner />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Solutions />
        <Faq />
        <CtaBand />
        <MoneyHelperStrip />
        <RegulatoryNotice />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
