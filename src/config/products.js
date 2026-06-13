import { FaTools, FaServer, FaCrown, FaCube } from "react-icons/fa";

export const productData = [
  {
    name: "Paid Work",
    category: "paidWork",
    icon: FaTools,
    description: "Server setup, panel install, branding & optimization.",
    plans: [
      { title: "Basic Setup", price: 199, billing: "one-time", features: ["VPS Setup (Ubuntu/Debian)", "Pterodactyl Panel Install", "Basic Security Setup"] },
      { title: "Wings Setup", price: 299, billing: "one-time", features: ["Wings Installation", "Node Connection Fix", "Port & Firewall Setup", "Auto Start Enable"] },
      { title: "Full Hosting Setup", price: 499, billing: "one-time", features: ["Panel + Wings Setup", "Database Setup", "SSL Setup", "Cloudflare Integration"] },
    ],
  },
  {
    name: "VPS Hosting",
    category: "vpsPlan",
    icon: FaServer,
    description: "Stable VPS hosting with root access.",
    plans: [
      { title: "Starter VPS", ram: "4GB", cpu: "2 vCPU", storage: "40GB SSD", bandwidth: "2TB", price: 230 },
      { title: "Basic VPS", ram: "6GB", cpu: "3 vCPU", storage: "60GB SSD", bandwidth: "3TB", price: 380 },
      { title: "Standard VPS", ram: "8GB", cpu: "4 vCPU", storage: "80GB SSD", bandwidth: "4TB", price: 240 },
    ],
  },
  {
    name: "Minecraft Premium",
    category: "mcPremium",
    icon: FaCrown,
    description: "Premium high-performance Minecraft hosting.",
    plans: [
      { title: "Knight Core", ram: "16GB", cpu: "500%", storage: "120GB SSD", price: 349 },
      { title: "Dragon Core", ram: "20GB", cpu: "600%", storage: "150GB SSD", price: 499 },
      { title: "Mythic Core", ram: "24GB", cpu: "700%", storage: "200GB SSD", price: 649 },
    ],
  },
  {
    name: "Minecraft Budget",
    category: "mcBudget",
    icon: FaCube,
    description: "Affordable hosting for small servers.",
    plans: [
      { title: "Starter Core", ram: "4GB", cpu: "150%", storage: "20GB SSD", price: 89 },
      { title: "Builder Core", ram: "6GB", cpu: "200%", storage: "30GB SSD", price: 139 },
      { title: "Survival Core", ram: "8GB", cpu: "300%", storage: "50GB SSD", price: 199 },
      { title: "Titan Core", ram: "10GB", cpu: "350%", storage: "70GB SSD", price: 269 },
    ],
  },
];

export const productCategories = [
  { name: "VPS", value: "vpsPlan" },
  { name: "Premium", value: "mcPremium" },
  { name: "Budget", value: "mcBudget" },
  { name: "Services", value: "paidWork" },
];
