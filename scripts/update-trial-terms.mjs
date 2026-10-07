import fs from "fs";

const filePath = "/Users/jonnybooth/Desktop/Desktop/Northside Ventures/Northside Intelligence/Agentic OS Hub/02_Repos/northsideventuresgroup/src/data/ni-outreach-data.ts";

let content = fs.readFileSync(filePath, "utf8");

// Replace 14-day references with 7-day single-use trial code
content = content.replace(/14-Day Free Pilot/g, "7-Day Trial via Single-Use Code");
content = content.replace(/14-Day Trial Pass/g, "7-Day Trial via Single-Use Code");
content = content.replace(/14-day free pilot/gi, "7-day trial via your unique access code");
content = content.replace(/14-day trial/gi, "7-day trial via your unique access code");

// Clean any remaining outcome package text in dpmoAlignment
content = content.replace(/outcome package/gi, "paid subscription");

fs.writeFileSync(filePath, content, "utf8");
console.log("Updated trial terms in ni-outreach-data.ts successfully!");
