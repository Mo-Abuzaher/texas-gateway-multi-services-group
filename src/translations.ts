export interface TranslationSet {
  navHome: string;
  navServices: string;
  navAboutUs: string;
  navPayments: string;
  navContact: string;
  navButton: string;
  
  heroWelcome: string;
  heroTag: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroCta: string;

  freedomTitle: string;
  freedomSub: string;
  freedomText: string;
  freedomCongrats: string;

  founderTitle: string;
  founderSub: string;
  founderBio: string;
  founderExpert: string;
  founderConsultant: string;
  founderResearcher: string;
  founderManager: string;
  founderDirectLine: string;
  founderAddress: string;
  founderEmail: string;
  founderLinkedin: string;

  statsSub: string;
  gatesTitle: string;
  gatesSub: string;
  gatesDesc: string;
  gatesClickToExpand: string;

  gate1Title: string;
  gate1Tag: string;
  gate1Desc: string;
  gate1ResidencyTitle: string;
  gate1CitizenshipTitle: string;
  gate1HumanitarianTitle: string;
  gate1EducationalTitle: string;
  gate1CorrespondenceTitle: string;
  gate1VisaTypesTitle: string;

  gate2Title: string;
  gate2Tag: string;
  gate2Desc: string;
  gate2Features: string[];

  gate3Title: string;
  gate3Tag: string;
  gate3Desc: string;
  gate3Features: string[];

  gate4Title: string;
  gate4Tag: string;
  gate4Desc: string;
  gate4AssistantTitle: string;
  gate4AssistantDesc: string;
  gate4ResearcherTitle: string;
  gate4ResearcherDesc: string;
  gate4MarketerTitle: string;
  gate4MarketerDesc: string;
  gate4EventTitle: string;
  gate4EventDesc: string;
  gate4PartnerTitle: string;
  gate4PartnerDesc: string;

  gate5Title: string;
  gate5Tag: string;
  gate5Desc: string;
  gate5TaxTitle: string;
  gate5TaxDesc: string;
  gate5PayrollTitle: string;
  gate5PayrollDesc: string;
  gate5BookkeepingTitle: string;
  gate5BookkeepingDesc: string;

  gate6Title: string;
  gate6Tag: string;
  gate6Desc: string;
  gate6ShortDesc: string;
  gate6Tagline: string;
  gate6Disclaimer: string;

  calcTitle: string;
  calcSub: string;
  calcDesc: string;
  calcHeader: string;
  calcSelectClass: string;
  calcStandard: string;
  calcWageLevel: string;
  calcWageL1: string;
  calcWageL4: string;
  calcOutputTitle: string;
  calcEstimatedApproval: string;
  calcAdjudicationWait: string;
  calcWeeks: string;
  calcRfeRisk: string;
  calcRfeElevated: string;
  calcRfeLow: string;
  calcRfeDetail: string;
  calcFootnote: string;

  faqTitle: string;
  faqSub: string;
  faqDesc: string;
  faqButton: string;

  contactTitle: string;
  contactSub: string;
  contactDesc: string;
  contactWageReview: string;
  contactWageDesc: string;
  contactTurnaround: string;
  contactTurnaroundDesc: string;
  contactFormHeader: string;
  contactFormSuccessTitle: string;
  contactFormSuccessDesc: string;
  contactFormReset: string;
  contactLabelName: string;
  contactLabelEmail: string;
  contactLabelSector: string;
  contactLabelHelp: string;
  contactFormSubmit: string;
  contactAdminInbox: string;

  statsApprovalIndex: string;
  statsCycleSpeedup: string;
  statsVisasManaged: string;
  statsCorporateSponsors: string;

  paymentsTitle: string;
  paymentsSub: string;
  paymentsDesc: string;
  paymentsLocalTitle: string;
  paymentsLocalDesc: string;
  paymentsIntlTitle: string;
  paymentsIntlDesc: string;
  paymentsZelleName: string;
  paymentsZelleDesc: string;
  paymentsBankName: string;
  paymentsBankDesc: string;
  paymentsPaypalName: string;
  paymentsPaypalDesc: string;
  paymentsWuName: string;
  paymentsWuDesc: string;
  paymentsInstruction: string;

  termsTitle: string;
  termsSub: string;
  termsIntro: string;
  termsPrivacyLabel: string;
  termsPrivacyText: string;
  termsRefundLabel: string;
  termsRefundText: string;
  termsConfidentialityLabel: string;
  termsConfidentialityText: string;
  termsServiceLabel: string;
  termsServiceText: string;
  termsLiabilityLabel: string;
  termsLiabilityText: string;
  termsNoAdviceLabel: string;
  termsNoAdviceText: string;
  termsElectronicNoticeLabel: string;
  termsElectronicNoticeText: string;
}

export const TRANSLATIONS: Record<"en" | "ar", TranslationSet> = {
  en: {
    navHome: "Home",
    navServices: "Our Services",
    navAboutUs: "About Us",
    navPayments: "Payment Methods",
    navContact: "Contact Us",
    navButton: "Get Free Counsel",
    
    heroWelcome: "Welcome to Texas Gateway Multi Services Group",
    heroTag: "Integrated Business & Personal Solutions",
    heroTitle1: "Six Gates.",
    heroTitle2: "Infinite Solutions.",
    heroSubtitle: "Your premium gateway to U.S. Visas & Immigration, Certified Translation, Notary & Apostille, Legal Support, Financial Services, and Management Services & Consulting. We deliver complete regulatory alignment under one unified platform.",
    heroCta: "Request a Free Consultation",

    freedomTitle: "FREEDOM 250 (1776 - 2026)",
    freedomSub: "Celebrating 250 Years of American Liberty",
    freedomText: "We congratulate the American people on the 250th anniversary of the independence of the United States. This historic occasion embodies the values of freedom, courage, and unity upon which this great nation was built, serving as an inspiration to the entire world.",
    freedomCongrats: "May God bless America and its people, moving forward towards a more prosperous, secure, and peaceful future.",

    founderTitle: "Founder & CEO Profile",
    founderSub: "Meet Dr. Khaled M. Abu Zaher",
    founderBio: "Dr. Khaled Mohammad Abu Zaher is the founder, president, and direct manager of Texas Gateway Multi Services Group (Texas Gateway Multi-Service Group). As a distinguished expert in regulatory, financial, and administrative affairs, he provides strategic counsel across U.S. immigration pathways, international business expansion, and high-level compliance standards.",
    founderExpert: "Financial, Administrative and Regulatory Expert",
    founderConsultant: "U.S. Immigration and Citizenship Affairs Consultant",
    founderResearcher: "Legal Researcher and Assistant Attorney",
    founderManager: "Founder and Direct Manager of the Group",
    founderDirectLine: "Direct Phone Line",
    founderAddress: "Office Address",
    founderEmail: "Official Email Address",
    founderLinkedin: "LinkedIn Profile",

    gatesTitle: "The 6 Gates",
    gatesSub: "Our Organizational Structure",
    gatesDesc: "We provide comprehensive administrative, translation, attestation, legal support, financial services, and professional management consulting under six specialized divisions to satisfy all personal and corporate development needs.",
    gatesClickToExpand: "Click on any Gate to explore detailed lists of services and solutions",

    gate1Title: "Visas & Immigration Services",
    gate1Tag: "Gate 1",
    gate1Desc: "Complete support for residency, family petitions, citizenship, humanitarian programs, and visa tracking. We manage everything from initial intake to direct USCIS follow-ups.",
    gate1ResidencyTitle: "Immigration & Residency (Services 1-16)",
    gate1CitizenshipTitle: "Citizenship & Nationality (Services 17-20)",
    gate1HumanitarianTitle: "Humanitarian Services & Exemptions (Services 21-28)",
    gate1EducationalTitle: "International Educational & Medical (Services 29-34)",
    gate1CorrespondenceTitle: "Official Correspondence & Follow-ups (Services 35-48)",
    gate1VisaTypesTitle: "Visa Classifications Managed",

    gate2Title: "Translation & Language Solutions",
    gate2Tag: "Gate 2",
    gate2Desc: "Certified professional translation services designed to meet USCIS, Department of State, and academic evaluation standards.",
    gate2Features: [
      "Bilingual Arabic-English translations of official civil certificates",
      "Certified translation of legal judgments, deeds, and academic transcripts",
      "Linguistic review and affidavit of translator accuracy for court filings"
    ],

    gate3Title: "Notary & Apostille / Attestation Services",
    gate3Tag: "Gate 3",
    gate3Desc: "Rapid document notarization and state/federal apostille processing for cross-border and international legal recognition.",
    gate3Features: [
      "Official Texas Notary Public services for administrative declarations",
      "Apostille processing for state-issued birth, marriage, and corporate certificates",
      "Consular attestation support for international business agreements"
    ],

    gate4Title: "Legal Services",
    gate4Tag: "Gate 4",
    gate4Desc: "We assist licensed attorneys and the Arab-American community with legal support, research, compliant marketing, and arbitration services.",
    gate4AssistantTitle: "Legal Assistant Services",
    gate4AssistantDesc: "Assisting lawyers with administrative tasks, drafting standard contracts, case folder management, court file filings, and witness coordination.",
    gate4ResearcherTitle: "Legal Research & Citation",
    gate4ResearcherDesc: "Deep textual search services in state and federal databases to locate relevant legal texts, statutes, and administrative rulings.",
    gate4MarketerTitle: "Legal Referral & Marketing Services",
    gate4MarketerDesc: "Connecting members of the Arab-American community with qualified, vetted attorneys specializing in their exact legal disputes or geographical locations.",
    gate4EventTitle: "Event & Compliance Management",
    gate4EventDesc: "Helping law firms organize professional seminars and client development campaigns in absolute compliance with ABA Model Rules 7.1, 7.2, and 7.3.",
    gate4PartnerTitle: "Arbitration & Business Settlements",
    gate4PartnerDesc: "Facilitating amicable arbitration, mediation, and settlement services to resolve business disputes out-of-court.",

    gate5Title: "Financial Services",
    gate5Tag: "Gate 5",
    gate5Desc: "Reliable, high-precision administrative accounting, seasonal tax filings, and payroll solutions designed specifically for small businesses and self-employed professionals.",
    gate5TaxTitle: "Tax Preparation",
    gate5TaxDesc: "Comprehensive assistance with state and federal corporate tax filings, individual returns, and tax deduction planning.",
    gate5PayrollTitle: "Payroll & Wages Management",
    gate5PayrollDesc: "Calculation of weekly employee wages, tax withholdings, issuing of paystubs, and compliance with DOL payroll regulations.",
    gate5BookkeepingTitle: "Part-Time Bookkeeping",
    gate5BookkeepingDesc: "Continuous transaction recording, bank account reconciliation, balance sheet management, and regular profit/loss reports.",

    gate6Title: "Management Services & Consulting",
    gate6Tag: "Gate 6",
    gate6Desc: "We provide professional administrative and consulting solutions tailored to small and medium-sized businesses, with a focus on growth, business organization, and operational efficiency. We help business owners build clear systems, improve internal processes, and strengthen management in ways that fit the needs of growing companies.",
    gate6ShortDesc: "Professional administrative and consulting services that help small and medium-sized businesses improve organization, development, and efficiency.",
    gate6Tagline: "Your trusted administrative partner for practical and professional support for small and medium-sized businesses.",
    gate6Disclaimer: "Our services are administrative, organizational, and general consulting in nature, and do not include licensed legal or accounting advice unless explicitly stated.",

    calcTitle: "Test the Intelligence Engine",
    calcSub: "Interactive Portal",
    calcDesc: "Experience Texas Gateway Multi Services Group’s simplified visa petition estimator to calculate standard approval statistics and RFE risk factors dynamically.",
    calcHeader: "TGMSG_ADVISORY_CORE_V3.LOG",
    calcSelectClass: "Classification Class",
    calcStandard: "Credential Standard",
    calcWageLevel: "Prevailing Wage Level",
    calcWageL1: "L1 - Entry Level",
    calcWageL4: "L4 - Fully Competent",
    calcOutputTitle: "Computed Probability Forecast",
    calcEstimatedApproval: "Estimated Approval",
    calcAdjudicationWait: "Estimated Wait",
    calcWeeks: "Weeks",
    calcRfeRisk: "Request for Evidence (RFE) Risk Index",
    calcRfeElevated: "Elevated",
    calcRfeLow: "Low Risk",
    calcRfeDetail: "Calculated dynamically using current USCIS volume trends, credential caps, and geographic labor filters.",
    calcFootnote: "Calculations conform with prevailing wage schedules published by DOL for Office 2026.",

    faqTitle: "Common Questions on Compliance",
    faqSub: "Information Desk",
    faqDesc: "Have specific questions regarding visa processing, labor certified prevailing wage audits, or corporate filings? Contact our advisory hotline for dedicated counsel.",
    faqButton: "Ask Advisory Desk",

    contactTitle: "Get Professional Advisory Support Today",
    contactSub: "Advisory Consultation Desk",
    contactDesc: "Connect with our experienced immigration advisers. Schedule a free, confidential consultation to review your visa needs, immigration status, or corporate employee sponsorship pathways.",
    contactWageReview: "Official DOL Wage Reviews Included",
    contactWageDesc: "We check prevailing wage minimums as part of every visa consultation.",
    contactTurnaround: "Fast, Expert Turnaround (Within 24 Hours)",
    contactTurnaroundDesc: "Our team reviews your inquiry immediately and gets in touch the very next day.",
    contactFormHeader: "INQUIRY FORM",
    contactFormSuccessTitle: "Consultation Request Received",
    contactFormSuccessDesc: "A senior advisory representative has been assigned to your case. Expect a response or scheduling link in under 2 hours.",
    contactFormReset: "Submit another inquiry",
    contactLabelName: "Full Name",
    contactLabelEmail: "Email Address",
    contactLabelSector: "Sector Of Focus",
    contactLabelHelp: "How Can We Help You? (Optional)",
    contactFormSubmit: "Submit Consultation Request",
    contactAdminInbox: "Admin Inbox Portal",

    statsSub: "Proven Results",
    statsApprovalIndex: "Success & Quality Index",
    statsCycleSpeedup: "Process Cycle Speedup",
    statsVisasManaged: "Completed Transactions",
    statsCorporateSponsors: "Corporate & Business Clients",

    paymentsTitle: "Secure Payment Solutions",
    paymentsSub: "Payment Methods & Gateway Details",
    paymentsDesc: "We provide multiple secure, compliant payment routes for our local, national, and international clients. Choose the method most convenient for your advisory services, notary public processing, or translation filings.",
    paymentsLocalTitle: "Local & National Payments",
    paymentsLocalDesc: "Fast and secure electronic transfers within the United States.",
    paymentsIntlTitle: "International Payments",
    paymentsIntlDesc: "Reliable cross-border remittance solutions for global clients.",
    paymentsZelleName: "Zelle Transfer",
    paymentsZelleDesc: "Instant electronic bank transfers directly using our official email or phone number. Zero transaction fees.",
    paymentsBankName: "Direct ACH / Wire Transfer",
    paymentsBankDesc: "Secure business-to-business bank transfers. Contact our treasury desk for official routing and account details.",
    paymentsPaypalName: "PayPal Secure Checkout",
    paymentsPaypalDesc: "Complete card transactions and PayPal transfers with instant confirmation. Subject to standard gateway processing fees.",
    paymentsWuName: "Western Union Transfer",
    paymentsWuDesc: "Direct cash remittance or electronic transfer from over 200 countries. Ideal for international legal filings, visa retainers, and translation services.",
    paymentsInstruction: "To finalize your payment, please reference your Invoice Number or Consultation Case ID in the transaction memo. Once submitted, send a screenshot or transaction receipt to our advisory inbox for rapid processing.",

    termsTitle: "Terms, Policies & Service Conditions",
    termsSub: "Texas Gateway Multi Services Group",
    termsIntro: "Our comprehensive regulatory guidelines, user agreements, and client service policies designed to ensure compliance, transparency, and data protection.",
    termsPrivacyLabel: "1. Privacy Policy",
    termsPrivacyText: "We are committed to protecting client information and maintaining the highest standards of privacy and security.",
    termsRefundLabel: "2. Refund Policy",
    termsRefundText: "Fees paid for services already commenced are non-refundable. Any approved refund shall be subject to management review and applicable administrative costs.",
    termsConfidentialityLabel: "3. Data Confidentiality Policy",
    termsConfidentialityText: "Client information and documents are treated as strictly confidential and will not be disclosed except as required by law or with client authorization.",
    termsServiceLabel: "4. Terms of Service",
    termsServiceText: "By engaging our services, the client acknowledges and agrees to the terms, conditions, and scope of services provided by Texas Gateway Multi Services Group.",
    termsLiabilityLabel: "5. Limited Liability Policy",
    termsLiabilityText: "Processing times, approvals, denials, requests for evidence, and governmental decisions are solely determined by the relevant authorities. Texas Gateway Multi Services Group cannot guarantee any specific outcome.",
    termsNoAdviceLabel: "6. No Legal Advice Policy",
    termsNoAdviceText: "Texas Gateway Multi Services Group is an administrative and information support service provider. We are not a law firm and do not provide legal representation or legal advice.",
    termsElectronicNoticeLabel: "Electronic Document Notice",
    termsElectronicNoticeText: "This document forms an integral part of the invoice and is electronically generated by Texas Gateway Multi Services Group. No handwritten signature or physical stamp is required.",
  },
  ar: {
    navHome: "الرئيسية",
    navServices: "خدماتنا",
    navAboutUs: "من نحن",
    navPayments: "طرق الدفع",
    navContact: "اتصل بنا",
    navButton: "استشارة مجانية",

    heroWelcome: "مرحباً بكم في مجموعة بوابة تكساس للخدمات المتعددة",
    heroTag: "حلول متكاملة للأعمال والأفراد",
    heroTitle1: "ست بوابات.",
    heroTitle2: "حلول لا حصر لها.",
    heroSubtitle: "بوابتكم المتميزة للتأشيرات والهجرة الأمريكية، الترجمة المعتمدة، التوثيق والأبوستيل، الدعم القانوني، الخدمات المالية، والخدمات الإدارية والاستشارية. نوفر لكم امتثالاً تنظيمياً متكاملاً تحت سقف واحد.",
    heroCta: "طلب استشارة مجانية",

    freedomTitle: "FREEDOM 250 (1776 - 2026)",
    freedomSub: "الاحتفال بمرور 250 عاماً على استقلال أمريكا",
    freedomText: "نهنئ الشعب الأمريكي العظيم بمناسبة الذكرى الـ 250 لاستقلال الولايات المتحدة الأمريكية. هذه المناسبة تجسد قيم الحرية والشجاعة والوحدة التي قامت عليها أمتكم العظيمة، وهي مصدر إلهام لكل دول العالم.",
    freedomCongrats: "حفظ الله أمريكا وشعبها، ومضت قدماً نحو مستقبل أكثر ازدهاراً وأماناً وسلاماً.",

    founderTitle: "الملف التعريفي للمؤسس",
    founderSub: "د. خالد محمد أبو زاهر",
    founderBio: "د. خالد محمد أبو زاهر هو المؤسس والمدير المباشر لمجموعة بوابة تكساس للخدمات المتعددة. بصفته خبيراً بارزاً في الشؤون المالية والإدارية والنظامية، يقدم استشارات استراتيجية متكاملة لملفات الهجرة والمواطنة الأمريكية، والتوسع التجاري الدولي، وتطبيق معايير الامتثال والرقابة القانونية الفائقة.",
    founderExpert: "الخبير المالي والإداري والنظامي",
    founderConsultant: "مستشار شؤون الهجرة والمواطنة الأمريكية",
    founderResearcher: "باحث ومساعد قانوني",
    founderManager: "مؤسس ومدير مباشر للمجموعة",
    founderDirectLine: "هاتف التواصل المباشر",
    founderAddress: "عنوان المكتب الرئيسي",
    founderEmail: "البريد الإلكتروني الرسمي",
    founderLinkedin: "الملف الشخصي على LinkedIn",

    gatesTitle: "البوابات الستة",
    gatesSub: "الهيكل التنظيمي للمجموعة",
    gatesDesc: "نقدم خدماتنا المتكاملة في الدعم الإداري، الترجمة، التصديق، الدعم القانوني، الخدمات المالية، والخدمات الإدارية والاستشارية عبر ستة أقسام متخصصة تلبي كافة الاحتياجات التجارية والشخصية.",
    gatesClickToExpand: "اضغط على أي بوابة لاستكشاف قوائم الخدمات والحلول التفصيلية",

    gate1Title: "خدمات التأشيرات والهجرة الأمريكية",
    gate1Tag: "البوابة 1",
    gate1Desc: "دعم شامل لملفات الإقامة، المعاملات العائلية، الجنسية، البرامج الإنسانية، ومتابعة التأشيرات. نتولى مراجعة وتدقيق المستندات والمتابعة المباشرة مع إدارة الهجرة الأمريكية (USCIS).",
    gate1ResidencyTitle: "خدمات الهجرة والإقامة (المعاملات 1-16)",
    gate1CitizenshipTitle: "خدمات المواطنة والجنسية (المعاملات 17-20)",
    gate1HumanitarianTitle: "الخدمات الإنسانية والإعفاءات (المعاملات 21-28)",
    gate1EducationalTitle: "الخدمات التعليمية والطبية الدولية (المعاملات 29-34)",
    gate1CorrespondenceTitle: "خدمات المراسلات والمتابعة الرسمية (المعاملات 35-48)",
    gate1VisaTypesTitle: "أنواع التأشيرات التي نديرها",

    gate2Title: "خدمات الترجمة والحلول اللغوية",
    gate2Tag: "البوابة 2",
    gate2Desc: "خدمات ترجمة مهنية قانونية معتمدة ومصممة خصيصاً لتطابق متطلبات إدارة الهجرة الأمريكية (USCIS)، ووزارة الخارجية، والمؤسسات الأكاديمية.",
    gate2Features: [
      "الترجمة المعتمدة الثنائية (عربي - إنجليزي) للشهادات والوثائق المدنية الرسمية",
      "ترجمة الأحكام القانونية، العقود والاتفاقيات التجارية والشهادات الدراسية والمناهج",
      "إصدار شهادات دقة الترجمة وإفادات المترجم القانوني اللازمة للمحاكم والجهات الرسمية"
    ],

    gate3Title: "خدمات التصديق والتوثيق والأبوستيل",
    gate3Tag: "البوابة 3",
    gate3Desc: "خدمات كاتب العدل (Notary Public) وتصديق الأبوستيل (Apostille) السريعة للوثائق والمستندات لضمان قبولها والاعتراف بها دولياً أو محلياً.",
    gate3Features: [
      "توثيق المستندات والبيانات الإدارية من كاتب العدل المعتمد في ولاية تكساس",
      "تصديق الأبوستيل للوثائق الصادرة من الولاية (شهادات الميلاد، الزواج، السجلات التجارية)",
      "تنسيق التصديقات القنصلية اللازمة للاتفاقيات وعقود الشركات العابرة للحدود"
    ],

    gate4Title: "الخدمات القانونية المساعدة",
    gate4Tag: "البوابة 4",
    gate4Desc: "نعمل على تقديم الدعم والمساندة القانونية للمحامين المرخصين والجالية العربية في الولايات المتحدة عبر تسيير المعاملات والأبحاث والتسويق المتوافق.",
    gate4AssistantTitle: "الخدمات المساعدة للمحامين",
    gate4AssistantDesc: "مساعدة المحامين في المهام الإدارية، صياغة مسودات العقود، فرز وتنظيم الملفات، إدارة الأرشيف، والتنسيق مع الشهود والموكلين.",
    gate4ResearcherTitle: "الأبحاث والدراسات القانونية",
    gate4ResearcherDesc: "تلبية احتياجات المهتمين بالبحث عن النصوص واللوائح القانونية الأمريكية عبر قواعد البيانات الفيدرالية والمحلية واستخراج السوابق.",
    gate4MarketerTitle: "خدمات التسويق والربط القانوني",
    gate4MarketerDesc: "مساندة أبناء الجالية العربية للوصول إلى المحامين المناسبين والتخصصات القانونية المطلوبة وفق نطاقهم الجغرافي ونوع القضية.",
    gate4EventTitle: "إدارة الفعاليات القانونية والامتثال",
    gate4EventDesc: "تنظيم الحملات التعريفية والندوات المهنية للمكاتب القانونية بما يتوافق تماماً مع قواعد الامتثال لجمعية المحامين الأمريكية (ABA) لاسيما المواد 7.1 و7.2 و7.3.",
    gate4PartnerTitle: "شركاء الأعمال والتسويات الودية",
    gate4PartnerDesc: "تسهيل التحكيم الودي، والوساطة، وخدمات التسوية الفعالة للنزاعات التجارية والمدنية بعيداً عن أروقة المحاكم.",

    gate5Title: "الخدمات المالية",
    gate5Tag: "البوابة 5",
    gate5Desc: "إدارة محاسبية دقيقة، وإعداد الإقرارات الضريبية، وحلول دفع الأجور المصممة لدعم الشركات الناشئة، والمشاريع الصغيرة، والمهنيين المستقلين.",
    gate5TaxTitle: "إعداد الضرائب وتجهيز الملفات",
    gate5TaxDesc: "مساعدة شاملة في إعداد وتقديم الإقرارات الضريبية السنوية للشركات والأفراد، وضمان الاستفادة من الخصومات القانونية.",
    gate5PayrollTitle: "إدارة الرواتب والأجور (Payroll)",
    gate5PayrollDesc: "حساب الرواتب الأسبوعية والشهرية، واقتطاعات الضرائب، وإصدار كشوفات الأجور بما يتوافق مع قوانين العمل الأمريكية.",
    gate5BookkeepingTitle: "إمساك الدفاتر والمحاسبة الجزئية",
    gate5BookkeepingDesc: "تسجيل المعاملات اليومية، ومطابقة الحسابات البنكية، وإإعداد الميزانيات، وتقارير الأرباح والخسائر الدورية.",

    gate6Title: "الخدمات الإدارية والاستشارية",
    gate6Tag: "البوابة 6",
    gate6Desc: "نقدّم حلولًا إدارية واستشارية مهنية موجهة للشركات الصغيرة والمتوسطة، بهدف دعم النمو، وتنظيم الأعمال، وتحسين الأداء التشغيلي بأسلوب عملي وفعّال. نساعد أصحاب الأعمال على بناء أنظمة واضحة، وتطوير الإجراءات الداخلية، ورفع كفاءة الإدارة بما يتناسب مع احتياجات الشركات النامية.",
    gate6ShortDesc: "خدمات إدارية واستشارية مهنية تساعد الشركات الصغيرة والمتوسطة على التنظيم، التطوير، ورفع الكفاءة.",
    gate6Tagline: "شريكك الإداري الموثوق لدعم الشركات الصغيرة والمتوسطة بحلول عملية واحترافية.",
    gate6Disclaimer: "خدماتنا ذات طابع إداري وتنظيمي واستشاري عام، ولا تشمل المشورة القانونية أو المحاسبية المرخصة إلا إذا تم النص على ذلك صراحةً.",

    calcTitle: "اختبر أداة تقييم المعاملات",
    calcSub: "البوابة التفاعلية",
    calcDesc: "جرّب أداة التقييم والتقدير التفاعلية من مجموعة بوابة تكساس للخدمات المتعددة لحساب احتمالات قبول المعاملات وفترات الانتظار ومستويات طلبات الإثبات (RFE) ديناميكياً.",
    calcHeader: "TGMSG_ADVISORY_CORE_V3.LOG",
    calcSelectClass: "نوع المعاملة / التصنيف",
    calcStandard: "مستوى المؤهل العلمي",
    calcWageLevel: "مستوى الأجر المعتمد (DOL)",
    calcWageL1: "مبتدئ - Level 1",
    calcWageL4: "كفاءة كاملة - Level 4",
    calcOutputTitle: "مؤشرات وتوقعات المعاملة المحسوبة",
    calcEstimatedApproval: "احتمالية القبول المقدرة",
    calcAdjudicationWait: "فترة الانتظار المتوقعة",
    calcWeeks: "أسبوع",
    calcRfeRisk: "مؤشر خطر طلب الإثبات الإضافي (RFE)",
    calcRfeElevated: "مرتفع",
    calcRfeLow: "منخفض المخاطر",
    calcRfeDetail: "يتم الحساب ديناميكياً بناءً على اتجاهات العمل الحالية في إدارة الهجرة (USCIS)، والمؤهلات الأكاديمية ونطاقات العمل الإقليمية.",
    calcFootnote: "تتوافق الحسابات مع مستويات وجداول الأجور الصادرة عن وزارة العمل الأمريكية (DOL) لعام 2026.",

    faqTitle: "الأسئلة الشائعة حول الامتثال والخدمات",
    faqSub: "مكتب الاستعلامات",
    faqDesc: "هل لديك استفسارات معينة بخصوص تسيير المعاملات، الأجور المعتمدة، أو التصديقات؟ اتصل بالخط الساخن لتلقي الدعم والمساندة المباشرة.",
    faqButton: "مكتب الاستشارات الساخن",

    contactTitle: "احصل على استشارتك المهنية المتكاملة اليوم",
    contactSub: "مكتب طلب الاستشارات والدعم",
    contactDesc: "تواصل مباشرة مع مستشارينا المعتمدين لتلقي المساعدة الموثوقة. احجز جلسة مراجعة مجانية وسرية لبحث طلب التأشيرة أو تعديل الوضع أو معاملات رعاية الموظفين للشركات.",
    contactWageReview: "مراجعة رسمية للأجور المعتمدة (DOL)",
    contactWageDesc: "نقوم بفحص الحد الأدنى للأجور المعتمدة كجزء أساسي من كل استشارة تأشيرة عمل.",
    contactTurnaround: "سرعة واحترافية في الرد (خلال 24 ساعة)",
    contactTurnaroundDesc: "يقوم فريقنا بفحص ومراجعة طلبكم على الفور والتواصل معكم في يوم العمل التالي مباشرة.",
    contactFormHeader: "نموذج طلب الاستشارة",
    contactFormSuccessTitle: "تم استلام طلب الاستشارة بنجاح",
    contactFormSuccessDesc: "شكراً لكم. تم تعيين مستشار أول لمراجعة طلبكم وسنتواصل معكم عبر البريد الإلكتروني المدخل خلال أقل من ساعتين.",
    contactFormReset: "إرسال طلب استشارة آخر",
    contactLabelName: "الاسم الكامل",
    contactLabelEmail: "البريد الإلكتروني",
    contactLabelSector: "القسم المطلوب",
    contactLabelHelp: "كيف يمكننا مساعدتك؟ (اختياري)",
    contactFormSubmit: "إرسال طلب الاستشارة",
    contactAdminInbox: "بوابة صندوق الوارد الإداري",

    statsSub: "نتائج مؤكدة",
    statsApprovalIndex: "مؤشر الجودة والنجاح الفائق",
    statsCycleSpeedup: "تسريع دورة إنجاز المعاملات",
    statsVisasManaged: "المعاملات المكتملة بنجاح",
    statsCorporateSponsors: "الشركات والعملاء التجاريين",

    paymentsTitle: "حلول دفع آمنة وموثوقة",
    paymentsSub: "خيارات وتفاصيل بوابات الدفع",
    paymentsDesc: "نحن نوفر طرق دفع متعددة وآمنة تماماً لعملائنا داخل الولايات المتحدة وخارجها. يرجى اختيار الطريقة الأنسب لتسوية رسوم الاستشارات، خدمات التوثيق، أو ترجمة المعاملات.",
    paymentsLocalTitle: "المدفوعات المحلية والوطنية",
    paymentsLocalDesc: "حوالات إلكترونية سريعة وآمنة داخل الولايات المتحدة الأمريكية.",
    paymentsIntlTitle: "المدفوعات الدولية",
    paymentsIntlDesc: "حلول حوالات مالية موثوقة وعابرة للحدود لعملائنا حول العالم.",
    paymentsZelleName: "تحويل Zelle",
    paymentsZelleDesc: "تحويل بنكي إلكتروني فوري ومباشر باستخدام بريدنا الإلكتروني أو رقم الهاتف الرسمي بدون أي رسوم إضافية.",
    paymentsBankName: "الحوالات البنكية المباشرة (ACH / Wire)",
    paymentsBankDesc: "تحويلات آمنة من حسابك البنكي إلى حساب المجموعة مباشرة. يرجى التواصل مع المكتب المالي للحصول على أرقام الحساب والتوجيه.",
    paymentsPaypalName: "بوابة PayPal الآمنة",
    paymentsPaypalDesc: "إتمام المعاملات ببطاقات الائتمان أو رصيد بايبال مع تأكيد فوري للمعاملة. قد تخضع للرسوم القياسية لبوابة الدفع.",
    paymentsWuName: "ويسترن يونيون (Western Union)",
    paymentsWuDesc: "حوالات نقدية أو إلكترونية مباشرة من أكثر من 200 دولة. مثالية لمعاملات الهجرة، خدمات الترجمة المعتمدة، والعقود الدولية.",
    paymentsInstruction: "لإتمام الدفع بنجاح، يرجى كتابة رقم الفاتورة أو معرف ملف الاستشارة في تفاصيل/ملاحظات التحويل. بعد إتمام المعاملة، يرجى إرسال نسخة من إيصال التحويل أو لقطة شاشة إلى بريدنا الاستشاري لتسريع تفعيل الخدمة.",

    termsTitle: "الشروط والسياسات وأحكام الخدمة",
    termsSub: "مجموعة بوابة تكساس للخدمات المتعددة",
    termsIntro: "المبادئ التوجيهية التنظيمية الشاملة لدينا، واتفاقيات المستخدم، وسياسات خدمة العملاء المصممة لضمان الامتثال والشفافية وحماية البيانات.",
    termsPrivacyLabel: "١. سياسة الخصوصية",
    termsPrivacyText: "نحن ملتزمون بحماية معلومات العملاء والحفاظ على أعلى معايير الخصوصية والأمان.",
    termsRefundLabel: "٢. سياسة استرداد الرسوم",
    termsRefundText: "الرسوم المدفوعة مقابل الخدمات التي بدأت بالفعل غير قابلة للاسترداد. تخضع أي عملية استرداد معتمدة لمراجعة الإدارة والتكاليف الإدارية المعمول بها.",
    termsConfidentialityLabel: "٣. سياسة سرية البيانات والمعلومات",
    termsConfidentialityText: "يتم التعامل مع معلومات ومستندات العملاء بسرية تامة ولن يتم الكشف عنها إلا بموجب القانون أو بتفويض من العميل.",
    termsServiceLabel: "٤. شروط وأحكام الخدمة",
    termsServiceText: "من خلال الاستفادة من خدماتنا، يقر العميل ويوافق على الشروط والأحكام ونطاق الخدمات المقدمة من قبل مجموعة بوابة تكساس للخدمات المتعددة.",
    termsLiabilityLabel: "٥. سياسة المسؤولية المحدودة",
    termsLiabilityText: "أوقات المعالجة والموافقات والرفض وطلبات الأدلة والقرارات الحكومية يتم تحديدها حصرياً من قبل السلطات المختصة. لا يمكن لمجموعة بوابة تكساس للخدمات المتعددة ضمان أي نتيجة عملية محددة.",
    termsNoAdviceLabel: "٦. سياسة عدم تقديم المشورة القانونية",
    termsNoAdviceText: "مجموعة بوابة تكساس للخدمات المتعددة هي مزود خدمات دعم إداري ومعلوماتي. نحن لسنا مكتب محاماة ولا نقدم تمثيلاً قانونياً أو استشارات قانونية.",
    termsElectronicNoticeLabel: "إشعار الوثيقة الإلكترونية",
    termsElectronicNoticeText: "تشكل هذه الوثيقة جزءاً لا يتجزأ من الفاتورة ويتم إنشاؤها إلكترونياً بواسطة مجموعة بوابة تكساس للخدمات المتعددة. لا يلزم توقيع بخط اليد أو ختم مادي.",
  }
};
