import { useEffect, useState } from "react";

const STORAGE_KEY = "sua-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: "all" | "essentials") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-xl border border-hairline bg-background px-4 py-3 shadow-[var(--shadow-float)] sm:flex-row sm:items-center">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">We use cookies.</span> We use essential
          cookies to make this site work, and analytics cookies to understand how it&apos;s used. You
          can accept all or continue with essentials only. Read our privacy policy.
        </p>
        <div className="flex shrink-0 gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={() => choose("essentials")}
            className="rounded-md border border-hairline px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-cream"
          >
            Essentials only
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="rounded-md bg-forest px-3 py-1.5 text-xs text-forest-foreground transition-colors hover:bg-forest-dark"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
