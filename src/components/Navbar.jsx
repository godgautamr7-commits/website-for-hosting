import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { theme } from "../config";
import { branding } from "../config/branding";
import { navLinks, navbarCTA } from "../config/navbar";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const isActive = (p) => location.pathname === p;

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 px-4 md:px-20 py-3 flex justify-between items-center transition-colors duration-200 ${scrolled ? `${theme.navbarBg} ${theme.navbarBlur} ${theme.borderDefault}` : "bg-transparent"}`}>
        <Link to="/" className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg ${theme.logoBg} flex items-center justify-center`}>
            <span className="text-white font-bold text-sm">{branding.logoInitial}</span>
          </div>
          <span className={`text-lg font-semibold ${theme.textPrimary} hidden sm:block`}>{branding.name}</span>
        </Link>

        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map((l) => {
            const Icon = l.icon;
            return (
              <li key={l.to}>
                <Link to={l.to} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${isActive(l.to) ? `${theme.textPrimary} bg-zinc-800` : `${theme.textSecondary} hover:text-zinc-200`}`}>
                  <Icon className="text-[11px]" />{l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link to="/products"><button className={`${theme.primaryButton} hidden md:inline-flex text-sm`}>{navbarCTA}</button></Link>
          <button className={`md:hidden w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center ${theme.textSecondary}`} onClick={() => setOpen(true)}><FaBars size={14} /></button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden ${open ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setOpen(false)} />

      <div className={`fixed top-0 right-0 h-full w-[75%] max-w-xs z-50 ${theme.bgSurface} border-l ${theme.borderDefault} transition-transform duration-200 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg ${theme.logoBg} flex items-center justify-center`}><span className="text-white font-bold text-sm">{branding.logoInitial}</span></div>
              <span className={`font-semibold ${theme.textPrimary}`}>{branding.name}</span>
            </div>
            <button className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400" onClick={() => setOpen(false)}><FaTimes size={14} /></button>
          </div>

          <ul className="flex flex-col gap-0.5 flex-1">
            {navLinks.map((l) => {
              const Icon = l.icon;
              return (
                <li key={l.to}>
                  <Link to={l.to} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive(l.to) ? `${theme.textPrimary} bg-emerald-600/10` : `${theme.textSecondary} hover:text-zinc-200`}`}>
                    <Icon size={12} /><span>{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={`pt-4 border-t ${theme.borderDefault}`}>
            <Link to="/products"><button className={`w-full ${theme.primaryButton} text-sm py-2.5`}>{navbarCTA}</button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
