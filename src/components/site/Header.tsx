import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { navLinks, siteConfig, whatsappLink } from "@/config/site";

function BrandMark() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest font-display text-sm text-forest-foreground">
        S
      </span>
      <span className="truncate font-display text-lg text-foreground sm:text-xl">
        {siteConfig.name}
      </span>
    </Link>
  );
}

function NavItem({
  label,
  to,
  hash,
  onClick,
}: {
  label: string;
  to: string;
  hash?: string | undefined;
  onClick?: (() => void) | undefined;
}) {
  return (
    <Link
      to={to}
      {...(hash ? { hash } : {})}
      onClick={onClick}
      className="text-sm text-muted-foreground transition-colors hover:text-forest"
      activeProps={{ className: "text-sm text-forest" }}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <BrandMark />

        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-7" aria-label="Main">
            {navLinks.map((l) => (
              <NavItem key={l.label} label={l.label} to={l.to} hash={l.hash} />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-whatsapp px-3.5 py-2 text-sm font-medium text-forest-foreground transition-colors hover:bg-whatsapp-hover"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <Link
              to="/enquiry"
              className="inline-flex items-center rounded-md bg-coral px-3.5 py-2 text-sm font-medium text-coral-foreground transition-colors hover:bg-coral-hover"
            >
              Make an Enquiry
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline text-foreground lg:hidden"
        >
          {open ? <Menu className="h-5 w-5 hidden" /> : null}
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-hairline bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6" aria-label="Mobile">
            {navLinks.map((l) => (
              <NavItem
                key={l.label}
                label={l.label}
                to={l.to}
                hash={l.hash}
                onClick={() => setOpen(false)}
              />
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-4 py-2.5 text-sm font-medium text-forest-foreground"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
              <Link
                to="/enquiry"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-md bg-coral px-4 py-2.5 text-sm font-medium text-coral-foreground"
              >
                Make an Enquiry
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
