import { FaDiscord, FaGlobe, FaGithub, FaHeart, FaServer, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";
import { theme } from "../config";
import { branding } from "../config/branding";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Status", to: "/status" },
  { label: "Support", to: "/support" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service" },
  { label: "Links", to: "/links" },
];

const socials = [
  { icon: FaDiscord, url: branding.discordLink, label: "Discord" },
  { icon: FaGithub, url: branding.githubLink || "#", label: "GitHub" },
];

const Footer = () => (
  <footer className={`${theme.bgBase} ${theme.textPrimary} border-t ${theme.borderDefault}`}>
    <div className="max-w-5xl mx-auto px-4 md:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-7 h-7 rounded-md ${theme.logoBg} flex items-center justify-center`}>
              <span className="text-white font-bold text-xs">{branding.logoInitial}</span>
            </div>
            <span className="font-semibold">{branding.name}</span>
          </div>
          <p className={`text-xs ${theme.textSecondary} leading-relaxed mb-4`}>{branding.tagline}</p>
          <div className="flex gap-2">
            {socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className={`w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center ${theme.textSecondary} hover:text-white transition-colors`}>
                <s.icon size={13} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className={`text-xs font-semibold uppercase tracking-wider ${theme.textMuted} mb-3`}>Quick Links</h4>
          <ul className={`space-y-2 ${theme.textSecondary} text-sm`}>
            {quickLinks.map((l, i) => <li key={i}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h4 className={`text-xs font-semibold uppercase tracking-wider ${theme.textMuted} mb-3`}>Legal</h4>
          <ul className={`space-y-2 ${theme.textSecondary} text-sm`}>
            {legalLinks.map((l, i) => <li key={i}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h4 className={`text-xs font-semibold uppercase tracking-wider ${theme.textMuted} mb-3`}>Contact</h4>
          <ul className={`space-y-2 ${theme.textSecondary} text-sm`}>
            <li className="flex items-center gap-2"><FaDiscord className={theme.iconAccent} size={12} /><a href={branding.discordLink} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Discord</a></li>
            <li className="flex items-center gap-2"><FaGlobe className="text-sky-400" size={12} /><a href={branding.panelLink} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Panel</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div className={`border-t ${theme.borderDefault}`}>
      <div className="max-w-5xl mx-auto px-4 md:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className={`text-xs ${theme.textMuted}`}>&copy; {new Date().getFullYear()} {branding.name}</p>
        <p className={`text-xs ${theme.textMuted} flex items-center gap-1`}>Made with <FaHeart className="text-rose-500" size={10} /> by <a href={branding.madeByLink} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{branding.madeByText}</a></p>
      </div>
    </div>
  </footer>
);

export default Footer;
