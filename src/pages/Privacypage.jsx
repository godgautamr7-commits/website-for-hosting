import { theme } from "../config";
import { branding } from "../config/branding";

const sections = [
  { title: "Information We Collect", body: "We collect personal information (name, email, phone, Discord), payment details (UTR/transaction IDs), server usage data, and technical data (IP addresses)." },
  { title: "How We Use Your Information", body: "We use your information to provide hosting services, process transactions, communicate updates, improve our services, and prevent fraud." },
  { title: "Data Security", body: "We implement industry-standard security measures, encrypt payment information, conduct regular audits, and restrict access to authorized personnel." },
];

const Privacypage = () => (
  <main className={`min-h-screen ${theme.bgSurface} ${theme.textPrimary}`}>
    <div className="px-4 md:px-20 pt-24 pb-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Privacy Policy</h1>
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

export default Privacypage;
