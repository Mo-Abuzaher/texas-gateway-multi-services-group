import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Building2, ShieldCheck, Check, ArrowRight, FileText, Landmark, HelpingHand, ClipboardCheck, FolderSync, Send, FileCheck } from "lucide-react";

interface Props {
  lang: "en" | "ar";
}

type GateId = "gate1" | "gate2" | "gate3" | "gate4" | "gate5";

interface ServiceData {
  title: string;
  badge: string;
  time: string;
  authority: string;
  compliance: string;
  requirements: string[];
  nextStep: string;
}

function HalftoneChevron({ className = "w-4 h-4" }: { className?: string }) {
  const dots = [];
  const rows = 12;
  const cols = 12;
  const centerX = 9.5;
  const centerY = 6;
  
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const targetC = centerX - Math.abs(r - centerY) * 0.75;
      const dist = Math.abs(c - targetC);
      
      if (dist < 3.2) {
        const radius = Math.max(0.4, 3.0 - dist * 0.85);
        dots.push(
          <circle
            key={`${r}-${c}`}
            cx={c * 7 + 8}
            cy={r * 7 + 8}
            r={radius}
          />
        );
      }
    }
  }
  
  return (
    <svg viewBox="0 0 100 100" className={`${className} fill-current`} aria-hidden="true">
      {dots}
    </svg>
  );
}

function DarkTitleWordReveal({ word, index }: { word: string; index: number; key?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0.45, color: "rgba(255, 255, 255, 0.45)" }}
      animate={{
        opacity: [0.45, 1, 0.45],
        color: ["rgba(255, 255, 255, 0.45)", "#FFFFFF", "rgba(255, 255, 255, 0.45)"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        delay: index * 0.2,
        ease: "easeInOut",
      }}
      className="me-[0.25em] inline-block select-none font-sans"
    >
      {word}
    </motion.span>
  );
}

function LightTitleWordReveal({ word, index }: { word: string; index: number; key?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0.45, color: "rgba(27, 44, 107, 0.45)" }}
      animate={{
        opacity: [0.45, 1, 0.45],
        color: ["rgba(27, 44, 107, 0.45)", "#1B2C6B", "rgba(27, 44, 107, 0.45)"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        delay: index * 0.2,
        ease: "easeInOut",
      }}
      className="me-[0.25em] inline-block select-none font-sans"
    >
      {word}
    </motion.span>
  );
}

const ConferenceIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 196.061 196.062" className={className} fill="currentColor">
    <g>
      <g>
        <path d="M98.057,65.032c7.018,0,12.718-8.14,12.718-15.16c0-7.023-5.7-12.722-12.718-12.722c-7.021,0-12.714,5.694-12.714,12.722 C85.343,56.893,91.037,65.032,98.057,65.032z"/>
        <path d="M82.958,89.095l0.01-10.317c0.327-0.096,0.663-0.196,1.015-0.298v10.616h10.802l2.647-20.594h-0.044l-1.191-2.399 c-9.324,0.459-19.495,4.11-19.96,4.282c-0.049,0.011-0.065,0.052-0.112,0.063c-0.357,0.145-0.653,0.375-0.969,0.594 c-0.229,0.155-0.492,0.268-0.684,0.459c-0.234,0.23-0.386,0.52-0.582,0.796c-0.172,0.258-0.392,0.482-0.515,0.767 c-0.117,0.263-0.14,0.561-0.218,0.841c-0.091,0.352-0.209,0.7-0.214,1.069c0,0.047-0.028,0.085-0.028,0.131L72.89,89.246 c0.481-0.08,0.962-0.151,1.46-0.151H82.958z"/>
        <path d="M114.385,71.191l0.958-0.38l0.858-1.62c-3.885-1.16-10.235-2.791-16.282-3.089l-1.189,2.399h-0.033l2.638,20.591h4.309 l3.993-7.524l-0.219-1.004C108.552,76.614,110.645,72.676,114.385,71.191z"/>
        <path d="M164.793,59.39c7.526,0,13.628-8.725,13.628-16.238c0-7.519-6.102-13.622-13.628-13.622 c-7.513,0-13.612,6.096-13.612,13.622C151.181,50.666,157.281,59.39,164.793,59.39z"/>
        <path d="M190.682,93.694c-0.269,0-0.498,0.112-0.75,0.151l0.448-0.497c0.887-0.994,1.381-2.278,1.381-3.61l-0.046-19.562 c0-0.049-0.027-0.087-0.027-0.134c-0.011-0.397-0.136-0.766-0.229-1.148c-0.08-0.302-0.104-0.616-0.234-0.901 c-0.13-0.308-0.362-0.549-0.554-0.824c-0.202-0.292-0.366-0.607-0.618-0.853c-0.208-0.201-0.485-0.324-0.732-0.488 c-0.34-0.236-0.649-0.481-1.041-0.632c-0.043-0.017-0.07-0.057-0.117-0.068c-0.495-0.178-11.388-4.09-21.376-4.583l-1.278,2.566 h-0.041l3.628,28.247l-4.316,7.525l-4.305-7.525l3.614-28.247h-0.032l-1.275-2.561c-9.636,0.471-20.082,4.113-21.264,4.534 l-21.323,7.111l1.284-2.405c0.274-0.525,0.083-1.176-0.448-1.45c-0.514-0.282-1.171-0.085-1.461,0.443l-2.336,4.401l-1.555,0.518 c-2.824,0.941-4.346,3.989-3.403,6.812c0.131,0.38,0.341,0.695,0.536,1.026l-3.981,7.523c-0.276,0.529-0.084,1.177,0.446,1.458 c0.16,0.082,0.328,0.124,0.506,0.124c0.375,0,0.753-0.208,0.949-0.572l3.636-6.848c0.884,0.609,1.946,0.957,3.04,0.957 c0.569,0,1.139-0.088,1.708-0.274l25.844-8.618c0.024-0.006,0.038-0.028,0.057-0.039c0.037-0.005,0.048,0,0.069-0.005 c0.057-0.017,1.904-0.673,4.643-1.453v35.198l-14.074,2.823c-2.886,0.587-5.023,3.043-5.178,5.986l-2.288,41.905 c-0.196,3.567,2.539,6.615,6.107,6.807c0.114,0.006,0.229,0.011,0.35,0.011c3.404,0,6.262-2.671,6.445-6.106l2.017-36.914 l5.524-1.116v37.669c0,2.978,2.413,5.385,5.391,5.385h36.658c2.964,0,5.383-2.414,5.383-5.385v-42.495v-4.312V99.074 C196.066,96.105,193.653,93.694,190.682,93.694z M179.875,73.796c0.372,0.112,0.733,0.218,1.078,0.32l0.023,13.571l-1.102,1.233 V73.796z M185.299,154.68h-25.89v-28.537l25.89-6.084V154.68z M185.299,99.079v9.915l-5.425,1.274v-5.236l5.444-6.052 C185.319,99.014,185.299,99.041,185.299,99.079z"/>
        <path d="M31.278,59.39c7.513,0,13.616-8.725,13.616-16.238c0-7.519-6.103-13.622-13.616-13.622 c-7.524,0-13.624,6.096-13.624,13.622C17.654,50.666,23.754,59.39,31.278,59.39z"/>
        <path d="M60.421,111.817l-14.07-2.823V73.796c0.383,0.112,0.74,0.213,1.074,0.314v21.921c0,2.041,1.156,3.901,2.977,4.821 l8.619,4.306c0.772,0.378,1.595,0.575,2.402,0.575c1.978,0,3.88-1.089,4.822-2.988c1.326-2.66,0.256-5.888-2.417-7.226 l-5.631-2.813V70.184c0-0.052-0.03-0.09-0.03-0.148c-0.01-0.396-0.139-0.771-0.234-1.154c-0.077-0.296-0.105-0.61-0.222-0.889 c-0.138-0.315-0.377-0.567-0.567-0.84c-0.203-0.287-0.364-0.596-0.618-0.836c-0.21-0.208-0.486-0.329-0.743-0.504 c-0.331-0.224-0.639-0.471-1.026-0.621c-0.038-0.019-0.072-0.058-0.117-0.068c-0.493-0.178-11.39-4.089-21.382-4.583l-1.278,2.566 h-0.034l3.621,28.247l-4.31,7.523l-4.314-7.523l3.625-28.247h-0.04l-1.282-2.566c-9.987,0.493-20.885,4.402-21.371,4.583 c-0.053,0.011-0.075,0.049-0.119,0.068c-0.388,0.15-0.705,0.402-1.042,0.632c-0.248,0.169-0.529,0.285-0.736,0.486 c-0.252,0.247-0.413,0.562-0.616,0.854c-0.189,0.273-0.42,0.514-0.556,0.824c-0.128,0.279-0.151,0.594-0.235,0.9 c-0.093,0.383-0.215,0.747-0.229,1.149c0,0.046-0.028,0.09-0.028,0.134L4.308,89.738c-0.005,1.332,0.487,2.616,1.379,3.61 l0.449,0.497c-0.25-0.039-0.481-0.151-0.752-0.151C2.416,93.694,0,96.11,0,99.079v14.186v4.305v42.495 c0,2.977,2.416,5.391,5.384,5.391h36.657c2.977,0,5.384-2.419,5.384-5.391v-37.669l5.532,1.11l2.011,36.914 c0.192,3.448,3.044,6.111,6.45,6.111c0.117,0,0.234,0,0.353-0.01c3.564-0.197,6.298-3.24,6.104-6.803l-2.288-41.903 C65.442,114.86,63.305,112.404,60.421,111.817z M15.114,74.116c0.346-0.102,0.705-0.208,1.081-0.32v15.124l-1.106-1.233 L15.114,74.116z M16.199,105.032v5.236l-5.425-1.274v-9.915c0-0.032-0.021-0.065-0.021-0.099L16.199,105.032z M36.662,154.68 H10.774v-34.621l25.887,6.084V154.68z"/>
        <path d="M121.74,91.897H74.35c-3.567,0-6.459,2.889-6.459,6.459c0,3.567,2.898,6.457,6.459,6.457h1.2v55.245 c0,2.978,2.409,5.385,5.386,5.385h34.229c2.97,0,5.383-2.414,5.383-5.385v-55.245h1.192c3.57,0,6.457-2.89,6.457-6.457 C128.205,94.786,125.31,91.897,121.74,91.897z"/>
      </g>
    </g>
  </svg>
);

const FolderIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="currentColor">
    <path d="M12.25 4A4.25 4.25 0 0 0 8 8.25v9.394c-1.201.75-2 2.085-2 3.606v16.5A6.25 6.25 0 0 0 12.25 44h23.5A6.25 6.25 0 0 0 42 37.75v-4.5c0-1.52-.799-2.855-2-3.606V13.25a4.25 4.25 0 0 0-2.5-3.874V29h-2V8.25A4.25 4.25 0 0 0 31.25 4zM33 29h-1.757a1.75 1.75 0 0 1-1.238-.513L19.763 18.245A4.25 4.25 0 0 0 16.757 17H10.5V8.25c0-.966.784-1.75 1.75-1.75h19c.967 0 1.75.784 1.75 1.75zM8.5 21.25c0-.966.784-1.75 1.75-1.75h6.507c.464 0 .91.184 1.238.513l10.242 10.242a4.25 4.25 0 0 0 3.006 1.245h6.507c.967 0 1.75.783 1.75 1.75v4.5a3.75 3.75 0 0 1-3.75 3.75h-23.5a3.75 3.75 0 0 1-3.75-3.75z" />
  </svg>
);

const CabinetIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor">
    <g>
      <g>
        <path d="M503.83,0H8.17C3.658,0,0,3.658,0,8.17v217.872c0,4.512,3.658,8.17,8.17,8.17s8.17-3.658,8.17-8.17V16.34H495.66v209.702 c0,4.512,3.658,8.17,8.17,8.17s8.17-3.658,8.17-8.17V8.17C512,3.658,508.342,0,503.83,0z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M473.902,35.357c-3.033-3.34-8.201-3.588-11.541-0.553L256,222.267L49.642,34.807c-3.339-3.033-8.507-2.787-11.541,0.553 c-3.034,3.34-2.787,8.507,0.553,11.541l143.237,130.12l-56.151,51.009c-3.34,3.034-3.587,8.201-0.553,11.541 c1.612,1.775,3.827,2.677,6.05,2.677c1.96,0,3.926-0.702,5.491-2.123l57.315-52.066l56.464,51.293 c1.558,1.415,3.525,2.123,5.494,2.123c1.968,0,3.936-0.707,5.494-2.123l56.464-51.294l57.315,52.066 c1.565,1.422,3.531,2.123,5.491,2.123c2.223,0,4.438-0.902,6.05-2.677c3.034-3.34,2.787-8.507-0.553-11.541l-56.153-51.008 l143.24-130.123C476.688,43.864,476.936,38.696,473.902,35.357z" />
      </g>
    </g>
    <g>
      <g>
        <circle cx="288.681" cy="424.851" r="8.17" />
      </g>
    </g>
    <g>
      <g>
        <circle cx="256" cy="424.851" r="8.17" />
      </g>
    </g>
    <g>
      <g>
        <circle cx="223.319" cy="424.851" r="8.17" />
      </g>
    </g>
    <g>
      <g>
        <path d="M503.83,250.553h-95.931c-3.68,0-6.905,2.46-7.879,6.01l-22.25,81.139H134.232l-22.246-81.139 c-0.973-3.549-4.198-6.01-7.879-6.01H8.17c-4.512,0-8.17,3.658-8.17,8.17V503.83c0,4.512,3.658,8.17,8.17,8.17h495.66 c4.512,0,8.17-3.658,8.17-8.17V258.723C512,254.211,508.342,250.553,503.83,250.553z M495.66,495.66H16.34V266.894h81.534 l22.246,81.139c0.973,3.549,4.198,6.01,7.879,6.01h256c3.68,0,6.905-2.46,7.879-6.01l22.25-81.139h81.53V495.66z" />
      </g>
    </g>
  </svg>
);

const DeliveryIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor">
    <g id="Layer_2">
      <g>
        <path d="M395.6,425.7c4.1,0,7.5-3.4,7.5-7.5V175.9c0-0.1,0-0.3,0-0.4c0-2-0.8-3.9-2.1-5.2l-69.9-81.1c0,0,0,0,0,0l-0.1-0.1 c0,0,0,0-0.1-0.1c-0.2-0.3-0.5-0.5-0.7-0.7c0,0,0,0-0.1-0.1c-0.3-0.2-0.5-0.4-0.8-0.6c0,0-0.1-0.1-0.1-0.1 c-0.6-0.4-1.2-0.6-1.9-0.8c0,0-0.1,0-0.1,0c-0.6-0.1-1.2-0.2-1.8-0.2h-209c-4.1,0-7.5,3.4-7.5,7.5v324.4c0,4.1,3.4,7.5,7.5,7.5 H395.6z M332.9,114l46.4,53.9h-46.4V114z M123.9,101.3h194v74.1c0,4.1,3.4,7.5,7.5,7.5h62.8v227.7H123.9V101.3z" />
        <path d="M183.8,265.1c-21.1,0-38.2,17.1-38.2,38.2c0,9.3,3.3,17.8,8.9,24.4v55.4c0,2.8,1.6,5.4,4.1,6.7c2.5,1.3,5.5,1.1,7.8-0.6 l17.5-12.5l17.4,12.5c1.3,0.9,2.8,1.4,4.4,1.4c1.2,0,2.3-0.3,3.4-0.8c2.5-1.3,4.1-3.9,4.1-6.7v-55.4c5.5-6.6,8.9-15.1,8.9-24.4 C222,282.3,204.9,265.1,183.8,265.1z M183.8,280.1c12.8,0,23.2,10.4,23.2,23.2s-10.4,23.2-23.2,23.2c-6.4,0-12.3-2.6-16.5-6.9 c0,0,0,0-0.1-0.1c-4.1-4.2-6.6-9.9-6.6-16.2C160.6,290.5,171,280.1,183.8,280.1z M188.2,361.3c-2.6-1.9-6.1-1.9-8.8,0l-10,7.2 v-29.8c4.4,1.8,9.3,2.8,14.3,2.8c5.1,0,9.9-1,14.3-2.8v29.8L188.2,361.3z" />
        <path d="M155.9,146.5h27.9c4.1,0,7.5-3.4,7.5-7.5s-3.4-7.5-7.5-7.5h-27.9c-4.1,0-7.5,3.4-7.5,7.5S151.8,146.5,155.9,146.5z" />
        <path d="M263.7,163.5H155.9c-4.1,0-7.5,3.4-7.5,7.5s3.4,7.5,7.5,7.5h107.8c4.1,0,7.5-3.4,7.5-7.5S267.8,163.5,263.7,163.5z" />
        <path d="M263.7,195.6H155.9c-4.1,0-7.5,3.4-7.5,7.5s3.4,7.5,7.5,7.5h107.8c4.1,0,7.5-3.4,7.5-7.5S267.8,195.6,263.7,195.6z" />
      </g>
    </g>
  </svg>
);

export default function InteractiveShowcase({ lang }: Props) {
  const isAr = lang === "ar";
  const [selectedGate, setSelectedGate] = useState<GateId>("gate1");
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Smooth scroll helper
  const handleInquireClick = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Content Translations
  const content = {
    en: {
      subtitle: "Service Timeline & Requirements",
      title: "How We Support You",
      description: "Understand our professional client workflow and check typical processing timelines, official state/federal agencies, and required documents for your specific needs.",
      
      // Step workflow
      workflowTitle: "Our Structured Process",
      steps: [
        {
          num: "01",
          title: "Advisory Intake",
          desc: "Submit your initial case details through our secure form. We match your files to the precise gateway requirements."
        },
        {
          num: "02",
          title: "Document Gathering",
          desc: "We verify support certificates, coordinate USCIS-certified translations, and review formatting standards."
        },
        {
          num: "03",
          title: "State & Federal Filing",
          desc: "We compile and transmit your files to USCIS, the Texas Secretary of State, IRS, or target regulatory authorities."
        },
        {
          num: "04",
          title: "Certified Delivery",
          desc: "Download verified digital files or receive apostilled certificates and state credentials securely via premium express courier."
        }
      ],

      // Estimator Widget
      estimatorTitle: "Interactive Service & Timeline Estimator",
      estimatorSubtitle: "Select a service division below to calculate real-world administrative standards",
      timeLabel: "Typical Processing Time",
      authorityLabel: "Involved Authority",
      requirementsLabel: "Required Client Documents",
      complianceLabel: "Compliance Assurance",
      nextActionLabel: "Next Administrative Step",
      ctaLabel: "Inquire About This Service",

      gates: {
        gate1: {
          title: "US Visas & Immigration Support",
          badge: "Gate 1",
          time: "12 to 24 Weeks (Varies by Visa Category)",
          authority: "USCIS (U.S. Citizenship & Immigration Services) & Department of Labor",
          compliance: "Rigorously pre-screened to minimize Request for Evidence (RFE) risks and ensure exact prevailing wage compliance.",
          requirements: [
            "Clear copy of passport data page and current I-94 record",
            "Academic transcripts, degrees, and certified evaluation sheets (for employment visas)",
            "Detailed sponsor business profile or complete family relationship certificates",
            "Certified legal translations for all foreign civil credentials"
          ],
          nextStep: "Schedule an advisory intake review. We will evaluate employment sponsorship thresholds or family eligibility criteria."
        },
        gate2: {
          title: "Certified Legal Translation",
          badge: "Gate 2",
          time: "24 to 48 Hours",
          authority: "USCIS, Academic Institutions, and US Federal Courts",
          compliance: "100% USCIS and Department of State compliant translation affidavit signed and stamped by our authorized team.",
          requirements: [
            "High-resolution digital scans or clean photos of original documents",
            "Exact spelling of all full names in English as listed on valid passports",
            "Specific educational or state department formatting guidelines (if applicable)"
          ],
          nextStep: "Upload documents using our secure inquiry portal for an instant fixed-price certified translation quote."
        },
        gate3: {
          title: "Texas Notary & Apostille",
          badge: "Gate 3",
          time: "1 to 5 Business Days",
          authority: "Texas Secretary of State, County Clerk, and Destination Consulates",
          compliance: "Executed by a licensed Texas Notary Public and internationally certified under the Hague Apostille Convention.",
          requirements: [
            "Original physical documents or authenticated digital copies requiring legal certification",
            "Valid state-issued photo ID or international passport for signer notary log",
            "Explicit declaration of the final destination country to ensure certificate compliance"
          ],
          nextStep: "Initiate apostille processing. We will file directly with the Texas Secretary of State and coordinate secure shipping."
        },
        gate4: {
          title: "Legal Administrative Assistance",
          badge: "Gate 4",
          time: "Project-Based / Continuous Maintenance",
          authority: "State Bar Organizations & Active Partner Law Firms",
          compliance: "Strict adherence to American Bar Association (ABA) compliance codes. Supporting licensed attorneys strictly as assistants.",
          requirements: [
            "Detailed case briefing briefs or administrative outline of legal search tasks",
            "Draft contract guidelines or folder system organizational rules",
            "Clear timeline constraints for court filings and witness coordination"
          ],
          nextStep: "Review of task requirements with your lead legal coordinator. We define scope-of-work parameters before drafting files."
        },
        gate5: {
          title: "SME Bookkeeping & Financials",
          badge: "Gate 5",
          time: "Monthly & Quarterly Reporting Cycles",
          authority: "IRS (Internal Revenue Service) & State Comptrollers",
          compliance: "Continuous ledger alignment to prevent year-end tax delays and maintain complete compliance with DOL payroll codes.",
          requirements: [
            "Business checking, savings, and merchant processor statement feeds",
            "Active employee roster with approved wage rates and completed timesheets",
            "Prior year federal corporate tax return and balance sheet opening records"
          ],
          nextStep: "Connect with our financial assistant. We will organize a ledger audit and setup recurring monthly account reconciliations."
        }
      }
    },
    ar: {
      subtitle: "مراحل المعاملات وتقدير الأوقات",
      title: "كيف نعمل لخدمتكم",
      description: "استكشف خطة العمل المهنية التي نتبعها في معالجة طلباتكم، وتحقق من مدد الإنجاز المعتادة، والجهات الحكومية المسؤولة، والمستندات المطلوبة لكل خدمة.",
      
      // Step workflow
      workflowTitle: "دورة معالجة المعاملات المنظمة",
      steps: [
        {
          num: "01",
          title: "مراجعة الاستشارة الأولية",
          desc: "إرسال تفاصيل طلبك بأمان عبر النموذج. يقوم فريقنا بمطابقة أوراقك مع متطلبات البوابة والخدمة الصحيحة."
        },
        {
          num: "02",
          title: "تجهيز وتدقيق المستندات",
          desc: "نقوم بالتحقق من المستندات الداعمة، وتنسيق الترجمة المعتمدة لملفات الهجرة، والتدقيق الشامل لضمان خلوها من الأخطاء."
        },
        {
          num: "03",
          title: "التقديم الرسمي والإداري",
          desc: "نقوم بصياغة المعاملات وإرسالها رسمياً لإدارة الهجرة الأمريكية (USCIS)، أو سكرتارية ولاية تكساس، أو الضرائب والجهات المعنية."
        },
        {
          num: "04",
          title: "التسليم والمصادقة الأمنة",
          desc: "تحميل الملفات الرقمية المعتمدة فوراً أو استلام الوثائق الأصلية والشهادات المصدقة (أبوستيل) عبر الشحن الدولي السريع والآمن."
        }
      ],

      // Estimator Widget
      estimatorTitle: "حاسبة تقدير الخدمات والمدد التفاعلية",
      estimatorSubtitle: "اختر القسم الخدمي أدناه لعرض معايير التقدير والسرعة والامتثال الإداري الفوري",
      timeLabel: "فترة الإنجاز المتوقعة",
      authorityLabel: "الجهة الرسمية المعنية",
      requirementsLabel: "الوثائق والمستندات المطلوبة من العميل",
      complianceLabel: "ضمان الامتثال والرقابة",
      nextActionLabel: "الخطوة الإدارية التالية",
      ctaLabel: "استفسر عن هذه الخدمة الآن",

      gates: {
        gate1: {
          title: "خدمات التأشيرات والهجرة الأمريكية",
          badge: "البوابة 1",
          time: "من 12 إلى 24 أسبوعاً (تختلف حسب نوع التأشيرة المحددة)",
          authority: "إدارة الهجرة والمواطنة الأمريكية (USCIS) ووزارة العمل بالولايات المتحدة",
          compliance: "مراجعة شاملة لتقليل احتمالات طلبات الأدلة الإضافية (RFE) وضمان المطابقة التامة لمعدلات الأجور المعمول بها لوزارة العمل.",
          requirements: [
            "نسخة واضحة من جواز السفر مع سجل الدخول I-94 الحالي",
            "الشهادات الأكاديمية، كشوف الدرجات، وتقارير التقييم المعادلة (لتأشيرات العمل والعمالة)",
            "الملف التجاري والمالي للشركة الكفيلة أو وثائق إثبات الصلة العائلية المكتملة",
            "ترجمة قانونية معتمدة لجميع الوثائق الرسمية الصادرة من خارج أمريكا"
          ],
          nextStep: "حجز موعد مراجعة أولي لتقييم كفالة العمل أو معايير الأهلية العائلية لملفكم الإداري."
        },
        gate2: {
          title: "الترجمة القانونية المعتمدة",
          badge: "البوابة 2",
          time: "خلال 24 إلى 48 ساعة فقط",
          authority: "إدارة الهجرة الأمريكية (USCIS)، الجامعات والمؤسسات التعليمية، والمحاكم الفيدرالية",
          compliance: "إرفاق إقرار المترجم المعتمد (Affidavit) المطابق تماماً لشروط إدارة الهجرة (USCIS) ووزارة الخارجية الأمريكية.",
          requirements: [
            "نسخ ضوئية رقمية عالية الدقة أو صور واضحة جداً للوثائق الأصلية المراد ترجمتها",
            "التهجئة الصحيحة للأسماء الكاملة باللغة الإنجليزية كما تظهر في جواز السفر الساري",
            "أي تعليمات تنسيقية خاصة مطلوبة من الكلية أو الدائرة الرسمية الموجهة إليها الترجمة"
          ],
          nextStep: "أرسل وثائقك عبر نموذج التواصل الإلكتروني للحصول على تسعيرة فورية ثابتة وتأكيد البدء."
        },
        gate3: {
          title: "التوثيق وتصديق الأبوستيل بولاية تكساس",
          badge: "البوابة 3",
          time: "من 1 إلى 5 أيام عمل بحد أقصى",
          authority: "وزارة الخارجية بولاية تكساس (Secretary of State)، كاتب العدل، والقنصليات الأجنبية",
          compliance: "صياغة معتمدة بواسطة كاتب عدل مرخص لولاية تكساس ومصادقة دولية رسمية وفق اتفاقية الأبوستيل السارية.",
          requirements: [
            "الوثائق والمستندات الأصلية أو النسخ الرسمية المطلوبة للمصادقة وتفعيلها قانونياً",
            "هوية وطنية مصورة أو جواز سفر ساري المفعول لإثبات الهوية أمام كاتب العدل",
            "تحديد اسم دولة الوجهة النهائية للمستندات لضمان التوافق الإداري الكامل"
          ],
          nextStep: "البدء في تجهيز المعاملة وتخليصها مباشرة من خارجية ولاية تكساس مع خيار الشحن الدولي السريع للموقع المطلوب."
        },
        gate4: {
          title: "الخدمات الإدارية والمساعدة القانونية",
          badge: "البوابة 4",
          time: "حسب نطاق العمل / عقود المتابعة والمساندة المستمرة",
          authority: "نقابات المحامين بالولايات ومكاتب المحاماة الشريكة المرخصة",
          compliance: "التزام كامل ومطلق بقواعد نقابة المحامين الأمريكية (ABA). دعم إداري مساند وحصري للمحامين دون ممارسة المحاماة المباشرة.",
          requirements: [
            "ملخص وقائع المعاملة أو الأوراق أو المهام البحثية القانونية المطلوبة بدقة",
            "مسودات العقود، أو خطوط التنسيق ونظام الفهرسة والتصنيف المعتمد في مكتبكم",
            "الآجال الزمنية والمواعيد النهائية المحددة لتقديم المستندات والتنسيق الإداري"
          ],
          nextStep: "جدولة جلسة عمل إدارية لتحديد نطاق المهام الموكلة والمعايير التشغيلية المعتمدة قبل صياغة الملفات."
        },
        gate5: {
          title: "محاسبة الشركات الصغيرة وحلول الأجور",
          badge: "البوابة 5",
          time: "دورات تقارير دورية شهرية وربع سنوية متكاملة",
          authority: "مصلحة الضرائب الأمريكية (IRS) ووزارات العمل والمحاسبة المحلية بالولايات",
          compliance: "مطابقة وتحديث الدفاتر المحاسبية باستمرار لتفادي متأخرات مصلحة الضرائب والالتزام بنظم دفع الأجور والعمل الحكومية.",
          requirements: [
            "كشوف الحسابات البنكية وحسابات بطاقات الائتمان وبوابات الدفع الإلكترونية للشركة",
            "كشوفات بيانات الموظفين ومعدلات الأجور المعتمدة وسجلات ساعات العمل التفصيلية",
            "الإقرارات الضريبية للسنة الماضية والميزانية الافتتاحية المعتمدة للمؤسسة"
          ],
          nextStep: "ربط حساباتك مع مستشارنا المالي لمراجعة دفاتر المعاملات وتهيئة دورة المحاسبة الشهرية المتكاملة."
        }
      }
    }
  };

  const currentLanguageContent = content[lang];
  const activeGateData = currentLanguageContent.gates[selectedGate] as ServiceData;

  const gateKeys: GateId[] = ["gate1", "gate2", "gate3", "gate4", "gate5"];

  return (
    <section
      className="relative min-h-screen bg-[#1B2C6B] py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 border-t border-white/15"
      id="showcase_section"
    >
      {/* Absolute Decorative Background Element */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B8922A]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#B8922A]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#B8922A] mb-3 block" id="showcase_subtitle">
            {currentLanguageContent.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-white mb-6" id="showcase_title">
            {currentLanguageContent.title}
          </h2>
          <p className="text-sm md:text-base text-[#F5F5F0]/80 font-sans" id="showcase_desc">
            {currentLanguageContent.description}
          </p>
        </div>

        {/* 1. Our Structured Process Step-Timeline */}
        <div className="mb-24" id="workflow_container">
          <h3 className="text-lg md:text-xl font-sans font-medium text-white mb-10 text-center flex items-center justify-center gap-2">
            <HelpingHand className="w-5 h-5 text-[#B8922A]" />
            <span>{currentLanguageContent.workflowTitle}</span>
          </h3>

          <div 
            className="flex flex-col lg:flex-row gap-4 lg:gap-2.5 min-h-[210px] w-full relative" 
            id="workflow_interactive_cards"
            onMouseLeave={() => setActiveStep(null)}
          >
            {currentLanguageContent.steps.map((step, idx) => {
              const isExpanded = activeStep === idx;
              const stepIcons = [ConferenceIcon, FolderIcon, CabinetIcon, DeliveryIcon];
              const StepIcon = stepIcons[idx] || ConferenceIcon;

              const connectorPositionClasses = isAr
                ? "bottom-[-21px] left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:left-[-22px] lg:right-auto lg:translate-x-0"
                : "bottom-[-21px] left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-[-22px] lg:left-auto lg:translate-x-0";

              const chevronRotationClass = isAr
                ? "rotate-90 lg:rotate-180"
                : "rotate-90 lg:rotate-0";

              const baseZ = (4 - idx) * 10;
              const finalZ = isExpanded ? baseZ + 5 : baseZ;

              return (
                <motion.div
                  key={idx}
                  layout
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  className={`relative border rounded-xl p-4 sm:p-5 transition-all duration-500 cursor-pointer flex flex-col justify-between group select-none ${
                    isExpanded
                      ? "bg-white/[0.08] border-[#B8922A] shadow-[0_12px_24px_rgba(184,146,42,0.1)] lg:flex-[2.2]"
                      : "bg-white/[0.03] border-white/10 lg:flex-1 hover:bg-white/[0.06] hover:border-white/20"
                  }`}
                  style={{ zIndex: finalZ }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  {/* Card Content Top half */}
                  <div className="w-full">
                    {/* Header: Badge & Icon side-by-side or stacked depending on state */}
                    <div className={`flex items-center gap-3 transition-all duration-300 ${
                      isExpanded ? "justify-between" : "flex-col justify-center text-center"
                    }`}>
                      {/* Number badge */}
                      <div className={`w-8 h-8 rounded-lg bg-[#1B2C6B] border flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                        isExpanded ? "border-[#B8922A] text-[#B8922A] shadow-[0_0_10px_rgba(184,146,42,0.2)] scale-105" : "border-white/10 text-white/40"
                      }`}>
                        {step.num}
                      </div>

                      {/* Icon */}
                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                        isExpanded ? "bg-[#B8922A]/10 text-[#B8922A] scale-105" : "bg-white/5 text-white/30 group-hover:text-white/50"
                      }`}>
                        <StepIcon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className={`mt-4 transition-all duration-300 ${
                      isExpanded ? (isAr ? "text-right" : "text-left") : "text-center"
                    }`}>
                      <h4 className={`text-sm sm:text-base font-semibold font-sans tracking-tight transition-colors duration-300 ${
                        isExpanded 
                          ? "text-white" 
                          : "text-white/60 group-hover:text-white/80"
                      }`}>
                        {step.title}
                      </h4>
                    </div>

                    {/* Expandable description text */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden mt-3"
                        >
                          <p className={`text-sm text-[#F5F5F0]/90 leading-relaxed font-sans ${
                            isAr ? "text-right" : "text-left"
                          }`}>
                            {step.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Active bottom glow accent */}
                  {isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8922A] rounded-b-xl" />
                  )}

                  {/* Circular step connectors (pointing next, absolutely nested for clean boundary overlap) */}
                  {idx < 3 && (
                    <div className={`absolute z-20 flex items-center justify-center transition-all duration-500 ${connectorPositionClasses}`}>
                      {/* Outer concentric layer circle */}
                      <div className="w-[34px] h-[34px] rounded-full bg-[#1B2C6B] border border-[#B8922A]/30 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                        {/* Inner circular icon button */}
                        <div className="w-[24px] h-[24px] rounded-full border border-[#B8922A]/50 bg-[#1B2C6B] flex items-center justify-center text-[#B8922A] shadow-[0_2px_6px_rgba(184,146,42,0.25)] transition-colors duration-300">
                          <HalftoneChevron className={`w-3 h-3 transition-transform duration-300 ${chevronRotationClass}`} />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Service & Timeline Estimator */}
        <div className="max-w-5xl mx-auto" id="estimator_container">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-sans font-medium text-white mb-2">
              {currentLanguageContent.estimatorTitle}
            </h3>
            <p className="text-xs md:text-sm text-[#F5F5F0]/60">
              {currentLanguageContent.estimatorSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Panel: Service selector buttons */}
            <div className="lg:col-span-5 flex flex-col gap-3 w-full" id="estimator_service_selector">
              {gateKeys.map((gateId) => {
                const gateData = currentLanguageContent.gates[gateId] as ServiceData;
                const isActive = selectedGate === gateId;

                return (
                  <button
                    key={gateId}
                    onClick={() => setSelectedGate(gateId)}
                    className={`w-full text-start p-4 rounded-xl border transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? "bg-[#B8922A] border-[#B8922A] text-[#1B2C6B] font-bold shadow-xl translate-x-1"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="space-y-1">
                      <span className={`text-[10px] font-mono font-bold tracking-wider block uppercase ${
                        isActive ? "text-[#1B2C6B]/80" : "text-[#B8922A]"
                      }`}>
                        {gateData.badge}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold font-sans block">
                        {gateData.title}
                      </span>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                      isActive 
                        ? `translate-y-1 lg:translate-y-0 ${isAr ? "lg:-translate-x-1" : "lg:translate-x-1"} text-[#1B2C6B]` 
                        : `text-white/40 group-hover:translate-y-1 lg:group-hover:translate-y-0 ${isAr ? "lg:group-hover:-translate-x-1" : "lg:group-hover:translate-x-1"}`
                    } rotate-90 ${isAr ? "lg:rotate-180" : "lg:rotate-0"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Panel: Estimated stats detail card */}
            <div className="lg:col-span-7" id="estimator_details_panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedGate}
                  initial={{ opacity: 0, x: isAr ? -15 : 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isAr ? 15 : -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-black/10 text-[#2C2C2C] shadow-2xl relative overflow-hidden"
                >
                  {/* Category Accent Stripe */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B8922A]" />

                  {/* Top Line Title */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-black/10">
                    <span className="text-xs font-mono font-bold uppercase text-[#B8922A] bg-[#B8922A]/10 px-2.5 py-1 rounded-md">
                      {activeGateData.badge}
                    </span>
                    <h4 className={`text-base sm:text-lg font-sans font-bold text-[#1B2C6B] flex flex-wrap ${isAr ? "justify-end text-right" : "justify-start text-left"}`}>
                      {activeGateData.title.split(" ").map((word, i) => (
                        <LightTitleWordReveal
                          key={`${word}-${i}`}
                          word={word}
                          index={i}
                        />
                      ))}
                    </h4>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-6 text-start">
                    
                    {/* Duration Row */}
                    <div className="flex gap-4 items-start">
                      <div className="p-2.5 bg-[#1B2C6B]/5 text-[#1B2C6B] rounded-lg shrink-0">
                        <Clock className="w-5 h-5 text-[#B8922A]" />
                      </div>
                      <div>
                        <span className="text-[10px] text-black/40 uppercase font-mono block tracking-wider">
                          {currentLanguageContent.timeLabel}
                        </span>
                        <span className="text-sm md:text-base font-bold text-[#1B2C6B]">
                          {activeGateData.time}
                        </span>
                      </div>
                    </div>

                    {/* Authority Row */}
                    <div className="flex gap-4 items-start">
                      <div className="p-2.5 bg-[#1B2C6B]/5 text-[#1B2C6B] rounded-lg shrink-0">
                        <Landmark className="w-5 h-5 text-[#B8922A]" />
                      </div>
                      <div>
                        <span className="text-[10px] text-black/40 uppercase font-mono block tracking-wider">
                          {currentLanguageContent.authorityLabel}
                        </span>
                        <span className="text-xs md:text-sm font-semibold text-[#2C2C2C]">
                          {activeGateData.authority}
                        </span>
                      </div>
                    </div>

                    {/* Requirements Checkbox Panel */}
                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-3">
                      <span className="text-[10px] text-black/40 uppercase font-mono block tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#B8922A]" />
                        <span>{currentLanguageContent.requirementsLabel}</span>
                      </span>
                      <ul className="space-y-2.5">
                        {activeGateData.requirements.map((req, index) => (
                          <li key={index} className="flex gap-2.5 items-start text-xs text-[#2C2C2C]/80 leading-relaxed">
                            <Check className="w-4 h-4 text-[#B8922A] mt-0.5 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compliance Note */}
                    <div className="flex gap-3 text-xs bg-[#B8922A]/10 border border-[#B8922A]/25 p-4 rounded-xl text-[#1B2C6B]">
                      <ShieldCheck className="w-5 h-5 text-[#B8922A] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-0.5">
                          {currentLanguageContent.complianceLabel}
                        </span>
                        <p className="text-[#2C2C2C]/85 leading-relaxed font-sans">
                          {activeGateData.compliance}
                        </p>
                      </div>
                    </div>

                    {/* Next Action & CTA */}
                    <div className="pt-2 border-t border-black/5 space-y-4">
                      <div>
                        <span className="text-[10px] text-black/40 uppercase font-mono block tracking-wider mb-1">
                          {currentLanguageContent.nextActionLabel}
                        </span>
                        <p className="text-xs text-[#2C2C2C]/75 font-sans leading-relaxed">
                          {activeGateData.nextStep}
                        </p>
                      </div>

                      <button
                        onClick={handleInquireClick}
                        className="w-full bg-[#1B2C6B] text-white py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-[#B8922A] hover:text-[#1B2C6B] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer focus:outline-none font-sans select-none"
                      >
                        <span>{currentLanguageContent.ctaLabel}</span>
                        <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                      </button>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
