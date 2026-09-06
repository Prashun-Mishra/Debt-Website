import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { debtLevelOptions, employmentOptions, siteConfig } from "@/config/site";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Values = {
  fullName: string;
  phone: string;
  email: string;
  postcode: string;
  employment: string;
  debtLevel: string;
  consent: boolean;
};

const empty: Values = {
  fullName: "",
  phone: "",
  email: "",
  postcode: "",
  employment: "",
  debtLevel: "",
  consent: false,
};

const ukPhone = /^(?:(?:\+44\s?|0)(?:\d\s?){9,10})$/;
const ukPostcode = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values) {
  const e: Partial<Record<keyof Values, string>> = {};
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  else if (v.fullName.trim().length > 100) e.fullName = "Name must be under 100 characters.";
  if (!ukPhone.test(v.phone.trim())) e.phone = "Please enter a valid UK phone number.";
  if (!emailRe.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!ukPostcode.test(v.postcode.trim())) e.postcode = "Please enter a valid UK postcode.";
  if (!v.employment) e.employment = "Please select your employment status.";
  if (!v.debtLevel) e.debtLevel = "Please select your approximate debt level.";
  if (!v.consent) e.consent = "You must agree before submitting this form.";
  return e;
}

const labelCls = "mb-1.5 block text-xs font-medium text-foreground";
const inputCls =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-forest focus:ring-2 focus:ring-forest/15";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label} <span className="text-coral">*</span>
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    try {
      // Fetch user's public IP address
      let ipAddress: string | null = null;
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        ipAddress = ipData.ip ?? null;
      } catch {
        // If IP fetch fails, continue without it
        console.warn("Could not fetch IP address");
      }

      const { error } = await supabase.from("enquiries").insert({
        full_name: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        postcode: values.postcode.trim().toUpperCase(),
        employment: values.employment,
        debt_level: values.debtLevel,
        consent: values.consent,
        ip_address: ipAddress,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        toast.error("Something went wrong. Please try again or contact us directly.");
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-hairline bg-cream p-8 text-center shadow-[var(--shadow-soft)]">
        <CheckCircle2 className="mx-auto h-8 w-8 text-forest" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Thank You — Your Enquiry is <span className="text-forest">With Us.</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We've received your details and will pass them to FCA-authorised and regulated partners.
          Someone will normally be in touch within one working day. There is no obligation to
          proceed at any stage.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Need to reach us sooner? Email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-forest underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="mx-auto max-w-xl space-y-5 rounded-xl border border-hairline bg-cream p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <Field id="fullName" label="Full Name" error={errors.fullName}>
        <input
          id="fullName"
          name="fullName"
          type="text"
          maxLength={100}
          autoComplete="name"
          placeholder="Your full name"
          className={inputCls}
          aria-invalid={!!errors.fullName}
          value={values.fullName}
          onChange={(e) => set("fullName", e.target.value)}
        />
      </Field>

      <Field id="phone" label="Phone Number" error={errors.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="07XXX XXXXXX"
          className={inputCls}
          aria-invalid={!!errors.phone}
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
      </Field>

      <Field id="email" label="Email Address" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          maxLength={255}
          autoComplete="email"
          placeholder="you@example.com"
          className={inputCls}
          aria-invalid={!!errors.email}
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </Field>

      <Field id="postcode" label="Postcode" error={errors.postcode}>
        <input
          id="postcode"
          name="postcode"
          type="text"
          maxLength={10}
          autoComplete="postal-code"
          placeholder="e.g. NW1 5DH"
          className={inputCls}
          aria-invalid={!!errors.postcode}
          value={values.postcode}
          onChange={(e) => set("postcode", e.target.value)}
        />
      </Field>

      <Field id="employment" label="Employment Status" error={errors.employment}>
        <select
          id="employment"
          name="employment"
          className={inputCls}
          aria-invalid={!!errors.employment}
          value={values.employment}
          onChange={(e) => set("employment", e.target.value)}
        >
          <option value="">Select your employment status</option>
          {employmentOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field id="debtLevel" label="Approximate Level of Debt" error={errors.debtLevel}>
        <select
          id="debtLevel"
          name="debtLevel"
          className={inputCls}
          aria-invalid={!!errors.debtLevel}
          value={values.debtLevel}
          onChange={(e) => set("debtLevel", e.target.value)}
        >
          <option value="">Select your approximate debt level</option>
          {debtLevelOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <div className="rounded-md border border-input bg-background p-4">
        <div className="flex gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--coral)]"
            aria-invalid={!!errors.consent}
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
          />
          <label htmlFor="consent" className="text-xs leading-relaxed text-foreground">
            I understand and agree that by submitting this form, I consent to:
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-muted-foreground">
              <li>My data being collected and stored by {siteConfig.name}</li>
              <li>
                My data being shared with FCA-authorised and regulated partners for the purpose of
                receiving a call about debt solutions
              </li>
              <li>Being contacted by phone, email, SMS, and WhatsApp regarding my enquiry</li>
            </ul>
          </label>
        </div>
        {errors.consent ? (
          <p className="mt-2 text-xs text-destructive">{errors.consent}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-coral px-5 py-3 text-sm font-medium text-coral-foreground transition-colors hover:bg-coral-hover disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          <>
            Submit Enquiry
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-[11px] leading-relaxed text-muted-foreground text-center">
        A debt solution may not be suitable in all circumstances. Fees may apply. Free, impartial advice is also available from{" "}
        <a href="https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-forest">MoneyHelper</a>.
      </p>
    </form>
  );
}
