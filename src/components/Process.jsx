import { theme } from "../config";
import { processData, processSteps } from "../config/process";

const Process = () => (
  <section className={`${theme.bgSurface} py-20 px-4 md:px-20`}>
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className={`text-2xl md:text-3xl font-bold ${theme.textPrimary}`}>{processData.heading}</h2>
        <p className={`mt-2 text-sm ${theme.textSecondary}`}>{processData.subtitle}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
        {processSteps.map((item, i) => (
          <div key={i} className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
            <div className={`w-full md:w-56 p-6 rounded-xl ${theme.bgCard} border ${theme.borderDefault} text-center`}>
              <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${theme.iconAccentBg} ${theme.textAccent} text-xs font-bold mb-3`}>
                {i + 1}
              </div>
              <img src={item.icon} alt={item.name} className="w-12 mx-auto mb-3" />
              <h3 className={`text-sm font-semibold ${theme.textPrimary}`}>{item.name}</h3>
              <p className={`text-xs ${theme.textSecondary} mt-1`}>{item.text}</p>
            </div>
            {i < processSteps.length - 1 && (
              <span className={`hidden md:block ${theme.textMuted} text-lg`}>&rarr;</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
