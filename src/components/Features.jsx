import { theme } from "../config";
import { featuresData, featuresHeading } from "../config/features";

const Features = () => (
  <section className={`${theme.bgBase} py-20 px-4 md:px-20`}>
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className={`text-2xl md:text-3xl font-bold ${theme.textPrimary}`}>{featuresHeading.title}</h2>
        <p className={`mt-2 text-sm ${theme.textSecondary}`}>{featuresHeading.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuresData.map((item, i) => (
          <div key={i} className={`p-5 rounded-xl ${theme.bgCard} border ${theme.borderDefault} ${theme.bgCardHover} ${theme.borderHover} transition-colors`}>
            <div className={`w-10 h-10 mb-4 flex items-center justify-center rounded-lg ${theme.iconAccentBg}`}>
              <img src={item.icon} alt={item.title} className="w-6 h-6 object-contain" />
            </div>
            <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-1`}>{item.title}</h3>
            <p className={`text-xs ${theme.textSecondary} leading-relaxed`}>{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
