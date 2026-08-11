import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/sections";
import { RegulatoryNotice } from "@/components/site/RegulatoryNotice";
import { siteConfig } from "@/config/site";

const title = "Legal & Policies | Square Up Any Debt";
const description =
  "Privacy policy, terms, complaints procedure and vulnerable customer policy for Square Up Any Debt, a UK debt enquiry lead provider.";

export const Route = createFileRoute("/legal")({
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
  component: LegalPage,
});

const sections = [
  {
    h: "Privacy policy",
    p: "We collect only the details you give us in the enquiry form. Those details are used to pass your enquiry to FCA-authorised and regulated partners, and are processed in line with UK GDPR. You can ask us to remove your data at any time.",
  },
  {
    h: "Terms & conditions",
    p: "This website is an enquiry service only. We do not provide debt advice, debt counselling or debt adjusting, and nothing on this site should be treated as a personal recommendation.",
  },
  {
    h: "Vulnerable customer policy",
    p: "We recognise that people contacting us may be in vulnerable circumstances. We keep our process short and low-pressure, and only work with partners who have their own vulnerable customer procedures in place.",
  },
  {
    h: "Complaints procedure",
    p: "If you are unhappy with our service, please contact us and we will acknowledge your complaint within five working days and aim to resolve it within eight weeks.",
  },
];

function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-cream">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
            <p className="eyebrow">Legal</p>
            <h1 className="mt-3 text-4xl text-foreground sm:text-5xl">Legal & policies</h1>
          </div>
        </section>
        <section className="bg-background">
          <div className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-2xl text-foreground">{s.h}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
              </div>
            ))}
            <p className="text-sm text-muted-foreground">
              For any privacy request, email{" "}
              <a
                href={`mailto:${siteConfig.privacyEmail}`}
                className="text-forest underline underline-offset-4"
              >
                {siteConfig.privacyEmail}
              </a>
              .
            </p>
          </div>
        </section>
        <RegulatoryNotice />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
