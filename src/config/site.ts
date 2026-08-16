export const siteConfig = {
  name: "Square Up Any Debt",
  tagline: "Struggling With Debt? See What Options May Be Available",

  whatsappNumber: "447549562812", // international format, no + or spaces
  phoneDisplay: "+44 7549 562812",
  phone: "+447549562812",
  email: "info@squareupanydebt.co.uk",
  privacyEmail: "info@squareupanydebt.co.uk",
  companyNumber: "13625905",
  icoNumber: "ZB213646",
  companyRegisteredName: "Paprika Lead Generation Solutions Ltd",
  address: [
    "Paprika Lead Generation Solutions Ltd",
    "Company number: 13625905",
    "Registered in England",
    "Registered address: Suite 4.01, 4th Floor Capital House, 25 Chapel Street, London, England, NW1 5DH",
    "ICO number: ZB213646",
  ],
} as const;

export const whatsappLink = (
  message = "Hello, I'd like to talk about my debt options.",
) => `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const navLinks: { label: string; to: string; hash?: string }[] = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Debt Solutions", to: "/", hash: "debt-solutions" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const features = [
  {
    icon: "heart",
    title: "Understanding & Support",
    body: "We understand that formal debt help can be a difficult step to take. Our role is simply to connect you with regulated partners.",
  },
  {
    icon: "shield",
    title: "FCA-Regulated Partners",
    body: "We only refer enquiries to firms that are authorised and regulated by the Financial Conduct Authority.",
  },
  {
    icon: "leaf",
    title: "No Judgement",
    body: "Millions of people in the UK are dealing with problem debt. It's a common situation, and it can be handled with dignity.",
  },
] as const;

export const steps = [
  {
    title: "Submit an Enquiry",
    body: "Complete our short form with your basic details.",
  },
  {
    title: "Get Connected",
    body: "Where appropriate, we may connect you with an FCA-authorised debt advice partner.",
  },
  {
    title: "Speak to an Adviser",
    body: "An authorised partner will discuss your circumstances and available options.",
  },
] as const;


export const solutions = [
  {
    title: "Individual Voluntary Arrangement (IVA)",
    body: "A formal, legally binding agreement to repay an affordable amount of your creditors over a fixed term — typically five or six years — after which any remaining qualifying debt can be written off.",
  },
  {
    title: "Debt Management Plan (DMP)",
    body: "An informal arrangement, set up through a licensed provider, where your debts are paid at a reduced monthly rate that is distributed between your creditors based on what you can afford.",
  },
  {
    title: "Debt Relief Order (DRO)",
    body: "A statutory option aimed at people with low income, few assets and a relatively small level of debt. Where it's appropriate, qualifying debts can be written off after a set period.",
  },
  {
    title: "Bankruptcy",
    body: "A formal insolvency procedure that can write off most unsecured debts, but which has significant long-term consequences and should only be considered with regulated advice.",
  },
  {
    title: "Trust Deed (Scotland)",
    body: "A Scottish alternative to an IVA, where a formal arrangement between you and your creditors is put in place for a defined period — usually a minimum of four years — before being discharged.",
  },
  {
    title: "Debt Arrangement Scheme (DAS)",
    body: "The Scottish government's statutory debt-payment programme, allowing you to repay what you owe over an extended period with interest and charges normally frozen.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "I was anxious about even typing it out. The person they connected me with was kind, professional and explained every option clearly. Huge weight off my shoulders.",
    name: "Sarah M.",
    role: "Manchester",
  },
  {
    quote:
      "No fuss, no pressure and completely confidential. Within a day I was speaking to a regulated adviser who walked me through what was actually suitable for me.",
    name: "James D.",
    role: "Birmingham",
  },
  {
    quote:
      "Polite, careful and nobody spoke to me like a number. They pass you over to someone who's FCA-regulated and it's all very calm and quiet.",
    name: "Aoife T.",
    role: "Glasgow",
  },
] as const;

export const faqs = [
  {
    q: "1 - What if I don’t know who I owe money to?",
    a: "That’s okay. With your permission, an authorised firm may carry out a soft credit search to help understand your circumstances. This won’t affect your credit score or be visible to other lenders. As not all debts appear on credit reports, you may still need to provide additional details.",
  },
  {
    q: "2 - Will it cost me anything to make an enquiry?",
    a: "No. Making an enquiry through our website is completely free.\n\nWe don’t provide regulated debt advice ourselves. With your consent, we may introduce you to an authorised and regulated firm who can discuss your circumstances and available options.\n\nIf you choose to proceed with a solution, we may receive a referral fee. There’s no obligation to proceed, and you can access free, impartial guidance from MoneyHelper at any time.",
  },
  {
    q: "3 - What debt solutions might be available to me?",
    a: "A regulated adviser may discuss options such as an IVA, Debt Management Plan, Debt Relief Order, Bankruptcy, Trust Deed (Scotland), or Sequestration (Scotland), depending on your circumstances and where you live.\n\nA regulated adviser will assess your situation and explain which options may be suitable, including any eligibility requirements, risks, and costs, before you decide whether to proceed.",
  },
  {
    q: "4 - Do you cover the whole UK?",
    a: "Yes. Our partners can talk to people across England, Wales, Scotland and Northern Ireland — including Scotland-specific options like Trust Deeds and Sequestration where relevant.",
  },
  {
    q: "5 - How quickly will someone get back to me?",
    a: "A member of our team or an authorised partner may contact you as soon as possible after you submit your enquiry. Response times can vary, but we aim to make the process straightforward and keep you informed.",
  },
] as const;


export const employmentOptions = [
  "Employed full-time",
  "Employed part-time",
  "Self-employed",
  "Unemployed",
  "Retired",
  "Student",
  "Unable to work",
] as const;

export const debtLevelOptions = [
  "Under £5,000",
  "£5,000 – £10,000",
  "£10,000 – £20,000",
  "£20,000 – £30,000",
  "£30,000 – £50,000",
  "Over £50,000",
] as const;
