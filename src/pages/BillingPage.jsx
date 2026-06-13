import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle, FaCopy } from "react-icons/fa";
import { theme } from "../config";
import { branding } from "../config/branding";
import toast from "react-hot-toast";

const BillingPage = () => {
  const { state } = useLocation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "", phone: "", discord: "", utr: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!state) {
    return (
      <main className={`min-h-screen ${theme.bgSurface} ${theme.textPrimary} flex items-center justify-center px-4`}>
        <div className="text-center">
          <FaExclamationCircle className="text-5xl text-amber-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">No Product Selected</h1>
          <p className={`text-sm ${theme.textSecondary} mb-5`}>Please select a product first.</p>
          <Link to="/products" className={`inline-flex items-center gap-2 ${theme.primaryButton} text-sm`}><FaArrowLeft size={12} />Browse Products</Link>
        </div>
      </main>
    );
  }

  const { name, category, price, billing } = state;
  const billText = billing === "one-time" ? "" : billing === "yearly" ? "/year" : "/mo";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const copyUPI = () => {
    navigator.clipboard.writeText("merchant@upi");
    setCopied(true);
    toast.success("UPI ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!form.email || !form.phone || !form.discord || !form.utr) {
      toast.error("Fill all required fields");
      return;
    }
    const last = localStorage.getItem("last_submit_time");
    if (last && Date.now() - last < 60000) { toast.error("Wait 1 minute before resubmitting"); return; }
    localStorage.setItem("last_submit_time", Date.now());

    setLoading(true);
    try {
      await fetch(import.meta.env.VITE_DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "New Order!",
          embeds: [{
            title: "Purchase Confirmation",
            color: 5814783,
            fields: [
              { name: "Product", value: name, inline: true },
              { name: "Category", value: category, inline: true },
              { name: "Price", value: `${branding.currencySymbol}${price}`, inline: true },
              { name: "Billing", value: billing === "one-time" ? "One Time" : billing === "yearly" ? "Yearly" : "Monthly", inline: true },
              { name: "Email", value: form.email },
              { name: "Phone", value: form.phone },
              { name: "Discord", value: form.discord },
              { name: "UTR", value: form.utr },
              { name: "Note", value: form.note || "None" },
            ],
            footer: { text: `${branding.name} Orders` },
            timestamp: new Date().toISOString(),
          }],
        }),
      });
      setStep(3);
      toast.success("Order submitted!");
    } catch { toast.error("Failed to submit."); }
    setLoading(false);
  };

  const inputCls = `w-full px-3 py-2 rounded-lg ${theme.bgInput} border ${theme.borderDefault} ${theme.textPrimary} text-sm outline-none ${theme.borderFocus}`;

  return (
    <main className={`min-h-screen ${theme.bgSurface} ${theme.textPrimary}`}>
      <div className="px-4 md:px-20 pt-24 pb-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/products" className={`inline-flex items-center gap-1.5 ${theme.textSecondary} hover:text-white text-xs mb-3 transition-colors`}><FaArrowLeft size={10} />Store</Link>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="px-4 md:px-20 pb-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2">
          {["Details", "Payment", "Done"].map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center ${step > i + 1 ? "bg-emerald-600 text-white" : step === i + 1 ? "bg-emerald-600 text-white" : "bg-zinc-800 text-zinc-500"}`}>{step > i + 1 ? "\u2713" : i + 1}</span>
              <span className={`text-xs ${step >= i + 1 ? "text-zinc-200" : "text-zinc-600"}`}>{s}</span>
              {i < 2 && <span className="text-zinc-700 mx-0.5">/</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-20 pb-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <div className={`p-4 rounded-xl ${theme.bgCard} border ${theme.borderDefault} sticky top-20`}>
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${theme.textMuted} mb-3`}>Order</h3>
              <div className="space-y-1.5 text-sm">
                <div className={`flex justify-between ${theme.textSecondary}`}><span>Product</span><span className={theme.textPrimary}>{name}</span></div>
                <div className={`flex justify-between ${theme.textSecondary}`}><span>Type</span><span className={theme.textPrimary}>{category}</span></div>
                <div className={`pt-2 mt-2 border-t ${theme.borderDefault} flex justify-between items-center`}>
                  <span className={theme.textSecondary}>Total</span>
                  <span className="text-xl font-bold">{branding.currencySymbol}{price}<span className={`text-xs ${theme.textMuted} font-normal`}>{billText}</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {step === 1 && (
              <div className={`p-5 rounded-xl ${theme.bgCard} border ${theme.borderDefault}`}>
                <h2 className="text-sm font-semibold mb-4">Your Details</h2>
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div><label className={`block text-xs ${theme.textMuted} mb-1`}>Email *</label><input type="email" name="email" value={form.email} onChange={handleChange} className={inputCls} /></div>
                    <div><label className={`block text-xs ${theme.textMuted} mb-1`}>Phone *</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls} /></div>
                  </div>
                  <div><label className={`block text-xs ${theme.textMuted} mb-1`}>Discord *</label><input type="text" name="discord" value={form.discord} onChange={handleChange} className={inputCls} /></div>
                  <button onClick={() => setStep(2)} className={`w-full ${theme.primaryButton} text-sm`}>Continue to Payment</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={`p-5 rounded-xl ${theme.bgCard} border ${theme.borderDefault}`}>
                <h2 className="text-sm font-semibold mb-4">Payment</h2>
                <div className={`p-3 rounded-lg ${theme.bgInput} border ${theme.borderDefault} mb-4`}>
                  <p className={`text-xs ${theme.textMuted} mb-2`}>Pay via UPI</p>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center"><span className="text-black text-[10px]">QR Code</span></div>
                    <div>
                      <p className={`text-[10px] ${theme.textMuted}`}>UPI ID</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <code className={`text-xs ${theme.bgCard} px-2 py-1 rounded border ${theme.borderDefault}`}>merchant@upi</code>
                        <button onClick={copyUPI} className={`text-xs ${theme.textAccent}`}>{copied ? "Copied" : "Copy"}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div><label className={`block text-xs ${theme.textMuted} mb-1`}>UTR / Transaction ID *</label><input type="text" name="utr" value={form.utr} onChange={handleChange} className={inputCls} /></div>
                  <div><label className={`block text-xs ${theme.textMuted} mb-1`}>Note</label><input type="text" name="note" value={form.note} onChange={handleChange} className={inputCls} /></div>
                  <div className="flex gap-2">
                    <button onClick={() => setStep(1)} className={`flex-1 py-2 rounded-lg border ${theme.borderDefault} ${theme.textSecondary} text-sm hover:text-white transition-colors`}>Back</button>
                    <button onClick={handleSubmit} disabled={loading} className={`flex-1 ${theme.primaryButton} text-sm disabled:opacity-50`}>{loading ? "Processing..." : "Complete Order"}</button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={`p-8 rounded-xl ${theme.bgCard} border ${theme.borderDefault} text-center`}>
                <FaCheckCircle className="text-3xl text-emerald-400 mx-auto mb-3" />
                <h2 className="text-lg font-bold mb-1">Order Confirmed!</h2>
                <p className={`text-sm ${theme.textSecondary} mb-5`}>We will contact you shortly.</p>
                <Link to="/products" className={`inline-block px-4 py-2 rounded-lg border ${theme.borderDefault} ${theme.textSecondary} text-sm hover:text-white transition-colors`}>Back to Store</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BillingPage;
