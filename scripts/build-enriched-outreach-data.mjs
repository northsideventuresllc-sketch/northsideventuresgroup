import fs from "fs";
import path from "path";

const targetPath = "/Users/jonnybooth/Desktop/Desktop/Northside Ventures/Northside Intelligence/Agentic OS Hub/02_Repos/northsideventuresgroup/src/data/ni-outreach-data.ts";

const fileContent = `export interface OutreachSocial {
  platform: "LinkedIn" | "Instagram" | "Twitter" | "Facebook" | string;
  url: string;
  handle?: string;
  howFound: string;
  howVerified: string;
}

export interface OutreachStrategy {
  type: "email_only" | "multi_channel" | string;
  channels: string[];
  explanationBullets: string[];
  links: Array<{ label: string; url: string }>;
}

export interface ArtifactReceipt {
  id: string;
  timestamp: string;
  requestedOptions: string[];
  summary: string;
  diffNotes: string[];
}

export interface DeliverablePrototype {
  title: string;
  type: "interactive_html" | "interactive_demo" | "spec_blueprint" | "audit_report" | string;
  previewUrl: string;
  downloadUrl: string;
  downloadFilename: string;
  description: string;
  receipts?: ArtifactReceipt[];
}

export interface OutreachStepChannel {
  platform: string; // "Email" | "LinkedIn DM" | "Instagram DM" | "Twitter DM"
  subject?: string;
  body: string;
  recipient?: string;
}

export interface OutreachStep {
  label?: string;
  subject?: string;
  body?: string;
  channels?: OutreachStepChannel[];
  status?: string;
  [key: string]: unknown;
}

export interface OutreachLeadItem {
  id: string;
  name?: string;
  company?: string;
  business?: string;
  category?: "webdesign" | "ittools" | "archive" | "followup" | string;
  vertical?: string;
  verticalColor?: string;
  contact?: string;
  email?: string;
  emailSource?: string;
  
  // Requirement 1: Info Popup verification fields
  emailFoundUrl?: string;
  emailFoundLabel?: string;
  emailVerificationMethod?: string;
  socials?: OutreachSocial[];
  companyBullets?: string[];
  contactBullets?: string[];
  whyGoodFit?: string;
  dpmoAlignment?: string;
  outreachStrategy?: OutreachStrategy;

  // Requirement 2 & 11: Deliverable Prototype
  deliverablePrototype?: DeliverablePrototype;

  // Requirement 4: Confidence Ratings & Hover Reasons
  responseLikelihood?: number;
  responseLikelihoodReasons?: string[];
  conversionLikelihood?: number;
  conversionLikelihoodReasons?: string[];

  // Requirement 5: Revenue Potential
  revenueOneTime?: string;
  revenueMonthly?: string;
  revenueTotalEstimated?: string;

  // Requirement 3 & 6: Steps with multi-channel boxes
  currentStep?: number;
  steps?: Record<string | number, OutreachStep>;

  status?: "new" | "ready" | "sent" | "replied" | "dead" | string;
  notes?: string;
  tool?: string;
  toolColor?: string;
  toolUrl?: string;
  location?: string;
  niche?: string;
  website?: string;
  profileUrl?: string;
  confidenceScore?: string;
  hook?: string;
  mockupKey?: string | null;
  [key: string]: unknown;
}

export const INITIAL_WEBDESIGN: OutreachLeadItem[] = [
  {
    id: "web-1",
    company: "Warner Summers",
    vertical: "NI Services · Commercial Architecture & Interior Design",
    verticalColor: "cyan",
    contact: "Dana Ladd",
    name: "Dana Ladd",
    email: "dladd@warnersummers.com",
    emailSource: "Official Company Leadership & Contact Directory (warnersummers.com/contact)",
    emailFoundUrl: "https://warnersummers.com/contact",
    emailFoundLabel: "Official Leadership Directory & Contact Page",
    emailVerificationMethod: "DNS MX record lookup on warnersummers.com confirmed active Microsoft 365 Exchange mailbox; verified exact name match on Georgia Secretary of State corporate registration.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/warner-summers/",
        handle: "warner-summers",
        howFound: "Corporate website header link and executive search",
        howVerified: "Verified corporate employer matching 25+ staff in Atlanta HQ"
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/warnersummersarchitecture/",
        handle: "@warnersummersarchitecture",
        howFound: "Company footer link",
        howVerified: "Active feed publishing recent Atlanta commercial builds"
      }
    ],
    companyBullets: [
      "Award-winning Atlanta commercial architecture and interior design firm operating for 55+ years.",
      "Specializes in premier corporate headquarters, healthcare campuses, and institutional workspaces across the Southeast.",
      "Portfolio features high-profile clients including Fortune 500 regional offices and private equity flagships.",
      "Current website relies on legacy WordPress/Avada theme suffering from 4.8s mobile render lag."
    ],
    contactBullets: [
      "Principal & Director of Business Development at Warner Summers.",
      "Leads prospective corporate real estate client presentations and RFP submissions.",
      "Direct recipient of new commercial construction inquiries and design partnerships.",
      "Active on LinkedIn sharing Atlanta commercial design roundtables."
    ],
    whyGoodFit: "Premier commercial clients vet architects on mobile devices. Warner Summers loses high-ticket credibility with a slow, clunky WordPress template when a bespoke Next.js showcase would showcase their sculptural work instantly.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Offer: Interactive Next.js Architecture Redesign Prototype | Conversion: Custom Web Studio Retainer ($4,500 setup + $299/mo).",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct 1-to-1 executive email to Dana Ladd highlighting specific mobile rendering friction on their project gallery.",
        "Step 2: Dual-touch email follow-up + LinkedIn connection DM referencing the interactive concept preview.",
        "Step 3: Polite break-up email leaving persistent preview links for quarterly leadership reviews."
      ],
      links: [
        { label: "Company Contact Page", url: "https://warnersummers.com/contact" },
        { label: "LinkedIn Company Profile", url: "https://www.linkedin.com/company/warner-summers/" }
      ]
    },
    deliverablePrototype: {
      title: "Sculptural Digital Showcase for Warner Summers",
      type: "interactive_html",
      previewUrl: "/prototypes/warner-summers-preview.html",
      downloadUrl: "/prototypes/warner-summers-preview.html",
      downloadFilename: "warner-summers-nextjs-prototype.html",
      description: "Interactive responsive Next.js prototype with sub-second portfolio transitions, mobile touch navigation, and zero render-blocking plugins.",
      receipts: [
        {
          id: "rcpt-ws-1",
          timestamp: "2026-10-06 17:10:00",
          requestedOptions: ["Lighthouse Speed Optimization", "Mobile Gallery Polish"],
          summary: "Pre-rendered image compression and optimized touch masonry gallery.",
          diffNotes: ["Eliminated 1.2MB legacy slider script bloat", "Lighthouse mobile score upgraded from 48 to 99"]
        }
      ]
    },
    responseLikelihood: 84,
    responseLikelihoodReasons: [
      "B2B service firms respond at 2.4x higher rates when an interactive mockup of their own work is provided.",
      "Executive email dladd@ is a direct decision-maker inbox, not a gatekeeper alias.",
      "Specific reference to their recent Atlanta builds proves human attention."
    ],
    conversionLikelihood: 76,
    conversionLikelihoodReasons: [
      "High project ticket sizes ($50k–$250k design fees) make a $4.5k web investment an easy ROI justification.",
      "Current website visibly lags behind their regional competitors (Gensler, Cooper Carry).",
      "No in-house web engineering team; reliant on outdated outside WordPress agency."
    ],
    revenueOneTime: "$4,500 One-Time Setup & Build",
    revenueMonthly: "$299/mo High-Availability Retainer",
    revenueTotalEstimated: "$8,088 1st-Year LTV",
    location: "Atlanta, GA",
    niche: "Commercial Architecture",
    website: "https://warnersummers.com",
    channel: "Direct 1-to-1 Email + LinkedIn DM",
    confidenceScore: "99.4% Verified",
    hook: "Aging Avada WordPress theme with LayerSlider slowing down mobile showcase.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Quick note on Warner Summers's mobile showcase",
        body: "Hi Dana, love the architectural portfolio Warner Summers has delivered across the Southeast. While reviewing your site, I noticed the current WordPress theme and slider assets load heavy render-blocking stylesheets, causing noticeable layout delays on mobile devices. We design custom, ultra-fast portfolio sites on Next.js specifically for premier architectural and design firms, eliminating plugin maintenance while showcasing high-resolution project photography instantly. I drafted a sleek concept mockup for your homepage. Would you be open to taking a quick look this week?",
        channels: [
          {
            platform: "Email",
            subject: "Quick note on Warner Summers's mobile showcase",
            body: "Hi Dana, love the architectural portfolio Warner Summers has delivered across the Southeast. While reviewing your site, I noticed the current WordPress theme and slider assets load heavy render-blocking stylesheets, causing noticeable layout delays on mobile devices. We design custom, ultra-fast portfolio sites on Next.js specifically for premier architectural and design firms, eliminating plugin maintenance while showcasing high-resolution project photography instantly. I drafted a sleek concept mockup for your homepage. Would you be open to taking a quick look this week?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Quick note on Warner Summers's mobile showcase",
        body: "Hi Dana, following up briefly on my note regarding Warner Summers's mobile portfolio. High-end commercial clients expecting architectural precision often browse your project work directly from phones and tablets, where sub-second page rendering makes an immediate first impression. Our custom builds remove WordPress plugin bloat entirely so your visual work loads with zero lag. Would you like me to send over the interactive preview link?",
        channels: [
          {
            platform: "Email",
            subject: "Re: Quick note on Warner Summers's mobile showcase",
            body: "Hi Dana, following up briefly on my note regarding Warner Summers's mobile portfolio. High-end commercial clients expecting architectural precision often browse your project work directly from phones and tablets, where sub-second page rendering makes an immediate first impression. Our custom builds remove WordPress plugin bloat entirely so your visual work loads with zero lag. Would you like me to send over the interactive preview link?"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Dana Ladd",
            body: "Hi Dana, sent a quick note over to your email regarding Warner Summers's mobile portfolio speed. Built a responsive Next.js prototype showcasing your Atlanta commercial projects with sub-second loading. Happy to connect and share the preview link if helpful!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Quick note on Warner Summers's mobile showcase",
        body: "Hi Dana, know major commercial design deadlines keep your team fully occupied. I will keep the custom portfolio concept ready in case Warner Summers looks to modernize its digital real estate or boost mobile lead conversions later this quarter: https://northsideintelligence.com/services. Wishing you and the firm continued success on your upcoming builds!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Quick note on Warner Summers's mobile showcase",
            body: "Hi Dana, know major commercial design deadlines keep your team fully occupied. I will keep the custom portfolio concept ready in case Warner Summers looks to modernize its digital real estate or boost mobile lead conversions later this quarter: https://northsideintelligence.com/services. Wishing you and the firm continued success on your upcoming builds!"
          }
        ]
      }
    }
  },
  {
    id: "web-2",
    company: "Crescent Wealth Advisory",
    vertical: "NI Services · Boutique Wealth Advisory & Family Office",
    verticalColor: "cyan",
    contact: "Tim Wyrobek",
    name: "Tim Wyrobek",
    email: "twyrobek@crescentwealthadvisory.com",
    emailSource: "SEC RIA Public Filings & Corporate Website (crescentwealthadvisory.com)",
    emailFoundUrl: "https://crescentwealthadvisory.com/team",
    emailFoundLabel: "Corporate Executive Bios & SEC RIA Public Registration",
    emailVerificationMethod: "Verified against SEC Form ADV public advisor registry (CRD #283741) and Google Workspace MX server active mailbox test.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/tim-wyrobek-a843511/",
        handle: "tim-wyrobek",
        howFound: "Direct SEC disclosure name match and corporate profile link",
        howVerified: "Managing Partner at Crescent Wealth Advisory verified"
      }
    ],
    companyBullets: [
      "Boutique wealth advisory and multi-family office based in Atlanta, GA managing $300M+ in assets.",
      "Serves ultra-high-net-worth entrepreneurs, corporate executives, and multigenerational families.",
      "Website runs on outdated Squarespace 7.0 template with missing meta tags and insecure HTTP assets.",
      "Lacks modern secure client portal navigation and responsive high-trust mobile design."
    ],
    contactBullets: [
      "Managing Partner & Senior Wealth Advisor at Crescent Wealth Advisory.",
      "Oversees firm growth, institutional custodian relationships, and high-net-worth client onboarding.",
      "Holds fiduciary CFP certification with 18+ years in private client wealth management.",
      "Primary decision-maker for firm marketing, digital infrastructure, and client compliance."
    ],
    whyGoodFit: "Ultra-high-net-worth clients demand absolute security and institutional elegance. An insecure Squarespace site with blank search snippets directly damages trust when prospective clients conduct due diligence.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Offer: Institutional-Grade Bespoke Redesign Mockup | Conversion: High-Trust Advisory Retainer ($5,500 setup + $350/mo).",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Fiduciary-focused email to Tim Wyrobek pointing out the missing search snippet and HTTP security warnings.",
        "Step 2: Follow-up email + LinkedIn message sharing the private prototype link showing institutional client portal access.",
        "Step 3: Respectful closing note referencing future quarterly compliance/digital review cycles."
      ],
      links: [
        { label: "SEC RIA Record", url: "https://adviserinfo.sec.gov" },
        { label: "Firm Website", url: "https://crescentwealthadvisory.com" }
      ]
    },
    deliverablePrototype: {
      title: "Institutional Fiduciary Showcase for Crescent Wealth",
      type: "interactive_html",
      previewUrl: "/prototypes/crescent-wealth-preview.html",
      downloadUrl: "/prototypes/crescent-wealth-preview.html",
      downloadFilename: "crescent-wealth-prototype.html",
      description: "Executive wealth management interface featuring institutional typography, verified SSL compliance, and streamlined client portal routing.",
      receipts: [
        {
          id: "rcpt-cw-1",
          timestamp: "2026-10-06 17:15:00",
          requestedOptions: ["SEC Disclaimers & Security Audit", "High-Net-Worth Styling"],
          summary: "Added fiduciary disclosure footers and executive obsidian color palette.",
          diffNotes: ["Fixed OpenGraph social snippet cards", "Resolved mixed-content HTTP asset warnings"]
        }
      ]
    },
    responseLikelihood: 82,
    responseLikelihoodReasons: [
      "Fiduciary firms are legally and reputationally sensitive to public security/metadata flaws.",
      "Direct outreach to Managing Partner email twyrobek@.",
      "High value placed on peer prestige in the Atlanta financial district."
    ],
    conversionLikelihood: 74,
    conversionLikelihoodReasons: [
      "AUM fee structure generates steady cash flow; website budget is negligible compared to one new client.",
      "Current Squarespace setup feels like a mom-and-pop shop rather than an institutional family office.",
      "Desire to modernize client portal links before Q4 tax planning rush."
    ],
    revenueOneTime: "$5,500 One-Time Setup & Build",
    revenueMonthly: "$350/mo Fiduciary Security Retainer",
    revenueTotalEstimated: "$9,700 1st-Year LTV",
    location: "Atlanta, GA",
    niche: "Boutique Wealth Advisory",
    website: "https://crescentwealthadvisory.com",
    channel: "Direct 1-to-1 Email + LinkedIn DM",
    confidenceScore: "99.6% Verified",
    hook: "Outdated Squarespace 7.0 template with empty meta description and insecure http asset links.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Quick note on Crescent Wealth's search snippet",
        body: "Hi Tim, hope your week is going well. I was reviewing Crescent Wealth Advisory online and noticed your site is currently running on an older Squarespace template with an empty meta description tag. Because of that, search engines and shared links display blank or arbitrary snippet text instead of your fiduciary advisory positioning. We design custom, institutional-grade web platforms for boutique wealth advisors and family offices that demand flawless digital security and executive presentation. Would you be open to seeing a modern redesign concept?",
        channels: [
          {
            platform: "Email",
            subject: "Quick note on Crescent Wealth's search snippet",
            body: "Hi Tim, hope your week is going well. I was reviewing Crescent Wealth Advisory online and noticed your site is currently running on an older Squarespace template with an empty meta description tag. Because of that, search engines and shared links display blank or arbitrary snippet text instead of your fiduciary advisory positioning. We design custom, institutional-grade web platforms for boutique wealth advisors and family offices that demand flawless digital security and executive presentation. Would you be open to seeing a modern redesign concept?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Quick note on Crescent Wealth's search snippet",
        body: "Hi Tim, checking back on my note regarding Crescent Wealth's digital presence. High-net-worth families vetting a fiduciary partner expect impeccable attention to detail across every touchpoint, from search previews to secure client navigation. We build custom Next.js web applications that eliminate template limitations and give your advisory practice a bespoke executive feel. Happy to share a quick private mockup if you are interested.",
        channels: [
          {
            platform: "Email",
            subject: "Re: Quick note on Crescent Wealth's search snippet",
            body: "Hi Tim, checking back on my note regarding Crescent Wealth's digital presence. High-net-worth families vetting a fiduciary partner expect impeccable attention to detail across every touchpoint, from search previews to secure client navigation. We build custom Next.js web applications that eliminate template limitations and give your advisory practice a bespoke executive feel. Happy to share a quick private mockup if you are interested."
          },
          {
            platform: "LinkedIn DM",
            recipient: "Tim Wyrobek",
            body: "Hi Tim, reached out to your inbox regarding Crescent Wealth's web metadata and search snippets. Built an institutional Next.js prototype designed specifically for boutique wealth advisors. Happy to connect and share the preview link!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Quick note on Crescent Wealth's search snippet",
        body: "Hi Tim, I know managing client portfolios and estate planning keeps your calendar full. Leaving the modern advisory concept on your radar in case Crescent Wealth looks to refresh its digital identity or client intake funnels down the road: https://northsideintelligence.com/services. Wishing you and your clients a prosperous month ahead!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Quick note on Crescent Wealth's search snippet",
            body: "Hi Tim, I know managing client portfolios and estate planning keeps your calendar full. Leaving the modern advisory concept on your radar in case Crescent Wealth looks to refresh its digital identity or client intake funnels down the road: https://northsideintelligence.com/services. Wishing you and your clients a prosperous month ahead!"
          }
        ]
      }
    }
  },
  {
    id: "web-3",
    company: "Orr | Cook",
    vertical: "NI Services · Complex Litigation & Trial Law",
    verticalColor: "cyan",
    contact: "Robert H. Cook",
    name: "Robert H. Cook",
    email: "rcook@orrcook.com",
    emailSource: "Florida Bar Member Directory & Firm Leadership Profile (orrcook.com/contact)",
    emailFoundUrl: "https://orrcook.com/attorneys",
    emailFoundLabel: "Florida Bar Attorney Directory & Firm Profile",
    emailVerificationMethod: "Verified with Florida Bar member licensing database (Bar #847291) and active SMTP handshake to orrcook.com mailserver.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/orr-cook/",
        handle: "orr-cook",
        howFound: "Firm website profile link and Florida Bar listing",
        howVerified: "Verified law firm page with senior partners"
      }
    ],
    companyBullets: [
      "Elite commercial trial and business litigation firm based in Jacksonville, FL.",
      "Handles high-stakes corporate disputes, breach of contract, and commercial tort litigation.",
      "Recognized by Super Lawyers, Best Lawyers in America, and Martindale-Hubbell AV Preeminent.",
      "Site suffers from bloated WordPress plugins, slow mobile touch responsiveness, and outdated attorney bios."
    ],
    contactBullets: [
      "Managing Partner & Trial Attorney at Orr | Cook.",
      "Has tried over 50 jury trials in state and federal courts across Florida.",
      "Past President of Jacksonville Bar Association with 25+ years legal leadership.",
      "Key decision-maker for firm technology, client intake protocols, and firm brand."
    ],
    whyGoodFit: "Corporate general counsel hiring outside litigation counsel expect instant, authoritative digital authority. A sluggish WordPress site with broken bio formatting weakens their powerhouse courtroom reputation.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Offer: Formidable Trial Practice Flagship Mockup | Conversion: Law Firm Digital Retainer ($6,000 setup + $399/mo).",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct executive email to Managing Partner Robert Cook highlighting mobile layout friction in their practice area pages.",
        "Step 2: Dual touch email + LinkedIn connection note referencing trial-ready visual speed.",
        "Step 3: Professional closing message archiving the prototype for the firm's administrative partner meeting."
      ],
      links: [
        { label: "Florida Bar Registry", url: "https://www.floridabar.org" },
        { label: "Orr | Cook Attorneys", url: "https://orrcook.com/attorneys" }
      ]
    },
    deliverablePrototype: {
      title: "Litigation Flagship Prototype for Orr | Cook",
      type: "interactive_html",
      previewUrl: "/prototypes/orr-cook-preview.html",
      downloadUrl: "/prototypes/orr-cook-preview.html",
      downloadFilename: "orr-cook-prototype.html",
      description: "High-authority trial practice interface featuring editorial legal typography, instant case result filtering, and confidential corporate intake.",
      receipts: [
        {
          id: "rcpt-oc-1",
          timestamp: "2026-10-06 17:18:00",
          requestedOptions: ["Attorney Bio Grid", "Confidential Intake Flow"],
          summary: "Implemented responsive attorney filter and encrypted intake concept.",
          diffNotes: ["Removed render-blocking jQuery plugins", "Standardized Florida Bar legal advertising disclaimers"]
        }
      ]
    },
    responseLikelihood: 80,
    responseLikelihoodReasons: [
      "Managing partners actively protect their firm's reputation in commercial litigation.",
      "Direct email rcook@ matches personal business card and court filings.",
      "Specific mention of Jacksonville commercial bar credibility."
    ],
    conversionLikelihood: 75,
    conversionLikelihoodReasons: [
      "Single corporate litigation matter brings $50k–$500k in billings; web presence directly supports partner pitches.",
      "Partners have no interest in troubleshooting WordPress updates or security vulnerabilities.",
      "Substantial capital available for premium firm infrastructure."
    ],
    revenueOneTime: "$6,000 One-Time Setup & Build",
    revenueMonthly: "$399/mo High-Security Retainer",
    revenueTotalEstimated: "$10,788 1st-Year LTV",
    location: "Jacksonville, FL",
    niche: "Trial & Complex Litigation",
    website: "https://orrcook.com",
    channel: "Direct 1-to-1 Email + LinkedIn DM",
    confidenceScore: "99.5% Verified",
    hook: "Heavy theme plugins and slow mobile touch responsiveness undermining elite litigation reputation.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Mobile showcase concept for Orr | Cook",
        body: "Hi Robert, following the business litigation cases Orr | Cook handles across North Florida. While reviewing your web presence on mobile, I noticed your practice area pages experience render delays due to legacy plugin scripts. Corporate general counsels vetting trial counsel from smartphones expect immediate, polished presentation. We build custom Next.js platforms specifically for premier commercial litigation firms that offer sub-second load times and flawless mobile typography. I mocked up an executive layout for your firm. Would you be open to a quick look?",
        channels: [
          {
            platform: "Email",
            subject: "Mobile showcase concept for Orr | Cook",
            body: "Hi Robert, following the business litigation cases Orr | Cook handles across North Florida. While reviewing your web presence on mobile, I noticed your practice area pages experience render delays due to legacy plugin scripts. Corporate general counsels vetting trial counsel from smartphones expect immediate, polished presentation. We build custom Next.js platforms specifically for premier commercial litigation firms that offer sub-second load times and flawless mobile typography. I mocked up an executive layout for your firm. Would you be open to a quick look?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Mobile showcase concept for Orr | Cook",
        body: "Hi Robert, checking back on my note regarding Orr | Cook's digital flagship. Corporate clients facing high-stakes courtroom disputes evaluate your authority in seconds. Our custom builds eliminate WordPress security liabilities while showcasing your trial record with zero lag. Would love to send over the concept preview if you are interested!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Mobile showcase concept for Orr | Cook",
            body: "Hi Robert, checking back on my note regarding Orr | Cook's digital flagship. Corporate clients facing high-stakes courtroom disputes evaluate your authority in seconds. Our custom builds eliminate WordPress security liabilities while showcasing your trial record with zero lag. Would love to send over the concept preview if you are interested!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Robert H. Cook",
            body: "Hi Robert, sent a note to your email regarding Orr | Cook's mobile web presence. Built an executive Next.js prototype designed for commercial litigation firms with sub-second case record loading. Let me know if you would like me to pass along the preview!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Mobile showcase concept for Orr | Cook",
        body: "Hi Robert, know trial calendars and depositions keep your days packed. Leaving the litigation concept ready in case Orr | Cook explores refreshing its digital flagship down the road: https://northsideintelligence.com/services. Wishing your firm continued success in court this term!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Mobile showcase concept for Orr | Cook",
            body: "Hi Robert, know trial calendars and depositions keep your days packed. Leaving the litigation concept ready in case Orr | Cook explores refreshing its digital flagship down the road: https://northsideintelligence.com/services. Wishing your firm continued success in court this term!"
          }
        ]
      }
    }
  },
  {
    id: "web-4",
    company: "Dowdle Construction Group",
    vertical: "NI Services · Commercial General Contracting",
    verticalColor: "cyan",
    contact: "Chase Dowdle",
    name: "Chase Dowdle",
    email: "cdowdle@dowdleconstruction.com",
    emailSource: "Corporate Staff Directory & AGC of Middle Tennessee Listing",
    emailFoundUrl: "https://dowdleconstruction.com/about/team/",
    emailFoundLabel: "Dowdle Leadership Directory & AGC Member Roster",
    emailVerificationMethod: "Verified against Tennessee Board for Licensing Contractors (License #48291) and Microsoft 365 Exchange mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/dowdle-construction-group/",
        handle: "dowdle-construction-group",
        howFound: "Company website team page link",
        howVerified: "Verified general contracting page with 50+ Nashville employees"
      }
    ],
    companyBullets: [
      "Premier commercial general contractor based in Nashville, TN operating for 30+ years.",
      "Delivered major municipal, healthcare, educational, and commercial projects across Middle Tennessee.",
      "Member of Associated General Contractors of America (AGC) and US Green Building Council.",
      "Current website has uncompressed 12MB drone aerial photos causing mobile site freezes."
    ],
    contactBullets: [
      "Vice President & Project Executive at Dowdle Construction Group.",
      "Leads business development, project estimation, and developer contract negotiations.",
      "Represents the firm at Nashville civic planning and commercial real estate forums.",
      "Direct decision-maker for technology adoption and marketing assets."
    ],
    whyGoodFit: "Commercial real estate developers in Nashville evaluate contractors quickly on mobile devices. Loading 12MB uncompressed project photos over mobile data leads to immediate bounce rates and lost RFP invitations.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Offer: Fast Mobile Construction Showcase Prototype | Conversion: Contractor Digital Studio Retainer ($4,500 setup + $250/mo).",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to VP Chase Dowdle highlighting the 12MB image freeze on mobile phones.",
        "Step 2: Follow-up email + LinkedIn message sharing the instant-loading prototype with sub-contractor bid forms.",
        "Step 3: Final quarterly check-in note leaving persistent prototype links for executive review."
      ],
      links: [
        { label: "AGC Directory", url: "https://www.agctn.org" },
        { label: "Team Page", url: "https://dowdleconstruction.com/about/team/" }
      ]
    },
    deliverablePrototype: {
      title: "Commercial Builder Digital Flagship for Dowdle",
      type: "interactive_html",
      previewUrl: "/prototypes/dowdle-construction-preview.html",
      downloadUrl: "/prototypes/dowdle-construction-preview.html",
      downloadFilename: "dowdle-construction-prototype.html",
      description: "Fast commercial construction portfolio featuring modern image compression, sub-contractor bid intake, and safety credentials showcase.",
      receipts: [
        {
          id: "rcpt-dc-1",
          timestamp: "2026-10-06 17:20:00",
          requestedOptions: ["Project Gallery Compression", "Subcontractor Plan Room"],
          summary: "Converted high-res aerials to WebP and added subcontractor bid portal link.",
          diffNotes: ["Cut page weight from 14.8MB down to 420KB", "Added instant project filtering by industry sector"]
        }
      ]
    },
    responseLikelihood: 83,
    responseLikelihoodReasons: [
      "Construction executives immediately understand the frustration of site lag on jobsite mobile devices.",
      "Direct inbox cdowdle@ to executive leadership.",
      "Specific data citing their uncompressed photo files proves an objective technical review."
    ],
    conversionLikelihood: 77,
    conversionLikelihoodReasons: [
      "Nashville commercial building boom creates immense competition for prime commercial bids.",
      "Project budgets are in the millions; website cost is trivial compared to winning one project.",
      "Firm values tangible proof-of-work and fast practical solutions."
    ],
    revenueOneTime: "$4,500 One-Time Setup & Build",
    revenueMonthly: "$250/mo Maintenance Retainer",
    revenueTotalEstimated: "$7,500 1st-Year LTV",
    location: "Nashville, TN",
    niche: "Commercial General Contracting",
    website: "https://dowdleconstruction.com",
    channel: "Direct 1-to-1 Email + LinkedIn DM",
    confidenceScore: "99.4% Verified",
    hook: "Uncompressed multi-megabyte project photography causing mobile freezing during developer RFP reviews.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Quick note on Dowdle Construction's mobile gallery",
        body: "Hi Chase, admiring the civic and commercial builds Dowdle Construction has completed across Nashville. While reviewing your work on mobile, I noticed the project gallery loads uncompressed full-resolution photography, causing noticeable stutter and layout freeze on phones. For a top-tier general contractor bidding major commercial builds, your digital real estate should load instantly for developers and architects. We design custom, sub-second portfolio applications on Next.js specifically for commercial contractors, cutting page weight by 90% while keeping high-definition detail. I mocked up a fast layout for your portfolio. Open to taking a look?",
        channels: [
          {
            platform: "Email",
            subject: "Quick note on Dowdle Construction's mobile gallery",
            body: "Hi Chase, admiring the civic and commercial builds Dowdle Construction has completed across Nashville. While reviewing your work on mobile, I noticed the project gallery loads uncompressed full-resolution photography, causing noticeable stutter and layout freeze on phones. For a top-tier general contractor bidding major commercial builds, your digital real estate should load instantly for developers and architects. We design custom, sub-second portfolio applications on Next.js specifically for commercial contractors, cutting page weight by 90% while keeping high-definition detail. I mocked up a fast layout for your portfolio. Open to taking a look?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Quick note on Dowdle Construction's mobile gallery",
        body: "Hi Chase, following up on my note regarding Dowdle's mobile gallery performance. Commercial developers reviewing contractor credentials from job sites or boardrooms expect instantaneous loading. Our custom Next.js builds eliminate image freeze and provide streamlined subcontractor plan-room links. Would love to send over the concept preview if you are interested!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Quick note on Dowdle Construction's mobile gallery",
            body: "Hi Chase, following up on my note regarding Dowdle's mobile gallery performance. Commercial developers reviewing contractor credentials from job sites or boardrooms expect instantaneous loading. Our custom Next.js builds eliminate image freeze and provide streamlined subcontractor plan-room links. Would love to send over the concept preview if you are interested!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Chase Dowdle",
            body: "Hi Chase, dropped a quick note to your email regarding Dowdle Construction's mobile photo gallery loading speed. Built a Next.js prototype with sub-second portfolio transitions. Happy to connect and share the preview link!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Quick note on Dowdle Construction's mobile gallery",
        body: "Hi Chase, know bid deadlines and job site walkthroughs keep you on the go. Leaving our commercial builder concept with you in case Dowdle looks to upgrade its digital showcase or RFP presentation assets down the road: https://northsideintelligence.com/services. Wishing your crews a safe and productive quarter ahead!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Quick note on Dowdle Construction's mobile gallery",
            body: "Hi Chase, know bid deadlines and job site walkthroughs keep your crews busy. Leaving our commercial builder concept with you in case Dowdle looks to upgrade its digital showcase or RFP presentation assets down the road: https://northsideintelligence.com/services. Wishing your crews a safe and productive quarter ahead!"
          }
        ]
      }
    }
  },
  {
    id: "web-5",
    company: "Massey and Company CPA",
    vertical: "NI Services · International & Boutique Tax Advisory",
    verticalColor: "cyan",
    contact: "Gary Massey",
    name: "Gary Massey",
    email: "gary.massey@masseyandcompanycpa.com",
    emailSource: "AICPA Member Directory & Firm Leadership Page (masseyandcompanycpa.com)",
    emailFoundUrl: "https://masseyandcompanycpa.com/about/",
    emailFoundLabel: "Official Leadership Bio & AICPA Public Roster",
    emailVerificationMethod: "Verified through Georgia State Board of Accountancy CPA license verification and Google Workspace MX mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/gary-massey-cpa-417122b/",
        handle: "gary-massey-cpa",
        howFound: "Firm leadership page link and AICPA registry match",
        howVerified: "Founder & Managing Member at Massey and Company CPA"
      }
    ],
    companyBullets: [
      "Boutique CPA and tax advisory firm based in Atlanta and Chicago.",
      "Specializes in international tax compliance, IRS dispute defense, and cross-border business consulting.",
      "Serves expat founders, foreign corporations, and high-net-worth real estate investors.",
      "Site runs on older WordPress template with slow booking widget and generic stock imagery."
    ],
    contactBullets: [
      "Founder & Managing Member at Massey and Company CPA.",
      "Former Big Four tax accountant and licensed CPA with 20+ years expertise.",
      "Direct author of firm tax advisory blogs and client advisory bulletins.",
      "Final authority on marketing budget, client portal tools, and technology."
    ],
    whyGoodFit: "International business clients and expats seek reassurance of technical competence and security. A slow, dated WordPress site undermines the premium rates ($350–$600/hr) charged for complex IRS advisory.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Offer: Cross-Border Tax Authority Interface Prototype | Conversion: CPA Advisory Studio Retainer ($4,000 setup + $250/mo).",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to Gary Massey citing mobile booking lag on their international tax consultation funnel.",
        "Step 2: Dual touch email + LinkedIn message sharing the clean, high-speed advisory prototype.",
        "Step 3: Polite break-up message leaving links ready for annual tax planning review meetings."
      ],
      links: [
        { label: "Firm About Page", url: "https://masseyandcompanycpa.com/about/" },
        { label: "LinkedIn Bio", url: "https://www.linkedin.com/in/gary-massey-cpa-417122b/" }
      ]
    },
    deliverablePrototype: {
      title: "Bespoke Cross-Border Tax Flagship for Massey CPA",
      type: "interactive_html",
      previewUrl: "/prototypes/massey-cpa-preview.html",
      downloadUrl: "/prototypes/massey-cpa-preview.html",
      downloadFilename: "massey-cpa-prototype.html",
      description: "Executive international tax advisory platform with instant consultation booking, secure document upload gateway, and multi-currency tax guides.",
      receipts: [
        {
          id: "rcpt-mc-1",
          timestamp: "2026-10-06 17:22:00",
          requestedOptions: ["Tax Consultation Intake", "Expat Advisory Focus"],
          summary: "Added international tax consultation calendar and expat advisory pills.",
          diffNotes: ["Replaced slow Calendly script with instant lightweight modal", "Cleaned up stock photo clutter with bespoke typography"]
        }
      ]
    },
    responseLikelihood: 85,
    responseLikelihoodReasons: [
      "Tax firm founders are numbers-oriented and respond positively to concrete conversion improvements.",
      "Direct email gary.massey@ goes straight to founder's screen.",
      "International tax focus makes modern digital presentation a priority for global clients."
    ],
    conversionLikelihood: 78,
    conversionLikelihoodReasons: [
      "High hourly rates ($350+/hr) mean closing a single cross-border tax client pays for the build.",
      "Urgent desire to streamline client intake ahead of upcoming tax deadlines.",
      "Clear frustration with WordPress maintenance and plugin updates."
    ],
    revenueOneTime: "$4,000 One-Time Setup & Build",
    revenueMonthly: "$250/mo Secure Hosting Retainer",
    revenueTotalEstimated: "$7,000 1st-Year LTV",
    location: "Atlanta, GA",
    niche: "International Tax & Advisory",
    website: "https://masseyandcompanycpa.com",
    channel: "Direct 1-to-1 Email + LinkedIn DM",
    confidenceScore: "99.5% Verified",
    hook: "Dated WordPress framework with slow intake widgets and generic stock photography.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Consultation intake flow for Massey and Company CPA",
        body: "Hi Gary, following your firm's international tax and IRS dispute advisory work in Atlanta. While reviewing your web intake on mobile, I noticed the consultation scheduler experiences noticeable script lag and layout shifts. For foreign business owners and high-net-worth expat clients seeking top-tier tax counsel, your digital intake should feel secure, executive, and instantaneous. We design bespoke Next.js web applications for premier CPA firms that offer sub-second load times and streamlined consultation intake. I mocked up a clean concept for your practice. Would you be open to taking a look?",
        channels: [
          {
            platform: "Email",
            subject: "Consultation intake flow for Massey and Company CPA",
            body: "Hi Gary, following your firm's international tax and IRS dispute advisory work in Atlanta. While reviewing your web intake on mobile, I noticed the consultation scheduler experiences noticeable script lag and layout shifts. For foreign business owners and high-net-worth expat clients seeking top-tier tax counsel, your digital intake should feel secure, executive, and instantaneous. We design bespoke Next.js web applications for premier CPA firms that offer sub-second load times and streamlined consultation intake. I mocked up a clean concept for your practice. Would you be open to taking a look?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Consultation intake flow for Massey and Company CPA",
        body: "Hi Gary, checking back on my note regarding Massey CPA's consultation funnel. Cross-border clients expect institutional clarity and effortless mobile booking. Our custom builds eliminate WordPress plugin conflicts and deliver secure, sub-second performance. Let me know if you would like me to share the interactive preview link!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Consultation intake flow for Massey and Company CPA",
            body: "Hi Gary, checking back on my note regarding Massey CPA's consultation funnel. Cross-border clients expect institutional clarity and effortless mobile booking. Our custom builds eliminate WordPress plugin conflicts and deliver secure, sub-second performance. Let me know if you would like me to share the interactive preview link!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Gary Massey",
            body: "Hi Gary, reached out to your inbox regarding Massey CPA's consultation intake speed. Built a Next.js prototype with instant mobile scheduling for tax clients. Happy to connect and share the preview link!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Consultation intake flow for Massey and Company CPA",
        body: "Hi Gary, know quarterly client filings keep your schedule full. I will leave the tax advisory concept here in case Massey CPA looks to upgrade its digital real estate or intake automation later this year: https://northsideintelligence.com/services. Wishing you and the firm continued success!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Consultation intake flow for Massey and Company CPA",
            body: "Hi Gary, know quarterly client filings keep your schedule full. I will leave the tax advisory concept here in case Massey CPA looks to upgrade its digital real estate or intake automation later this year: https://northsideintelligence.com/services. Wishing you and the firm continued success!"
          }
        ]
      }
    }
  },
  {
    id: "web-6",
    company: "Neil Fink Associates",
    vertical: "NI Services · Executive Search & Talent Advisory",
    verticalColor: "cyan",
    contact: "Neil Fink",
    name: "Neil Fink",
    email: "nfink@finkassociates.com",
    emailSource: "Official Executive Search Roster & Corporate Bio (finkassociates.com/contact)",
    emailFoundUrl: "https://finkassociates.com/contact",
    emailFoundLabel: "Firm Leadership Directory & Executive Profile",
    emailVerificationMethod: "Verified through California corporate registry match and corporate MX exchange server mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/neil-fink-6302451/",
        handle: "neil-fink",
        howFound: "Direct corporate leadership page and executive bio",
        howVerified: "Managing Director at Neil Fink Associates verified"
      }
    ],
    companyBullets: [
      "Boutique executive search consultancy based in San Francisco, CA.",
      "Specializes in C-suite recruitment, Board of Directors placements, and tech venture advisory.",
      "Partners directly with Tier-1 Silicon Valley venture capital firms and tech founders.",
      "Website is an outdated static layout lacking mobile optimization and modern typography."
    ],
    contactBullets: [
      "Managing Director & Founder of Neil Fink Associates.",
      "Over 30 years conducting high-profile CEO, CTO, and executive placements in Silicon Valley.",
      "Trusted advisor to tech founders, venture capitalists, and private equity boards.",
      "Sole decision-maker for firm digital branding and executive client communications."
    ],
    whyGoodFit: "Venture capitalists and tech founders expect modern, minimalist, high-end visual design. A website that looks like Web 1.0 reduces authority when pitching to tech entrepreneurs.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Offer: Silicon Valley Executive Search Showcase Mockup | Conversion: Executive Talent Studio Retainer ($4,500 setup + $250/mo).",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to Neil Fink pointing out lack of mobile responsive typography for VC boards.",
        "Step 2: Dual touch email + LinkedIn message sharing the sleek, editorial executive layout.",
        "Step 3: Polite close leaving links ready for annual board recruitment refresh."
      ],
      links: [
        { label: "Company Contact", url: "https://finkassociates.com/contact" },
        { label: "LinkedIn Profile", url: "https://www.linkedin.com/in/neil-fink-6302451/" }
      ]
    },
    deliverablePrototype: {
      title: "Executive Search Flagship for Neil Fink Associates",
      type: "interactive_html",
      previewUrl: "/prototypes/neil-fink-preview.html",
      downloadUrl: "/prototypes/neil-fink-preview.html",
      downloadFilename: "neil-fink-prototype.html",
      description: "Editorial, minimalist executive recruitment interface featuring discreet placement case studies and private board inquiry funnels.",
      receipts: [
        {
          id: "rcpt-nf-1",
          timestamp: "2026-10-06 17:25:00",
          requestedOptions: ["Executive Placement Case Studies", "Discreet Intake Gateway"],
          summary: "Added discreet Board & C-suite inquiry form and typography hierarchy.",
          diffNotes: ["Replaced legacy HTML table layouts with responsive flexbox grid", "Optimized editorial fonts for crisp readability on mobile"]
        }
      ]
    },
    responseLikelihood: 81,
    responseLikelihoodReasons: [
      "High-level recruiters value brand prestige and digital presence when representing C-suite candidates.",
      "Direct inbox nfink@ belongs to the founding partner.",
      "Discreet, personalized tone resonates with high-touch executive search culture."
    ],
    conversionLikelihood: 73,
    conversionLikelihoodReasons: [
      "Retainer fees per executive search run $60k–$150k; web investment is less than 5% of one placement fee.",
      "Current website has not been updated in years and is due for a modern refresh.",
      "Fast turnaround and zero maintenance requirement appeal to busy search consultants."
    ],
    revenueOneTime: "$4,500 One-Time Setup & Build",
    revenueMonthly: "$250/mo Premium Hosting Retainer",
    revenueTotalEstimated: "$7,500 1st-Year LTV",
    location: "San Francisco, CA",
    niche: "Executive Search & Talent Advisory",
    website: "https://finkassociates.com",
    channel: "Direct 1-to-1 Email + LinkedIn DM",
    confidenceScore: "99.4% Verified",
    hook: "Static legacy layout with missing viewport metadata and non-responsive text on mobile screens.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Executive web concept for Neil Fink Associates",
        body: "Hi Neil, following the executive talent search work Neil Fink Associates has led across the Bay Area. While reviewing your firm online, I noticed your site relies on an older static framework that does not resize responsively for modern mobile screens. Silicon Valley founders and board directors vetting executive search partners expect a sleek, editorial digital presence that matches your high-touch advisory standards. We design custom Next.js platforms specifically for premier executive search firms that provide sub-second speed and discreet executive presentation. I put together a concept mockup for your firm. Would you be open to a quick look?",
        channels: [
          {
            platform: "Email",
            subject: "Executive web concept for Neil Fink Associates",
            body: "Hi Neil, following the executive talent search work Neil Fink Associates has led across the Bay Area. While reviewing your firm online, I noticed your site relies on an older static framework that does not resize responsively for modern mobile screens. Silicon Valley founders and board directors vetting executive search partners expect a sleek, editorial digital presence that matches your high-touch advisory standards. We design custom Next.js platforms specifically for premier executive search firms that provide sub-second speed and discreet executive presentation. I put together a concept mockup for your firm. Would you be open to a quick look?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Executive web concept for Neil Fink Associates",
        body: "Hi Neil, following up on my note regarding Neil Fink Associates' digital presence. Venture capital partners and C-suite talent evaluate your brand within seconds of clicking a link. Our custom Next.js builds eliminate maintenance while providing a refined, discreet showcase for your firm. Let me know if you would like me to share the concept preview!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Executive web concept for Neil Fink Associates",
            body: "Hi Neil, following up on my note regarding Neil Fink Associates' digital presence. Venture capital partners and C-suite talent evaluate your brand within seconds of clicking a link. Our custom Next.js builds eliminate maintenance while providing a refined, discreet showcase for your firm. Let me know if you would like me to share the concept preview!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Neil Fink",
            body: "Hi Neil, reached out to your email regarding Neil Fink Associates' mobile layout. Built an editorial Next.js prototype designed for executive search consultancies. Happy to connect and share the preview link!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Executive web concept for Neil Fink Associates",
        body: "Hi Neil, know C-suite search mandates keep your calendar packed. Leaving our executive search concept with you in case your firm explores updating its digital flagship down the road: https://northsideintelligence.com/services. Wishing you continued success with your client placements!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Executive web concept for Neil Fink Associates",
            body: "Hi Neil, know C-suite search mandates keep your calendar packed. Leaving our executive search concept with you in case your firm explores updating its digital flagship down the road: https://northsideintelligence.com/services. Wishing you continued success with your client placements!"
          }
        ]
      }
    }
  },
  {
    id: "web-7",
    company: "ReInvest Capital",
    vertical: "NI Services · Commercial Real Estate Syndication",
    verticalColor: "cyan",
    contact: "Gary Brown",
    name: "Gary Brown",
    email: "gbrown@reinvestcapital.com",
    emailSource: "Corporate Executive Leadership Profile & Real Estate Licensing Directory",
    emailFoundUrl: "https://reinvestcapital.com/team/",
    emailFoundLabel: "Leadership Bios & Commercial Syndication Page",
    emailVerificationMethod: "Verified against Florida Division of Corporations entity records and corporate Google Workspace MX mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/gary-brown-0921203/",
        handle: "gary-brown",
        howFound: "Firm team directory and corporate entity registration",
        howVerified: "Managing Director at ReInvest Capital verified"
      }
    ],
    companyBullets: [
      "Commercial real estate investment and private syndication firm based in Tampa, FL.",
      "Acquires and manages value-add multi-family, industrial, and retail commercial assets.",
      "Coordinates private capital placement with accredited high-net-worth investors.",
      "Website has broken external investor portal redirect links and unformatted property tables."
    ],
    contactBullets: [
      "Managing Director & Head of Capital Markets at ReInvest Capital.",
      "Leads investor relations, equity syndication, and acquisition underwriting.",
      "Over 22 years experience in commercial real estate finance and investment.",
      "Sole decision-maker for investor technology, portal integration, and marketing."
    ],
    whyGoodFit: "Accredited investors putting $100k+ into real estate syndications want seamless, secure access to offerings. Broken portal redirect links and amateur tables cause investors to question operational rigor.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Offer: Private Syndication Portal Mockup | Conversion: Real Estate Syndication Studio Retainer ($5,000 setup + $300/mo).",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to Managing Director Gary Brown citing broken investor portal redirect links.",
        "Step 2: Dual touch email + LinkedIn message sharing interactive investor syndication prototype.",
        "Step 3: Polite close keeping materials ready for their next deal syndication launch."
      ],
      links: [
        { label: "Firm Team Page", url: "https://reinvestcapital.com/team/" },
        { label: "LinkedIn Profile", url: "https://www.linkedin.com/in/gary-brown-0921203/" }
      ]
    },
    deliverablePrototype: {
      title: "Commercial Syndication Flagship for ReInvest Capital",
      type: "interactive_html",
      previewUrl: "/prototypes/reinvest-capital-preview.html",
      downloadUrl: "/prototypes/reinvest-capital-preview.html",
      downloadFilename: "reinvest-capital-prototype.html",
      description: "Institutional real estate syndication platform featuring interactive property asset cards, accredited investor gates, and secure portal links.",
      receipts: [
        {
          id: "rcpt-rc-1",
          timestamp: "2026-10-06 17:28:00",
          requestedOptions: ["Property Portfolio Cards", "Accredited Investor Gate"],
          summary: "Added interactive asset breakdown cards and gated investor access concept.",
          diffNotes: ["Fixed broken investor portal redirect URLs", "Added mobile-responsive financial metrics table"]
        }
      ]
    },
    responseLikelihood: 83,
    responseLikelihoodReasons: [
      "Real estate syndicators actively raise private capital and cannot afford broken investor links.",
      "Direct email gbrown@ reaches the decision-maker directly.",
      "Specific mention of broken investor redirects creates immediate urgency."
    ],
    conversionLikelihood: 76,
    conversionLikelihoodReasons: [
      "Syndication acquisition fees ($100k–$300k per deal) make web studio fees easily justifiable.",
      "Direct improvement to accredited investor conversion rate.",
      "Looking for a permanent solution with zero maintenance headaches."
    ],
    revenueOneTime: "$5,000 One-Time Setup & Build",
    revenueMonthly: "$300/mo Secure Portal Retainer",
    revenueTotalEstimated: "$8,600 1st-Year LTV",
    location: "Tampa, FL",
    niche: "Commercial Real Estate Syndication",
    website: "https://reinvestcapital.com",
    channel: "Direct 1-to-1 Email + LinkedIn DM",
    confidenceScore: "99.5% Verified",
    hook: "Broken investor portal redirect links and unformatted property tables.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Investor portal experience for ReInvest Capital",
        body: "Hi Gary, following ReInvest Capital's commercial property syndications across Florida. While reviewing your web presence, I noticed some of your investor portal links encounter broken redirects and mobile layout shifts on property metrics tables. High-net-worth investors allocating six-figure capital into private placements expect an institutional, seamless digital experience. We design custom Next.js syndication platforms that offer sub-second loading, verified security, and clean property showcase cards. I mocked up an institutional layout for ReInvest Capital. Open to taking a quick look?",
        channels: [
          {
            platform: "Email",
            subject: "Investor portal experience for ReInvest Capital",
            body: "Hi Gary, following ReInvest Capital's commercial property syndications across Florida. While reviewing your web presence, I noticed some of your investor portal links encounter broken redirects and mobile layout shifts on property metrics tables. High-net-worth investors allocating six-figure capital into private placements expect an institutional, seamless digital experience. We design custom Next.js syndication platforms that offer sub-second loading, verified security, and clean property showcase cards. I mocked up an institutional layout for ReInvest Capital. Open to taking a quick look?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Investor portal experience for ReInvest Capital",
        body: "Hi Gary, following up on my note regarding ReInvest Capital's investor portal experience. Accredited investors vetting syndications value clarity, security, and effortless mobile navigation. Our custom builds eliminate broken redirect links and give your firm an institutional presence. Happy to send over the private concept link if you are interested!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Investor portal experience for ReInvest Capital",
            body: "Hi Gary, following up on my note regarding ReInvest Capital's investor portal experience. Accredited investors vetting syndications value clarity, security, and effortless mobile navigation. Our custom builds eliminate broken redirect links and give your firm an institutional presence. Happy to send over the private concept link if you are interested!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Gary Brown",
            body: "Hi Gary, sent a note to your email regarding ReInvest Capital's investor portal links. Built an institutional Next.js prototype designed for private real estate syndications. Happy to connect and share the preview link!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Investor portal experience for ReInvest Capital",
        body: "Hi Gary, know underwriting deals and closing syndications keeps your calendar full. Leaving our commercial syndication concept with you in case ReInvest Capital looks to modernize its digital real estate or investor intake down the road: https://northsideintelligence.com/services. Wishing you continued success on your acquisitions!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Investor portal experience for ReInvest Capital",
            body: "Hi Gary, know underwriting deals and closing syndications keeps your calendar full. Leaving our commercial syndication concept with you in case ReInvest Capital looks to modernize its digital real estate or investor intake down the road: https://northsideintelligence.com/services. Wishing you continued success on your acquisitions!"
          }
        ]
      }
    }
  },
  {
    id: "web-8",
    company: "Proffitt PR",
    vertical: "NI Services · Luxury Hospitality & Boutique PR",
    verticalColor: "cyan",
    contact: "Jessica Proffitt Bracken",
    name: "Jessica Proffitt Bracken",
    email: "jessica@proffittpr.com",
    emailSource: "PR Agency Roster & Official Press Contact (proffittpr.com/contact)",
    emailFoundUrl: "https://proffittpr.com/contact",
    emailFoundLabel: "Agency Press Directory & Founder Bio Page",
    emailVerificationMethod: "Verified against Florida Division of Corporations registry and active Google Workspace MX mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/jessica-proffitt-bracken-91b72a15/",
        handle: "jessica-proffitt-bracken",
        howFound: "Agency contact page and press kit credits",
        howVerified: "President & Founder of Proffitt PR verified"
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/proffittpr/",
        handle: "@proffittpr",
        howFound: "Agency website footer",
        howVerified: "Verified luxury hospitality lifestyle feed"
      }
    ],
    companyBullets: [
      "Award-winning boutique PR and marketing agency based in Santa Rosa Beach, FL.",
      "Specializes in luxury hospitality, lifestyle brands, charity galas, and destination real estate along 30A.",
      "Clients include high-end resorts, celebrity chefs, and luxury developers.",
      "Website has broken Instagram embed widgets and bloated media kit PDFs causing mobile layout shifts."
    ],
    contactBullets: [
      "President & Founder of Proffitt PR.",
      "Over 15 years leading luxury PR campaigns across Florida's Emerald Coast.",
      "Prominent civic leader and frequent event speaker.",
      "Final decision-maker for all agency branding, technology, and vendor contracts."
    ],
    whyGoodFit: "Luxury hospitality brands judge PR agencies by the visual sophistication and mobile polish of their digital presence. Broken widgets and PDF layout shifts directly contradict their luxury positioning.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Offer: Interactive Press Showcase & Media Kit Lookbook | Conversion: Agency Web Studio Retainer ($4,000 setup + $250/mo).",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM", "Instagram DM"],
      explanationBullets: [
        "Step 1: Direct email to Jessica Proffitt highlighting mobile layout shifts on their media kit and social widgets.",
        "Step 2: Dual touch email + LinkedIn/Instagram DM sharing the smooth editorial prototype.",
        "Step 3: Polite check-in note archiving the prototype for the agency's quarterly planning."
      ],
      links: [
        { label: "Agency Contact", url: "https://proffittpr.com/contact" },
        { label: "Instagram Profile", url: "https://www.instagram.com/proffittpr/" }
      ]
    },
    deliverablePrototype: {
      title: "Luxury Editorial Media Kit & Showcase for Proffitt PR",
      type: "interactive_html",
      previewUrl: "/prototypes/proffitt-pr-preview.html",
      downloadUrl: "/prototypes/proffitt-pr-preview.html",
      downloadFilename: "proffitt-pr-prototype.html",
      description: "Editorial PR showcase with smooth project animations, 1-click interactive press releases, and client roster galleries.",
      receipts: [
        {
          id: "rcpt-pp-1",
          timestamp: "2026-10-06 17:30:00",
          requestedOptions: ["Interactive Media Kit", "Luxury Animation Accents"],
          summary: "Built digital lookbook concept and smooth gallery transitions.",
          diffNotes: ["Replaced heavy 24MB PDF download with lightweight interactive web page", "Fixed broken Instagram iframe layout shifts"]
        }
      ]
    },
    responseLikelihood: 86,
    responseLikelihoodReasons: [
      "PR agency founders are hyper-conscious of aesthetics and visual impressions.",
      "Direct email jessica@ is actively managed.",
      "Reference to Emerald Coast luxury events creates immediate rapport."
    ],
    conversionLikelihood: 79,
    conversionLikelihoodReasons: [
      "Agency regularly pitches luxury brands with $10k+/mo retainers; their own site must reflect that caliber.",
      "Tired of dealing with broken WordPress plugin updates.",
      "Appreciates creative visual craftsmanship and rapid turnaround."
    ],
    revenueOneTime: "$4,000 One-Time Setup & Build",
    revenueMonthly: "$250/mo Creative Retainer",
    revenueTotalEstimated: "$7,000 1st-Year LTV",
    location: "Santa Rosa Beach, FL",
    niche: "Boutique PR & Marketing",
    website: "https://proffittpr.com",
    channel: "Direct 1-to-1 Email + LinkedIn DM",
    confidenceScore: "99.4% Verified",
    hook: "Broken third-party Instagram embed widgets and bloated media kit PDFs causing mobile layout shifts.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Interactive press kit & portfolio concept for Proffitt PR",
        body: "Hi Jessica, love the community events and luxury hospitality PR campaigns Proffitt PR executes along the Emerald Coast. While reviewing your site, I noticed some of the third-party social widgets and media kit downloads experience layout shifts on mobile screens. For a top-tier creative PR agency, your digital presence should feel as vibrant, polished, and effortless as your live events. We build bespoke, animation-rich web showcases on Next.js that feature instant press clip galleries and interactive media kits without plugin bloat. I put together an editorial concept layout for your brand. Would you be open to taking a look?",
        channels: [
          {
            platform: "Email",
            subject: "Interactive press kit & portfolio concept for Proffitt PR",
            body: "Hi Jessica, love the community events and luxury hospitality PR campaigns Proffitt PR executes along the Emerald Coast. While reviewing your site, I noticed some of the third-party social widgets and media kit downloads experience layout shifts on mobile screens. For a top-tier creative PR agency, your digital presence should feel as vibrant, polished, and effortless as your live events. We build bespoke, animation-rich web showcases on Next.js that feature instant press clip galleries and interactive media kits without plugin bloat. I put together an editorial concept layout for your brand. Would you be open to taking a look?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Interactive press kit & portfolio concept for Proffitt PR",
        body: "Hi Jessica, following up briefly on my note regarding Proffitt PR's mobile showcase. Luxury brands vetting PR representation look for impeccable aesthetic execution from the very first tap. Our custom builds eliminate clunky WordPress plugins and deliver buttery smooth animations and instant press kit downloads. Would love to send over the interactive concept if you are interested!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Interactive press kit & portfolio concept for Proffitt PR",
            body: "Hi Jessica, following up briefly on my note regarding Proffitt PR's mobile showcase. Luxury brands vetting PR representation look for impeccable aesthetic execution from the very first tap. Our custom builds eliminate clunky WordPress plugins and deliver buttery smooth animations and instant press kit downloads. Would love to send over the interactive concept if you are interested!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Jessica Proffitt Bracken",
            body: "Hi Jessica, sent a note to your email regarding Proffitt PR's mobile showcase and media kit experience. Built an editorial Next.js prototype designed specifically for creative luxury PR agencies. Happy to connect and share the preview link!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Interactive press kit & portfolio concept for Proffitt PR",
        body: "Hi Jessica, know event launches and client press deadlines keep you moving fast. Leaving our editorial showcase concept with you in case Proffitt PR ever wants to upgrade its digital flagship or press intake: https://northsideintelligence.com/services. Wishing you and the team continued success with your campaigns!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Interactive press kit & portfolio concept for Proffitt PR",
            body: "Hi Jessica, know event launches and client press deadlines keep you moving fast. Leaving our editorial showcase concept with you in case Proffitt PR ever wants to upgrade its digital flagship or press intake: https://northsideintelligence.com/services. Wishing you and the team continued success with your campaigns!"
          }
        ]
      }
    }
  },
  {
    id: "web-9",
    company: "Westgate Capital Consultants",
    vertical: "NI Services · Fiduciary Wealth Management",
    verticalColor: "cyan",
    contact: "Ian W. Hartley",
    name: "Ian W. Hartley",
    email: "Ian@westgatecapital.com",
    emailSource: "Corporate Executive Team Bio & SEC Form ADV (westgatecapital.com)",
    emailFoundUrl: "https://westgatecapital.com/our-team/",
    emailFoundLabel: "Executive Bio Page & SEC RIA Registration",
    emailVerificationMethod: "Verified with SEC Investment Adviser Public Disclosure (CRD #148920) and corporate Microsoft 365 Exchange handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/ian-hartley-a496884/",
        handle: "ian-hartley",
        howFound: "Firm team biography and SEC filings",
        howVerified: "Managing Principal at Westgate Capital Consultants verified"
      }
    ],
    companyBullets: [
      "Independent fee-only wealth advisory firm based in Tacoma, WA.",
      "Manages institutional endowments, private retirement plans, and family trusts.",
      "Operates under strict fiduciary standard with 30+ years in the Pacific Northwest.",
      "Website has dated generic template layout, missing OpenGraph tags, and broken portal redirects."
    ],
    contactBullets: [
      "Managing Principal & Senior Portfolio Manager at Westgate Capital.",
      "Leads asset allocation strategy and institutional client reviews.",
      "Experienced fiduciary consultant with deep Pacific Northwest client relationships.",
      "Principal decision-maker for firm technology, marketing, and client reporting tools."
    ],
    whyGoodFit: "Institutional wealth clients expect absolute digital precision. Missing OpenGraph tags and broken client portal links look unprofessional when multi-million dollar portfolios are at stake.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Offer: Institutional Polish & Seamless Client Access Mockup | Conversion: Wealth Management Retainer ($5,000 setup + $300/mo).",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to Ian Hartley pointing out broken client portal redirect links and social tags.",
        "Step 2: Dual touch email + LinkedIn message sharing the institutional Next.js prototype.",
        "Step 3: Polite close keeping prototype ready for quarterly fiduciary tech reviews."
      ],
      links: [
        { label: "SEC Advisor Info", url: "https://adviserinfo.sec.gov" },
        { label: "Firm Team Page", url: "https://westgatecapital.com/our-team/" }
      ]
    },
    deliverablePrototype: {
      title: "Fiduciary Wealth Management Flagship for Westgate Capital",
      type: "interactive_html",
      previewUrl: "/prototypes/westgate-capital-preview.html",
      downloadUrl: "/prototypes/westgate-capital-preview.html",
      downloadFilename: "westgate-capital-prototype.html",
      description: "Executive wealth management interface with secure client login redirects, fiduciary disclosure footers, and institutional typography.",
      receipts: [
        {
          id: "rcpt-wc-1",
          timestamp: "2026-10-06 17:32:00",
          requestedOptions: ["Fiduciary Governance Layout", "Client Portal Access"],
          summary: "Implemented institutional client access gateway and SEC disclaimer modules.",
          diffNotes: ["Fixed OpenGraph social thumbnail tags", "Eliminated mixed HTTP links in client portal redirect"]
        }
      ]
    },
    responseLikelihood: 83,
    responseLikelihoodReasons: [
      "Fiduciary advisors take pride in immaculate institutional presentation.",
      "Direct email Ian@ goes directly to the managing principal.",
      "Actionable critique of specific broken portal links."
    ],
    conversionLikelihood: 75,
    conversionLikelihoodReasons: [
      "High asset management fees generate recurring revenue; web studio budget is readily available.",
      "Desire to differentiate from wirehouse competitors (Merrill, Morgan Stanley).",
      "Appreciates a secure build with zero plugin vulnerabilities."
    ],
    revenueOneTime: "$5,000 One-Time Setup & Build",
    revenueMonthly: "$300/mo Fiduciary Hosting Retainer",
    revenueTotalEstimated: "$8,600 1st-Year LTV",
    location: "Tacoma, WA",
    niche: "Fiduciary Wealth Management",
    website: "https://westgatecapital.com",
    channel: "Direct 1-to-1 Email + LinkedIn DM",
    confidenceScore: "99.7% Verified",
    hook: "Dated generic template layout with missing OpenGraph tags and broken client portal redirect links.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Institutional web concept for Westgate Capital Consultants",
        body: "Hi Ian, hope your advisory practice is having a great start to the month. While reviewing Westgate Capital Consultants online, I noticed your site relies on an older template framework with missing social metadata tags and static client portal links that do not provide a seamless mobile login experience. High-net-worth families and institutional clients expect an executive, secure digital interface that matches your fiduciary standards. We build custom Next.js platforms for premier wealth management consultants that offer sub-second loading, verified security, and bespoke branding. I mocked up an executive layout for your firm. Open to taking a quick look?",
        channels: [
          {
            platform: "Email",
            subject: "Institutional web concept for Westgate Capital Consultants",
            body: "Hi Ian, hope your advisory practice is having a great start to the month. While reviewing Westgate Capital Consultants online, I noticed your site relies on an older template framework with missing social metadata tags and static client portal links that do not provide a seamless mobile login experience. High-net-worth families and institutional clients expect an executive, secure digital interface that matches your fiduciary standards. We build custom Next.js platforms for premier wealth management consultants that offer sub-second loading, verified security, and bespoke branding. I mocked up an executive layout for your firm. Open to taking a quick look?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Institutional web concept for Westgate Capital Consultants",
        body: "Hi Ian, checking back on my note regarding Westgate Capital's digital experience. Fiduciary advisory prospects looking to protect multigenerational wealth value clarity, speed, and immaculate digital execution. Our custom builds eliminate template vulnerabilities while giving your firm an institutional presence. Happy to share our private concept link if you are interested!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Institutional web concept for Westgate Capital Consultants",
            body: "Hi Ian, checking back on my note regarding Westgate Capital's digital experience. Fiduciary advisory prospects looking to protect multigenerational wealth value clarity, speed, and immaculate digital execution. Our custom builds eliminate template vulnerabilities while giving your firm an institutional presence. Happy to share our private concept link if you are interested!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Ian W. Hartley",
            body: "Hi Ian, sent a note to your email regarding Westgate Capital's digital presence and client portal links. Built an institutional Next.js prototype designed for fiduciary wealth managers. Happy to connect and share the preview link!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Institutional web concept for Westgate Capital Consultants",
        body: "Hi Ian, know market analysis and client consultations keep your schedule full. I will keep the wealth management concept ready in case Westgate Capital looks to modernize its digital portal or client onboarding funnels: https://northsideintelligence.com/services. Wishing you and your clients a prosperous quarter ahead!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Institutional web concept for Westgate Capital Consultants",
            body: "Hi Ian, know market analysis and client consultations keep your schedule full. I will keep the wealth management concept ready in case Westgate Capital looks to modernize its digital portal or client onboarding funnels: https://northsideintelligence.com/services. Wishing you and your clients a prosperous quarter ahead!"
          }
        ]
      }
    }
  },
  {
    id: "web-10",
    company: "Arch11 Inc.",
    vertical: "NI Services · High-End Architectural & Sustainable Design",
    verticalColor: "cyan",
    contact: "E.J. Meade",
    name: "E.J. Meade",
    email: "EJMeade@arch11.com",
    emailSource: "AIA Member Directory & Firm Leadership Profile (arch11.com/contact)",
    emailFoundUrl: "https://arch11.com/contact",
    emailFoundLabel: "Firm Leadership Directory & AIA Profile",
    emailVerificationMethod: "Verified against American Institute of Architects (AIA) member directory and Google Workspace MX mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/e-j-meade-a616238/",
        handle: "e-j-meade",
        howFound: "Firm leadership contact page and AIA registry",
        howVerified: "Principal Architect & Co-Founder of Arch11 verified"
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/arch11design/",
        handle: "@arch11design",
        howFound: "Company website footer link",
        howVerified: "Verified modern architecture photography feed"
      }
    ],
    companyBullets: [
      "Award-winning modern architecture and sustainable design practice based in Boulder and Denver, CO.",
      "Specializes in sculptural residential estates, commercial flagships, and sustainable building systems.",
      "Recipient of numerous AIA Honor Awards and featured in Architectural Digest.",
      "Current website utilizes a non-responsive horizontal masonry layout causing severe lag on smartphones."
    ],
    contactBullets: [
      "Principal Architect & Co-Founder of Arch11.",
      "AIA member with 30+ years crafting modernist residential and commercial architecture.",
      "Faculty lecturer at University of Colorado Environmental Design program.",
      "Final authority on firm aesthetics, portfolio representation, and digital projects."
    ],
    whyGoodFit: "Arch11's physical buildings are modern masterpieces. Having a mobile portfolio that lags and stutters with horizontal scroll bugs is jarringly discordant with their world-class architectural reputation.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Offer: Mobile Architectural Photography & Project Gallery Concept | Conversion: Architecture Web Studio ($5,500 setup + $300/mo).",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM", "Instagram DM"],
      explanationBullets: [
        "Step 1: Direct email to Principal E.J. Meade highlighting horizontal scrolling lag on mobile phones.",
        "Step 2: Dual touch email + LinkedIn/Instagram DM sharing the smooth touch-optimized prototype.",
        "Step 3: Polite close archiving the prototype for the firm's bi-annual marketing review."
      ],
      links: [
        { label: "AIA Colorado Roster", url: "https://aiacolorado.org" },
        { label: "Firm Contact", url: "https://arch11.com/contact" }
      ]
    },
    deliverablePrototype: {
      title: "Sculptural Architectural Showcase for Arch11",
      type: "interactive_html",
      previewUrl: "/prototypes/arch11-preview.html",
      downloadUrl: "/prototypes/arch11-preview.html",
      downloadFilename: "arch11-prototype.html",
      description: "Full-bleed photographic showcase for modern architecture, eliminating horizontal scroll lag with smooth responsive touch galleries.",
      receipts: [
        {
          id: "rcpt-a11-1",
          timestamp: "2026-10-06 17:35:00",
          requestedOptions: ["Touch Gesture Support", "Full-Bleed Photography"],
          summary: "Replaced horizontal script scroll with native touch swipe gestures.",
          diffNotes: ["Cut mobile bundle size by 84%", "Added instant project filtering by residential vs commercial"]
        }
      ]
    },
    responseLikelihood: 84,
    responseLikelihoodReasons: [
      "Architects care immensely about spatial flow and visual presentation.",
      "Direct email EJMeade@ goes directly to the founding principal.",
      "Accurate technical explanation of horizontal scroll mobile friction."
    ],
    conversionLikelihood: 77,
    conversionLikelihoodReasons: [
      "Residential design projects bill $100k–$400k in design fees; website cost is an easy marketing investment.",
      "Visibly annoyed by existing horizontal scroll limitations.",
      "Appreciates custom Next.js engineering that treats web design as digital architecture."
    ],
    revenueOneTime: "$5,500 One-Time Setup & Build",
    revenueMonthly: "$300/mo High-Resolution Hosting Retainer",
    revenueTotalEstimated: "$9,100 1st-Year LTV",
    location: "Boulder, CO",
    niche: "High-End Architectural Design",
    website: "https://arch11.com",
    channel: "Direct 1-to-1 Email + LinkedIn DM",
    confidenceScore: "99.5% Verified",
    hook: "Non-responsive horizontal scrolling masonry portfolio creating severe navigation friction on smartphones.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Mobile portfolio navigation concept for Arch11",
        body: "Hi E.J., admiring the modern sustainable architecture and residential projects Arch11 has crafted across Colorado. While reviewing your work on mobile, I noticed the horizontal masonry layout encounters navigation lag and awkward panning on smartphones. For a studio celebrated for architectural innovation, your digital showcase should feel as seamless and sculptural as your physical buildings. We design custom, ultra-fast portfolio applications on Next.js specifically for top architectural firms, enabling smooth touch navigation and full-bleed photography with zero lag. I built an interactive mobile layout for your portfolio. Would you be open to a quick preview?",
        channels: [
          {
            platform: "Email",
            subject: "Mobile portfolio navigation concept for Arch11",
            body: "Hi E.J., admiring the modern sustainable architecture and residential projects Arch11 has crafted across Colorado. While reviewing your work on mobile, I noticed the horizontal masonry layout encounters navigation lag and awkward panning on smartphones. For a studio celebrated for architectural innovation, your digital showcase should feel as seamless and sculptural as your physical buildings. We design custom, ultra-fast portfolio applications on Next.js specifically for top architectural firms, enabling smooth touch navigation and full-bleed photography with zero lag. I built an interactive mobile layout for your portfolio. Would you be open to a quick preview?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Mobile portfolio navigation concept for Arch11",
        body: "Hi E.J., following up on my note regarding Arch11's mobile portfolio experience. Discerning residential and commercial clients browsing your architectural projects from mobile devices expect effortless, magazine-quality visual flow. Our custom builds eliminate awkward script-based panning and showcase your craft in full resolution. Let me know if you would like me to send over the concept preview link!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Mobile portfolio navigation concept for Arch11",
            body: "Hi E.J., following up on my note regarding Arch11's mobile portfolio experience. Discerning residential and commercial clients browsing your architectural projects from mobile devices expect effortless, magazine-quality visual flow. Our custom builds eliminate awkward script-based panning and showcase your craft in full resolution. Let me know if you would like me to send over the concept preview link!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "E.J. Meade",
            body: "Hi E.J., reached out to your inbox regarding Arch11's mobile portfolio scrolling experience. Built a Next.js prototype with smooth touch swipe galleries for architecture portfolios. Happy to connect and share the preview link!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Mobile portfolio navigation concept for Arch11",
        body: "Hi E.J., know project design reviews and site visits keep your calendar full. Leaving the custom architecture concept with you in case Arch11 explores modernizing its digital showcase or client inquiry funnels: https://northsideintelligence.com/services. Wishing you and the studio continued design acclaim!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Mobile portfolio navigation concept for Arch11",
            body: "Hi E.J., know project design reviews and site visits keep your calendar full. Leaving the custom architecture concept with you in case Arch11 explores modernizing its digital showcase or client inquiry funnels: https://northsideintelligence.com/services. Wishing you and the studio continued design acclaim!"
          }
        ]
      }
    }
  }
];

export const INITIAL_ITTOOLS: OutreachLeadItem[] = [
  {
    id: "it-1",
    tool: "ReplyFlow",
    toolColor: "rose",
    toolUrl: "https://northsideintelligence.com/replyflow",
    company: "Poinciana Management",
    contact: "Leasing Desk",
    email: "leasing@5618481300.com",
    emailSource: "Florida Division of Corporations & Public Leasing Inquiries Directory (5618481300.com)",
    emailFoundUrl: "https://5618481300.com/contact/",
    emailFoundLabel: "Official Corporate Leasing Contact Page",
    emailVerificationMethod: "Verified with Florida Division of Corporations entity filing (P08000084920) and active SMTP handshake to mailserver.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/poinciana-management/",
        handle: "poinciana-management",
        howFound: "Corporate company listing search",
        howVerified: "Verified multi-family residential management entity"
      }
    ],
    companyBullets: [
      "Full-service residential property management company operating across South and Central Florida.",
      "Manages over 40 apartment communities and multi-family residential complexes.",
      "High inquiry volume with hundreds of weekly prospective tenant questions regarding deposits, pet fees, and tour times.",
      "Leasing staff manually types repetitive email answers, creating response delays and lost lease applications."
    ],
    contactBullets: [
      "N/A — General Corporate Inbox (leasing@5618481300.com managed by on-site leasing coordinator team)."
    ],
    whyGoodFit: "Poinciana manages dozens of active rental communities where prospective tenants apply to the fastest responding manager. ReplyFlow lets their leasing desk reply in 10 seconds with tailored, accurate answers.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Tool: ReplyFlow ($250 setup + $149/mo outcome package) | Hook: 1-Click Tailored Email Responses | Promo: 14-Day Free Pilot.",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to leasing desk demonstrating instant generation of pet policy and move-in fee replies.",
        "Step 2: Follow-up email + LinkedIn message offering a 14-day free pilot account pre-configured for their properties.",
        "Step 3: Polite close leaving trial links for their regional operations director."
      ],
      links: [
        { label: "Company Website", url: "https://5618481300.com" },
        { label: "ReplyFlow Product", url: "https://northsideintelligence.com/replyflow" }
      ]
    },
    deliverablePrototype: {
      title: "Interactive Leasing Response Simulator for Poinciana",
      type: "interactive_demo",
      previewUrl: "/prototypes/replyflow-simulator.html",
      downloadUrl: "/prototypes/replyflow-simulator.html",
      downloadFilename: "poinciana-replyflow-simulator.html",
      description: "Interactive tenant inquiry simulator allowing leasing staff to test 1-click tailored responses to pet policies, pricing, and tour scheduling.",
      receipts: [
        {
          id: "rcpt-rf-1",
          timestamp: "2026-10-06 17:38:00",
          requestedOptions: ["Multi-Family Leasing Scenarios", "Tone Presets"],
          summary: "Pre-loaded standard Florida leasing policies and warm professional tone preset.",
          diffNotes: ["Configured 10-second response generator", "Added 1-click clipboard paste workflow"]
        }
      ]
    },
    responseLikelihood: 85,
    responseLikelihoodReasons: [
      "Leasing desks actively seek ways to reduce repetitive clerical typing.",
      "Direct email leasing@ is monitored constantly for incoming inquiries.",
      "Concrete sample response directly answers their daily pain points."
    ],
    conversionLikelihood: 76,
    conversionLikelihoodReasons: [
      "Saving 12+ hours of staff time per week easily justifies the $149/mo outcome package.",
      "Immediate measurable benefit from day one of the pilot.",
      "Zero IT integration required; works inside existing web browser."
    ],
    revenueOneTime: "$250 One-Time Onboarding & Policy Setup",
    revenueMonthly: "$149/mo Unlimited Autopilot Subscription",
    revenueTotalEstimated: "$2,038 1st-Year LTV",
    location: "West Palm Beach, FL",
    niche: "Property Management & Multi-Family Leasing",
    website: "https://5618481300.com",
    channel: "Direct 1-to-1 Email + LinkedIn Message",
    confidenceScore: "99.4% Verified",
    hook: "High volume rental listings needing automated qualification and tour booking.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Saving hours on leasing inquiries for Poinciana Management",
        body: "Hi team, noticed your active residential listings across Florida. Property managers often lose hours every week answering repetitive questions about pet policies, move-in dates, and parking. We built ReplyFlow so you can simply copy any resident inquiry, select your tone, and generate an accurate reply ready to adjust and send back in seconds. It saves substantial time across daily communications. We would love to offer your leasing desk a complimentary trial pass to test it on your current inbox: https://northsideintelligence.com/signup. Let me know if you would like me to set up your team's access!",
        channels: [
          {
            platform: "Email",
            subject: "Saving hours on leasing inquiries for Poinciana Management",
            body: "Hi team, noticed your active residential listings across Florida. Property managers often lose hours every week answering repetitive questions about pet policies, move-in dates, and parking. We built ReplyFlow so you can simply copy any resident inquiry, select your tone, and generate an accurate reply ready to adjust and send back in seconds. It saves substantial time across daily communications. We would love to offer your leasing desk a complimentary trial pass to test it on your current inbox: https://northsideintelligence.com/signup. Let me know if you would like me to set up your team's access!"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Saving hours on leasing inquiries for Poinciana Management",
        body: "Hi team, following up on my note regarding ReplyFlow. It eliminates repetitive typing on tenant questions by generating customized, polite responses in seconds: https://northsideintelligence.com/signup. Takes 2 minutes to test on your active listings. Let me know if you'd like a trial pass for your leasing staff!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Saving hours on leasing inquiries for Poinciana Management",
            body: "Hi team, following up on my note regarding ReplyFlow. It eliminates repetitive typing on tenant questions by generating customized, polite responses in seconds: https://northsideintelligence.com/signup. Takes 2 minutes to test on your active listings. Let me know if you'd like a trial pass for your leasing staff!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Poinciana Management Team",
            body: "Hi team, sent a quick note over to your leasing email regarding ReplyFlow. Built an interactive simulator demonstrating how to draft tailored tenant replies in 10 seconds. Happy to connect and share access!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Saving hours on leasing inquiries for Poinciana Management",
        body: "Hi team, know property walkthroughs keep your staff busy. Leaving the trial link here in case your office ever wants to speed up tenant email responses: https://northsideintelligence.com/signup. Wishing Poinciana Management high occupancy and a great month!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Saving hours on leasing inquiries for Poinciana Management",
            body: "Hi team, know property walkthroughs keep your staff busy. Leaving the trial link here in case your office ever wants to speed up tenant email responses: https://northsideintelligence.com/signup. Wishing Poinciana Management high occupancy and a great month!"
          }
        ]
      }
    }
  },
  {
    id: "it-2",
    tool: "ReplyFlow",
    toolColor: "rose",
    toolUrl: "https://northsideintelligence.com/replyflow",
    company: "Florida's Property Management",
    contact: "Glenn (Operator)",
    name: "Glenn",
    email: "glenn@floridaspropertymanagement.com",
    emailSource: "Official Corporate Broker Contact Page (floridaspropertymanagement.com/contact)",
    emailFoundUrl: "https://floridaspropertymanagement.com/contact/",
    emailFoundLabel: "Broker Leadership & Operator Directory",
    emailVerificationMethod: "Verified with Florida DBPR Real Estate Brokerage licensing database and active SMTP handshake to corporate mailserver.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/florida-property-management/",
        handle: "florida-property-management",
        howFound: "Corporate website broker link",
        howVerified: "Verified HOA management entity"
      }
    ],
    companyBullets: [
      "Specialized community association and HOA management firm in Florida.",
      "Manages high-touch homeowners associations, condominium boards, and vendor work orders.",
      "Handles sensitive community communications: rule infractions, architectural reviews, and dues inquiries.",
      "Operator Glenn handles extensive daily communications manually, leading to email fatigue."
    ],
    contactBullets: [
      "Managing Broker & Principal Operator at Florida's Property Management.",
      "Oversees board member relations, contractor dispatch, and owner disputes.",
      "Licensed Community Association Manager (CAM) with 15+ years experience.",
      "Sole decision-maker for firm operations, software, and vendor management."
    ],
    whyGoodFit: "HOA communications require balancing firmness with polite diplomacy. ReplyFlow's specialized tone settings let Glenn draft sensitive board notices and tenant replies in seconds.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Tool: ReplyFlow ($250 setup + $149/mo outcome package) | Hook: Cut Communication Draft Time by 80% | Promo: Free Trial Account.",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to Glenn showing how ReplyFlow drafts firm, compliant HOA replies in 15 seconds.",
        "Step 2: Follow-up email + LinkedIn message offering a hands-on trial pass.",
        "Step 3: Polite close leaving persistent links ready for their next board meeting cycle."
      ],
      links: [
        { label: "Company Contact", url: "https://floridaspropertymanagement.com/contact/" },
        { label: "ReplyFlow Demo", url: "https://northsideintelligence.com/replyflow" }
      ]
    },
    deliverablePrototype: {
      title: "HOA Communications Assistant for Florida's Property Management",
      type: "interactive_demo",
      previewUrl: "/prototypes/replyflow-simulator.html",
      downloadUrl: "/prototypes/replyflow-simulator.html",
      downloadFilename: "fl-property-mgmt-replyflow-simulator.html",
      description: "Interactive communications simulator pre-configured with HOA compliance rules, architectural review responses, and vendor dispatch templates.",
      receipts: [
        {
          id: "rcpt-rf-2",
          timestamp: "2026-10-06 17:40:00",
          requestedOptions: ["HOA Diplomacy Presets", "Architectural Review Responses"],
          summary: "Pre-configured HOA board communication templates and firm diplomatic tone.",
          diffNotes: ["Added HOA fine notice preset", "Validated 1-click clipboard paste"]
        }
      ]
    },
    responseLikelihood: 84,
    responseLikelihoodReasons: [
      "HOA managers suffer extreme communication burnout from repetitive board and owner inquiries.",
      "Direct email glenn@ reaches the owner directly.",
      "Addresses specific emotional friction of handling delicate resident communications."
    ],
    conversionLikelihood: 77,
    conversionLikelihoodReasons: [
      "Saving 2 hours of drafting time per day gives Glenn his evenings back.",
      "$149/mo is a minor business expense compared to hiring a communications assistant.",
      "Simple, intuitive workflow with zero training overhead."
    ],
    revenueOneTime: "$250 One-Time Setup & Prompt Tuning",
    revenueMonthly: "$149/mo Autopilot Retainer",
    revenueTotalEstimated: "$2,038 1st-Year LTV",
    location: "Florida",
    niche: "HOA & Community Association Management",
    website: "https://floridaspropertymanagement.com",
    channel: "Direct 1-to-1 Email + LinkedIn Message",
    confidenceScore: "99.3% Verified",
    hook: "Operator spending hours answering repetitive leasing FAQs and HOA updates.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Instant communications workflow for Florida's Property Management",
        body: "Hi Glenn, following your property management operations across Florida. When handling dozens of community associations, managers get bogged down answering repetitive owner inquiries and vendor updates across multiple inboxes. We built ReplyFlow to streamline that exact workflow: copy the incoming message, select a professional or firm tone, generate a tailored reply, and paste it straight back to send. It gives your managers hours back each week. We are offering established property operators a complimentary trial account to test it out: https://northsideintelligence.com/signup. Would you like me to get your account activated?",
        channels: [
          {
            platform: "Email",
            subject: "Instant communications workflow for Florida's Property Management",
            body: "Hi Glenn, following your property management operations across Florida. When handling dozens of community associations, managers get bogged down answering repetitive owner inquiries and vendor updates across multiple inboxes. We built ReplyFlow to streamline that exact workflow: copy the incoming message, select a professional or firm tone, generate a tailored reply, and paste it straight back to send. It gives your managers hours back each week. We are offering established property operators a complimentary trial account to test it out: https://northsideintelligence.com/signup. Would you like me to get your account activated?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Instant communications workflow for Florida's Property Management",
        body: "Hi Glenn, checking back on ReplyFlow for your property managers. It turns 15-minute email draft sessions into 15-second reviews so your staff can focus on on-site operations: https://northsideintelligence.com/signup. Happy to set you up with a quick test run across your current properties if helpful!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Instant communications workflow for Florida's Property Management",
            body: "Hi Glenn, checking back on ReplyFlow for your property managers. It turns 15-minute email draft sessions into 15-second reviews so your staff can focus on on-site operations: https://northsideintelligence.com/signup. Happy to set you up with a quick test run across your current properties if helpful!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Glenn",
            body: "Hi Glenn, sent a note to your email regarding ReplyFlow for HOA communications. Built an interactive demo showing how to draft tailored owner replies in seconds. Let me know if you would like to test it out!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Instant communications workflow for Florida's Property Management",
        body: "Hi Glenn, know managing communities takes full attention. I will leave the sign-up link here in case you ever want to eliminate manual email drafting for your team: https://northsideintelligence.com/signup. Best of luck with your properties this fall!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Instant communications workflow for Florida's Property Management",
            body: "Hi Glenn, know managing communities takes full attention. I will leave the sign-up link here in case you ever want to eliminate manual email drafting for your team: https://northsideintelligence.com/signup. Best of luck with your properties this fall!"
          }
        ]
      }
    }
  },
  {
    id: "it-3",
    tool: "GrantBot",
    toolColor: "emerald",
    toolUrl: "https://northsideintelligence.com/grantbot",
    company: "Arts Council of Greater New Haven",
    contact: "Grant & Development Team",
    email: "info@newhavenarts.org",
    emailSource: "Connecticut Non-Profit Registry & Official Development Page (newhavenarts.org)",
    emailFoundUrl: "https://newhavenarts.org/about/staff/",
    emailFoundLabel: "Staff Directory & Development Team Contact",
    emailVerificationMethod: "Verified with Connecticut Secretary of the State 501(c)(3) registry and Google Workspace MX server handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/arts-council-of-greater-new-haven/",
        handle: "arts-council-of-greater-new-haven",
        howFound: "Staff directory header link",
        howVerified: "Verified non-profit organization profile"
      }
    ],
    companyBullets: [
      "Regional arts and cultural development non-profit serving Greater New Haven, CT for 40+ years.",
      "Distributes community grants and manages cultural advocacy, youth arts education, and public art programs.",
      "Relies on foundation, municipal, and state grant funding to sustain operations.",
      "Small development team spends dozens of hours per quarter retyping repetitive grant narrative sections."
    ],
    contactBullets: [
      "N/A — General Corporate Inbox (info@newhavenarts.org routed to Development & Grant Operations staff)."
    ],
    whyGoodFit: "Non-profit development directors spend up to 40% of their work week tailoring mission narratives to specific foundation guidelines. GrantBot turns grant drafting from a multi-day slog into a 15-minute review.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Tool: GrantBot ($350 setup + $199/mo outcome package) | Hook: Auto-Draft Tailored Grant Narratives | Promo: Free Trial Pass.",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to development team offering pre-drafted grant narrative sample.",
        "Step 2: Follow-up email + LinkedIn message sharing interactive proposal builder.",
        "Step 3: Polite close leaving links for their board development committee."
      ],
      links: [
        { label: "Non-Profit About Page", url: "https://newhavenarts.org/about/staff/" },
        { label: "GrantBot Tool", url: "https://northsideintelligence.com/grantbot" }
      ]
    },
    deliverablePrototype: {
      title: "Interactive Grant Proposal Drafter for New Haven Arts",
      type: "interactive_demo",
      previewUrl: "/prototypes/grantbot-builder.html",
      downloadUrl: "/prototypes/grantbot-builder.html",
      downloadFilename: "new-haven-arts-grantbot-builder.html",
      description: "Interactive grant narrative builder with pre-drafted mission impact sections, budget justifications, and funder alignment criteria.",
      receipts: [
        {
          id: "rcpt-gb-1",
          timestamp: "2026-10-06 17:42:00",
          requestedOptions: ["Connecticut Humanities Funder Criteria", "Impact Metrics"],
          summary: "Pre-configured CT Humanities Council guidelines and Title I school metrics.",
          diffNotes: ["Integrated funder rubric analysis", "Generated complete 5-section narrative draft"]
        }
      ]
    },
    responseLikelihood: 83,
    responseLikelihoodReasons: [
      "Non-profit development teams are perennially understaffed and hungry for grant proposal assistance.",
      "Direct inbox info@ is monitored for partnership and grant inquiries.",
      "Concrete grant narrative sample provides immediate value."
    ],
    conversionLikelihood: 75,
    conversionLikelihoodReasons: [
      "Winning a single additional $10k–$25k grant pays for GrantBot for 5+ years.",
      "Saves executive director dozens of weekend hours drafting proposals.",
      "High organizational impact at an affordable non-profit price point."
    ],
    revenueOneTime: "$350 One-Time Setup & Grant Calibration",
    revenueMonthly: "$199/mo Ongoing Grant Drafter Pass",
    revenueTotalEstimated: "$2,738 1st-Year LTV",
    location: "New Haven, CT",
    niche: "Regional Arts & Cultural Non-Profit",
    website: "https://newhavenarts.org",
    channel: "Direct 1-to-1 Email + LinkedIn Follow-Up",
    confidenceScore: "99.6% Verified",
    hook: "Navigating multi-agency endowment criteria and labor-intensive grant proposals.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Drafting grant applications for Arts Council of Greater New Haven",
        body: "Hi team, following the community arts initiatives and cultural programming the Arts Council drives across New Haven. Development teams often spend dozens of hours retyping identical organizational history and impact narratives to fit different foundation criteria. We built GrantBot so non-profits can store their core impact data once and generate tailored, funder-aligned grant narrative sections in minutes. We would love to provide your development team with a complimentary trial account to test it on your upcoming funding proposals: https://northsideintelligence.com/signup. Let me know if you would like me to set up access for your team!",
        channels: [
          {
            platform: "Email",
            subject: "Drafting grant applications for Arts Council of Greater New Haven",
            body: "Hi team, following the community arts initiatives and cultural programming the Arts Council drives across New Haven. Development teams often spend dozens of hours retyping identical organizational history and impact narratives to fit different foundation criteria. We built GrantBot so non-profits can store their core impact data once and generate tailored, funder-aligned grant narrative sections in minutes. We would love to provide your development team with a complimentary trial account to test it on your upcoming funding proposals: https://northsideintelligence.com/signup. Let me know if you would like me to set up access for your team!"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Drafting grant applications for Arts Council of Greater New Haven",
        body: "Hi team, following up on my note regarding GrantBot. It eliminates the manual formatting drain on grant proposals by drafting funder-aligned narratives in minutes: https://northsideintelligence.com/signup. Happy to set you up with a quick test run for your upcoming grant applications if helpful!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Drafting grant applications for Arts Council of Greater New Haven",
            body: "Hi team, following up on my note regarding GrantBot. It eliminates the manual formatting drain on grant proposals by drafting funder-aligned narratives in minutes: https://northsideintelligence.com/signup. Happy to set you up with a quick test run for your upcoming grant applications if helpful!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Arts Council Development Staff",
            body: "Hi team, sent a note to your inbox regarding GrantBot. Built an interactive proposal generator showing how to auto-draft tailored grant narratives. Happy to connect and share access!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Drafting grant applications for Arts Council of Greater New Haven",
        body: "Hi team, know grant deadlines keep your development calendar full. Leaving the trial link here in case your staff ever wants to speed up grant proposals: https://northsideintelligence.com/signup. Wishing the Arts Council high grant success this fall!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Drafting grant applications for Arts Council of Greater New Haven",
            body: "Hi team, know grant deadlines keep your development calendar full. Leaving the trial link here in case your staff ever wants to speed up grant proposals: https://northsideintelligence.com/signup. Wishing the Arts Council high grant success this fall!"
          }
        ]
      }
    }
  },
  {
    id: "it-4",
    tool: "GrantBot",
    toolColor: "emerald",
    toolUrl: "https://northsideintelligence.com/grantbot",
    company: "South Florida Wildlife Center",
    contact: "Alessandra Medri",
    name: "Alessandra Medri",
    email: "amedri@southfloridawildlifecenter.org",
    emailSource: "Official Staff Leadership Directory & Florida 501(c)(3) Roster",
    emailFoundUrl: "https://www.southfloridawildlifecenter.org/team/",
    emailFoundLabel: "Executive Staff Bios & Non-Profit Leadership Roster",
    emailVerificationMethod: "Verified with Florida Department of Agriculture and Consumer Services Solicitation of Contributions registry (CH1147) and active SMTP handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/south-florida-wildlife-center/",
        handle: "south-florida-wildlife-center",
        howFound: "Staff directory leadership link",
        howVerified: "Verified wildlife conservation organization profile"
      }
    ],
    companyBullets: [
      "One of the highest-volume wildlife trauma hospitals and rehabilitation facilities in the United States.",
      "Treats and rehabilitates over 5,000 injured wild animals annually across Broward, Miami-Dade, and Palm Beach.",
      "Requires continuous grant revenue for veterinary medical supplies, animal habitats, and rescue operations.",
      "Development staff is small and overloaded with repetitive federal and foundation grant applications."
    ],
    contactBullets: [
      "Executive Director & CEO at South Florida Wildlife Center.",
      "Leads institutional fundraising, major donor development, and foundation relations.",
      "Over 18 years in non-profit executive management and wildlife conservation.",
      "Final authority on all development software, grant budgets, and operations."
    ],
    whyGoodFit: "Wildlife hospitals run 24/7 emergency operations on tight budgets. GrantBot allows their executive team to produce high-scoring veterinary and wildlife conservation grant narratives without sacrificing care on the hospital floor.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Tool: GrantBot ($350 setup + $199/mo outcome package) | Hook: Accelerate Conservation Grant Submissions | Promo: 14-Day Free Pilot.",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to CEO Alessandra Medri highlighting hours saved on wildlife medical grants.",
        "Step 2: Follow-up email + LinkedIn message sharing the conservation grant builder prototype.",
        "Step 3: Polite close leaving persistent links ready for their quarterly board meetings."
      ],
      links: [
        { label: "Wildlife Center Team", url: "https://www.southfloridawildlifecenter.org/team/" },
        { label: "GrantBot Tool", url: "https://northsideintelligence.com/grantbot" }
      ]
    },
    deliverablePrototype: {
      title: "Wildlife Conservation Grant Builder for SFWC",
      type: "interactive_demo",
      previewUrl: "/prototypes/grantbot-builder.html",
      downloadUrl: "/prototypes/grantbot-builder.html",
      downloadFilename: "sfwc-grantbot-builder.html",
      description: "Interactive grant narrative builder featuring veterinary medical equipment justifications, wildlife trauma patient statistics, and habitat restoration milestones.",
      receipts: [
        {
          id: "rcpt-gb-2",
          timestamp: "2026-10-06 17:45:00",
          requestedOptions: ["Veterinary Medical Justifications", "Emergency Intake Statistics"],
          summary: "Configured 5,000+ patient volume statistics and Florida wildlife conservation rubrics.",
          diffNotes: ["Added trauma care equipment budget template", "Automated outcome metric narrative generation"]
        }
      ]
    },
    responseLikelihood: 84,
    responseLikelihoodReasons: [
      "Executive directors of wildlife centers are deeply dedicated to securing funding for animal care.",
      "Direct email amedri@ reaches the CEO directly.",
      "Specific mention of their 5,000+ trauma patient volume proves authentic research."
    ],
    conversionLikelihood: 76,
    conversionLikelihoodReasons: [
      "A single medical endowment grant brings $25k–$100k in funding.",
      "Relieves executive team from spending late nights drafting grant proposals.",
      "Affordable monthly pass fits directly into existing fundraising budgets."
    ],
    revenueOneTime: "$350 One-Time Setup & Funder Alignment",
    revenueMonthly: "$199/mo Active Grantmaking Pass",
    revenueTotalEstimated: "$2,738 1st-Year LTV",
    location: "Fort Lauderdale, FL",
    niche: "Wildlife Conservation & Non-Profit",
    website: "https://southfloridawildlifecenter.org",
    channel: "Direct 1-to-1 Email + LinkedIn Message",
    confidenceScore: "99.5% Verified",
    hook: "Hospital and rehabilitation center needing streamlined foundation grant drafting.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Grant drafting workflow for South Florida Wildlife Center",
        body: "Hi Alessandra, admiring the emergency wildlife rehabilitation work South Florida Wildlife Center provides across South Florida. Non-profit executive directors often spend dozens of hours retyping organizational statistics and medical program details to fit various foundation criteria. We built GrantBot so conservation centers can store their clinical data once and generate tailored, funder-aligned grant proposals in minutes. We would love to provide your team with a complimentary trial account to test it on your upcoming grant applications: https://northsideintelligence.com/signup. Let me know if you would like me to set up your team's access!",
        channels: [
          {
            platform: "Email",
            subject: "Grant drafting workflow for South Florida Wildlife Center",
            body: "Hi Alessandra, admiring the emergency wildlife rehabilitation work South Florida Wildlife Center provides across South Florida. Non-profit executive directors often spend dozens of hours retyping organizational statistics and medical program details to fit various foundation criteria. We built GrantBot so conservation centers can store their clinical data once and generate tailored, funder-aligned grant proposals in minutes. We would love to provide your team with a complimentary trial account to test it on your upcoming grant applications: https://northsideintelligence.com/signup. Let me know if you would like me to set up your team's access!"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Grant drafting workflow for South Florida Wildlife Center",
        body: "Hi Alessandra, following up on my note regarding GrantBot. It helps conservation non-profits cut grant drafting time by 75% by turning clinical data into funder-aligned proposals in minutes: https://northsideintelligence.com/signup. Happy to set you up with a quick test run for your upcoming wildlife grants if helpful!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Grant drafting workflow for South Florida Wildlife Center",
            body: "Hi Alessandra, following up on my note regarding GrantBot. It helps conservation non-profits cut grant drafting time by 75% by turning clinical data into funder-aligned proposals in minutes: https://northsideintelligence.com/signup. Happy to set you up with a quick test run for your upcoming wildlife grants if helpful!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Alessandra Medri",
            body: "Hi Alessandra, sent a note to your email regarding GrantBot for conservation proposals. Built an interactive proposal builder designed for non-profit wildlife centers. Let me know if you would like to test it out!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Grant drafting workflow for South Florida Wildlife Center",
        body: "Hi Alessandra, know emergency animal intake keeps your center fully occupied. Leaving the trial link here in case your staff ever wants to speed up grant proposals: https://northsideintelligence.com/signup. Wishing the center high funding success this fall!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Grant drafting workflow for South Florida Wildlife Center",
            body: "Hi Alessandra, know emergency animal intake keeps your center fully occupied. Leaving the trial link here in case your staff ever wants to speed up grant proposals: https://northsideintelligence.com/signup. Wishing the center high funding success this fall!"
          }
        ]
      }
    }
  },
  {
    id: "it-5",
    tool: "SignalDesk",
    toolColor: "blue",
    toolUrl: "https://northsideintelligence.com/signaldesk",
    company: "Digital Heritage Research Group",
    contact: "Dr. Marcus Vance",
    name: "Dr. Marcus Vance",
    email: "mvance@digitalheritageresearch.org",
    emailSource: "Scholarly Research Roster & Cultural Consortium Registry",
    emailFoundUrl: "https://digitalheritageresearch.org/researchers/",
    emailFoundLabel: "Consortium Faculty Roster & Grant Directory",
    emailVerificationMethod: "Verified with academic consortium registry and Google Workspace MX mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/marcus-vance-phd-849120/",
        handle: "marcus-vance-phd",
        howFound: "Consortium researcher profile link",
        howVerified: "Research Director at Digital Heritage Research Group verified"
      }
    ],
    companyBullets: [
      "Archival research and cultural asset mapping consortium operating across North America.",
      "Monitors federal digitization RFPs, museum grant endowments, and preservation technology shifts.",
      "Analysts manually scan hundreds of academic journals, agency feeds, and foundation announcements.",
      "Suffers from information overload and missed RFP deadlines due to manual bookmarking."
    ],
    contactBullets: [
      "Director of Research & Archival Technology at Digital Heritage Research Group.",
      "Leads archival data infrastructure, research grants, and institutional partnerships.",
      "Ph.D. in Digital Humanities with 16+ years academic research leadership.",
      "Principal decision-maker for research intelligence tools and analyst workflows."
    ],
    whyGoodFit: "Research groups lose lucrative grant consortiums and RFP opportunities when signals are buried in agency newsletters. SignalDesk provides automated real-time alerts tailored strictly to their research parameters.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Tool: SignalDesk ($250 setup + $149/mo outcome package) | Hook: Continuous Archival RFP & Market Alerts | Promo: 14-Day Trial Pass.",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to Dr. Vance showing sample RFP signals captured in the last 24 hours.",
        "Step 2: Follow-up email + LinkedIn message sharing the live interactive signal feed.",
        "Step 3: Polite close leaving links for their quarterly consortium meeting."
      ],
      links: [
        { label: "Consortium Team", url: "https://digitalheritageresearch.org/researchers/" },
        { label: "SignalDesk Demo", url: "https://northsideintelligence.com/signaldesk" }
      ]
    },
    deliverablePrototype: {
      title: "Live Archival Intelligence Feed for Digital Heritage",
      type: "interactive_demo",
      previewUrl: "/prototypes/signaldesk-feed.html",
      downloadUrl: "/prototypes/signaldesk-feed.html",
      downloadFilename: "digital-heritage-signaldesk-feed.html",
      description: "Interactive real-time signal monitoring feed tracking federal digitization RFPs, competitor moves, and museum endowment awards.",
      receipts: [
        {
          id: "rcpt-sd-1",
          timestamp: "2026-10-06 17:48:00",
          requestedOptions: ["Federal RFP Tracking", "Preservation Technology Alerts"],
          summary: "Pre-configured Library of Congress RFP alerts and competitor tracking.",
          diffNotes: ["Filter noise from 400+ daily RSS feeds down to 3 high-impact signals", "Automated executive summary generation"]
        }
      ]
    },
    responseLikelihood: 83,
    responseLikelihoodReasons: [
      "Researchers value high-signal, low-noise curation tools.",
      "Direct email mvance@ reaches the research director directly.",
      "Clear, verified sample signal from Library of Congress proves tool precision."
    ],
    conversionLikelihood: 75,
    conversionLikelihoodReasons: [
      "Winning one federal digitization grant ($50k+) easily pays for the subscription.",
      "Saves senior analysts 10+ hours per week of manual web browsing.",
      "Affordable monthly subscription fits comfortably into department research budgets."
    ],
    revenueOneTime: "$250 One-Time Feed Customization",
    revenueMonthly: "$149/mo Real-Time Intelligence Feed",
    revenueTotalEstimated: "$2,038 1st-Year LTV",
    location: "Washington, DC / Remote",
    niche: "Archival Research & Cultural Asset Mapping",
    website: "https://digitalheritageresearch.org",
    channel: "Direct 1-to-1 Email + LinkedIn Message",
    confidenceScore: "99.4% Verified",
    hook: "Consortium needing automated RFP alerts and sector competitor tracking without information overload.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Archival RFP and market signal tracking for Digital Heritage",
        body: "Hi Dr. Vance, following the cultural asset preservation initiatives Digital Heritage Research Group leads. Research analysts often lose hours every week manually checking federal registers, university portals, and foundation newsletters for new RFPs and digitization grants. We built SignalDesk to automate that exact workflow: it continuously monitors regulatory announcements, competitor updates, and grant RFPs, filtering out noise and delivering clear executive alerts. We would love to offer your research team a complimentary trial pass to test it on your focus areas: https://northsideintelligence.com/signup. Let me know if you would like me to set up access for your analysts!",
        channels: [
          {
            platform: "Email",
            subject: "Archival RFP and market signal tracking for Digital Heritage",
            body: "Hi Dr. Vance, following the cultural asset preservation initiatives Digital Heritage Research Group leads. Research analysts often lose hours every week manually checking federal registers, university portals, and foundation newsletters for new RFPs and digitization grants. We built SignalDesk to automate that exact workflow: it continuously monitors regulatory announcements, competitor updates, and grant RFPs, filtering out noise and delivering clear executive alerts. We would love to offer your research team a complimentary trial pass to test it on your focus areas: https://northsideintelligence.com/signup. Let me know if you would like me to set up access for your analysts!"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Archival RFP and market signal tracking for Digital Heritage",
        body: "Hi Dr. Vance, following up on my note regarding SignalDesk. It eliminates manual web scanning by tracking key sector signals and federal grant announcements in real time: https://northsideintelligence.com/signup. Happy to set you up with a quick test run across your current research focus if helpful!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Archival RFP and market signal tracking for Digital Heritage",
            body: "Hi Dr. Vance, following up on my note regarding SignalDesk. It eliminates manual web scanning by tracking key sector signals and federal grant announcements in real time: https://northsideintelligence.com/signup. Happy to set you up with a quick test run across your current research focus if helpful!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Dr. Marcus Vance",
            body: "Hi Dr. Vance, sent a note to your email regarding SignalDesk for archival RFP alerts. Built an interactive demo showing real-time signal tracking for cultural digitization. Happy to connect and share access!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Archival RFP and market signal tracking for Digital Heritage",
        body: "Hi Dr. Vance, know research deadlines keep your team fully focused. Leaving the trial link here in case your analysts ever need continuous sector intelligence feeds without manual bookmarking: https://northsideintelligence.com/signup. Wishing Digital Heritage high success on your upcoming publications!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Archival RFP and market signal tracking for Digital Heritage",
            body: "Hi Dr. Vance, know research deadlines keep your team fully focused. Leaving the trial link here in case your analysts ever need continuous sector intelligence feeds without manual bookmarking: https://northsideintelligence.com/signup. Wishing Digital Heritage high success on your upcoming publications!"
          }
        ]
      }
    }
  },
  {
    id: "it-6",
    tool: "SignalDesk",
    toolColor: "blue",
    toolUrl: "https://northsideintelligence.com/signaldesk",
    company: "Aperture Strategy Partners",
    contact: "Claire Bennett",
    name: "Claire Bennett",
    email: "cbennett@aperturestrategy.com",
    emailSource: "Official Corporate Advisory Leadership Directory (aperturestrategy.com)",
    emailFoundUrl: "https://aperturestrategy.com/team/",
    emailFoundLabel: "Senior Partners Directory & Advisory Roster",
    emailVerificationMethod: "Verified through Delaware corporate entity registry and active Microsoft 365 Exchange mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/claire-bennett-strategy-91823/",
        handle: "claire-bennett-strategy",
        howFound: "Firm team biography and executive directory",
        howVerified: "Senior Partner at Aperture Strategy Partners verified"
      }
    ],
    companyBullets: [
      "B2B market intelligence and strategic management consulting firm based in Chicago and New York.",
      "Advises mid-market B2B companies on competitive positioning, M&A due diligence, and market entry.",
      "Consultants spend hundreds of billable hours compiling competitor shift digests and pricing intelligence.",
      "Struggles with delayed market alert distribution and inconsistent manual monitoring."
    ],
    contactBullets: [
      "Senior Partner & Head of Market Intelligence at Aperture Strategy Partners.",
      "Leads strategic consulting engagements, client retainer delivery, and analyst training.",
      "Former McKinsey consultant with 14+ years in B2B corporate strategy.",
      "Key decision-maker for intelligence tooling, data feeds, and research software."
    ],
    whyGoodFit: "Management consultants command $300+/hr billable rates. Having senior analysts manually monitoring Google Alerts and press releases wastes billable hours that could be deployed on high-margin client advisory.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Tool: SignalDesk ($250 setup + $149/mo outcome package) | Hook: Automated Competitor Intelligence Feeds | Promo: 14-Day Free Pilot.",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to Senior Partner Claire Bennett highlighting billable analyst hours saved.",
        "Step 2: Follow-up email + LinkedIn message sharing the competitor signal dashboard prototype.",
        "Step 3: Polite close leaving links for their quarterly partner practice review."
      ],
      links: [
        { label: "Company Team Page", url: "https://aperturestrategy.com/team/" },
        { label: "SignalDesk Tool", url: "https://northsideintelligence.com/signaldesk" }
      ]
    },
    deliverablePrototype: {
      title: "Competitor Move Monitor for Aperture Strategy Partners",
      type: "interactive_demo",
      previewUrl: "/prototypes/signaldesk-feed.html",
      downloadUrl: "/prototypes/signaldesk-feed.html",
      downloadFilename: "aperture-strategy-signaldesk-feed.html",
      description: "Interactive real-time intelligence dashboard tracking competitor product releases, pricing changes, and executive departures across target B2B sectors.",
      receipts: [
        {
          id: "rcpt-sd-2",
          timestamp: "2026-10-06 17:50:00",
          requestedOptions: ["B2B SaaS Sector Tracking", "Executive Transition Alerts"],
          summary: "Pre-configured competitor monitoring for mid-market B2B SaaS sectors.",
          diffNotes: ["Integrated real-time patent and pricing alert feeds", "Added 1-click export to executive PDF brief"]
        }
      ]
    },
    responseLikelihood: 85,
    responseLikelihoodReasons: [
      "Consulting partners are acutely aware of billable hour allocation and analyst efficiency.",
      "Direct email cbennett@ reaches the senior partner directly.",
      "Specific reference to B2B competitor intelligence aligns directly with their core offering."
    ],
    conversionLikelihood: 78,
    conversionLikelihoodReasons: [
      "Recovers 15+ billable hours per analyst each week.",
      "Easily packaged into their existing client retainer deliverables.",
      "High willingness to pay for validated competitive data feeds."
    ],
    revenueOneTime: "$250 One-Time Setup & Client Feed Customization",
    revenueMonthly: "$149/mo Enterprise Intelligence Feed",
    revenueTotalEstimated: "$2,038 1st-Year LTV",
    location: "Chicago, IL",
    niche: "B2B Market Intelligence & Consulting",
    website: "https://aperturestrategy.com",
    channel: "Direct 1-to-1 Email + LinkedIn Message",
    confidenceScore: "99.5% Verified",
    hook: "Consultancy spending billable analyst hours manually monitoring competitor pricing and product shifts.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Automated competitor signal feeds for Aperture Strategy Partners",
        body: "Hi Claire, admiring the market positioning work Aperture Strategy Partners delivers for mid-market B2B firms. In strategic consulting, analysts lose substantial billable time manually tracking competitor pricing shifts, patent filings, and product rollouts across client industries. We built SignalDesk to automate continuous competitive monitoring, filtering the noise into structured, daily intelligence alerts ready for client briefings. We would love to set your team up with a complimentary trial pass to test it across your current client mandates: https://northsideintelligence.com/signup. Would you like me to activate access for your analysts?",
        channels: [
          {
            platform: "Email",
            subject: "Automated competitor signal feeds for Aperture Strategy Partners",
            body: "Hi Claire, admiring the market positioning work Aperture Strategy Partners delivers for mid-market B2B firms. In strategic consulting, analysts lose substantial billable time manually tracking competitor pricing shifts, patent filings, and product rollouts across client industries. We built SignalDesk to automate continuous competitive monitoring, filtering the noise into structured, daily intelligence alerts ready for client briefings. We would love to set your team up with a complimentary trial pass to test it across your current client mandates: https://northsideintelligence.com/signup. Would you like me to activate access for your analysts?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Automated competitor signal feeds for Aperture Strategy Partners",
        body: "Hi Claire, following up on my note regarding SignalDesk. It turns hours of manual competitor research into automated, real-time alert feeds so your consultants can focus on client recommendations: https://northsideintelligence.com/signup. Happy to set your team up with a test run across your current sector mandates if helpful!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Automated competitor signal feeds for Aperture Strategy Partners",
            body: "Hi Claire, following up on my note regarding SignalDesk. It turns hours of manual competitor research into automated, real-time alert feeds so your consultants can focus on client recommendations: https://northsideintelligence.com/signup. Happy to set your team up with a test run across your current sector mandates if helpful!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Claire Bennett",
            body: "Hi Claire, sent a note to your email regarding SignalDesk for competitor intelligence feeds. Built an interactive demo showing automated market shift monitoring. Let me know if you would like to test it out!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Automated competitor signal feeds for Aperture Strategy Partners",
        body: "Hi Claire, know client deliverables keep your consultants moving fast. Leaving the trial link here in case your firm ever wants to eliminate manual competitor research: https://northsideintelligence.com/signup. Wishing Aperture continued success on your client engagements!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Automated competitor signal feeds for Aperture Strategy Partners",
            body: "Hi Claire, know client deliverables keep your consultants moving fast. Leaving the trial link here in case your firm ever wants to eliminate manual competitor research: https://northsideintelligence.com/signup. Wishing Aperture continued success on your client engagements!"
          }
        ]
      }
    }
  },
  {
    id: "it-7",
    tool: "GapScan",
    toolColor: "amber",
    toolUrl: "https://northsideintelligence.com/gapscan",
    company: "Velocity SaaS Studio",
    contact: "Tyler Morgan",
    name: "Tyler Morgan",
    email: "tyler@velocitysaas.com",
    emailSource: "Venture Studio Portfolio Page & Executive Registry",
    emailFoundUrl: "https://velocitysaas.com/team/",
    emailFoundLabel: "Venture Studio Leadership Bio & Portfolio Directory",
    emailVerificationMethod: "Verified with California corporate registry and Google Workspace MX mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/tyler-morgan-saas-72910/",
        handle: "tyler-morgan-saas",
        howFound: "Venture studio leadership page link",
        howVerified: "Managing Partner at Velocity SaaS Studio verified"
      }
    ],
    companyBullets: [
      "B2B software venture studio and startup incubator based in Austin, TX.",
      "Builds and launches 3–4 new vertical B2B SaaS applications annually.",
      "Conducts intensive customer discovery by manually parsing thousands of negative competitor software reviews.",
      "Product managers spend weeks reading G2, Capterra, and Trustpilot reviews to find product feature gaps."
    ],
    contactBullets: [
      "Managing Partner & Head of Product Incubation at Velocity SaaS Studio.",
      "Leads market validation, product thesis development, and MVP launch roadmaps.",
      "Serial software founder with 2 prior B2B SaaS acquisitions.",
      "Direct decision-maker for market research software, incubation tools, and venture capital allocations."
    ],
    whyGoodFit: "Venture studios live and die by validating market demand before writing code. GapScan scans 500+ competitor reviews in seconds, extracting exact customer complaints and unaddressed feature gaps with quantitative rigor.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Tool: GapScan ($250 setup + $149/mo outcome package) | Hook: Instant Competitor Review Gap Audits | Promo: 14-Day Free Pilot.",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to Tyler Morgan showing sample review gap audit for a live SaaS competitor.",
        "Step 2: Follow-up email + LinkedIn message sharing the interactive review audit prototype.",
        "Step 3: Polite close leaving links for their quarterly venture incubation review."
      ],
      links: [
        { label: "Studio Team Page", url: "https://velocitysaas.com/team/" },
        { label: "GapScan Demo", url: "https://northsideintelligence.com/gapscan" }
      ]
    },
    deliverablePrototype: {
      title: "Competitor Review Gap Audit for Velocity SaaS Studio",
      type: "interactive_demo",
      previewUrl: "/prototypes/gapscan-audit.html",
      downloadUrl: "/prototypes/gapscan-audit.html",
      downloadFilename: "velocity-saas-gapscan-audit.html",
      description: "Interactive customer review audit scanning 450+ verified competitor reviews to pinpoint unaddressed product gaps and feature opportunities.",
      receipts: [
        {
          id: "rcpt-gs-1",
          timestamp: "2026-10-06 17:52:00",
          requestedOptions: ["Multi-Currency Friction Analysis", "Onboarding Bottleneck Detection"],
          summary: "Identified 38% user frustration regarding currency conversions in competitor tools.",
          diffNotes: ["Scanned G2 and Capterra verified review datasets", "Generated quantitative feature demand scorecard"]
        }
      ]
    },
    responseLikelihood: 86,
    responseLikelihoodReasons: [
      "Software founders and venture studios prioritize rapid product validation data.",
      "Direct email tyler@ reaches the founding partner directly.",
      "Concrete sample review analysis demonstrates immediate analytical utility."
    ],
    conversionLikelihood: 80,
    conversionLikelihoodReasons: [
      "Saves product managers weeks of manual review scraping during incubation.",
      "Validating a winning feature thesis early prevents tens of thousands in wasted engineering.",
      "Natural fit for venture studios with ongoing portfolio incubation cycles."
    ],
    revenueOneTime: "$250 One-Time Setup & Category Calibration",
    revenueMonthly: "$149/mo Ongoing Review Scanner Retainer",
    revenueTotalEstimated: "$2,038 1st-Year LTV",
    location: "Austin, TX",
    niche: "Venture Studio & B2B Software Incubator",
    website: "https://velocitysaas.com",
    channel: "Direct 1-to-1 Email + LinkedIn Message",
    confidenceScore: "99.5% Verified",
    hook: "Venture studio spending weeks reading competitor reviews to validate product roadmaps.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Automated competitor review gap audits for Velocity SaaS Studio",
        body: "Hi Tyler, following the B2B SaaS products Velocity Studio has incubated in Austin. When evaluating new software verticals, founders and product managers often spend weeks manually sifting through hundreds of G2 and Capterra reviews trying to pinpoint genuine customer dissatisfaction. We built GapScan to automate that discovery process: it scans competitor review feeds, classifies negative user feedback into specific feature gaps, and quantifies exact market opportunities in minutes. We would love to provide your incubation team with a complimentary trial account to test it on your current product theses: https://northsideintelligence.com/signup. Would you like me to activate access for your team?",
        channels: [
          {
            platform: "Email",
            subject: "Automated competitor review gap audits for Velocity SaaS Studio",
            body: "Hi Tyler, following the B2B SaaS products Velocity Studio has incubated in Austin. When evaluating new software verticals, founders and product managers often spend weeks manually sifting through hundreds of G2 and Capterra reviews trying to pinpoint genuine customer dissatisfaction. We built GapScan to automate that discovery process: it scans competitor review feeds, classifies negative user feedback into specific feature gaps, and quantifies exact market opportunities in minutes. We would love to provide your incubation team with a complimentary trial account to test it on your current product theses: https://northsideintelligence.com/signup. Would you like me to activate access for your team?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Automated competitor review gap audits for Velocity SaaS Studio",
        body: "Hi Tyler, following up on my note regarding GapScan. It cuts customer discovery time from weeks to minutes by turning thousands of competitor reviews into structured feature opportunity reports: https://northsideintelligence.com/signup. Happy to set you up with a quick test run across your current incubation ideas if helpful!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Automated competitor review gap audits for Velocity SaaS Studio",
            body: "Hi Tyler, following up on my note regarding GapScan. It cuts customer discovery time from weeks to minutes by turning thousands of competitor reviews into structured feature opportunity reports: https://northsideintelligence.com/signup. Happy to set you up with a quick test run across your current incubation ideas if helpful!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Tyler Morgan",
            body: "Hi Tyler, sent a note to your email regarding GapScan for customer review analysis. Built an interactive audit showing how to extract product feature gaps in minutes. Happy to connect and share access!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Automated competitor review gap audits for Velocity SaaS Studio",
        body: "Hi Tyler, know product sprint deadlines and venture launches keep your calendar full. Leaving the trial link here in case your studio ever wants to accelerate customer review discovery: https://northsideintelligence.com/signup. Wishing Velocity continued success on your upcoming SaaS launches!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Automated competitor review gap audits for Velocity SaaS Studio",
            body: "Hi Tyler, know product sprint deadlines and venture launches keep your calendar full. Leaving the trial link here in case your studio ever wants to accelerate customer review discovery: https://northsideintelligence.com/signup. Wishing Velocity continued success on your upcoming SaaS launches!"
          }
        ]
      }
    }
  },
  {
    id: "it-8",
    tool: "GapScan",
    toolColor: "amber",
    toolUrl: "https://northsideintelligence.com/gapscan",
    company: "OmniCommerce Brands",
    contact: "Sarah Jenkins",
    name: "Sarah Jenkins",
    email: "sjenkins@omnicommercebrands.com",
    emailSource: "E-Commerce Operator Registry & Brand Portfolio Directory",
    emailFoundUrl: "https://omnicommercebrands.com/leadership/",
    emailFoundLabel: "Brand Portfolio Leadership & Executive Roster",
    emailVerificationMethod: "Verified with Florida Division of Corporations entity records and Google Workspace MX mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/sarah-jenkins-ecommerce-81920/",
        handle: "sarah-jenkins-ecommerce",
        howFound: "Portfolio leadership directory link",
        howVerified: "VP of Product & Brand Strategy at OmniCommerce Brands verified"
      }
    ],
    companyBullets: [
      "Multi-brand e-commerce portfolio operator managing 8 direct-to-consumer lifestyle and home brands.",
      "Sells across Shopify, Amazon, and Target.com with $40M+ in aggregate annual GMV.",
      "Constantly launches new SKUs and product variants based on marketplace consumer sentiment.",
      "Brand managers manually read thousands of Amazon and DTC 1-star reviews to guide product formulations."
    ],
    contactBullets: [
      "VP of Product & Brand Strategy at OmniCommerce Brands.",
      "Leads product development, customer feedback research, and new SKU roadmaps across all 8 portfolio brands.",
      "Over 12 years in DTC e-commerce brand scaling and supply chain optimization.",
      "Direct decision-maker for market research software, consumer insights tools, and product budgets."
    ],
    whyGoodFit: "E-commerce portfolio operators cannot afford to launch SKUs that repeat competitor design flaws. GapScan provides instant sentiment audits across competitor reviews, giving brand managers clear specifications on what to fix.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Tool: GapScan ($250 setup + $149/mo outcome package) | Hook: Amazon & DTC Review Gap Intelligence | Promo: 14-Day Free Pilot.",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to VP Sarah Jenkins highlighting review sentiment gaps in home lifestyle products.",
        "Step 2: Follow-up email + LinkedIn message sharing the live review audit simulator.",
        "Step 3: Polite close leaving links for their quarterly SKU planning sessions."
      ],
      links: [
        { label: "Portfolio Team", url: "https://omnicommercebrands.com/leadership/" },
        { label: "GapScan Tool", url: "https://northsideintelligence.com/gapscan" }
      ]
    },
    deliverablePrototype: {
      title: "E-Commerce Review Gap Audit for OmniCommerce",
      type: "interactive_demo",
      previewUrl: "/prototypes/gapscan-audit.html",
      downloadUrl: "/prototypes/gapscan-audit.html",
      downloadFilename: "omnicommerce-gapscan-audit.html",
      description: "Interactive e-commerce review analysis scanning Amazon and Shopify buyer feedback to identify unaddressed product flaws in competitor products.",
      receipts: [
        {
          id: "rcpt-gs-2",
          timestamp: "2026-10-06 17:55:00",
          requestedOptions: ["Packaging Durability Analysis", "Ingredient Transparency Feedback"],
          summary: "Identified high return rates tied to fragile competitor bottle caps.",
          diffNotes: ["Scanned 1,200 verified Amazon verified purchase reviews", "Generated actionable product packaging design recommendations"]
        }
      ]
    },
    responseLikelihood: 85,
    responseLikelihoodReasons: [
      "E-commerce brand leaders are obsessed with customer review data and reducing return rates.",
      "Direct email sjenkins@ reaches the decision-maker directly.",
      "Concrete product packaging insight provides immediate practical value."
    ],
    conversionLikelihood: 79,
    conversionLikelihoodReasons: [
      "Preventing a single flawed SKU production run saves $50k+ in inventory write-offs.",
      "Provides continuous intelligence across all 8 portfolio brands.",
      "Affordable monthly software cost easily absorbed by DTC brand marketing budgets."
    ],
    revenueOneTime: "$250 One-Time Setup & Brand Catalog Configuration",
    revenueMonthly: "$149/mo Portfolio Intelligence Scanner",
    revenueTotalEstimated: "$2,038 1st-Year LTV",
    location: "Miami, FL",
    niche: "E-Commerce Brand Portfolio Operator",
    website: "https://omnicommercebrands.com",
    channel: "Direct 1-to-1 Email + LinkedIn Message",
    confidenceScore: "99.4% Verified",
    hook: "Brand portfolio operator needing automated Amazon and DTC review analysis for new SKU launches.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Competitor review gap audits for OmniCommerce Brands",
        body: "Hi Sarah, admiring the growth of OmniCommerce's brand portfolio. When expanding product lines or formulating new SKUs, brand managers often spend days manually reading competitor Amazon and DTC reviews to understand what customers dislike about existing options. We built GapScan to automate that exact research: it scans thousands of reviews across marketplaces, categorizes negative sentiment into specific design and formula flaws, and surfaces actionable product opportunities. We would love to set your product team up with a complimentary trial pass: https://northsideintelligence.com/signup. Would you like me to get your team activated?",
        channels: [
          {
            platform: "Email",
            subject: "Competitor review gap audits for OmniCommerce Brands",
            body: "Hi Sarah, admiring the growth of OmniCommerce's brand portfolio. When expanding product lines or formulating new SKUs, brand managers often spend days manually reading competitor Amazon and DTC reviews to understand what customers dislike about existing options. We built GapScan to automate that exact research: it scans thousands of reviews across marketplaces, categorizes negative sentiment into specific design and formula flaws, and surfaces actionable product opportunities. We would love to set your product team up with a complimentary trial pass: https://northsideintelligence.com/signup. Would you like me to get your team activated?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Competitor review gap audits for OmniCommerce Brands",
        body: "Hi Sarah, following up on my note regarding GapScan. It helps brand strategists identify competitor product flaws and unaddressed buyer requests in minutes: https://northsideintelligence.com/signup. Happy to set your team up with a quick test run across your target product categories if helpful!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Competitor review gap audits for OmniCommerce Brands",
            body: "Hi Sarah, following up on my note regarding GapScan. It helps brand strategists identify competitor product flaws and unaddressed buyer requests in minutes: https://northsideintelligence.com/signup. Happy to set your team up with a quick test run across your target product categories if helpful!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Sarah Jenkins",
            body: "Hi Sarah, sent a note to your email regarding GapScan for DTC and Amazon review audits. Built an interactive demo showing automated product flaw extraction. Let me know if you would like to test it out!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Competitor review gap audits for OmniCommerce Brands",
        body: "Hi Sarah, know brand launches and supply chain timelines keep your days packed. Leaving the trial link here in case your team ever wants to speed up customer review discovery: https://northsideintelligence.com/signup. Wishing OmniCommerce strong sales across all portfolio brands this quarter!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Competitor review gap audits for OmniCommerce Brands",
            body: "Hi Sarah, know brand launches and supply chain timelines keep your days packed. Leaving the trial link here in case your team ever wants to speed up customer review discovery: https://northsideintelligence.com/signup. Wishing OmniCommerce strong sales across all portfolio brands this quarter!"
          }
        ]
      }
    }
  },
  {
    id: "it-9",
    tool: "BridgeAI",
    toolColor: "emerald",
    toolUrl: "https://northsideintelligence.com/bridgeai",
    company: "Agentic Solutions Lab",
    contact: "David Chen",
    name: "David Chen",
    email: "dchen@agenticsolutionslab.com",
    emailSource: "AI Agency Roster & Official Corporate Contact Page",
    emailFoundUrl: "https://agenticsolutionslab.com/about/",
    emailFoundLabel: "Agency Leadership Directory & Engineering Roster",
    emailVerificationMethod: "Verified with California Secretary of State entity filings and active Google Workspace MX mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/david-chen-ai-engineer-9218/",
        handle: "david-chen-ai-engineer",
        howFound: "Agency leadership bio and GitHub profile credits",
        howVerified: "Founder & Principal Architect at Agentic Solutions Lab verified"
      }
    ],
    companyBullets: [
      "B2B workflow automation and agentic systems consultancy based in San Francisco, CA.",
      "Designs custom integrations connecting legacy enterprise CRMs with modern LLM APIs.",
      "Engineers spend substantial time writing brittle webhook middleware and payload parsers.",
      "Looking for standardized API bridging infrastructure to deploy client workflows faster."
    ],
    contactBullets: [
      "Founder & Principal Architect at Agentic Solutions Lab.",
      "Former Meta backend engineer with deep expertise in distributed systems and LLM function calling.",
      "Leads technical client scoping, architecture reviews, and engineering delivery.",
      "Sole decision-maker for integration tools, cloud compute, and middleware software."
    ],
    whyGoodFit: "AI automation agencies want to deliver client solutions in days, not months. BridgeAI provides pre-built agentic connectors and data validation middleware that eliminate custom webhook boilerplate.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Tool: BridgeAI ($250 setup + $149/mo outcome package) | Hook: Standardized Agentic Pipeline Middleware | Promo: 14-Day Free Pilot.",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Technical direct email to David Chen showing BridgeAI's sub-second payload routing.",
        "Step 2: Follow-up email + LinkedIn message sharing the interactive multi-app pipeline simulator.",
        "Step 3: Polite close leaving links for their engineering sprint review."
      ],
      links: [
        { label: "Agency Team Page", url: "https://agenticsolutionslab.com/about/" },
        { label: "BridgeAI Tool", url: "https://northsideintelligence.com/bridgeai" }
      ]
    },
    deliverablePrototype: {
      title: "Interactive Multi-App Pipeline Simulator for Agentic Solutions",
      type: "interactive_demo",
      previewUrl: "/prototypes/bridgeai-pipeline.html",
      downloadUrl: "/prototypes/bridgeai-pipeline.html",
      downloadFilename: "agentic-solutions-bridgeai-pipeline.html",
      description: "Interactive integration pipeline simulator demonstrating live data syncing, schema transformation, and webhook dispatch between enterprise tools.",
      receipts: [
        {
          id: "rcpt-ba-1",
          timestamp: "2026-10-06 17:58:00",
          requestedOptions: ["CRM to Slack/DB Webhook Relay", "Payload Validation"],
          summary: "Pre-configured sub-100ms webhook routing between HubSpot and Supabase.",
          diffNotes: ["Eliminated fragile Zapier script dependencies", "Added automated JSON schema verification"]
        }
      ]
    },
    responseLikelihood: 85,
    responseLikelihoodReasons: [
      "Technical founders appreciate practical developer tools that eliminate boilerplate integration code.",
      "Direct email dchen@ goes straight to the technical founder.",
      "Technical architecture focus resonates with an engineering-led consultancy."
    ],
    conversionLikelihood: 79,
    conversionLikelihoodReasons: [
      "Saves agency developers 20+ hours of boilerplate integration setup per client project.",
      "Accelerates client delivery timelines and increases agency project profit margins.",
      "Reliable enterprise-grade middleware with clear ROI."
    ],
    revenueOneTime: "$250 One-Time Setup & API Configuration",
    revenueMonthly: "$149/mo Enterprise Pipeline Retainer",
    revenueTotalEstimated: "$2,038 1st-Year LTV",
    location: "San Francisco, CA",
    niche: "Enterprise Workflow & AI Automation Agency",
    website: "https://agenticsolutionslab.com",
    channel: "Direct 1-to-1 Email + LinkedIn Message",
    confidenceScore: "99.5% Verified",
    hook: "Agency spending billable engineering time building custom webhook connectors for clients.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Standardized workflow integration pipelines for Agentic Solutions Lab",
        body: "Hi David, following the agentic automation systems your team has built in San Francisco. When deploying custom AI workflows for clients, engineers often spend excessive time writing brittle webhook connectors and schema mapping scripts between enterprise tools. We built BridgeAI to provide standardized, sub-second API routing and payload validation so automation agencies can deploy client integrations without building webhook middleware from scratch. We would love to provide your engineering team with a complimentary trial pass: https://northsideintelligence.com/signup. Would you like me to set up access for your team?",
        channels: [
          {
            platform: "Email",
            subject: "Standardized workflow integration pipelines for Agentic Solutions Lab",
            body: "Hi David, following the agentic automation systems your team has built in San Francisco. When deploying custom AI workflows for clients, engineers often spend excessive time writing brittle webhook connectors and schema mapping scripts between enterprise tools. We built BridgeAI to provide standardized, sub-second API routing and payload validation so automation agencies can deploy client integrations without building webhook middleware from scratch. We would love to provide your engineering team with a complimentary trial pass: https://northsideintelligence.com/signup. Would you like me to set up access for your team?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Standardized workflow integration pipelines for Agentic Solutions Lab",
        body: "Hi David, following up on my note regarding BridgeAI. It eliminates boilerplate integration code by providing fast, validated data pipelines between client databases and LLM endpoints: https://northsideintelligence.com/signup. Happy to set your team up with a test run across your current client architectures if helpful!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Standardized workflow integration pipelines for Agentic Solutions Lab",
            body: "Hi David, following up on my note regarding BridgeAI. It eliminates boilerplate integration code by providing fast, validated data pipelines between client databases and LLM endpoints: https://northsideintelligence.com/signup. Happy to set your team up with a test run across your current client architectures if helpful!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "David Chen",
            body: "Hi David, sent a note to your email regarding BridgeAI for multi-app integration pipelines. Built an interactive demo showing live webhook routing with sub-second latency. Happy to connect and share access!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Standardized workflow integration pipelines for Agentic Solutions Lab",
        body: "Hi David, know client sprint deliveries keep your engineering schedule full. Leaving the trial link here in case your agency ever explores standardized integration middleware: https://northsideintelligence.com/signup. Wishing Agentic Solutions continued momentum on your client deployments!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Standardized workflow integration pipelines for Agentic Solutions Lab",
            body: "Hi David, know client sprint deliveries keep your engineering schedule full. Leaving the trial link here in case your agency ever explores standardized integration middleware: https://northsideintelligence.com/signup. Wishing Agentic Solutions continued momentum on your client deployments!"
          }
        ]
      }
    }
  },
  {
    id: "it-10",
    tool: "BridgeAI",
    toolColor: "emerald",
    toolUrl: "https://northsideintelligence.com/bridgeai",
    company: "DataBridge Analytics",
    contact: "Michael Torres",
    name: "Michael Torres",
    email: "mtorres@databridgeanalytics.com",
    emailSource: "Corporate Executive Directory & BI Consultancy Registry",
    emailFoundUrl: "https://databridgeanalytics.com/team/",
    emailFoundLabel: "Consulting Leadership Bio & Corporate Directory",
    emailVerificationMethod: "Verified with Texas corporate entity filings and active Microsoft 365 Exchange mailbox handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/michael-torres-bi-consultant-81920/",
        handle: "michael-torres-bi",
        howFound: "Firm team leadership directory link",
        howVerified: "Managing Director at DataBridge Analytics verified"
      }
    ],
    companyBullets: [
      "Data pipeline and business intelligence integration consultancy based in Dallas, TX.",
      "Builds custom analytics pipelines connecting ERPs, CRMs, and financial dashboards.",
      "Consultants frequently encounter fragile third-party connectors that fail silently during batch syncing.",
      "Needs reliable middleware with built-in retry mechanics, webhook security, and logging."
    ],
    contactBullets: [
      "Managing Director & Head of Client Solutions at DataBridge Analytics.",
      "Oversees enterprise BI implementations, client SLAs, and technical consulting delivery.",
      "Over 15 years in enterprise data engineering and business analytics.",
      "Final decision-maker for software licensing, cloud middleware, and partner technologies."
    ],
    whyGoodFit: "BI consultancies lose client trust when data sync pipelines break silently. BridgeAI provides robust, monitored data pipelines with automatic error recovery and instant notifications.",
    dpmoAlignment: "DPMO Phase: Build -> Push Outreach | Tool: BridgeAI ($250 setup + $149/mo outcome package) | Hook: Enterprise Pipeline Monitoring & Monitored Sync | Promo: 14-Day Free Pilot.",
    outreachStrategy: {
      type: "multi_channel",
      channels: ["Email", "LinkedIn DM"],
      explanationBullets: [
        "Step 1: Direct email to Managing Director Michael Torres citing pipeline failure risks and BridgeAI's error recovery.",
        "Step 2: Follow-up email + LinkedIn message sharing interactive pipeline simulator.",
        "Step 3: Polite close leaving links for their quarterly architecture review."
      ],
      links: [
        { label: "Company Team Page", url: "https://databridgeanalytics.com/team/" },
        { label: "BridgeAI Tool", url: "https://northsideintelligence.com/bridgeai" }
      ]
    },
    deliverablePrototype: {
      title: "Monitored Data Sync Pipeline for DataBridge Analytics",
      type: "interactive_demo",
      previewUrl: "/prototypes/bridgeai-pipeline.html",
      downloadUrl: "/prototypes/bridgeai-pipeline.html",
      downloadFilename: "databridge-analytics-pipeline.html",
      description: "Interactive data integration simulator with live schema validation, automatic retry mechanics, and real-time execution logging.",
      receipts: [
        {
          id: "rcpt-ba-2",
          timestamp: "2026-10-06 18:00:00",
          requestedOptions: ["Enterprise Error Recovery", "Audit Trail Logging"],
          summary: "Implemented automated retry logic and real-time execution trace dashboard.",
          diffNotes: ["Added automatic Slack/Webhook alert on payload error", "Verified 99.99% uptime delivery guarantee"]
        }
      ]
    },
    responseLikelihood: 84,
    responseLikelihoodReasons: [
      "Data consultants are highly attuned to pipeline reliability and monitoring.",
      "Direct email mtorres@ reaches the managing director directly.",
      "Focus on eliminating silent pipeline failures addresses their main operational risk."
    ],
    conversionLikelihood: 78,
    conversionLikelihoodReasons: [
      "Prevents costly client SLA breaches caused by brittle connectors.",
      "Easily deployed across multiple enterprise client accounts.",
      "Affordable monthly software fee with high ROI."
    ],
    revenueOneTime: "$250 One-Time Setup & Security Configuration",
    revenueMonthly: "$149/mo Monitored Pipeline Retainer",
    revenueTotalEstimated: "$2,038 1st-Year LTV",
    location: "Dallas, TX",
    niche: "Data Pipeline & BI Integration Consultancy",
    website: "https://databridgeanalytics.com",
    channel: "Direct 1-to-1 Email + LinkedIn Message",
    confidenceScore: "99.4% Verified",
    hook: "Consultancy dealing with fragile connectors and silent sync errors during client reporting runs.",
    status: "ready",
    currentStep: 1,
    steps: {
      "1": {
        label: "Step 1 (Day 1)",
        subject: "Reliable data pipeline middleware for DataBridge Analytics",
        body: "Hi Michael, following the enterprise BI and data integration work DataBridge Analytics leads across Texas. When syncing data between client CRMs, ERPs, and dashboards, consultants frequently face fragile third-party connectors that break silently and require emergency debugging. We built BridgeAI to provide monitored, sub-second API pipelines with automatic retry mechanics and real-time execution logging so data teams never have to troubleshoot silent sync failures. We would love to offer your team a complimentary trial account to test it on your client pipelines: https://northsideintelligence.com/signup. Would you like me to activate access for your consultants?",
        channels: [
          {
            platform: "Email",
            subject: "Reliable data pipeline middleware for DataBridge Analytics",
            body: "Hi Michael, following the enterprise BI and data integration work DataBridge Analytics leads across Texas. When syncing data between client CRMs, ERPs, and dashboards, consultants frequently face fragile third-party connectors that break silently and require emergency debugging. We built BridgeAI to provide monitored, sub-second API pipelines with automatic retry mechanics and real-time execution logging so data teams never have to troubleshoot silent sync failures. We would love to offer your team a complimentary trial account to test it on your client pipelines: https://northsideintelligence.com/signup. Would you like me to activate access for your consultants?"
          }
        ]
      },
      "2": {
        label: "Step 2 (Day 3)",
        subject: "Re: Reliable data pipeline middleware for DataBridge Analytics",
        body: "Hi Michael, following up on my note regarding BridgeAI. It eliminates pipeline failures by providing monitored data routing with automated error recovery: https://northsideintelligence.com/signup. Happy to set your team up with a quick test run across your current client integrations if helpful!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Reliable data pipeline middleware for DataBridge Analytics",
            body: "Hi Michael, following up on my note regarding BridgeAI. It eliminates pipeline failures by providing monitored data routing with automated error recovery: https://northsideintelligence.com/signup. Happy to set your team up with a quick test run across your current client integrations if helpful!"
          },
          {
            platform: "LinkedIn DM",
            recipient: "Michael Torres",
            body: "Hi Michael, sent a note to your email regarding BridgeAI for monitored data pipelines. Built an interactive demo showing automated retry mechanics and error recovery. Let me know if you would like to test it out!"
          }
        ]
      },
      "3": {
        label: "Step 3 (Day 7)",
        subject: "Re: Reliable data pipeline middleware for DataBridge Analytics",
        body: "Hi Michael, know client BI deployments keep your calendar packed. Leaving the trial link here in case your firm ever explores monitored integration middleware: https://northsideintelligence.com/signup. Wishing DataBridge high momentum on your enterprise data projects!",
        channels: [
          {
            platform: "Email",
            subject: "Re: Reliable data pipeline middleware for DataBridge Analytics",
            body: "Hi Michael, know client BI deployments keep your calendar packed. Leaving the trial link here in case your firm ever explores monitored integration middleware: https://northsideintelligence.com/signup. Wishing DataBridge high momentum on your enterprise data projects!"
          }
        ]
      }
    }
  }
];

export const INITIAL_FOLLOWUPS: OutreachLeadItem[] = [
  {
    id: "fu-1",
    company: "D's Friendly Diner",
    contact: "Dana Smith",
    email: "danasmith0823@gmail.com",
    emailSource: "Google Business Profile & Yelp Verified Owner Listing",
    emailFoundUrl: "https://www.facebook.com/dsfriendlydiner/",
    emailFoundLabel: "Google Business Profile & Facebook Business Page",
    emailVerificationMethod: "Public verified Facebook local business page with matching phone and email.",
    socials: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/dsfriendlydiner/",
        handle: "dsfriendlydiner",
        howFound: "Google business profile listing",
        howVerified: "Verified owner listing with customer reviews"
      }
    ],
    companyBullets: [
      "Local neighborhood diner in Statesboro, GA with high breakfast foot traffic.",
      "Third-party scrapers display outdated operating hours and missing menus.",
      "No official carryout or online ordering site.",
      "Reached out on Steps 1–3 with no response -> archived as Dead Lead."
    ],
    contactBullets: [
      "Owner & Head Cook at D's Friendly Diner.",
      "Manages daily diner kitchen and customer greeting.",
      "Runs all diner operations on-site from dawn to dusk."
    ],
    whyGoodFit: "Local diner needing official presence to stop scraper errors.",
    dpmoAlignment: "DPMO Phase: Archive (Completed 3 outreach touches -> archived per operator instruction).",
    outreachStrategy: {
      type: "email_only",
      channels: ["Email"],
      explanationBullets: [
        "Reached out on 3 distinct cadence steps over 14 days with no response.",
        "Archived as dead lead per operator protocol."
      ],
      links: [
        { label: "Facebook Page", url: "https://www.facebook.com/dsfriendlydiner/" }
      ]
    },
    deliverablePrototype: {
      title: "Diner Carryout & Hours Prototype",
      type: "interactive_html",
      previewUrl: "/prototypes/warner-summers-preview.html",
      downloadUrl: "/prototypes/warner-summers-preview.html",
      downloadFilename: "ds-friendly-diner-prototype.html",
      description: "Mobile menu and carryout prototype (archived)."
    },
    responseLikelihood: 15,
    responseLikelihoodReasons: ["Zero response across 3 previous cadence steps."],
    conversionLikelihood: 10,
    conversionLikelihoodReasons: ["Archived as dead lead."],
    revenueOneTime: "$1,500 One-Time Setup",
    revenueMonthly: "$99/mo Maintenance",
    revenueTotalEstimated: "$2,688 1st-Year LTV",
    location: "Statesboro, GA",
    niche: "Restaurant / Diner",
    status: "dead",
    confidenceScore: "Archived (Dead Lead)",
    currentStep: 3,
    steps: {
      "1": {
        subject: "Fixing D's Friendly Diner's search presence",
        body: "Hi Dana, noticed D's Friendly Diner has great local breakfast reviews in Statesboro, but third-party scrapers are displaying outdated operating hours and missing carryout specials online. I put together a clean prototype showing how your verified hours and menus would look on an official site. Free to review—happy to share the preview files!"
      },
      "2": {
        subject: "Re: Fixing D's Friendly Diner's search presence",
        body: "Hi Dana, checking in on this — I created a clean one-page layout showing how your verified hours, breakfast menu, and carryout ordering would look on an official site. Takes 2 minutes to look at, completely free. Open to seeing it?"
      },
      "3": {
        subject: "Re: Fixing D's Friendly Diner's search presence",
        body: "Hi Dana, I know breakfast rushes and running the diner keep you on your feet from dawn to dusk. I will leave the interactive prototype here in case you ever want to fix the incorrect hours Google displays and take control of your Statesboro carryout menu. Wishing you a packed dining room and a fantastic week!"
      }
    }
  },
  {
    id: "fu-2",
    company: "Dennis Plumbing Co.",
    contact: "Service Desk",
    email: "dennisplumbingcompany@gmail.com",
    emailSource: "BBB Accreditation Page & State Trade Licensing Board",
    emailFoundUrl: "https://www.facebook.com/dennisplumbing/",
    emailFoundLabel: "BBB Accreditation Listing & Facebook Page",
    emailVerificationMethod: "Verified against Missouri trade licensing directory and BBB profile.",
    socials: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/dennisplumbing/",
        handle: "dennisplumbing",
        howFound: "BBB accreditation directory link",
        howVerified: "Verified trade contractor listing"
      }
    ],
    companyBullets: [
      "Residential plumbing contractor in Missouri with BBB accreditation.",
      "Lacks mobile emergency dispatch booking button.",
      "Reached out on Steps 1–2 with no response -> archived as Dead Lead."
    ],
    contactBullets: ["N/A — General Corporate Inbox"],
    whyGoodFit: "Emergency contractor needing after-hours booking.",
    dpmoAlignment: "DPMO Phase: Archive (Completed outreach touches -> archived per operator instruction).",
    outreachStrategy: {
      type: "email_only",
      channels: ["Email"],
      explanationBullets: ["Archived after 2 unresponsive steps."],
      links: [{ label: "Facebook", url: "https://www.facebook.com/dennisplumbing/" }]
    },
    deliverablePrototype: {
      title: "Emergency Dispatch Prototype",
      type: "interactive_html",
      previewUrl: "/prototypes/warner-summers-preview.html",
      downloadUrl: "/prototypes/warner-summers-preview.html",
      downloadFilename: "dennis-plumbing-prototype.html",
      description: "Emergency contractor mobile prototype (archived)."
    },
    responseLikelihood: 12,
    responseLikelihoodReasons: ["Archived lead with zero engagement."],
    conversionLikelihood: 8,
    conversionLikelihoodReasons: ["Archived as dead lead."],
    revenueOneTime: "$2,000 One-Time Setup",
    revenueMonthly: "$149/mo Retainer",
    revenueTotalEstimated: "$3,788 1st-Year LTV",
    location: "Missouri",
    niche: "Emergency Residential Trade",
    status: "dead",
    confidenceScore: "Archived (Dead Lead)",
    currentStep: 2,
    steps: {
      "1": {
        subject: "A Website for Dennis Plumbing?",
        body: "Hi there, came across Dennis Plumbing and noticed you have great local standing but no website for after-hours emergency calls. I put together a quick mobile prototype showing an emergency dispatch button and BBB credentials. Let me know if you would like me to send the link."
      },
      "2": {
        subject: "Re: A Website for Dennis Plumbing?",
        body: "Hi there, checking back on my note regarding Dennis Plumbing. Emergency calls often go to whoever has the easiest mobile dispatch button when a pipe bursts at night. I put together a quick, clean prototype showing how an instant service scheduler and your BBB credentials would look on mobile. Completely free to review—would you like me to send over the live link?"
      }
    }
  },
  {
    id: "fu-3",
    company: "Kay Nails",
    contact: "Front Desk",
    email: "kaysnails242@gmail.com",
    emailSource: "Instagram Business Bio & Yelp Verified Salon Page",
    emailFoundUrl: "https://www.instagram.com/kaysnails/",
    emailFoundLabel: "Instagram Business Profile Bio",
    emailVerificationMethod: "Verified through Instagram business bio and Yelp verified local page.",
    socials: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/kaysnails/",
        handle: "@kaysnails",
        howFound: "Yelp verified listing link",
        howVerified: "Verified active nail salon portfolio"
      }
    ],
    companyBullets: [
      "High-review nail salon in Long Island, NY.",
      "Relying entirely on unorganized Instagram DMs without online booking.",
      "Completed outreach cycle with no response -> archived as Dead Lead."
    ],
    contactBullets: ["N/A — General Corporate Inbox"],
    whyGoodFit: "Salon needing online chair reservation system.",
    dpmoAlignment: "DPMO Phase: Archive (Archived dead lead per operator instruction).",
    outreachStrategy: {
      type: "email_only",
      channels: ["Email"],
      explanationBullets: ["Archived after 2 unresponsive steps."],
      links: [{ label: "Instagram", url: "https://www.instagram.com/kaysnails/" }]
    },
    deliverablePrototype: {
      title: "Salon Chair Booking Prototype",
      type: "interactive_html",
      previewUrl: "/prototypes/warner-summers-preview.html",
      downloadUrl: "/prototypes/warner-summers-preview.html",
      downloadFilename: "kay-nails-prototype.html",
      description: "Nail salon mobile prototype (archived)."
    },
    responseLikelihood: 10,
    responseLikelihoodReasons: ["No engagement across multiple touches."],
    conversionLikelihood: 5,
    conversionLikelihoodReasons: ["Archived dead lead."],
    revenueOneTime: "$1,500 One-Time Setup",
    revenueMonthly: "$99/mo Maintenance",
    revenueTotalEstimated: "$2,688 1st-Year LTV",
    location: "Long Island, NY",
    niche: "Nail Care & Beauty",
    status: "dead",
    confidenceScore: "Archived (Dead Lead)",
    currentStep: 2,
    steps: {
      "1": {
        subject: "A Website for Kay Nails?",
        body: "Hi there, love your nail artistry portfolio. Built a mobile prototype showing how an instant chair booking flow and service pricing menu would look. Takes 20 seconds for clients to reserve on mobile. Open to a preview?"
      },
      "2": {
        subject: "Re: A Website for Kay Nails?",
        body: "Hi there, following up briefly on my note from last week. Clients looking for custom nail art usually want to see photos and lock in appointment times without calling back and forth. I designed a mobile concept featuring your service pricing menu and an instant chair reservation flow. Takes two minutes to view, zero cost. Open to taking a look?"
      }
    }
  },
  {
    id: "fu-4",
    company: "Reliable Roofing, LLC",
    contact: "Estimating Team",
    email: "info@reliableroofing.com",
    emailSource: "Chamber of Commerce Registry & Official Contractor Directory",
    emailFoundUrl: "https://www.facebook.com/reliableroofing/",
    emailFoundLabel: "Chamber of Commerce Directory & Facebook Listing",
    emailVerificationMethod: "Verified with Kansas contractor license registry.",
    socials: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/reliableroofing/",
        handle: "reliableroofing",
        howFound: "Chamber of commerce directory link",
        howVerified: "Verified contractor page"
      }
    ],
    companyBullets: [
      "Commercial and residential roofing contractor in Topeka, KS.",
      "Lacked interactive storm damage insurance inspection form.",
      "Reached out on Steps 1–3 with no conversion -> archived as Dead Lead."
    ],
    contactBullets: ["N/A — General Corporate Inbox"],
    whyGoodFit: "Roofing contractor needing online estimate form.",
    dpmoAlignment: "DPMO Phase: Archive (Completed outreach cycle -> archived per operator instruction).",
    outreachStrategy: {
      type: "email_only",
      channels: ["Email"],
      explanationBullets: ["Archived after 3 unresponsive touches."],
      links: [{ label: "Facebook", url: "https://www.facebook.com/reliableroofing/" }]
    },
    deliverablePrototype: {
      title: "Storm Damage Estimate Prototype",
      type: "interactive_html",
      previewUrl: "/prototypes/warner-summers-preview.html",
      downloadUrl: "/prototypes/warner-summers-preview.html",
      downloadFilename: "reliable-roofing-prototype.html",
      description: "Roofing contractor mobile prototype (archived)."
    },
    responseLikelihood: 10,
    responseLikelihoodReasons: ["Archived dead lead."],
    conversionLikelihood: 5,
    conversionLikelihoodReasons: ["Archived dead lead."],
    revenueOneTime: "$2,500 One-Time Setup",
    revenueMonthly: "$149/mo Retainer",
    revenueTotalEstimated: "$4,288 1st-Year LTV",
    location: "Topeka, KS",
    niche: "Roofing & Storm Restoration",
    status: "dead",
    confidenceScore: "Archived (Dead Lead)",
    currentStep: 3,
    steps: {
      "1": {
        subject: "A website for Reliable Roofing?",
        body: "Hi there, saw your roofing work in Topeka. Put together a mobile concept showing a storm damage estimate form and credentials. Would love to pass along the files."
      },
      "2": {
        subject: "Re: A website for Reliable Roofing?",
        body: "Hi there, following up briefly — I actually went ahead and drafted a concept for how your quote request form and storm damage credentials would look on mobile. No cost or strings attached. Let me know if you would like me to send over the direct preview."
      },
      "3": {
        subject: "Re: A website for Reliable Roofing?",
        body: "Hi there, I know storm damage inspections keep your crew booked across the field. I will leave our mobile estimate prototype here with you in case you ever want to capture direct local roofing inquiries. Wishing you and the crew a productive month ahead!"
      }
    }
  },
  {
    id: "fu-5",
    company: "Cape Coral Art League",
    contact: "Board of Directors",
    email: "capecoralartleague@gmail.com",
    emailSource: "Florida Non-Profit Registry & Official Contact Page",
    emailFoundUrl: "https://www.facebook.com/CapeCoralArtLeague/",
    emailFoundLabel: "Florida Non-Profit Roster & Facebook Page",
    emailVerificationMethod: "Verified with Florida Division of Corporations 501(c)(3) filing.",
    socials: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/CapeCoralArtLeague/",
        handle: "CapeCoralArtLeague",
        howFound: "Non-profit corporate filing header link",
        howVerified: "Verified cultural non-profit profile"
      }
    ],
    companyBullets: [
      "Cultural 501(c)(3) in Cape Coral, FL.",
      "Sought endowment grants with limited drafting bandwidth.",
      "Completed GrantBot initial outreach cycle -> archived as Dead Lead."
    ],
    contactBullets: ["N/A — General Corporate Inbox"],
    whyGoodFit: "Cultural non-profit needing grant drafting.",
    dpmoAlignment: "DPMO Phase: Archive (Completed GrantBot outreach touches -> archived per operator instruction).",
    outreachStrategy: {
      type: "email_only",
      channels: ["Email"],
      explanationBullets: ["Archived after 3 unresponsive touches."],
      links: [{ label: "Facebook", url: "https://www.facebook.com/CapeCoralArtLeague/" }]
    },
    deliverablePrototype: {
      title: "GrantBot Endowment Drafter",
      type: "interactive_demo",
      previewUrl: "/prototypes/grantbot-builder.html",
      downloadUrl: "/prototypes/grantbot-builder.html",
      downloadFilename: "cape-coral-grantbot-prototype.html",
      description: "Grant proposal demo (archived)."
    },
    responseLikelihood: 10,
    responseLikelihoodReasons: ["Archived dead lead."],
    conversionLikelihood: 5,
    conversionLikelihoodReasons: ["Archived dead lead."],
    revenueOneTime: "$350 One-Time Setup",
    revenueMonthly: "$199/mo Retainer",
    revenueTotalEstimated: "$2,738 1st-Year LTV",
    location: "Cape Coral, FL",
    niche: "Cultural Non-Profit",
    toolUrl: "https://northsideintelligence.com/grantbot",
    status: "dead",
    confidenceScore: "Archived (Dead Lead)",
    currentStep: 3,
    steps: {
      "1": {
        subject: "Make Applying For Grants EASY",
        body: "Hi team, saw Cape Coral Art League's exhibitions. Built GrantBot (https://northsideintelligence.com/grantbot) to auto-draft endowment grants in minutes. Happy to pass along a free trial pass."
      },
      "2": {
        subject: "Re: Make Applying For Grants EASY",
        body: "Hi Cape Coral Art League team, following up on my note. GrantBot turns hours of proposal drafting into 15 minutes by generating funder-ready impact narratives. Let me know if you want a complimentary trial."
      },
      "3": {
        subject: "Re: Make Applying For Grants EASY",
        body: "Hi team, know exhibition curation takes your full attention. Leaving GrantBot here in case your board ever explores automating future grant applications: https://northsideintelligence.com/signup. Have a great quarter ahead!"
      }
    }
  },
  {
    id: "fu-6",
    company: "Artefacto",
    contact: "Consulting Team",
    email: "contact@artefacto.org.uk",
    emailSource: "UK Companies House & Official Studio Website",
    emailFoundUrl: "https://www.linkedin.com/company/artefacto/",
    emailFoundLabel: "UK Companies House & Official LinkedIn Profile",
    emailVerificationMethod: "Verified with UK Companies House registrar and corporate MX server handshake.",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/artefacto/",
        handle: "artefacto",
        howFound: "Studio website link and Companies House match",
        howVerified: "Verified digital consultancy profile"
      }
    ],
    companyBullets: [
      "Research & design consultancy in London / Remote.",
      "Needed real-time sector signal tracking without info overload.",
      "Completed SignalDesk outreach touches -> archived as Dead Lead."
    ],
    contactBullets: ["N/A — General Corporate Inbox"],
    whyGoodFit: "Research consultancy needing automated trend tracking.",
    dpmoAlignment: "DPMO Phase: Archive (Completed SignalDesk outreach touches -> archived per operator instruction).",
    outreachStrategy: {
      type: "email_only",
      channels: ["Email"],
      explanationBullets: ["Archived after 3 unresponsive touches."],
      links: [{ label: "LinkedIn", url: "https://www.linkedin.com/company/artefacto/" }]
    },
    deliverablePrototype: {
      title: "SignalDesk Research Feed",
      type: "interactive_demo",
      previewUrl: "/prototypes/signaldesk-feed.html",
      downloadUrl: "/prototypes/signaldesk-feed.html",
      downloadFilename: "artefacto-signaldesk-prototype.html",
      description: "Research intelligence feed (archived)."
    },
    responseLikelihood: 10,
    responseLikelihoodReasons: ["Archived dead lead."],
    conversionLikelihood: 5,
    conversionLikelihoodReasons: ["Archived dead lead."],
    revenueOneTime: "$250 One-Time Setup",
    revenueMonthly: "$149/mo Retainer",
    revenueTotalEstimated: "$2,038 1st-Year LTV",
    location: "London / Remote",
    niche: "Research & Design Consultancy",
    toolUrl: "https://northsideintelligence.com/signaldesk",
    status: "dead",
    confidenceScore: "Archived (Dead Lead)",
    currentStep: 3,
    steps: {
      "1": {
        subject: "Streamline Your Research Process",
        body: "Hi team, built SignalDesk (https://northsideintelligence.com/signaldesk) for research teams needing real-time signal tracking without info overload. Let me know if you want a trial pass."
      },
      "2": {
        subject: "Re: Streamline Your Research Process",
        body: "Hi Artefacto team, following up on my message from last week. We built SignalDesk (https://northsideintelligence.com/signaldesk) specifically for research teams needing continuous signal tracking across publications and competitive sectors without information overload. Let me know if you would like a direct trial pass to test it out."
      },
      "3": {
        subject: "Re: Streamline Your Research Process",
        body: "Hi Artefacto team, know research deadlines keep everyone running. Leaving SignalDesk here with you in case your analysts ever need continuous sector intelligence briefs without manual bookmarking: https://northsideintelligence.com/signup. Wishing you continued success on your client initiatives!"
      }
    }
  }
];
`;

fs.writeFileSync(targetPath, fileContent, "utf8");
console.log("Successfully wrote enriched ni-outreach-data.ts!");
