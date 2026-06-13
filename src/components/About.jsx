import { theme } from "../config";
import { aboutData } from "../config/about";

const About = () => (
  <section className={`${theme.bgSurface} py-20 px-4 md:px-20`}>
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      <div className="flex-1 max-w-xl">
        <p className={`text-xs font-medium uppercase tracking-widest ${theme.textAccent} mb-2`}>{aboutData.label}</p>
        <h2 className={`text-2xl md:text-4xl font-bold ${theme.textPrimary} leading-tight`}>{aboutData.heading}</h2>
        <p className={`mt-5 text-sm ${theme.textSecondary} leading-relaxed`}>{aboutData.paragraph1}</p>
        <p className={`mt-3 text-sm ${theme.textSecondary} leading-relaxed`}>{aboutData.paragraph2}</p>
      </div>
      <div className="flex-1 w-full max-w-md">
        <img src={aboutData.image} alt={aboutData.heading} className={`w-full rounded-xl border ${theme.borderDefault}`} />
      </div>
    </div>
  </section>
);

export default About;
