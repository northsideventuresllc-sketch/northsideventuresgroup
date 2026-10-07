import fs from "fs";

const filePath = "/Users/jonnybooth/Desktop/Desktop/Northside Ventures/Northside Intelligence/Agentic OS Hub/02_Repos/northsideventuresgroup/src/data/ni-outreach-data.ts";

let content = fs.readFileSync(filePath, "utf8");

// 1. Remove deliverablePrototype from INITIAL_ITTOOLS
// We can use a regex to strip deliverablePrototype blocks inside INITIAL_ITTOOLS or rewrite them.
// Let's inspect how INITIAL_ITTOOLS is defined.
const itToolsStart = content.indexOf("export const INITIAL_ITTOOLS: OutreachLeadItem[] = [");
const followUpsStart = content.indexOf("export const INITIAL_FOLLOWUPS: OutreachLeadItem[] = [");

if (itToolsStart !== -1 && followUpsStart !== -1) {
  let itToolsSection = content.slice(itToolsStart, followUpsStart);
  
  // Remove deliverablePrototype blocks from IT tools
  itToolsSection = itToolsSection.replace(/deliverablePrototype:\s*\{[\s\S]*?\},(?=\s*responseLikelihood)/g, "");
  
  content = content.slice(0, itToolsStart) + itToolsSection + content.slice(followUpsStart);
}

// 2. Add serviceTrack to interface OutreachLeadItem
if (!content.includes("serviceTrack?:")) {
  content = content.replace(
    "category?: \"webdesign\" | \"ittools\" | \"archive\" | \"followup\" | string;",
    "category?: \"webdesign\" | \"ittools\" | \"archive\" | \"followup\" | string;\n  serviceTrack?: \"Creation (No Website Found)\" | \"Redesign (Legacy Site)\" | \"Management & Retainer\" | string;"
  );
}

// 3. Mark specific Web Design leads with Creations vs Redesigns vs Management
content = content.replace(
  'id: "web-4",\n    company: "Dowdle Construction Group",',
  'id: "web-4",\n    company: "Dowdle Construction Group",\n    serviceTrack: "Redesign (Legacy Site)",'
);

content = content.replace(
  'id: "web-1",\n    company: "Warner Summers",',
  'id: "web-1",\n    company: "Warner Summers",\n    serviceTrack: "Redesign (Legacy Site)",'
);

content = content.replace(
  'id: "web-6",\n    company: "Neil Fink Associates",',
  'id: "web-6",\n    company: "Neil Fink Associates",\n    serviceTrack: "Creation (No Website Found)",'
);

content = content.replace(
  'id: "web-7",\n    company: "ReInvest Capital",',
  'id: "web-7",\n    company: "ReInvest Capital",\n    serviceTrack: "Management & Retainer",'
);

fs.writeFileSync(filePath, content, "utf8");
console.log("Updated ni-outreach-data.ts successfully!");
