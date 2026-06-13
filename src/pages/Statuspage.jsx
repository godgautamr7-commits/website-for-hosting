import { useState, useEffect } from "react";
import { FaServer, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaClock, FaSync } from "react-icons/fa";
import { theme } from "../config";
import { statusServices } from "../config/status";

const statusConfig = {
  operational: { icon: FaCheckCircle, color: "text-emerald-400", label: "Operational" },
  degraded: { icon: FaExclamationTriangle, color: "text-amber-400", label: "Degraded" },
  down: { icon: FaTimesCircle, color: "text-rose-400", label: "Down" },
  checking: { icon: FaClock, color: "text-zinc-500", label: "Checking..." },
};

const check = async (url) => {
  const t0 = performance.now();
  try {
    if (url.startsWith("http")) {
      const c = new AbortController();
      const tid = setTimeout(() => c.abort(), 5000);
      await fetch(url, { method: "HEAD", mode: "no-cors", signal: c.signal });
      clearTimeout(tid);
    }
    return { status: "operational", ms: Math.round(performance.now() - t0) };
  } catch (e) {
    return { status: e.name === "AbortError" ? "degraded" : "down", ms: null };
  }
};

export default function Statuspage() {
  const [services, setServices] = useState(statusServices.map((s) => ({ ...s, status: "checking", ms: null })));
  const [updated, setUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    const results = await Promise.all(services.map(async (s) => ({ ...s, ...(await check(s.url)) })));
    setServices(results);
    setUpdated(new Date());
    setRefreshing(false);
  };

  useEffect(() => { refresh(); const id = setInterval(refresh, 60000); return () => clearInterval(id); }, []);

  const up = services.filter((s) => s.status === "operational").length;
  const slow = services.filter((s) => s.status === "degraded").length;
  const down = services.filter((s) => s.status === "down").length;
  const overall = down > 0 ? "down" : slow > 0 ? "degraded" : "operational";

  return (
    <main className={`min-h-screen ${theme.bgSurface} ${theme.textPrimary}`}>
      <div className="px-4 md:px-20 pt-24 pb-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Status</h1>
            <p className={`text-sm ${theme.textSecondary}`}>Service availability</p>
          </div>
          <button onClick={refresh} disabled={refreshing} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${theme.bgCard} border ${theme.borderDefault} text-sm transition-colors`}>
            <FaSync className={refreshing ? "animate-spin" : ""} size={12} />Refresh
          </button>
        </div>
      </div>

      <div className="px-4 md:px-20 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className={`p-3 rounded-lg border ${overall === "operational" ? "bg-emerald-500/5 border-emerald-500/20" : overall === "degraded" ? "bg-amber-500/5 border-amber-500/20" : "bg-rose-500/5 border-rose-500/20"} flex items-center gap-2`}>
            <div className={`w-2 h-2 rounded-full ${overall === "operational" ? "bg-emerald-400" : overall === "degraded" ? "bg-amber-400" : "bg-rose-400"}`} />
            <span className="text-sm font-medium">{overall === "operational" ? "All Systems Operational" : overall === "degraded" ? "Degraded Performance" : "System Incident"}</span>
            {updated && <span className={`text-xs ${theme.textMuted} ml-auto`}>{updated.toLocaleTimeString()}</span>}
          </div>
        </div>
      </div>

      <div className="px-4 md:px-20 pb-10">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-2">
          {services.map((s, i) => {
            const cfg = statusConfig[s.status];
            const Icon = cfg.icon;
            return (
              <div key={i} className={`p-3 rounded-lg ${theme.bgCard} border ${theme.borderDefault} flex items-center justify-between`}>
                <div className="flex items-center gap-2.5">
                  <FaServer className={theme.iconAccent} size={12} />
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className={`text-[10px] ${theme.textMuted}`}>{s.region}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${cfg.color}`}>
                  <Icon size={12} /><span className="text-xs font-medium">{cfg.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 md:px-20 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-2">
          <div className={`p-3 rounded-lg ${theme.bgCard} border ${theme.borderDefault} text-center`}>
            <p className="text-lg font-bold text-emerald-400">{up}</p><p className={`text-[10px] ${theme.textMuted}`}>Up</p>
          </div>
          <div className={`p-3 rounded-lg ${theme.bgCard} border ${theme.borderDefault} text-center`}>
            <p className="text-lg font-bold text-amber-400">{slow}</p><p className={`text-[10px] ${theme.textMuted}`}>Slow</p>
          </div>
          <div className={`p-3 rounded-lg ${theme.bgCard} border ${theme.borderDefault} text-center`}>
            <p className="text-lg font-bold text-rose-400">{down}</p><p className={`text-[10px] ${theme.textMuted}`}>Down</p>
          </div>
        </div>
      </div>
    </main>
  );
}
