import { useState } from "react";
import { FaTicketAlt, FaQuestionCircle, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { theme } from "../config";
import { branding } from "../config/branding";
import { supportWebhook } from "../config/webhooks";
import { supportChannels, faqData } from "../config/support";
import toast from "react-hot-toast";

const Supportpage = () => {
  const [tab, setTab] = useState("ticket");
  const [form, setForm] = useState({ name: "", email: "", subject: "", category: "general", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) { toast.error("Fill all required fields"); return; }
    setLoading(true);
    try {
      const url = supportWebhook || import.meta.env.VITE_DISCORD_SUPPORT_WEBHOOK;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "New Support Ticket",
          embeds: [{
            title: form.subject,
            color: 3447003,
            fields: [
              { name: "Name", value: form.name, inline: true },
              { name: "Email", value: form.email, inline: true },
              { name: "Category", value: form.category.toUpperCase(), inline: true },
              { name: "Message", value: form.message.slice(0, 1024) },
            ],
            footer: { text: `${branding.name} Support` },
            timestamp: new Date().toISOString(),
          }],
        }),
      });
      setDone(true);
      toast.success("Ticket submitted!");
      setForm({ name: "", email: "", subject: "", category: "general", message: "" });
    } catch { toast.error("Failed to submit."); }
    setLoading(false);
  };

  const getLink = (ch) => ch.linkKey ? (branding[ch.linkKey] || "#") : (ch.link || "#");

  const inputCls = `w-full px-3 py-2 rounded-lg ${theme.bgInput} border ${theme.borderDefault} ${theme.textPrimary} text-sm outline-none ${theme.borderFocus}`;

  return (
    <main className={`min-h-screen ${theme.bgSurface} ${theme.textPrimary}`}>
      <div className="px-4 md:px-20 pt-24 pb-10 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Support</h1>
        <p className={`text-sm ${theme.textSecondary}`}>Get help from our team</p>
      </div>

      <div className="px-4 md:px-20 pb-10">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-3">
          {supportChannels.map((ch, i) => {
            const Icon = ch.icon;
            const inner = (
              <>
                <div className={`w-9 h-9 rounded-lg ${theme.iconAccentBg} flex items-center justify-center mb-2`}><Icon className={theme.iconAccent} size={14} /></div>
                <h3 className="text-sm font-medium">{ch.title}</h3>
                <p className={`text-xs ${theme.textSecondary} mt-0.5`}>{ch.description}</p>
              </>
            );
            if (ch.isTicketTab) {
              return <button key={i} onClick={() => setTab("ticket")} className={`p-4 rounded-xl ${theme.bgCard} border ${theme.borderDefault} ${theme.borderHover} text-left transition-colors`}>{inner}</button>;
            }
            return <a key={i} href={getLink(ch)} target={getLink(ch).startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`p-4 rounded-xl ${theme.bgCard} border ${theme.borderDefault} ${theme.borderHover} text-left transition-colors`}>{inner}</a>;
          })}
        </div>
      </div>

      <div className="px-4 md:px-20 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-1.5 mb-5">
            <button onClick={() => setTab("ticket")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${tab === "ticket" ? "bg-emerald-600 text-white" : `${theme.bgCard} border ${theme.borderDefault} ${theme.textSecondary}`}`}><FaTicketAlt size={11} />Ticket</button>
            <button onClick={() => setTab("faq")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${tab === "faq" ? "bg-emerald-600 text-white" : `${theme.bgCard} border ${theme.borderDefault} ${theme.textSecondary}`}`}><FaQuestionCircle size={11} />FAQ</button>
          </div>

          {tab === "ticket" && (
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                {done ? (
                  <div className={`p-8 rounded-xl ${theme.bgCard} border ${theme.borderDefault} text-center`}>
                    <FaCheckCircle className="text-3xl text-emerald-400 mx-auto mb-3" />
                    <h3 className="font-bold mb-1">Ticket Submitted!</h3>
                    <p className={`text-sm ${theme.textSecondary} mb-4`}>We will respond within 24 hours.</p>
                    <button onClick={() => setDone(false)} className={`px-4 py-1.5 rounded-lg border ${theme.borderDefault} ${theme.textSecondary} text-sm hover:text-white transition-colors`}>Submit Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={`p-5 rounded-xl ${theme.bgCard} border ${theme.borderDefault} space-y-3`}>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div><label className={`block text-xs ${theme.textMuted} mb-1`}>Name *</label><input type="text" name="name" value={form.name} onChange={handleChange} className={inputCls} /></div>
                      <div><label className={`block text-xs ${theme.textMuted} mb-1`}>Email *</label><input type="email" name="email" value={form.email} onChange={handleChange} className={inputCls} /></div>
                    </div>
                    <div><label className={`block text-xs ${theme.textMuted} mb-1`}>Subject *</label><input type="text" name="subject" value={form.subject} onChange={handleChange} className={inputCls} /></div>
                    <div><label className={`block text-xs ${theme.textMuted} mb-1`}>Message *</label><textarea name="message" value={form.message} onChange={handleChange} rows={4} className={`${inputCls} resize-none`} /></div>
                    <button type="submit" disabled={loading} className={`w-full ${theme.primaryButton} text-sm disabled:opacity-50`}>{loading ? "Sending..." : <><FaPaperPlane className="inline mr-1.5" size={11} />Submit</>}</button>
                  </form>
                )}
              </div>
              <div className={`p-4 rounded-xl ${theme.bgCard} border ${theme.borderDefault} h-fit`}>
                <h4 className={`text-xs font-semibold uppercase tracking-wider ${theme.textMuted} mb-3`}>Response Times</h4>
                <ul className={`space-y-1.5 text-sm ${theme.textSecondary}`}>
                  <li className="flex justify-between">Discord <span className="text-emerald-400">~5m</span></li>
                  <li className="flex justify-between">Ticket <span className="text-amber-400">~24h</span></li>
                  <li className="flex justify-between">Email <span className="text-amber-400">~48h</span></li>
                </ul>
              </div>
            </div>
          )}

          {tab === "faq" && (
            <div className="space-y-2">
              {faqData.map((f, i) => (
                <div key={i} className={`p-4 rounded-xl ${theme.bgCard} border ${theme.borderDefault}`}>
                  <h3 className="text-sm font-medium mb-1">{f.question}</h3>
                  <p className={`text-xs ${theme.textSecondary}`}>{f.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Supportpage;
