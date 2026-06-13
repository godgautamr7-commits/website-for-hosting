import { useState } from "react";
import toast from "react-hot-toast";
import { theme } from "../config";
import { branding } from "../config/branding";
import { contactWebhook } from "../config/webhooks";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = contactWebhook || import.meta.env.VITE_DISCORD_CONTACT_WEBHOOK;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "New Contact Message",
          color: 65280,
          fields: [
            { name: "Name", value: form.name, inline: true },
            { name: "Email", value: form.email, inline: true },
            { name: "Message", value: form.message },
          ],
          footer: { text: `${branding.name} Contact` },
        }],
      }),
    });
    setLoading(false);
    toast.success("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className={`${theme.bgSurface} py-20 px-4`}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h2 className={`text-2xl md:text-3xl font-bold ${theme.textPrimary}`}>Get in Touch</h2>
          <p className={`mt-2 text-sm ${theme.textSecondary}`}>Have a question? Send us a message.</p>
        </div>

        <form onSubmit={handleSubmit} className={`p-6 rounded-xl ${theme.bgCard} border ${theme.borderDefault} space-y-3`}>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required className={`w-full p-2.5 rounded-lg ${theme.bgInput} border ${theme.borderDefault} ${theme.textPrimary} text-sm outline-none ${theme.borderFocus}`} />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className={`w-full p-2.5 rounded-lg ${theme.bgInput} border ${theme.borderDefault} ${theme.textPrimary} text-sm outline-none ${theme.borderFocus}`} />
          <textarea name="message" placeholder="Message..." value={form.message} onChange={handleChange} required rows="4" className={`w-full p-2.5 rounded-lg ${theme.bgInput} border ${theme.borderDefault} ${theme.textPrimary} text-sm outline-none ${theme.borderFocus} resize-none`} />
          <button type="submit" disabled={loading} className={`w-full ${theme.primaryButton} disabled:opacity-50 text-sm`}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
