import { theme } from "../config";
import { whyusData, whyusFeatures } from "../config/whyus";

const Whyus = () => (
  <section className={`${theme.bgBase} py-20 px-4 md:px-20`}>
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className={`text-2xl md:text-3xl font-bold ${theme.textPrimary}`}>{whyusData.heading}</h2>
        <p className={`mt-2 text-sm ${theme.textSecondary}`}>{whyusData.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[380px]">
          <img src={whyusData.image} alt="server" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <p className={`text-xs ${theme.textMuted} tracking-wider mb-1`}>SERVER NODE</p>
            <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>Ultra Performance Engine</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {whyusFeatures.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`flex gap-3 p-4 rounded-xl ${theme.bgCard} border ${theme.borderDefault} ${theme.bgCardHover} ${theme.borderHover} transition-colors`}>
                <Icon className={`${item.color} text-xl flex-shrink-0 mt-0.5`} />
                <div>
                  <h4 className={`text-sm font-medium ${theme.textPrimary}`}>{item.title}</h4>
                  <p className={`text-xs ${theme.textSecondary} mt-0.5 leading-relaxed`}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Whyus;
