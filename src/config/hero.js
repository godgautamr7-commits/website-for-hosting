import { FaServer, FaBolt, FaGlobe } from "react-icons/fa";

export const heroData = {
  title: "Build Your Minecraft World Without Limits",
  subtitle:
    "High-performance hosting designed for creators and communities. Instant setup, uncompromised performance.",
  bgImage:
    "https://i.pinimg.com/1200x/19/89/60/19896054fc77172c4417fe413c51c97d.jpg",
  primaryBtn: "Deploy Now",
  primaryBtnLink: "/products",
  secondaryBtn: "Explore Plans",
  secondaryBtnLink: "/products",
  stats: [
    { title: "99.9%", subtitle: "Uptime", icon: FaServer },
    { title: "<30s", subtitle: "Setup", icon: FaBolt },
    { title: "12+", subtitle: "Nodes", icon: FaGlobe },
  ],
};
