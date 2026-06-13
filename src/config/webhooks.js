export const contactWebhook =
  import.meta.env.VITE_DISCORD_CONTACT_WEBHOOK ||
  import.meta.env.VITE_DISCORD_FORM_WEBHOOK;

export const supportWebhook =
  import.meta.env.VITE_DISCORD_SUPPORT_WEBHOOK ||
  import.meta.env.VITE_DISCORD_WEBHOOK_URL;

export const billingWebhook =
  import.meta.env.VITE_DISCORD_BILLING_WEBHOOK ||
  import.meta.env.VITE_DISCORD_WEBHOOK_URL;
