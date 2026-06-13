import { FaDiscord, FaEnvelope, FaTicketAlt } from "react-icons/fa";

export const supportChannels = [
  { icon: FaDiscord, title: "Discord", description: "Instant help from community", action: "Join", linkKey: "https://discord.gg/apvpDMq8c2" },
  { icon: FaTicketAlt, title: "Ticket", description: "Submit a ticket for issues", action: "Create", isTicketTab: true },
  { icon: FaEnvelope, title: "Email", description: "For billing inquiries", action: "Send", link: "mailto:support@haneknodes.com" },
];

export const faqData = [
  { question: "How do I access my server panel?", answer: "After purchase, you'll receive panel login credentials via email." },
  { question: "What payment methods do you accept?", answer: "We accept UPI payments. Scan the QR code or use the UPI ID after ordering." },
  { question: "What if my server crashes?", answer: "Contact support via Discord or submit a ticket. We monitor servers 24/7." },
];
