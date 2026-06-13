import { theme } from "../config";
import { branding } from "../config/branding";

const sections = [
  { title: "Acceptance of Terms", body: "By using our services, you agree to be bound by these terms. If you disagree, do not access our services." },
  { title: "Service Description", body: `${branding.name} provides Minecraft server hosting and VPS services. We may modify or discontinue services at any time.` },
  { title: "Payment and Refunds", body: "Payments via UPI. Refunds available within 24 hours if service unused. No refunds for actively used services." },
  { title: "Prohibited Activities", body: "Illegal activities, malware, hacking, copyright violations, DDoS attacks, crypto mining without permission." },
];

const Termsofservicepage = () => (
  <main className={`min-h-screen ${theme.bgSurface} ${theme.textPrimary}`}>
    <div className="px-4 md:px-20 pt-24 pb-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Terms of Service</h1>
        <p className={`text-xs ${theme.textMuted}`}>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
      </div>
    </div>
    <div className="px-4 md:px-20 pb-20">
      <div className="max-w-3xl mx-auto space-y-3">
        {sections.map((s, i) => (
          <section key={i} className={`p-5 rounded-xl ${theme.bgCard} border ${theme.borderDefault}`}>
            <h2 className="text-sm font-semibold mb-1.5">{s.title}</h2>
            <p className={`text-xs ${theme.textSecondary} leading-relaxed`}>{s.body}</p>
          </section>
        ))}
        <section className={`p-5 rounded-xl ${theme.bgCard} border ${theme.borderDefault}`}>
          <h2 className="text-sm font-semibold mb-1.5">Contact</h2>
          <p className={`text-xs ${theme.textSecondary} leading-relaxed`}>Questions? Reach us on <a href={branding.discordLink} target="_blank" rel="noreferrer" className={theme.textAccent}>Discord</a> or <a href="/support" className={theme.textAccent}>Support</a>.</p>
        </section>
      </div>
    </div>
  </main>
);

export default Termsofservicepage;
