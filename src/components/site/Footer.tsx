import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

const quickLinks: { label: string; to: string; hash?: string }[] = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Debt Solutions", to: "/", hash: "debt-solutions" },
  { label: "Make an Enquiry", to: "/enquiry" },
];

const legalLinks = [
  { label: "About Us", to: "/about" },
  { label: "Privacy Policy", to: "/legal" },
  { label: "Complaints Policy", to: "/legal" },
  { label: "Vulnerable Customer Policy", to: "/legal" },
  { label: "Contact Us", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 lg:px-8">
        <div className="space-y-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest font-display text-base text-forest-foreground">
              S
            </span>
            <span className="truncate font-display text-xl">{siteConfig.name}</span>
          </div>

          <div className="space-y-1 text-sm leading-relaxed text-navy-foreground/60">
            <p className="font-medium text-navy-foreground">Company details</p>
            {siteConfig.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold tracking-wide text-navy-foreground">
            Quick Links
          </h3>
          <ul className="space-y-3.5 text-sm text-navy-foreground/70">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...(l.hash ? { hash: l.hash } : {})}
                  className="transition-colors hover:text-navy-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold tracking-wide text-navy-foreground">Legal</h3>
          <ul className="space-y-3.5 text-sm text-navy-foreground/70">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition-colors hover:text-navy-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6 space-y-3 text-sm text-navy-foreground/60">
            <li className="flex min-w-0 items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all transition-colors hover:text-navy-foreground"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex min-w-0 items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="transition-colors hover:text-navy-foreground"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-sm leading-relaxed text-navy-foreground/60">
          <p>
            You may be offered the option of being referred to an authorised and regulated firm for a
            full advice call. They will assess your circumstances and explain any debt solutions that may
            be suitable for you. There is no obligation to proceed with any arrangement, and you are free
            to seek advice or support from any provider of your choice.
          </p>
          <p>
            We do not charge you for making an enquiry or for the information provided through our service.
            If you choose to proceed with a debt solution through one of our partner firms, fees may apply
            for setting up and managing the arrangement. Any applicable fees will be explained to you before
            you decide whether to proceed.
          </p>
          <p>
            We may receive a referral fee if you choose a debt solution through one of our partner firms.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-navy-foreground/10" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 text-sm text-navy-foreground/55 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="lg:max-w-xl lg:text-right">
          We operate by amassing consumer data, which is then shared with authorised and regulated
          businesses seeking new leads for an advice call.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-navy-foreground/10" />
      </div>

      <div className="mx-auto max-w-5xl space-y-3 px-4 py-7 text-center text-xs leading-relaxed text-navy-foreground/45 sm:px-6 lg:px-8">
        <p>
          Note: If you enter into a debt solution with one of our partner companies, we will receive
          payment should we introduce you to any of these.
        </p>
        <p>
          {siteConfig.name} is the trading name of {siteConfig.companyRegisteredName}. Company
          number {siteConfig.companyNumber}. Registered office address: Suite 4.01, 4th Floor
          Capital House, 25 Chapel Street, London, England, NW1 5DH. ICO number:{" "}
          {siteConfig.icoNumber}.
        </p>
      </div>
    </footer>
  );
}
