import { FaArrowRight } from "react-icons/fa";
import { theme } from "../config";
import { branding } from "../config/branding";
import { linksData } from "../config/links";

const Linkspage = () => {
  const getUrl = (item) => item.linkKey ? (branding[item.linkKey] || "#") : (item.link || "#");

  return (
    <main className={`min-h-screen ${theme.bgSurface} ${theme.textPrimary}`}>
      <div className="px-4 md:px-20 pt-24 pb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Links</h1>
        <p className={`text-sm ${theme.textSecondary}`}>Quick access to our platforms</p>
      </div>

      <div className="px-4 md:px-20 pb-20">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {linksData.map((item, i) => {
            const Icon = item.icon;
            const url = getUrl(item);
            const isExternal = url.startsWith("http") && !url.includes(window?.location?.hostname || "___");
            return (
              <a key={i} href={url} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className={`group p-4 rounded-xl ${theme.bgCard} border ${theme.borderDefault} ${theme.borderHover} ${theme.bgCardHover} flex items-center justify-between transition-colors`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${theme.iconAccentBg} flex items-center justify-center`}><Icon className={theme.iconAccent} size={14} /></div>
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                <FaArrowRight className={`${theme.textMuted} group-hover:text-white text-xs transition-colors`} />
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Linkspage;
