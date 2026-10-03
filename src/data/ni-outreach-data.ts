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
    "company": "Warner Summers",
    "vertical": "NI Services · Commercial Architecture & Interior Design",
    "verticalColor": "cyan",
    "contact": "Dana Ladd",
    "name": "Dana Ladd",
    "email": "dladd@warnersummers.com",
    "profileUrl": "https://www.linkedin.com/company/warner-summers/",
    "website": "https://warnersummers.com",
    "location": "Atlanta, GA",
    "niche": "Commercial Architecture",
    "channel": "Email & LinkedIn",
    "hook": "Aging Avada WordPress theme with LayerSlider and heavy render-blocking assets slowing down mobile showcase.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "label": "Step 1 (Day 1)",
        "subject": "Quick note on Warner Summers's mobile showcase",
        "body": "Hi Dana, love the architectural portfolio Warner Summers has delivered across the Southeast. While reviewing your site, I noticed the current WordPress theme and slider assets load heavy render-blocking stylesheets, causing noticeable layout delays on mobile devices. We design custom, ultra-fast portfolio sites on Next.js and Vercel specifically for premier architectural and design firms, eliminating plugin maintenance while showcasing high-resolution project photography instantly. I drafted a sleek concept mockup for your homepage. Would you be open to taking a quick look this week?"
      },
      "2": {
        "label": "Step 2 (Day 3)",
        "subject": "Re: Quick note on Warner Summers's mobile showcase",
        "body": "Hi Dana, following up briefly on my note regarding Warner Summers's mobile portfolio. High-end commercial clients expecting architectural precision often browse your project work directly from phones and tablets, where sub-second page rendering makes an immediate first impression. Our custom builds remove WordPress plugin bloat entirely so your visual work loads with zero lag. Would you like me to send over the interactive preview link?"
      },
      "3": {
        "label": "Step 3 (Day 7)",
        "subject": "Re: Quick note on Warner Summers's mobile showcase",
        "body": "Hi Dana, know major commercial design deadlines keep your team fully occupied. I will keep the custom portfolio concept ready in case Warner Summers looks to modernize its digital real estate or boost mobile lead conversions later this quarter: https://northsideintelligence.com/services. Wishing you and the firm continued success on your upcoming builds!"
      }
    }
  },
  {
    "id": "web-2",
    "company": "Crescent Wealth Advisory",
    "vertical": "NI Services · Boutique Wealth Advisory & Family Office",
    "verticalColor": "cyan",
    "contact": "Tim Wyrobek",
    "name": "Tim Wyrobek",
    "email": "twyrobek@crescentwealthadvisory.com",
    "profileUrl": "https://www.linkedin.com/in/tim-wyrobek-a843511/",
    "website": "https://crescentwealthadvisory.com",
    "location": "Atlanta, GA",
    "niche": "Boutique Wealth Advisory",
    "channel": "Email & LinkedIn",
    "hook": "Outdated Squarespace 7.0 template with empty meta description and insecure http asset links.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "label": "Step 1 (Day 1)",
        "subject": "Quick note on Crescent Wealth's search snippet",
        "body": "Hi Tim, hope your week is going well. I was reviewing Crescent Wealth Advisory online and noticed your site is currently running on an older Squarespace template with an empty meta description tag. Because of that, search engines and shared links display blank or arbitrary snippet text instead of your fiduciary advisory positioning. We design custom, institutional-grade web platforms for boutique wealth advisors and family offices that demand flawless digital security and executive presentation. Would you be open to seeing a modern redesign concept?"
      },
      "2": {
        "label": "Step 2 (Day 3)",
        "subject": "Re: Quick note on Crescent Wealth's search snippet",
        "body": "Hi Tim, checking back on my note regarding Crescent Wealth's digital presence. High-net-worth families vetting a fiduciary partner expect impeccable attention to detail across every touchpoint, from search previews to secure client navigation. We build custom Next.js web applications that eliminate template limitations and give your advisory practice a bespoke executive feel. Happy to share a quick private mockup if you are interested."
      },
      "3": {
        "label": "Step 3 (Day 7)",
        "subject": "Re: Quick note on Crescent Wealth's search snippet",
        "body": "Hi Tim, I know managing client portfolios and estate planning keeps your calendar full. Leaving the modern advisory concept on your radar in case Crescent Wealth looks to refresh its digital identity or client intake funnels down the road: https://northsideintelligence.com/services. Wishing you and your clients a prosperous month ahead!"
      }
    }
  },
  {
    "id": "web-3",
    "company": "Orr | Cook",
    "vertical": "NI Services · Commercial Litigation & Business Law",
    "verticalColor": "cyan",
    "contact": "Kevin Cook",
    "name": "Kevin Cook",
    "email": "kcook@orrcook.com",
    "profileUrl": "https://www.linkedin.com/in/kevin-cook-a720935/",
    "website": "https://orrcook.com",
    "location": "Jacksonville, FL",
    "niche": "Commercial Litigation",
    "channel": "Email & LinkedIn",
    "hook": "Footer links to pre-merger firm LinkedIn, outdated Avada layout with 23-minute reading time tag.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "label": "Step 1 (Day 1)",
        "subject": "Quick observation on Orr | Cook's website setup",
        "body": "Hi Kevin, came across Orr | Cook's commercial litigation practice in Florida. While looking over your site, I noticed a couple of technical glitches: your footer social link still points to the old pre-merger LinkedIn URL, and your homepage metadata currently generates a 23-minute reading time tag when shared. We build custom, high-performance web systems for elite commercial litigation firms that need instant mobile responsiveness and clean client intake. I put together a streamlined concept for Orr | Cook. Open to a quick look?"
      },
      "2": {
        "label": "Step 2 (Day 3)",
        "subject": "Re: Quick observation on Orr | Cook's website setup",
        "body": "Hi Kevin, following up on the site concept I put together for Orr | Cook. When corporate executives evaluate litigation counsel, a fast, modern digital footprint reinforcing firm stature makes a major difference. Our Next.js architecture fixes broken legacy link metadata and delivers sub-second page loads without WordPress maintenance overhead. Would you like me to send over the preview link to review?"
      },
      "3": {
        "label": "Step 3 (Day 7)",
        "subject": "Re: Quick observation on Orr | Cook's website setup",
        "body": "Hi Kevin, know courtroom schedules and client depositions take precedence. I will keep the litigation portal mockup on file in case Orr | Cook evaluates a website refresh or mobile intake upgrade in the coming months: https://northsideintelligence.com/services. Wishing you and the firm continued success in trial!"
      }
    }
  },
  {
    "id": "web-4",
    "company": "Dowdle Construction Group",
    "vertical": "NI Services · Commercial General Contractor",
    "verticalColor": "cyan",
    "contact": "Chase Manning",
    "name": "Chase Manning",
    "email": "cmanning@dowdleconstruction.com",
    "profileUrl": "https://www.linkedin.com/in/chase-manning-b4412328/",
    "website": "https://dowdleconstruction.com",
    "location": "Nashville, TN",
    "niche": "Commercial General Contractor",
    "channel": "Email & LinkedIn",
    "hook": "Viewport disables user scaling violating accessibility, 5 synchronous fonts blocking render.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "label": "Step 1 (Day 1)",
        "subject": "Quick note on Dowdle Construction's mobile site",
        "body": "Hi Chase, congratulations on Dowdle Construction's ongoing commercial projects across Tennessee. While checking out your site on mobile, I noticed your viewport configuration currently disables user pinch-to-zoom, which triggers accessibility warnings and hurts mobile search ranking. Additionally, multiple font files are loaded synchronously, slowing down initial project renders. We build custom, ultra-fast web platforms for top commercial general contractors so your completed builds and bidding credentials load instantly on any device. Would you be open to seeing a modern mobile concept for Dowdle?"
      },
      "2": {
        "label": "Step 2 (Day 3)",
        "subject": "Re: Quick note on Dowdle Construction's mobile site",
        "body": "Hi Chase, checking back on my note regarding Dowdle Construction's mobile layout. Commercial developers and project owners increasingly inspect contractor credentials and job site galleries directly on phones, where speed and fluid image galleries build trust immediately. Our custom builds eliminate theme script bloat and provide seamless mobile viewing. Let me know if you would like to see the prototype."
      },
      "3": {
        "label": "Step 3 (Day 7)",
        "subject": "Re: Quick note on Dowdle Construction's mobile site",
        "body": "Hi Chase, know job site walk-throughs and project estimates keep your boots on the ground all day. I will keep the contractor showcase prototype on hand in case Dowdle evaluates a site modernization or project bidding portal down the road: https://northsideintelligence.com/services. Wishing you and the crew safe, productive builds!"
      }
    }
  },
  {
    "id": "web-5",
    "company": "Massey and Company CPA",
    "vertical": "NI Services · Boutique CPA & Tax Resolution",
    "verticalColor": "cyan",
    "contact": "Gary Massey, CPA",
    "name": "Gary Massey, CPA",
    "email": "gary.massey@masseyandcompanycpa.com",
    "profileUrl": "https://www.linkedin.com/in/garymasseycpa/",
    "website": "https://masseyandcompanycpa.com",
    "location": "Atlanta, GA & Chicago, IL",
    "niche": "Boutique CPA & Tax",
    "channel": "Email & LinkedIn",
    "hook": "Typo in title tag (1# Tax Services), distorted 385x220 OG image, and unoptimized Elementor bloat.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "label": "Step 1 (Day 1)",
        "subject": "Quick note on Massey & Company CPA's site previews",
        "body": "Hi Gary, love the reputation Massey and Company CPA has built for small business tax resolution across Atlanta and Chicago. While checking your site, I noticed your homepage title tag has an inverted typo ('1# Tax Services') and your social share image is constrained to a low-res thumbnail, causing it to appear blurry on LinkedIn and messaging apps. We design custom, high-converting web systems for boutique CPA firms with automated consultation booking and crisp retina previews. I drafted a sleek concept for your practice. Open to a preview?"
      },
      "2": {
        "label": "Step 2 (Day 3)",
        "subject": "Re: Quick note on Massey & Company CPA's site previews",
        "body": "Hi Gary, following up on the redesign concept I put together for Massey and Company CPA. Business owners dealing with IRS disputes or tax planning need immediate trust when they click your link. Replacing Elementor plugin overhead with a clean Next.js build improves Google page speed scores and ensures your reviews and booking forms load instantly. Let me know if you would like the link!"
      },
      "3": {
        "label": "Step 3 (Day 7)",
        "subject": "Re: Quick note on Massey & Company CPA's site previews",
        "body": "Hi Gary, know quarterly tax filings and IRS representation keep your team running around the clock. Leaving the CPA practice mockup with you in case your firm considers a digital upgrade or booking funnel revamp ahead of the next tax season: https://northsideintelligence.com/services. Wishing Massey and Company a tremendous quarter!"
      }
    }
  },
  {
    "id": "web-6",
    "company": "Neil Fink Associates",
    "vertical": "NI Services · Executive Search & Talent Acquisition",
    "verticalColor": "cyan",
    "contact": "Neil Fink",
    "name": "Neil Fink",
    "email": "neil@neilfinkassociates.com",
    "profileUrl": "https://www.linkedin.com/in/neil-fink-a8138/",
    "website": "https://neilfinkassociates.com",
    "location": "San Francisco, CA",
    "niche": "Executive Search & Talent Acquisition",
    "channel": "Email & LinkedIn",
    "hook": "Executive search firm running on basic Weebly template with stuttering title and unscaled images.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "label": "Step 1 (Day 1)",
        "subject": "Quick note on Neil Fink Associates's web layout",
        "body": "Hi Neil, came across Neil Fink Associates and the impressive C-suite talent placements your firm has executed for tech and media leaders like Electronic Arts and Charles Schwab. I noticed your firm is currently hosted on a legacy Weebly template with unscaled image assets and a repeated title tag header. An executive search practice operating at your caliber deserves a bespoke digital presence that matches the corporate boards you advise. We build custom, ultra-sleek websites for premier boutique search firms. Would you be open to seeing a tailored mockup?"
      },
      "2": {
        "label": "Step 2 (Day 3)",
        "subject": "Re: Quick note on Neil Fink Associates's web layout",
        "body": "Hi Neil, checking back on my note regarding a digital refresh for Neil Fink Associates. Enterprise boards and venture-backed founders look for world-class polish when selecting an executive search partner. Our custom builds eliminate site-builder templates entirely, giving you a lightning-fast, high-end presentation that reflects your decades of leadership placement experience. Happy to share a private preview if you have a moment."
      },
      "3": {
        "label": "Step 3 (Day 7)",
        "subject": "Re: Quick note on Neil Fink Associates's web layout",
        "body": "Hi Neil, know confidential executive searches require nonstop coordination. I will leave the tailored boutique design concept on file in case Neil Fink Associates explores an online presentation upgrade later this year: https://northsideintelligence.com/services. Wishing you continued success placing transformative leadership across tech and media!"
      }
    }
  },
  {
    "id": "web-7",
    "company": "ReInvest Capital, LLC",
    "vertical": "NI Services · Franchise & Lower Middle Market M&A",
    "verticalColor": "cyan",
    "contact": "David Rego",
    "name": "David Rego",
    "email": "drego@reinvestcapital.com",
    "profileUrl": "https://www.linkedin.com/in/david-rego-2101344/",
    "website": "https://reinvestcapital.com",
    "location": "Boston, MA",
    "niche": "Franchise M&A Advisory",
    "channel": "Email & LinkedIn",
    "hook": "Missing meta description entirely, generic title, and heavy Elementor animation jank on mobile.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "label": "Step 1 (Day 1)",
        "subject": "Quick note on ReInvest Capital's web presence",
        "body": "Hi David, hope your week is off to a great start. I was researching lower middle market franchise advisors and reviewed ReInvest Capital's site. I noticed your homepage currently lacks a meta description tag in the code, which leaves your search results to unguided automated snippet generation. Additionally, heavier Elementor animations create slight layout jank on mobile browsers. We engineer custom, institutional-grade web platforms for specialized M&A boutiques to showcase transaction tombstones and buyer advisory credentials cleanly. Open to seeing a quick concept for ReInvest?"
      },
      "2": {
        "label": "Step 2 (Day 3)",
        "subject": "Re: Quick note on ReInvest Capital's web presence",
        "body": "Hi David, following up on the M&A advisory concept I put together for ReInvest Capital. Multi-unit franchise operators looking to sell $5M to $50M networks judge advisory credibility in seconds. Our Next.js architecture delivers clean typography, instant tombstone filtering, and zero WordPress plugin vulnerabilities. Would you be interested in taking a two-minute look at the layout?"
      },
      "3": {
        "label": "Step 3 (Day 7)",
        "subject": "Re: Quick note on ReInvest Capital's web presence",
        "body": "Hi David, know deal flow and transaction closings keep your schedule packed. I will keep the custom franchise M&A concept ready in case ReInvest Capital evaluates an advisory site revamp down the road: https://northsideintelligence.com/services. Best of luck on your active deal mandates!"
      }
    }
  },
  {
    "id": "web-8",
    "company": "Proffitt PR",
    "vertical": "NI Services · Boutique PR & Marketing Strategy",
    "verticalColor": "cyan",
    "contact": "Jessica Proffitt Bracken",
    "name": "Jessica Proffitt Bracken",
    "email": "jessica@proffittpr.com",
    "profileUrl": "https://www.linkedin.com/in/jessica-proffitt-bracken-91b72a15/",
    "website": "https://proffittpr.com",
    "location": "Santa Rosa Beach, FL",
    "niche": "Boutique PR & Marketing",
    "channel": "Email, LinkedIn & Instagram",
    "hook": "Raw HTML size exceeds 1.1MB before media, duplicate title text, and bloated legacy Avada structure.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "label": "Step 1 (Day 1)",
        "subject": "Quick note on Proffitt PR's portfolio load speed",
        "body": "Hi Jessica, love the creative energy and community impact Proffitt PR delivers across the Emerald Coast. While reviewing your site, I noticed the underlying homepage HTML payload is currently over 1.1MB before any images load, due to older Avada theme scripts and legacy mobile assets. For an elite PR and marketing agency, visual portfolio pages should load instantaneously to match your high standard of branding. We build custom, editorial-grade web platforms for premier creative agencies with zero theme bloat. Open to seeing a concept?"
      },
      "2": {
        "label": "Step 2 (Day 3)",
        "subject": "Re: Quick note on Proffitt PR's portfolio load speed",
        "body": "Hi Jessica, checking back on my note regarding Proffitt PR's portfolio presentation. When luxury hospitality and lifestyle brands vet PR representation, an ultra-fast, modern editorial layout immediately proves your agency is ahead of the curve. Our custom builds deliver sub-second performance on mobile while making your case studies shine. Let me know if you would like me to send over the concept preview!"
      },
      "3": {
        "label": "Step 3 (Day 7)",
        "subject": "Re: Quick note on Proffitt PR's portfolio load speed",
        "body": "Hi Jessica, know event productions and media campaigns keep your agency moving at full speed. Leaving the editorial portfolio layout here with you in case Proffitt PR looks to modernize its web infrastructure down the road: https://northsideintelligence.com/services. Wishing your team high engagement and a wonderful month ahead!"
      }
    }
  },
  {
    "id": "web-9",
    "company": "Westgate Capital Consultants",
    "vertical": "NI Services · Fiduciary Wealth & Retirement Management",
    "verticalColor": "cyan",
    "contact": "Ian W. Hartley",
    "name": "Ian W. Hartley",
    "email": "Ian@westgatecapital.com",
    "profileUrl": "https://www.linkedin.com/in/ian-hartley-a496884/",
    "website": "https://westgatecapital.com",
    "location": "University Place, WA",
    "niche": "Fiduciary Wealth Management",
    "channel": "Email & LinkedIn",
    "hook": "Branding mismatch in schema vs title/domain, cookie-cutter FMG Suite template with 2012 IE code.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "label": "Step 1 (Day 1)",
        "subject": "Quick observation on Westgate Capital's site branding",
        "body": "Hi Ian, hope you are having a productive week. While analyzing fiduciary wealth management firms in the Pacific Northwest, I noticed an inconsistency in Westgate Capital's structured data: your schema code identifies the firm as 'HUB Retirement & Wealth Management' while your site title and domain reflect Westgate Capital. Additionally, the template still carries legacy code from 2012. We build custom, compliant web platforms for fiduciary wealth managers that reinforce distinctive firm brand identity and drive qualified plan inquiries. Would you be open to reviewing a fresh mockup?"
      },
      "2": {
        "label": "Step 2 (Day 3)",
        "subject": "Re: Quick observation on Westgate Capital's site branding",
        "body": "Hi Ian, following up on my note regarding Westgate Capital's digital positioning. Fiduciary retirement committees and high-net-worth clients expect an authoritative, customized digital experience that sets your advisory team apart from syndicated templates. Our custom Next.js builds ensure crisp brand consistency and streamlined meeting booking. Happy to send over the layout preview if you'd like to inspect it."
      },
      "3": {
        "label": "Step 3 (Day 7)",
        "subject": "Re: Quick observation on Westgate Capital's site branding",
        "body": "Hi Ian, know plan participant reviews and quarterly fiduciary meetings keep your calendar full. Leaving the tailored wealth advisory mockup with you in case Westgate Capital looks to upgrade its digital presentation or client acquisition flows in the future: https://northsideintelligence.com/services. Wishing you and your team continued success!"
      }
    }
  },
  {
    "id": "web-10",
    "company": "Arch11 Inc.",
    "vertical": "NI Services · High-End Architectural Design Practice",
    "verticalColor": "cyan",
    "contact": "E.J. Meade",
    "name": "E.J. Meade",
    "email": "EJMeade@arch11.com",
    "profileUrl": "https://www.linkedin.com/in/e-j-meade-a616238/",
    "website": "https://arch11.com",
    "location": "Denver & Boulder, CO",
    "niche": "High-End Architectural Design",
    "channel": "Email, LinkedIn & Instagram",
    "hook": "Script tag erroneously nested in style block in head, and schema leaks staging webflow.io URL.",
    "status": "ready",
    "currentStep": 1,
    "steps": {
      "1": {
        "label": "Step 1 (Day 1)",
        "subject": "Quick technical note on Arch11's site code",
        "body": "Hi E.J., admiring Arch11's contextual, modern residential and commercial architecture across Colorado. While reviewing your site code, I spotted two technical glitches: your CallRail script tag is currently placed inside a <style> block in the <head> markup, and your organization schema URL leaks your temporary staging domain ('arch11-finishing.webflow.io') to search engine indexing. An elite architectural practice designing spaces down to millimeter tolerances deserves clean, flawless digital architecture. We design custom, high-speed Next.js portfolio platforms tailored for award-winning architects. Open to seeing a prototype?"
      },
      "2": {
        "label": "Step 2 (Day 3)",
        "subject": "Re: Quick technical note on Arch11's site code",
        "body": "Hi E.J., checking back on my note regarding Arch11's site code and digital portfolio. Luxury residential and commercial clients expect breathtaking visual fidelity and instant gallery browsing when evaluating architectural partners. Our custom builds eliminate Webflow staging leaks, resolve code syntax issues, and make your photography load with zero jank. Would you like to see the prototype concept?"
      },
      "3": {
        "label": "Step 3 (Day 7)",
        "subject": "Re: Quick technical note on Arch11's site code",
        "body": "Hi E.J., know active project builds and client consultations keep your studio focused. I will keep the custom architectural showcase concept on file in case Arch11 evaluates a digital platform upgrade or code clean-up down the road: https://northsideintelligence.com/services. Wishing Arch11 continued acclaim on your stunning projects!"
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
