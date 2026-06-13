import { useNavigate } from "react-router-dom";
import { theme } from "../config";
import { heroData } from "../config/hero";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-25">
      {heroData.bgImage && (
        <div className="absolute inset-0">
          <img src={heroData.bgImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md min-w-full min-h-full" />
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-20 pb-24">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${theme.textPrimary} leading-tight tracking-tight`}>
          {heroData.title}
        </h1>
        <p className={`mt-4 text-base md:text-lg ${theme.textSecondary} max-w-xl mx-auto leading-relaxed`}>
          {heroData.subtitle}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate(heroData.primaryBtnLink)} className={theme.primaryButton}>
            {heroData.primaryBtn}
          </button>
          <button onClick={() => navigate(heroData.secondaryBtnLink)} className={theme.secondaryButton}>
            {heroData.secondaryBtn}
          </button>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {heroData.stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <Icon className={theme.iconAccent} size={20} />
                <div className="text-left">
                  <p className={`text-xl font-semibold ${theme.textPrimary}`}>{s.title}</p>
                  <p className={`text-xs ${theme.textMuted} uppercase tracking-wide`}>{s.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
