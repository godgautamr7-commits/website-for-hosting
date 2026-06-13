import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBolt, FaMemory, FaMicrochip, FaHdd, FaNetworkWired, FaCheck, FaArrowRight } from "react-icons/fa";
import { theme } from "../config";
import { branding } from "../config/branding";

const ProductCard = ({ item, plan }) => {
  const navigate = useNavigate();
  const Icon = item.icon;

  const handleBuy = () => {
    navigate("/billing", { state: { name: plan.title, category: item.name, price: plan.price, billing: plan.billing } });
  };

  const billingText = plan.billing === "one-time" ? "" : plan.billing === "yearly" ? "/year" : "/mo";

  const badgeMap = {
    mcPremium: { text: "PREMIUM", cls: theme.badgePremium },
    mcBudget: { text: "BUDGET", cls: theme.badgeBudget },
    vpsPlan: { text: "VPS", cls: theme.badgeVps },
    paidWork: { text: "SERVICE", cls: theme.badgeService },
  };
  const badge = badgeMap[item.category] || { text: "HOSTING", cls: theme.badgeDefault };

  return (
    <div className={`group h-full flex flex-col p-5 rounded-xl ${theme.bgCard} border ${theme.borderDefault} ${theme.borderHover} ${theme.bgCardHover} transition-colors`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`px-2 py-0.5 text-[10px] font-semibold tracking-wider rounded ${badge.cls}`}>{badge.text}</span>
        {plan.billing !== "one-time" && (
          <span className={`text-[10px] ${theme.textMuted} flex items-center gap-1`}><FaBolt className="text-amber-400" size={9} />Instant</span>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${theme.iconAccentBg}`}>
          {Icon && <Icon className={theme.iconAccent} size={16} />}
        </div>
        <div>
          <p className={`text-[10px] ${theme.textMuted} uppercase tracking-wider`}>{item.name}</p>
          <h3 className={`text-sm font-semibold ${theme.textPrimary}`}>{plan.title}</h3>
        </div>
      </div>

      <div className="flex-1 mb-4">
        {(plan.ram || plan.cpu || plan.storage || plan.bandwidth) && (
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {plan.ram && <div className={`flex items-center gap-1.5 text-xs p-1.5 rounded ${theme.bgInput} ${theme.textSecondary}`}><FaMemory className={theme.iconAccent} size={10} />{plan.ram}</div>}
            {plan.cpu && <div className={`flex items-center gap-1.5 text-xs p-1.5 rounded ${theme.bgInput} ${theme.textSecondary}`}><FaMicrochip className="text-sky-400" size={10} />{plan.cpu}</div>}
            {plan.storage && <div className={`flex items-center gap-1.5 text-xs p-1.5 rounded ${theme.bgInput} ${theme.textSecondary}`}><FaHdd className="text-amber-400" size={10} />{plan.storage}</div>}
            {plan.bandwidth && <div className={`flex items-center gap-1.5 text-xs p-1.5 rounded ${theme.bgInput} ${theme.textSecondary}`}><FaNetworkWired className="text-violet-400" size={10} />{plan.bandwidth}</div>}
          </div>
        )}

        {plan.features && (
          <div className={`pt-3 border-t ${theme.borderDefault} space-y-1.5`}>
            {plan.features.slice(0, 3).map((f, i) => (
              <div key={i} className={`flex items-start gap-1.5 text-xs ${theme.textSecondary}`}>
                <FaCheck className="text-emerald-500 mt-0.5 flex-shrink-0" size={9} />{f}
              </div>
            ))}
            {plan.features.length > 3 && <p className={`text-[10px] ${theme.textAccent} pl-3.5`}>+{plan.features.length - 3} more</p>}
          </div>
        )}
      </div>

      <div className={`pt-3 border-t ${theme.borderDefault}`}>
        <div className="flex items-baseline gap-0.5 mb-3">
          <span className={`${theme.textMuted} text-sm`}>{branding.currencySymbol}</span>
          <span className={`text-2xl font-bold ${theme.textPrimary}`}>{plan.price}</span>
          <span className={`${theme.textMuted} text-xs`}>{billingText}</span>
        </div>
        <button onClick={handleBuy} className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border ${theme.borderDefault} ${theme.textSecondary} hover:text-white hover:border-zinc-600 text-xs font-medium transition-colors`}>
          <FaShoppingCart size={10} />Order Now <FaArrowRight size={9} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
