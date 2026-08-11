# Square Up Any Debt — pixel-faithful recreation

Recreate the site exactly as shown in the two screenshots: long homepage plus a Make an Enquiry page. No redesign — same sections, order, colours, typography, cards, buttons, footer.

## Design tokens (from the screenshots)

- Deep forest green (headers/CTA band/logo), cream/off-white section backgrounds, white cards, coral/orange primary button, dark navy footer, hairline borders, very soft shadows.
- Serif display for headings (with italic emphasis on "your debt"), clean sans-serif for body/UI.
- All values added as semantic tokens in `src/styles.css` — no hardcoded colour classes in components.

## Homepage (`/`), sections in screenshot order

1. Header — brand mark + "Square Up Any Debt", nav (Home, How It Works, Debt Solutions, About Us, Contact), green WhatsApp button, coral "Make an Enquiry" button; hamburger sheet on mobile keeping both actions visible.
2. Hero — serif heading "A calmer conversation about *your debt.*", supporting paragraph, two CTAs, rounded portrait photo with floating review card and "verified" chip, small trust indicators row beneath.
3. Green FCA trust band with the cookie/privacy notice bar overlapping it (Accept / Essentials only), plus the floating WhatsApp bubble.
4. "Why people choose us" — "A quieter, kinder way to ask for help." with three cards (Understanding & Support, FCA-Regulated Partners, No Judgement); middle card is the dark green filled variant.
5. "How it works" — photo left, "Three quiet steps to a regulated conversation." right with numbered circular steps (Submit Enquiry, We Take Your Details, Partner Contact) and a "Learn more about the process" link.
6. Debt solutions — "Options a regulated adviser may discuss." with a 3x2 card grid (IVA, DMP, DRO, Bankruptcy, Trust Deed (Scotland), Debt Arrangement Scheme), "View all solutions" link, and the small-print line under the grid.
7. Testimonials — "Real people, real relief." with three quote cards: avatar, name, role, star rating.
8. FAQ — "Your questions, answered." accordion, first item open by default, subtle expand animation and the same plus/dot indicator.
9. Final CTA — dark green band, "When you're ready, we're here.", coral "Make an Enquiry" + outlined phone/WhatsApp button.
10. Disclaimer strip — navy panel with the MoneyHelper line, then the cream regulatory/lead-provider notice.
11. Footer — brand block with company details, Quick Links, Legal, contact info, copyright row and the fine-print legal paragraph block. Columns stack on mobile.

## Enquiry page (`/enquiry`)

Same header/footer. Centred "Make an Enquiry" heading, supporting text, cream card containing: Full Name, Phone Number, Email Address, Postcode (text inputs with the screenshot placeholders), Employment Status and Approximate Level of Debt (selects), consent checkbox with the three bullet statements, coral "Submit Enquiry →" button. Below the card: the regulatory notice strip.

Validation with react-hook-form + zod: required fields, UK mobile format, email, UK postcode regex, selects chosen, consent ticked. Inline field-level messages in the reference's muted red; on success the card is replaced by an in-page confirmation panel (no alert). Frontend-only — no backend/storage unless you want submissions saved later.

## Other routes

- How It Works and Debt Solutions scroll to their homepage sections.
- About Us and Contact get their own pages built from the same design language (About: mission/regulatory positioning; Contact: details + WhatsApp + enquiry CTA), since neither is in the screenshots.

## Technical

- Central `src/config/site.ts`: company name, WhatsApp number (used to build `https://wa.me/...` links everywhere), email, phone, address, nav links, and content arrays for solutions/testimonials/FAQ/steps.
- Reusable components: Header, Footer, Section, Button variants (coral, whatsapp, outline), FeatureCard, StepList, SolutionCard, TestimonialCard, FaqAccordion, CtaBand, RegulatoryNotice, EnquiryForm.
- Hero and how-it-works photos generated as matching professional stock-style imagery.
- Responsive checks at 320/375/390/768/1024/1440, no horizontal scroll; per-route SEO head metadata; accessible labels, focus states and keyboard-operable accordion/menu.
- Final step: screenshot the built pages with Playwright and compare against both references, adjusting spacing/type/colour until close.
