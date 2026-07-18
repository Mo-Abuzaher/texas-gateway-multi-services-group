export type PageId =
  | "home"
  | "about"
  | "gate1"
  | "gate2"
  | "gate3"
  | "gate4"
  | "gate5"
  | "gate6"
  | "payments"
  | "terms";

export interface LinkItem {
  label: string;
  href: string;
}

export interface ServiceSeoPage {
  gateId: number;
  pageId: PageId;
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  image: string;
  imageAlt: string;
  summary: string;
  clientFit: string[];
  process: string[];
  faqs: Array<{ question: string; answer: string }>;
  externalLinks: LinkItem[];
}

export const SITE_NAME = "Texas Gateway Multi Services Group";
export const DEFAULT_SITE_URL = "https://txgatewaygroup.com";

export const SERVICE_SEO_PAGES: ServiceSeoPage[] = [
  {
    gateId: 1,
    pageId: "gate1",
    slug: "visas-immigration-services",
    title: "Visas & Immigration Services in Texas | Texas Gateway",
    metaDescription:
      "Get professional U.S. visa, green card, citizenship, NVC, adjustment of status, and USCIS correspondence support from Texas Gateway Multi Services Group.",
    h1: "Visas & Immigration Services",
    primaryKeyword: "visas and immigration services",
    secondaryKeywords: [
      "U.S. visa support",
      "green card application assistance",
      "citizenship and naturalization support",
      "NVC application process",
      "adjustment of status preparation",
      "USCIS correspondence support",
    ],
    image: "/assets/images/visas_en.png",
    imageAlt: "Visas and immigration services for U.S. applications and USCIS support",
    summary:
      "Texas Gateway Multi Services Group helps individuals, families, students, workers, and businesses organize complex U.S. immigration matters with careful document intake, form preparation support, deadline tracking, and official correspondence review.",
    clientFit: [
      "Families preparing petitions, green card files, or consular processing packages.",
      "Workers, students, visitors, investors, and employers reviewing visa pathways.",
      "Permanent residents preparing citizenship, renewal, replacement, or follow-up requests.",
      "Applicants who need organized USCIS, NVC, DOL, or consular correspondence support.",
    ],
    process: [
      "Review the immigration goal, applicant history, deadlines, and current notices.",
      "Create a document checklist mapped to the visa, green card, citizenship, or NVC process.",
      "Prepare organized filing support, evidence indexes, status tracking, and follow-up tasks.",
      "Coordinate next-step reminders for interviews, RFEs, address changes, or official responses.",
    ],
    faqs: [
      {
        question: "What immigration matters can Texas Gateway support?",
        answer:
          "We support document organization and administrative preparation for family immigration, employment-based matters, visitor and student visas, NVC processing, adjustment of status, naturalization, humanitarian filings, and USCIS follow-ups.",
      },
      {
        question: "Does Texas Gateway provide legal representation?",
        answer:
          "Texas Gateway is not a law firm and does not provide courtroom representation or licensed legal advice. When legal interpretation is required, we coordinate support around qualified attorneys or direct clients to appropriate legal counsel.",
      },
    ],
    externalLinks: [
      { label: "U.S. Department of State visa information", href: "https://travel.state.gov/content/travel/en/us-visas.html" },
      { label: "USCIS family-based immigration guidance", href: "https://www.uscis.gov/node/79813" },
      { label: "USCIS citizenship and naturalization policy", href: "https://www.uscis.gov/node/69643" },
      { label: "USCIS naturalization process overview", href: "https://my.uscis.gov/citizenship/what_to_expect" },
    ],
  },
  {
    gateId: 2,
    pageId: "gate2",
    slug: "certified-translation-language-solutions",
    title: "Certified Translation Services | Arabic-English Documents",
    metaDescription:
      "Certified Arabic-English translation services for immigration, court, academic, civil, and business documents prepared for accuracy and official review.",
    h1: "Certified Translation & Language Solutions",
    primaryKeyword: "certified translation services",
    secondaryKeywords: [
      "Arabic English translation",
      "USCIS certified translation",
      "legal document translation",
      "academic transcript translation",
      "civil certificate translation",
      "translator certification statement",
    ],
    image: "/assets/images/translation_en.png",
    imageAlt: "Certified Arabic English translation services for immigration and legal documents",
    summary:
      "Our certified translation service prepares clear, accurate, and review-ready translations for immigration files, court records, school admissions, civil certificates, and business documents.",
    clientFit: [
      "Applicants translating birth, marriage, divorce, death, police, or identity records.",
      "Students and professionals translating transcripts, diplomas, and certificates.",
      "Attorneys, businesses, and families preparing bilingual document packages.",
      "Clients who need translator accuracy statements and clean formatting.",
    ],
    process: [
      "Review source documents for legibility, stamps, names, dates, and formatting requirements.",
      "Translate the document with consistent terminology and official-name handling.",
      "Attach a translator certification statement when required for the receiving agency.",
      "Deliver a clean digital file ready for filing, printing, notarization, or apostille support.",
    ],
    faqs: [
      {
        question: "What makes a translation certified?",
        answer:
          "A certified translation includes a signed statement confirming the translator is competent to translate and that the translation is complete and accurate to the best of the translator's ability.",
      },
      {
        question: "Can translated documents be used for immigration or court filings?",
        answer:
          "Many immigration and court processes require English translations for foreign-language documents. Requirements vary by agency or court, so every package should be checked against the receiving authority's instructions.",
      },
    ],
    externalLinks: [
      { label: "EOIR certified translation filing guidance", href: "https://www.justice.gov/eoir/reference-materials/ic/chapter-3/3" },
      { label: "Texas apostille translation note", href: "https://www.sos.state.tx.us/authinfo.shtml" },
      { label: "U.S. Department of State visa forms and process", href: "https://travel.state.gov/content/travel/en/us-visas.html" },
    ],
  },
  {
    gateId: 3,
    pageId: "gate3",
    slug: "notary-apostille-attestation-services",
    title: "Notary, Apostille & Attestation Services in Texas",
    metaDescription:
      "Texas notary, apostille, authentication, and consular attestation support for personal, academic, legal, and business documents used internationally.",
    h1: "Notary & Apostille / Attestation Services",
    primaryKeyword: "notary apostille services",
    secondaryKeywords: [
      "Texas apostille services",
      "document attestation services",
      "notary public services Texas",
      "consular legalization support",
      "authentication of documents",
      "international document certification",
    ],
    image: "/assets/images/notary_en.png",
    imageAlt: "Texas notary apostille and attestation services for international documents",
    summary:
      "Texas Gateway helps clients prepare notarized documents, Texas Secretary of State apostille requests, federal authentication packages, and consular attestation workflows for cross-border use.",
    clientFit: [
      "Individuals submitting civil, academic, power of attorney, or identity documents abroad.",
      "Businesses authenticating agreements, certificates, and formation records.",
      "Families handling marriage, birth, adoption, education, or inheritance documents.",
      "Clients who need document routing, courier coordination, and status tracking.",
    ],
    process: [
      "Identify whether the document is recordable, non-recordable, state-issued, federal, or foreign.",
      "Confirm notarization, certified-copy, apostille, authentication, or consular requirements.",
      "Prepare the request package with the right certificates, attachments, and destination details.",
      "Track submission, pickup, delivery, and any embassy or agency follow-up.",
    ],
    faqs: [
      {
        question: "What is the difference between an apostille and attestation?",
        answer:
          "An apostille is commonly used for countries that participate in the Hague Apostille Convention. Attestation or legalization may involve extra state, federal, or embassy steps for countries outside that convention.",
      },
      {
        question: "Can every document receive a Texas apostille?",
        answer:
          "No. Texas generally authenticates Texas public records or properly notarized non-recordable documents. Federal documents, documents from other states, and foreign documents usually follow different authorities.",
      },
    ],
    externalLinks: [
      { label: "Texas Secretary of State apostille guidance", href: "https://www.sos.state.tx.us/authinfo.shtml" },
      { label: "Texas notary public information", href: "https://www.sos.texas.gov/statdoc/notary-public.shtml" },
      { label: "Texas notary education information", href: "https://www.sos.state.tx.us/statdoc/edinfo.shtml" },
    ],
  },
  {
    gateId: 4,
    pageId: "gate4",
    slug: "legal-support-services",
    title: "Legal Support Services for Attorneys & Clients | Texas Gateway",
    metaDescription:
      "Administrative legal support, legal research, attorney assistant services, compliant marketing support, and mediation coordination for legal projects.",
    h1: "Legal Support Services",
    primaryKeyword: "legal support services",
    secondaryKeywords: [
      "attorney assistant services",
      "legal research support",
      "paralegal administrative support",
      "law firm marketing compliance",
      "mediation coordination",
      "contract drafting support",
    ],
    image: "/assets/images/legal_en.png",
    imageAlt: "Legal support services for attorneys research documents and client coordination",
    summary:
      "Texas Gateway provides administrative legal support for licensed attorneys, law firms, community members, and business clients who need organized research, document support, compliant referrals, and case preparation assistance.",
    clientFit: [
      "Attorneys needing administrative case organization, filings, scheduling, or drafting support.",
      "Clients who need help identifying the right type of licensed legal counsel.",
      "Businesses preparing document packages, settlement files, or mediation logistics.",
      "Law firms planning compliant outreach, seminars, or client-development campaigns.",
    ],
    process: [
      "Clarify the support scope and whether licensed legal advice is required.",
      "Organize documents, deadlines, research questions, and attorney-facing deliverables.",
      "Prepare administrative drafts, research summaries, referral notes, or event plans.",
      "Maintain clear boundaries between support services and attorney-client legal advice.",
    ],
    faqs: [
      {
        question: "Are these services a substitute for hiring an attorney?",
        answer:
          "No. Legal support services do not replace licensed legal advice. We support administrative, research, referral, and coordination tasks while legal strategy and representation remain with qualified attorneys.",
      },
      {
        question: "Can Texas Gateway help law firms with marketing?",
        answer:
          "Yes, we support law firm seminars, client communication workflows, and outreach planning with attention to professional advertising and solicitation rules.",
      },
    ],
    externalLinks: [
      { label: "ABA Model Rule 7.1", href: "https://www.americanbar.org/content/aba-cms-dotorg/en/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_7_1_communication_concerning_a_lawyer_s_services/" },
      { label: "ABA Model Rules table of contents", href: "https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/model_rules_of_professional_conduct_table_of_contents/" },
      { label: "EOIR immigration court practice manual", href: "https://www.justice.gov/eoir/reference-materials/ic/chapter-3/3" },
    ],
  },
  {
    gateId: 5,
    pageId: "gate5",
    slug: "financial-services-tax-payroll-bookkeeping",
    title: "Financial Services, Tax, Payroll & Bookkeeping Support",
    metaDescription:
      "Small business financial services including tax preparation support, payroll coordination, wage tracking, bookkeeping, reconciliations, and reporting.",
    h1: "Financial Services",
    primaryKeyword: "small business financial services",
    secondaryKeywords: [
      "tax preparation support",
      "payroll services",
      "bookkeeping services",
      "small business accounting support",
      "wage compliance support",
      "monthly reconciliation",
    ],
    image: "/assets/images/financial_en.png",
    imageAlt: "Small business financial services tax payroll and bookkeeping support",
    summary:
      "Texas Gateway supports small businesses, self-employed professionals, and growing teams with organized financial administration, bookkeeping, payroll coordination, tax preparation support, and recurring reports.",
    clientFit: [
      "Small businesses that need consistent bookkeeping and transaction organization.",
      "Employers managing payroll, wage records, paystubs, and withholding information.",
      "Self-employed clients preparing organized annual tax documents.",
      "Owners who need monthly profit and loss, reconciliation, and recordkeeping support.",
    ],
    process: [
      "Review entity type, transaction volume, employee count, and filing calendar.",
      "Organize books, payroll inputs, deductions, invoices, receipts, and bank records.",
      "Prepare regular reconciliations, reports, wage summaries, and tax-ready records.",
      "Coordinate with licensed tax or accounting professionals when regulated advice is required.",
    ],
    faqs: [
      {
        question: "Do you provide bookkeeping for small businesses?",
        answer:
          "Yes. We support transaction categorization, bank reconciliation, financial report preparation, document organization, and tax-ready recordkeeping for small businesses.",
      },
      {
        question: "Can you help with payroll compliance?",
        answer:
          "We help organize payroll records, wage calculations, paystubs, and administrative compliance support. Licensed tax or accounting advice is coordinated separately when needed.",
      },
    ],
    externalLinks: [
      { label: "IRS small business and self-employed center", href: "https://www.irs.gov/businesses/small-businesses-self-employed" },
      { label: "IRS tax centers for businesses", href: "https://www.irs.gov/businesses/small-businesses-self-employed/industries-professions-and-business-tax-centers" },
      { label: "DOL Wage and Hour employer resources", href: "https://www.dol.gov/agencies/whd/employers" },
      { label: "DOL compliance assistance", href: "https://www.dol.gov/agencies/whd/compliance-assistance" },
    ],
  },
  {
    gateId: 6,
    pageId: "gate6",
    slug: "management-services-consulting",
    title: "Management Services & Consulting for Small Businesses",
    metaDescription:
      "Business management consulting, administrative systems, SOPs, workflow improvement, office support, and practical growth structures for small and midsize businesses.",
    h1: "Management Services & Consulting",
    primaryKeyword: "management services and consulting",
    secondaryKeywords: [
      "small business consulting",
      "administrative consulting",
      "SOP development",
      "workflow improvement",
      "office support services",
      "business process documentation",
    ],
    image: "/assets/images/consulting_en.png",
    imageAlt: "Management services and consulting for small business organization and operations",
    summary:
      "Texas Gateway helps small and midsize businesses build practical operating systems, improve daily workflows, document policies, organize records, and strengthen management routines for sustainable growth.",
    clientFit: [
      "Business owners who need clearer roles, reporting lines, and operational structure.",
      "Teams with undocumented workflows, scattered files, or inconsistent daily processes.",
      "Startups preparing employee handbooks, SOPs, and administrative systems.",
      "Growing businesses that need office support, task tracking, and productivity routines.",
    ],
    process: [
      "Assess current workflows, roles, records, policies, and operational bottlenecks.",
      "Design a practical management structure with clear priorities and responsibilities.",
      "Document SOPs, office routines, recordkeeping rules, and daily execution plans.",
      "Review adoption, adjust processes, and provide ongoing administrative support.",
    ],
    faqs: [
      {
        question: "What does management consulting include?",
        answer:
          "Our management consulting includes administrative assessments, workflow improvement, SOP development, policy documentation, role clarity, record organization, office support, and practical growth planning.",
      },
      {
        question: "Is this service only for large companies?",
        answer:
          "No. The service is built for small and midsize businesses that need affordable, practical structure without a complex enterprise consulting process.",
      },
    ],
    externalLinks: [
      { label: "SBA business guide", href: "https://www.sba.gov/business-guide" },
      { label: "DOL resources for employers", href: "https://www.dol.gov/agencies/whd/employers" },
      { label: "IRS small business center", href: "https://www.irs.gov/businesses/small-businesses-self-employed" },
    ],
  },
];

export const BASE_PAGE_META: Record<Exclude<PageId, "gate1" | "gate2" | "gate3" | "gate4" | "gate5" | "gate6">, { title: string; metaDescription: string; path: string }> = {
  home: {
    title: "Texas Gateway Multi Services Group | Six Professional Service Gates",
    metaDescription:
      "Texas Gateway Multi Services Group provides visas and immigration, certified translation, notary and apostille, legal support, financial services, and management consulting.",
    path: "/",
  },
  about: {
    title: "About Texas Gateway Multi Services Group",
    metaDescription:
      "Meet Texas Gateway Multi Services Group and learn about its professional multi-service advisory approach for individuals, families, and small businesses.",
    path: "/about",
  },
  payments: {
    title: "Payment Methods | Texas Gateway Multi Services Group",
    metaDescription:
      "Review payment methods for Texas Gateway Multi Services Group services, including local, national, and international payment options.",
    path: "/payments",
  },
  terms: {
    title: "Terms, Policies & Service Conditions | Texas Gateway",
    metaDescription:
      "Read Texas Gateway Multi Services Group terms, privacy, refund, confidentiality, service, and limited liability policies.",
    path: "/terms",
  },
};

export const getServiceByPageId = (pageId: PageId) =>
  SERVICE_SEO_PAGES.find((service) => service.pageId === pageId);

export const getServiceByGateId = (gateId: number) =>
  SERVICE_SEO_PAGES.find((service) => service.gateId === gateId);

export const getServiceBySlug = (slug: string) =>
  SERVICE_SEO_PAGES.find((service) => service.slug === slug);

export const getPathForPage = (pageId: PageId) => {
  const service = getServiceByPageId(pageId);
  if (service) return `/services/${service.slug}`;
  return BASE_PAGE_META[pageId as keyof typeof BASE_PAGE_META]?.path || "/";
};

export const getPageFromPath = (pathname: string): PageId => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  if (normalizedPath === "/") return "home";
  if (normalizedPath === "/about") return "about";
  if (normalizedPath === "/payments") return "payments";
  if (normalizedPath === "/terms") return "terms";

  const serviceMatch = normalizedPath.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    return getServiceBySlug(serviceMatch[1])?.pageId || "home";
  }

  return "home";
};

export const getMetaForPage = (pageId: PageId) => {
  const service = getServiceByPageId(pageId);
  if (service) {
    return {
      title: service.title,
      metaDescription: service.metaDescription,
      path: `/services/${service.slug}`,
      image: service.image,
      keywords: [service.primaryKeyword, ...service.secondaryKeywords],
      service,
    };
  }

  const baseMeta = BASE_PAGE_META[pageId as keyof typeof BASE_PAGE_META] || BASE_PAGE_META.home;
  return {
    ...baseMeta,
    image: "/assets/images/tx_multi_services_group-320.webp",
    keywords: [
      "Texas Gateway Multi Services Group",
      "multi services Texas",
      "visas and immigration services",
      "certified translation services",
      "notary apostille services",
      "small business consulting",
    ],
  };
};

export const buildCanonicalUrl = (pathValue: string, siteUrl = DEFAULT_SITE_URL) => {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, "");
  return `${cleanSiteUrl}${pathValue.startsWith("/") ? pathValue : `/${pathValue}`}`;
};

export const buildServiceJsonLd = (service: ServiceSeoPage, siteUrl = DEFAULT_SITE_URL) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.h1,
  serviceType: service.primaryKeyword,
  description: service.metaDescription,
  provider: {
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: siteUrl,
    telephone: "+1-832-407-2608",
    areaServed: "Texas",
    address: {
      "@type": "PostalAddress",
      addressRegion: "TX",
      addressCountry: "US",
    },
  },
  url: buildCanonicalUrl(`/services/${service.slug}`, siteUrl),
  image: buildCanonicalUrl(service.image, siteUrl),
  keywords: [service.primaryKeyword, ...service.secondaryKeywords].join(", "),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${service.h1} offerings`,
    itemListElement: service.clientFit.map((item, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: item,
      },
    })),
  },
  mainEntity: service.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const buildOrganizationJsonLd = (siteUrl = DEFAULT_SITE_URL) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  url: siteUrl,
  telephone: "+1-832-407-2608",
  email: "abuzaherkhaled@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "TX",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.instagram.com/khaled.m.abuzaher/",
    "https://www.facebook.com/profile.php?id=61562957950735",
    "https://www.linkedin.com/in/khaledabuzaher/",
  ],
});
