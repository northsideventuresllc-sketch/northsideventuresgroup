export interface OutreachStep {
  label?: string;
  subject?: string;
  body?: string;
  status?: string;
  [key: string]: unknown;
}

export interface OutreachLeadItem {
  id: string;
  name?: string;
  business?: string;
  company?: string;
  category?: "followup" | "webdesign" | "ittools" | string;
  channel?: string;
  niche?: string;
  group?: string;
  contact?: string;
  email?: string;
  profileUrl?: string;
  website?: string;
  notes?: string;
  status?: "new" | "ready" | "sent" | "replied" | "dead" | string;
  currentStep?: number;
  steps?: Record<string | number, OutreachStep>;
  [key: string]: unknown;
}

export const INITIAL_FOLLOWUPS: OutreachLeadItem[] = [
  {
    "id": "fu-1",
    "company": "D's Friendly Diner",
    "contact": "Dana Smith",
    "email": "danasmith0823@gmail.com",
    "location": "Statesboro, GA",
    "niche": "Restaurant / Diner",
    "mockupKey": "ds-friendly-diner-redesign-mockup.html",
    "status": "ready",
    "currentStep": 3,
    "steps": {
      "1": {
        "subject": "Fixing D's Friendly Diner's search presence",
        "body": "Hi Dana, noticed D's Friendly Diner has great local breakfast reviews in Statesboro, but third-party scrapers are displaying outdated operating hours and missing carryout specials online. I put together a clean prototype showing how your verified hours and menus would look on an official site: [[ds-friendly-diner-redesign-mockup.html]]. Free to review—happy to share the preview files!"
      },
      "2": {
        "subject": "Re: Fixing D's Friendly Diner's search presence",
        "body": "Hi Dana, checking in on this — I created a clean one-page layout showing how your verified hours, breakfast menu, and carryout ordering would look on an official site: [[ds-friendly-diner-redesign-mockup.html]]. Takes 2 minutes to look at, completely free. Open to seeing it?"
      },
      "3": {
        "subject": "Re: Fixing D's Friendly Diner's search presence",
        "body": "Hi Dana, I know breakfast rushes and running the diner keep you on your feet from dawn to dusk. I will leave the interactive prototype here in case you ever want to fix the incorrect hours Google displays and take control of your Statesboro carryout menu: [[ds-friendly-diner-redesign-mockup.html]]. Wishing you a packed dining room and a fantastic week!"
      }
    }
  },
  {
    "id": "fu-2",
    "company": "Dennis Plumbing Co.",
    "contact": "Service Desk",
    "email": "dennisplumbingcompany@gmail.com",
    "location": "Missouri",
    "niche": "Emergency Residential Trade",
    "mockupKey": "dennis-plumbing-redesign-mockup.html",
    "status": "ready",
    "currentStep": 2,
    "steps": {
      "1": {
        "subject": "A Website for Dennis Plumbing?",
        "body": "Hi there, came across Dennis Plumbing and noticed you have great local standing but no website for after-hours emergency calls. I put together a quick mobile prototype showing an emergency dispatch button and BBB credentials: [[dennis-plumbing-redesign-mockup.html]]. Let me know if you would like me to send the link."
      },
      "2": {
        "subject": "Re: A Website for Dennis Plumbing?",
        "body": "Hi there, checking back on my note regarding Dennis Plumbing. Emergency calls often go to whoever has the easiest mobile dispatch button when a pipe bursts at night. I put together a quick, clean prototype showing how an instant service scheduler and your BBB credentials would look on mobile: [[dennis-plumbing-redesign-mockup.html]]. Completely free to review—would you like me to send over the live link?"
      },
      "3": {
        "subject": "Re: A Website for Dennis Plumbing?",
        "body": "Hi there, know service calls keep your trucks moving all day. Leaving the mobile prototype here in case you ever want to capture more after-hours emergency calls: [[dennis-plumbing-redesign-mockup.html]]. Wishing you a great rest of the month!"
      }
    }
  },
  {
    "id": "fu-3",
    "company": "Kay Nails",
    "contact": "Front Desk",
    "email": "kaysnails242@gmail.com",
    "location": "Long Island, NY",
    "niche": "Nail Care & Beauty",
    "mockupKey": "kay-nails-redesign-mockup.html",
    "status": "ready",
    "currentStep": 2,
    "steps": {
      "1": {
        "subject": "A Website for Kay Nails?",
        "body": "Hi there, love your nail artistry portfolio. Built a mobile prototype showing how an instant chair booking flow and service pricing menu would look: [[kay-nails-redesign-mockup.html]]. Takes 20 seconds for clients to reserve on mobile. Open to a preview?"
      },
      "2": {
        "subject": "Re: A Website for Kay Nails?",
        "body": "Hi there, following up briefly on my note from last week. Clients looking for custom nail art usually want to see photos and lock in appointment times without calling back and forth. I designed a mobile concept featuring your service pricing menu and an instant chair reservation flow: [[kay-nails-redesign-mockup.html]]. Takes two minutes to view, zero cost. Open to taking a look?"
      },
      "3": {
        "subject": "Re: A Website for Kay Nails?",
        "body": "Hi there, know managing the salon keeps you nonstop. I will leave the mobile booking concept here in case you ever want to let clients self-reserve chairs 24/7: [[kay-nails-redesign-mockup.html]]. Have a wonderful week ahead!"
      }
    }
  },
  {
    "id": "fu-4",
    "company": "Reliable Roofing, LLC",
    "contact": "Estimating Team",
    "email": "info@reliableroofing.com",
    "location": "Topeka, KS",
    "niche": "Roofing & Storm Restoration",
    "mockupKey": "reliable-roofing-redesign-mockup.html",
    "status": "ready",
    "currentStep": 3,
    "steps": {
      "1": {
        "subject": "A website for Reliable Roofing?",
        "body": "Hi there, saw your roofing work in Topeka. Put together a mobile concept showing a storm damage estimate form and credentials: [[reliable-roofing-redesign-mockup.html]]. Would love to pass along the files."
      },
      "2": {
        "subject": "Re: A website for Reliable Roofing?",
        "body": "Hi there, following up briefly — I actually went ahead and drafted a concept for how your quote request form and storm damage credentials would look on mobile: [[reliable-roofing-redesign-mockup.html]]. No cost or strings attached. Let me know if you would like me to send over the direct preview."
      },
      "3": {
        "subject": "Re: A website for Reliable Roofing?",
        "body": "Hi there, I know storm damage inspections keep your crew booked across the field. I will leave our mobile estimate prototype here with you in case you ever want to capture direct local roofing inquiries: [[reliable-roofing-redesign-mockup.html]]. Wishing you and the crew a productive month ahead!"
      }
    }
  },
  {
    "id": "fu-5",
    "company": "Cape Coral Art League",
    "contact": "Board of Directors",
    "email": "capecoralartleague@gmail.com",
    "location": "Cape Coral, FL",
    "niche": "Cultural Non-Profit",
    "mockupKey": null,
    "toolUrl": "https://northsideintelligence.com/grantbot",
    "status": "ready",
    "currentStep": 3,
    "steps": {
      "1": {
        "subject": "Make Applying For Grants EASY",
        "body": "Hi team, we built GrantBot (https://northsideintelligence.com/grantbot) for arts non-profits to scan cultural endowments and draft grant narratives in minutes. Let me know if you'd like a test run."
      },
      "2": {
        "subject": "Re: Make Applying For Grants EASY",
        "body": "Hi there, following up on my note from last week. I put together a quick look at GrantBot (https://northsideintelligence.com/grantbot) — it searches non-profit and arts endowment grants and auto-drafts responses to line-item requirements. Happy to walk you through a quick test search if you have any upcoming funding deadlines."
      },
      "3": {
        "subject": "Re: Make Applying For Grants EASY",
        "body": "Hi team, know organizing community exhibitions keeps your board fully committed. I will leave GrantBot on your radar in case you ever need to match cultural endowments and draft grant narratives in minutes: https://northsideintelligence.com/signup. Best of luck with your upcoming exhibition season!"
      }
    }
  },
  {
    "id": "fu-6",
    "company": "Artefacto",
    "contact": "Research Directors",
    "email": "hello@artefacto.org.uk",
    "location": "London / Remote",
    "niche": "Research & Design Consultancy",
    "mockupKey": null,
    "toolUrl": "https://northsideintelligence.com/signaldesk",
    "status": "ready",
    "currentStep": 3,
    "steps": {
      "1": {
        "subject": "Streamline Your Research Process",
        "body": "Hi team, built SignalDesk (https://northsideintelligence.com/signaldesk) for research teams needing real-time signal tracking without info overload. Let me know if you want a trial pass."
      },
      "2": {
        "subject": "Re: Streamline Your Research Process",
        "body": "Hi Artefacto team, following up on my message from last week. We built SignalDesk (https://northsideintelligence.com/signaldesk) specifically for research teams needing continuous signal tracking across publications and competitive sectors without information overload. Let me know if you would like a direct trial pass to test it out."
      },
      "3": {
        "subject": "Re: Streamline Your Research Process",
        "body": "Hi Artefacto team, know research deadlines keep everyone running. Leaving SignalDesk here with you in case your analysts ever need continuous sector intelligence briefs without manual bookmarking: https://northsideintelligence.com/signup. Wishing you continued success on your client initiatives!"
      }
    }
  }
];
export const INITIAL_WEBDESIGN: OutreachLeadItem[] = [
  {
    "id": "web-1",
    "company": "Fox Auto Repair",
    "vertical": "ReplyFlow Vertical · High-Inquiry Customer Ops",
    "verticalColor": "rose",
    "contact": "Service Managers",
    "email": "info@foxautorepair.com",
    "location": "Roselle, IL",
    "niche": "Auto Repair & Diagnostics",
    "mockupKey": "fox-auto-repair-redesign-mockup.html",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Quick concept for Fox Auto Repair's website",
        "body": "Hi team, I noticed Fox Auto Repair has earned stellar local reputation and customer reviews in Roselle, but drivers searching on mobile often struggle to request service slots quickly after shop hours. To make that seamless, I put together a modern mobile concept featuring an instant diagnostic scheduler, ASE certification highlights, and clean service pricing: [[fox-auto-repair-redesign-mockup.html]]. We build custom websites for established service shops, and we put together this free homepage mockup so you can see exactly how it works with zero strings attached. Would you like me to send over the direct files to inspect?"
      },
      "2": {
        "subject": "Re: Quick concept for Fox Auto Repair's website",
        "body": "Hi team, following up on the diagnostic scheduler concept I put together for Fox Auto Repair: [[fox-auto-repair-redesign-mockup.html]]. It allows Roselle vehicle owners to request inspections in 30 seconds straight from their phone. Happy to share the files if you would like a quick look!"
      },
      "3": {
        "subject": "Re: Quick concept for Fox Auto Repair's website",
        "body": "Hi team, I know running bays and servicing vehicles keeps your technicians busy all day. Leaving the mobile concept here in case you ever want to capture more after-hours diagnostic appointments: [[fox-auto-repair-redesign-mockup.html]]. Wishing the Fox Auto team a great week ahead!"
      }
    }
  },
  {
    "id": "web-2",
    "company": "Rite Way Automotive Service",
    "vertical": "ReplyFlow Vertical · High-Inquiry Customer Ops",
    "verticalColor": "rose",
    "contact": "Front Desk Team",
    "email": "info@ritewayautowego.com",
    "location": "Oswego, IL",
    "niche": "Automotive Repair & Maintenance",
    "mockupKey": "riteway-auto-service-redesign-mockup.html",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Quick concept for Rite Way Automotive's website",
        "body": "Hi team, came across Rite Way Automotive and your long-standing reputation for dependable mechanical care in Oswego. When drivers experience unexpected check-engine lights or brake trouble in the evening, they often look for immediate self-serve appointment booking rather than waiting until morning. I drafted an interactive mobile prototype featuring an after-hours vehicle intake form and clear repair tier options: [[riteway-auto-service-redesign-mockup.html]]. We specialize in high-converting web design for local automotive leaders, and this free homepage mockup is completely on the house to review. Would you be open to checking out the preview?"
      },
      "2": {
        "subject": "Re: Quick concept for Rite Way Automotive's website",
        "body": "Hi team, checking back on the after-hours intake prototype I shared for Rite Way Automotive: [[riteway-auto-service-redesign-mockup.html]]. It takes 2 minutes to review and lets Oswego drivers book service appointments before your doors open in the morning. Let me know if you would like the direct access link."
      },
      "3": {
        "subject": "Re: Quick concept for Rite Way Automotive's website",
        "body": "Hi team, know the service desk keeps everyone moving on the floor. I will leave the prototype link here in case you ever want to streamline your online appointment scheduling: [[riteway-auto-service-redesign-mockup.html]]. Wishing you and your crew a smooth, productive week!"
      }
    }
  },
  {
    "id": "web-3",
    "company": "Hazen Elder Law",
    "vertical": "GrantBot Vertical · Legal, Trust & Nonprofit Governance",
    "verticalColor": "emerald",
    "contact": "Practice Manager",
    "email": "info@hazenelderlaw.com",
    "location": "Mechanicsburg, PA",
    "niche": "Elder Law & Estate Planning",
    "mockupKey": "hazen-elder-law-redesign-mockup.html",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Modern intake concept for Hazen Elder Law",
        "body": "Hi team, I came across Hazen Elder Law while researching dedicated estate planning and Medicaid counsel in Pennsylvania. Families facing sudden elder care or probate transitions often feel overwhelmed and need a reassuring, confidential path to request consultations online. To show how effortless that can feel, I put together a modern client intake concept designed specifically for your practice areas: [[hazen-elder-law-redesign-mockup.html]]. We design premium websites for specialized legal practices, and I wanted to offer this free homepage mockup with zero obligation. Would you like me to share the interactive files with your team?"
      },
      "2": {
        "subject": "Re: Modern intake concept for Hazen Elder Law",
        "body": "Hi team, following up on the intake concept I designed for Hazen Elder Law: [[hazen-elder-law-redesign-mockup.html]]. It streamlines confidential consultation scheduling for families navigating estate planning and Medicaid. Let me know if you would like me to pass along the details."
      },
      "3": {
        "subject": "Re: Modern intake concept for Hazen Elder Law",
        "body": "Hi team, know counsel sessions and court filings keep your attorneys fully engaged. Leaving the prototype here in case your practice ever wants a cleaner online intake experience for families: [[hazen-elder-law-redesign-mockup.html]]. Wishing Hazen Elder Law continued success!"
      }
    }
  },
  {
    "id": "web-4",
    "company": "Blakinger Thomas, PC",
    "vertical": "GrantBot Vertical · Legal, Trust & Nonprofit Governance",
    "verticalColor": "emerald",
    "contact": "Firm Administrators",
    "email": "info@bbt-law.com",
    "location": "Lancaster, PA",
    "niche": "Corporate, Municipal & Estate Law",
    "mockupKey": "bbt-law-redesign-mockup.html",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Client intake prototype for Blakinger Thomas",
        "body": "Hi team, I came across Blakinger Thomas and your deep multi-practice legal counsel across Central Pennsylvania. With corporate, municipal, and estate clients increasingly vetting legal counsel on mobile devices, dense desktop layouts often make finding the right partner or practice group difficult. I put together an interactive prototype demonstrating a streamlined practice navigator and direct consultation intake: [[bbt-law-redesign-mockup.html]]. As part of our web design work for regional firms, we built this free homepage mockup so your partners can explore the layout with zero cost. Would you be open to taking a quick look?"
      },
      "2": {
        "subject": "Re: Client intake prototype for Blakinger Thomas",
        "body": "Hi team, checking back on the practice navigator concept for Blakinger Thomas: [[bbt-law-redesign-mockup.html]]. It helps prospective corporate and municipal clients evaluate practice areas and reach the appropriate attorney in under a minute. Happy to share the files if you'd like a look!"
      },
      "3": {
        "subject": "Re: Client intake prototype for Blakinger Thomas",
        "body": "Hi team, know client matters and active litigation keep your partners busy. I will leave the prototype link with you in case your marketing committee evaluates a website refresh in the future: [[bbt-law-redesign-mockup.html]]. Best regards to the firm!"
      }
    }
  },
  {
    "id": "web-5",
    "company": "Ritzi Law, LLC",
    "vertical": "Signal Desk Vertical · Specialized Advisory & Clinical Practices",
    "verticalColor": "sky",
    "contact": "Office of Attorneys",
    "email": "ritzilaw@sbcglobal.net",
    "location": "Marion, IN",
    "niche": "Estate Planning & Probate",
    "mockupKey": "ritzi-law-redesign-mockup.html",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Estate planning intake concept for Ritzi Law",
        "body": "Hi team, I came across Ritzi Law and your compassionate estate planning and elder care advocacy across Indiana. Navigating wills, trusts, and healthcare directives can feel intimidating for local families, and many hesitate when online consultation booking feels complicated. To help resolve that barrier, I created a clean, welcoming mobile intake concept tailored to your practice: [[ritzi-law-redesign-mockup.html]]. We specialize in high-trust web design for estate attorneys, and this free homepage mockup is completely complimentary to review. Would you like me to send over the direct link for your review?"
      },
      "2": {
        "subject": "Re: Estate planning intake concept for Ritzi Law",
        "body": "Hi team, following up on the intake prototype I drafted for Ritzi Law: [[ritzi-law-redesign-mockup.html]]. It makes scheduling confidential estate planning and probate consultations effortless for local families on mobile. Let me know if you would like me to share the preview files."
      },
      "3": {
        "subject": "Re: Estate planning intake concept for Ritzi Law",
        "body": "Hi team, know managing client estates and filings takes full focus. Leaving the interactive prototype here in case you ever want to upgrade your online scheduling: [[ritzi-law-redesign-mockup.html]]. Wishing you and your clients all the best!"
      }
    }
  },
  {
    "id": "web-6",
    "company": "Kinnection Chiropractic",
    "vertical": "Signal Desk Vertical · Specialized Advisory & Clinical Practices",
    "verticalColor": "sky",
    "contact": "Dr. Zach Williams",
    "email": "drzachwilliams@kinnectionchiro.com",
    "location": "Nashville, TN",
    "niche": "Chiropractic & Pediatric Sports",
    "mockupKey": "kinnection-chiropractic-redesign-mockup.html",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Patient booking concept for Kinnection Chiropractic",
        "body": "Hi Dr. Zach, I came across Kinnection Chiropractic and really admire your specialized pediatric and sports biomechanics work in Nashville. Prospective patients dealing with chronic aches or athletic injuries usually want to book an initial assessment instantly from their phone rather than waiting to call during clinic hours. I designed an interactive concept featuring your $49 new patient exam booking funnel and patient outcomes: [[kinnection-chiropractic-redesign-mockup.html]]. We build conversion-focused websites for wellness clinics, and this free homepage mockup is 100% complimentary to explore. Open to taking a quick look at the preview?"
      },
      "2": {
        "subject": "Re: Patient booking concept for Kinnection Chiropractic",
        "body": "Hi Dr. Zach, checking back on the self-serve patient booking concept for Kinnection Chiropractic: [[kinnection-chiropractic-redesign-mockup.html]]. It takes 2 minutes to inspect and lets prospective patients reserve their initial adjustment online in under 30 seconds. Happy to share the files if you'd like a look!"
      },
      "3": {
        "subject": "Re: Patient booking concept for Kinnection Chiropractic",
        "body": "Hi Dr. Zach, know patient appointments keep your treatment rooms packed all week. I will leave the concept link here in case you ever want to automate your new patient booking calendar: [[kinnection-chiropractic-redesign-mockup.html]]. Wishing Kinnection Chiropractic continued growth!"
      }
    }
  },
  {
    "id": "web-7",
    "company": "Espinoza Landscaping LLC",
    "vertical": "GapScan Vertical · High-Ticket Contracting & Trade Operations",
    "verticalColor": "amber",
    "contact": "Project Estimator",
    "email": "info@espinozalandscapingllc.com",
    "location": "Columbus, OH",
    "niche": "Landscaping & Hardscaping",
    "mockupKey": "espinoza-landscaping-redesign-mockup.html",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Fast estimate funnel concept for Espinoza Landscaping",
        "body": "Hi team, saw your impressive lawn care, hardscaping, and patio installations around Columbus. Most residential property owners searching for seasonal cleanups or paver patios want instant price estimates on mobile instead of waiting through back-and-forth phone tags. I built a mobile prototype demonstrating an instant project estimate generator and visual portfolio for your company: [[espinoza-landscaping-redesign-mockup.html]]. We develop high-converting websites for trade contractors, and I put together this free homepage mockup completely on the house so you can review it. Would you like me to send over the link to review?"
      },
      "2": {
        "subject": "Re: Fast estimate funnel concept for Espinoza Landscaping",
        "body": "Hi team, following up on the instant estimate generator concept for Espinoza Landscaping: [[espinoza-landscaping-redesign-mockup.html]]. It allows Columbus homeowners to submit project dimensions and get instant quotes right from their phones. Let me know if you would like me to share the preview files."
      },
      "3": {
        "subject": "Re: Fast estimate funnel concept for Espinoza Landscaping",
        "body": "Hi team, know fall cleanups and hardscaping projects keep your crew on the move. Leaving the prototype here in case you ever want to capture more high-margin landscaping jobs online: [[espinoza-landscaping-redesign-mockup.html]]. Wishing Espinoza Landscaping a great rest of the season!"
      }
    }
  },
  {
    "id": "web-8",
    "company": "CLE Landscaping Co., LLC",
    "vertical": "GapScan Vertical · High-Ticket Contracting & Trade Operations",
    "verticalColor": "amber",
    "contact": "Commercial Bidding Dept",
    "email": "info@clelandscaping.com",
    "location": "Cleveland, OH",
    "niche": "Commercial Grounds & Snow Management",
    "mockupKey": "cle-landscaping-redesign-mockup.html",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Commercial grounds & RFP concept for CLE Landscaping",
        "body": "Hi team, came across CLE Landscaping and your extensive commercial grounds and snow management portfolio across Northeast Ohio. Commercial property managers bidding out corporate maintenance contracts need an expedited, frictionless way to upload site specifications and review seasonal credentials. I put together an interactive prototype demonstrating an expedited commercial RFP bid intake and property portfolio: [[cle-landscaping-redesign-mockup.html]]. We build performance web platforms for commercial contractors, and this free homepage mockup is completely complimentary to review. Would you be open to taking a quick look at the interactive files?"
      },
      "2": {
        "subject": "Re: Commercial grounds & RFP concept for CLE Landscaping",
        "body": "Hi team, checking back on the commercial RFP intake concept for CLE Landscaping: [[cle-landscaping-redesign-mockup.html]]. It streamlines seasonal snow and grounds proposals for corporate property managers. Let me know if you would like me to send over the direct files."
      },
      "3": {
        "subject": "Re: Commercial grounds & RFP concept for CLE Landscaping",
        "body": "Hi team, know commercial site prep keeps everyone busy. I will leave the prototype here in case your leadership team ever considers upgrading your online bid intake: [[cle-landscaping-redesign-mockup.html]]. Wishing CLE Landscaping a profitable season ahead!"
      }
    }
  },
  {
    "id": "web-9",
    "company": "Ohio Heating & Refrigeration",
    "vertical": "BridgeAI Vertical · Commercial Systems & Engineering",
    "verticalColor": "indigo",
    "contact": "Commercial Service Dept",
    "email": "hvac@ohheating.com",
    "location": "Columbus, OH",
    "niche": "Commercial HVAC, Chillers & Refrigeration",
    "mockupKey": "ohio-heating-redesign-mockup.html",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Commercial dispatch & service concept for Ohio Heating",
        "body": "Hi team, came across Ohio Heating & Refrigeration and your comprehensive commercial mechanical and cooling services across Central Ohio. When commercial facility managers face critical chiller or rooftop failures, every minute of phone tag costs money. I put together a modern digital prototype featuring an emergency 24/7 commercial dispatch flow and preventative maintenance agreement intake: [[ohio-heating-redesign-mockup.html]]. We build web platforms for commercial mechanical contractors, and this free homepage mockup is 100% complimentary to review with zero obligation. Would you be open to seeing how the interactive dispatch flow works?"
      },
      "2": {
        "subject": "Re: Commercial dispatch & service concept for Ohio Heating",
        "body": "Hi team, following up on the commercial dispatch prototype I put together for Ohio Heating: [[ohio-heating-redesign-mockup.html]]. It allows facility managers to log urgent commercial HVAC and refrigeration tickets with SMS verification in 45 seconds. Let me know if you would like me to pass along the files."
      },
      "3": {
        "subject": "Re: Commercial dispatch & service concept for Ohio Heating",
        "body": "Hi team, know emergency commercial calls and service contracts keep your techs on the road. Leaving the prototype here in case you ever want to streamline your online commercial service tickets: [[ohio-heating-redesign-mockup.html]]. Wishing Ohio Heating continued success!"
      }
    }
  },
  {
    "id": "web-10",
    "company": "The Superior Group",
    "vertical": "BridgeAI Vertical · Commercial Systems & Engineering",
    "verticalColor": "indigo",
    "contact": "Christian Mans (New Business)",
    "email": "cmans@superiorgroup.net",
    "location": "Columbus, OH",
    "niche": "Commercial Electrical, Low-Voltage & BIM",
    "mockupKey": "superior-group-redesign-mockup.html",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Commercial RFP & systems portal concept for The Superior Group",
        "body": "Hi Christian, came across The Superior Group and your complex commercial electrical construction and BIM integration work across Ohio. General contractors and commercial developers often need a fast, secure portal to upload construction drawings and request bid proposals without navigating disconnected intake forms. I put together an interactive prototype demonstrating an expedited commercial RFP bid intake and systems capability showcase: [[superior-group-redesign-mockup.html]]. We design performance platforms for premier electrical contractors, and this free homepage mockup is completely complimentary to inspect. Would you be open to reviewing the preview?"
      },
      "2": {
        "subject": "Re: Commercial RFP & systems portal concept for The Superior Group",
        "body": "Hi Christian, checking back on the commercial RFP proposal concept for The Superior Group: [[superior-group-redesign-mockup.html]]. It streamlines bid packages and drawing uploads for general contractors in under a minute. Happy to share the files if you would like a quick look!"
      },
      "3": {
        "subject": "Re: Commercial RFP & systems portal concept for The Superior Group",
        "body": "Hi Christian, know estimating and major commercial builds require deep focus. I will leave the RFP concept with you in case your team evaluates a digital intake refresh in the future: [[superior-group-redesign-mockup.html]]. Best regards on your upcoming projects!"
      }
    }
  }
];
export const INITIAL_ITTOOLS: OutreachLeadItem[] = [
  {
    "id": "it-1",
    "tool": "ReplyFlow",
    "toolColor": "rose",
    "toolUrl": "https://northsideintelligence.com/replyflow",
    "company": "Poinciana Management",
    "contact": "Leasing Desk",
    "email": "leasing@5618481300.com",
    "hook": "High volume rental listings needing automated qualification and tour booking.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Saving hours on leasing inquiries for Poinciana Management",
        "body": "Hi team, noticed your active residential listings across Florida. Property managers often lose hours every week answering repetitive questions about pet policies, move-in dates, and parking. We built ReplyFlow so you can simply copy any resident inquiry, select your tone, and generate an accurate reply ready to adjust and send back in seconds. It saves substantial time across daily communications. We would love to offer your leasing desk a complimentary trial pass to test it on your current inbox: https://northsideintelligence.com/signup. Let me know if you would like me to set up your team's access!"
      },
      "2": {
        "subject": "Re: Saving hours on leasing inquiries for Poinciana Management",
        "body": "Hi team, following up on my note regarding ReplyFlow. It eliminates repetitive typing on tenant questions by generating customized, polite responses in seconds: https://northsideintelligence.com/signup. Takes 2 minutes to test on your active listings. Let me know if you'd like a trial pass for your leasing staff!"
      },
      "3": {
        "subject": "Re: Saving hours on leasing inquiries for Poinciana Management",
        "body": "Hi team, know property walkthroughs keep your staff busy. Leaving the trial link here in case your office ever wants to speed up tenant email responses: https://northsideintelligence.com/signup. Wishing Poinciana Management high occupancy and a great month!"
      }
    }
  },
  {
    "id": "it-2",
    "tool": "ReplyFlow",
    "toolColor": "rose",
    "toolUrl": "https://northsideintelligence.com/replyflow",
    "company": "Florida's Property Management",
    "contact": "Glenn (Operator)",
    "email": "glenn@floridaspropertymanagement.com",
    "hook": "Operator spending hours answering repetitive leasing FAQs and HOA updates.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Instant communications workflow for Florida's Property Management",
        "body": "Hi Glenn, following your property management operations across Florida. When handling dozens of community associations, managers get bogged down answering repetitive owner inquiries and vendor updates across multiple inboxes. We built ReplyFlow to streamline that exact workflow: copy the incoming message, select a professional or firm tone, generate a tailored reply, and paste it straight back to send. It gives your managers hours back each week. We are offering established property operators a complimentary trial account to test it out: https://northsideintelligence.com/signup. Would you like me to get your account activated?"
      },
      "2": {
        "subject": "Re: Instant communications workflow for Florida's Property Management",
        "body": "Hi Glenn, checking back on ReplyFlow for your property managers. It turns 15-minute email draft sessions into 15-second reviews so your staff can focus on on-site operations: https://northsideintelligence.com/signup. Happy to set you up with a quick test run across your current properties if helpful!"
      },
      "3": {
        "subject": "Re: Instant communications workflow for Florida's Property Management",
        "body": "Hi Glenn, know managing communities takes full attention. I will leave the sign-up link here in case you ever want to eliminate manual email drafting for your team: https://northsideintelligence.com/signup. Best of luck with your properties this fall!"
      }
    }
  },
  {
    "id": "it-3",
    "tool": "GrantBot",
    "toolColor": "emerald",
    "toolUrl": "https://northsideintelligence.com/grantbot",
    "company": "Arts Council of Greater New Haven",
    "contact": "Grant & Development Team",
    "email": "info@newhavenarts.org",
    "hook": "Navigating multi-agency endowment criteria and labor-intensive grant proposals.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Accelerating grant applications for Arts Council of Greater New Haven",
        "body": "Hi team, following your dedicated cultural advocacy and artist endowment initiatives across Greater New Haven. Navigating complex state and private foundation grant guidelines often drains valuable hours that should go toward community programming. We engineered GrantBot to save hours of grant application writing: simply enter your organization's mission, select the funding grants you want to pursue, and automatically generate tailored application narratives and budget statements for each. We are offering cultural councils a free trial pass to test it on an active cycle: https://northsideintelligence.com/signup. Would your development team be open to exploring a quick run?"
      },
      "2": {
        "subject": "Re: Accelerating grant applications for Arts Council of Greater New Haven",
        "body": "Hi team, checking back on GrantBot for New Haven Arts. It helps cultural nonprofits draft compliant grant proposals and project narratives in minutes rather than days: https://northsideintelligence.com/signup. Happy to grant your team a trial pass if you have any upcoming fall foundation deadlines to meet!"
      },
      "3": {
        "subject": "Re: Accelerating grant applications for Arts Council of Greater New Haven",
        "body": "Hi team, know coordinating community arts programs keeps your calendar full. Leaving the GrantBot link with you in case you ever want to speed up upcoming proposal submissions: https://northsideintelligence.com/signup. Wishing the Arts Council continued impact!"
      }
    }
  },
  {
    "id": "it-4",
    "tool": "GrantBot",
    "toolColor": "emerald",
    "toolUrl": "https://northsideintelligence.com/grantbot",
    "company": "South Florida Wildlife Center",
    "contact": "Development Team",
    "email": "info@southfloridawildlifecenter.org",
    "hook": "High-volume wildlife rehabilitation hospital needing grant proposal acceleration.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Streamlining funding proposals for South Florida Wildlife Center",
        "body": "Hi team, inspired by your critical wildlife rehabilitation and veterinary care across South Florida. Raising grant capital for medicine, hospital facilities, and wildlife rescue is essential, but drafting repetitive grant proposals pulls staff away from patient care. We built GrantBot to save hours of proposal writing: enter your clinic's background, select the grants you want to target, and instantly generate compliant application materials tailored to each funder's prompts. We would love to provide your team a complimentary trial pass for your upcoming grant applications: https://northsideintelligence.com/signup. Would you like me to set that up?"
      },
      "2": {
        "subject": "Re: Streamlining funding proposals for South Florida Wildlife Center",
        "body": "Hi team, following up on GrantBot for your conservation proposals. It drafts structured grant narratives and mission responses tailored to foundation requirements in minutes: https://northsideintelligence.com/signup. Let me know if your development staff has an upcoming funding window you would like to test it against!"
      },
      "3": {
        "subject": "Re: Streamlining funding proposals for South Florida Wildlife Center",
        "body": "Hi team, know caring for recovering wildlife takes round-the-clock dedication. Leaving the trial link here in case your development team wants to accelerate upcoming grant writing: https://northsideintelligence.com/signup. Wishing the Wildlife Center continued success!"
      }
    }
  },
  {
    "id": "it-5",
    "tool": "SignalDesk",
    "toolColor": "sky",
    "toolUrl": "https://northsideintelligence.com/signaldesk",
    "company": "Digital Heritage Research Group",
    "contact": "Fellows & Research Staff",
    "email": "contact@heritagefutures.org",
    "hook": "Cross-publication literature scanning and institutional competitive tracking.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Executive research briefs for Digital Heritage",
        "body": "Hi team, following your published work on cultural preservation and digital heritage frameworks. Research groups often lose days manually tracking literature, sector developments, and competitive institutional moves across dispersed channels. We built Signal Desk to keep your team a step ahead: simply drop in your project notes and competitor targets, and the tool synthesizes everything into one clear, ranked executive brief on what matters next. We would love to grant your research fellows a complimentary trial pass to test on an active study: https://northsideintelligence.com/signup. Would you like me to activate your team's access?"
      },
      "2": {
        "subject": "Re: Executive research briefs for Digital Heritage",
        "body": "Hi team, checking back on Signal Desk for your research staff. It replaces hours of manual web scanning with one ranked briefing card on key institutional and market developments: https://northsideintelligence.com/signup. Let me know if you would like a direct pass to test on your upcoming projects!"
      },
      "3": {
        "subject": "Re: Executive research briefs for Digital Heritage",
        "body": "Hi team, know preparing research papers and archive documentation takes deep focus. I will leave the briefing platform link here in case you ever want to streamline sector monitoring: https://northsideintelligence.com/signup. Best regards on your research initiatives!"
      }
    }
  },
  {
    "id": "it-6",
    "tool": "SignalDesk",
    "toolColor": "sky",
    "toolUrl": "https://northsideintelligence.com/signaldesk",
    "company": "Aperture Strategy Partners",
    "contact": "Strategy Analysts",
    "email": "insights@aperturestrategy.com",
    "hook": "Synthesizing market shifts, regulatory moves, and competitor developments into briefs.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Automated competitor briefings for Aperture Strategy Partners",
        "body": "Hi team, following your corporate advisory work helping leaders navigate shifting industry landscapes. Synthesizing scattered competitor filings, product announcements, and market shifts into client-ready briefings often consumes hours of analyst bandwidth. We designed Signal Desk to keep strategists a step ahead of the competition: drop in your market notes and tracked competitors, and get one clean, ranked brief highlighting exactly what matters next. We are offering strategy consultancies a complimentary trial account to test it on their active sectors: https://northsideintelligence.com/signup. Would your team be open to exploring a sample briefing?"
      },
      "2": {
        "subject": "Re: Automated competitor briefings for Aperture Strategy Partners",
        "body": "Hi team, following up on Signal Desk for your advisory analysts. It condenses scattered market signals and competitor moves into a single ranked executive brief in seconds: https://northsideintelligence.com/signup. Happy to share a trial pass if you want to test it on an active client engagement!"
      },
      "3": {
        "subject": "Re: Automated competitor briefings for Aperture Strategy Partners",
        "body": "Hi team, know active advisory deliverables keep your consultants fully engaged. Leaving the platform link here in case your firm ever wants to accelerate market briefing workflows: https://northsideintelligence.com/signup. Wishing Aperture Strategy continued client success!"
      }
    }
  },
  {
    "id": "it-7",
    "tool": "GapScan",
    "toolColor": "amber",
    "toolUrl": "https://northsideintelligence.com/gapscan",
    "company": "Velocity SaaS Studio",
    "contact": "Studio Founders",
    "email": "founders@velocityscale.io",
    "hook": "Pinpointing software feature gaps, churn causes, and workflow friction.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Uncovering operational bottlenecks for Velocity SaaS Studio",
        "body": "Hi team, following your venture studio model building and scaling modern B2B software products. When incubating early-stage companies, diagnosing operational friction and workflow bottlenecks usually requires endless team interviews. We built GapScan to fix the biggest problems first: simply paste how your team or product works, and it delivers a ranked list of operational gaps with actionable fixes you can start this week. We are offering venture studios a complimentary trial pass to test it across an active incubation cohort: https://northsideintelligence.com/signup. Would you be open to running a quick scan?"
      },
      "2": {
        "subject": "Re: Uncovering operational bottlenecks for Velocity SaaS Studio",
        "body": "Hi team, checking back on GapScan for Velocity SaaS. It audits operational workflows and returns ranked friction points with concrete fixes you can execute immediately: https://northsideintelligence.com/signup. Let me know if you would like a trial key to test on an upcoming portfolio product!"
      },
      "3": {
        "subject": "Re: Uncovering operational bottlenecks for Velocity SaaS Studio",
        "body": "Hi team, know sprint reviews and product launches take full priority. Leaving the diagnostic link here in case your studio ever wants to pinpoint operational gaps rapidly: https://northsideintelligence.com/signup. Wishing Velocity SaaS successful launches this quarter!"
      }
    }
  },
  {
    "id": "it-8",
    "tool": "GapScan",
    "toolColor": "amber",
    "toolUrl": "https://northsideintelligence.com/gapscan",
    "company": "OmniCommerce Brands",
    "contact": "Operations Team",
    "email": "ops@omnicommercegroup.com",
    "hook": "Multi-brand eCommerce catalog friction, inventory handoffs, and margin leaks.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Fixing operational friction for OmniCommerce Brands",
        "body": "Hi team, following your multi-brand eCommerce operations across consumer categories. Managing multiple storefronts often hides operational leaks—from inventory update delays to customer support handoffs that quietly eat away at margins. We engineered GapScan to find what is slowing your operations down: paste your current operating workflow, and the tool outputs your biggest friction points ranked with practical fixes you can implement this week. We are inviting eCommerce operators to test a complimentary trial run on their active operations: https://northsideintelligence.com/signup. Would your team be open to exploring a sample audit?"
      },
      "2": {
        "subject": "Re: Fixing operational friction for OmniCommerce Brands",
        "body": "Hi team, following up on GapScan for OmniCommerce. It surfaces hidden friction points in your multi-brand workflows and gives you ranked fixes to implement right away: https://northsideintelligence.com/signup. Happy to set up a complimentary trial if you want to inspect an active storefront workflow!"
      },
      "3": {
        "subject": "Re: Fixing operational friction for OmniCommerce Brands",
        "body": "Hi team, know fulfillment and inventory management keep operations busy nonstop. Leaving the audit link here in case you ever want to eliminate operational bottlenecks across your brands: https://northsideintelligence.com/signup. Wishing OmniCommerce strong sales this season!"
      }
    }
  },
  {
    "id": "it-9",
    "tool": "BridgeAI",
    "toolColor": "indigo",
    "toolUrl": "https://northsideintelligence.com/bridgeai",
    "company": "Agentic Solutions Lab",
    "contact": "Lead Engineers",
    "email": "engineering@agenticsolutions.dev",
    "hook": "Connecting fragmented AI models, APIs, and internal tools without manual glue code.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Bridging disparate tools for Agentic Solutions Lab",
        "body": "Hi team, following your technical engineering work deploying autonomous agents and custom workflow solutions. Even modern engineering teams lose productive hours manually moving data between different APIs, AI models, and internal tools that refuse to talk cleanly. We engineered BridgeAI to find the bridge between all your tools and optimize your workflow, putting an end to manual copy-paste across disjointed stacks. We would love to grant your engineering lab a complimentary trial key to test on an active workflow: https://northsideintelligence.com/signup. Would your team be interested in taking it for a quick spin?"
      },
      "2": {
        "subject": "Re: Bridging disparate tools for Agentic Solutions Lab",
        "body": "Hi team, checking back on BridgeAI for your engineering lab. It maps seamless connections between your AI models, APIs, and data sources to eliminate repetitive manual data transfers: https://northsideintelligence.com/signup. Happy to share a developer trial pass if you'd like to test it on an active build!"
      },
      "3": {
        "subject": "Re: Bridging disparate tools for Agentic Solutions Lab",
        "body": "Hi team, know shipping production pipelines demands full focus. Leaving the developer link with you in case your team ever wants to bridge fragmented tools without custom glue code: https://northsideintelligence.com/signup. Best of luck with your builds!"
      }
    }
  },
  {
    "id": "it-10",
    "tool": "BridgeAI",
    "toolColor": "indigo",
    "toolUrl": "https://northsideintelligence.com/bridgeai",
    "company": "DataBridge Analytics",
    "contact": "Data Systems Consultants",
    "email": "tech@databridgeai.io",
    "hook": "Enterprise data consultancies connecting legacy databases to modern LLM workflows.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "subject": "Optimizing tool integration for DataBridge Analytics",
        "body": "Hi team, came across your data engineering and pipeline consulting work across enterprise environments. When client data stacks become fragmented across legacy warehouses, reporting tools, and external platforms, teams waste endless hours manually reconciling schemas and re-entering data. We built BridgeAI to find the bridge between all your tools and optimize your workflow, eliminating tedious manual copy-paste between systems. We are offering data engineering consultancies a complimentary trial account to test on an upcoming client pipeline: https://northsideintelligence.com/signup. Would you like me to set up an access pass?"
      },
      "2": {
        "subject": "Re: Optimizing tool integration for DataBridge Analytics",
        "body": "Hi team, following up on BridgeAI for your data consultancy. It creates clean interoperability between disparate enterprise databases and workflow tools so your engineers stop writing manual glue code: https://northsideintelligence.com/signup. Let me know if you would like a trial key to inspect the interface!"
      },
      "3": {
        "subject": "Re: Optimizing tool integration for DataBridge Analytics",
        "body": "Hi team, know complex client ETL deployments take priority. I will leave the platform link here in case your consultancy ever wants to optimize fragmented enterprise tools: https://northsideintelligence.com/signup. Wishing DataBridge Analytics great success on upcoming contracts!"
      }
    }
  }
];
