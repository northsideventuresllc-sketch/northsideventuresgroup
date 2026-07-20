import { CONTACT_EMAIL } from "@/data/ventures";

export function ContactButton() {
  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "Hello from the Northside Ventures Group site"
  )}`;

  return (
    <a className="cta-contact" href={href}>
      Contact
      <span aria-hidden="true">↗</span>
    </a>
  );
}
