import { theme } from "../config";
import { testimonialsData, testimonialsHeading } from "../config/testimonials";

const Testimonials = () => (
  <section className={`${theme.bgBase} py-20 px-4 md:px-20`}>
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className={`text-2xl md:text-3xl font-bold ${theme.textPrimary}`}>{testimonialsHeading.title}</h2>
        <p className={`mt-2 text-sm ${theme.textSecondary}`}>{testimonialsHeading.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonialsData.map((item, i) => (
          <div key={i} className={`p-5 rounded-xl ${theme.bgCard} border ${theme.borderDefault}`}>
            <div className="flex items-center gap-3 mb-3">
              <img src={item.image} alt={item.name} className="w-9 h-9 rounded-full border border-zinc-700" />
              <div>
                <h4 className={`text-sm font-medium ${theme.textPrimary}`}>{item.name}</h4>
                <p className={`text-xs ${theme.textMuted}`}>{item.role}</p>
              </div>
            </div>
            <p className={`text-sm ${theme.textSecondary} leading-relaxed`}>&ldquo;{item.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
