import { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { theme } from "../config";
import { productData, productCategories } from "../config/products";
import ProductCard from "../components/ProductCard";

export default function Productpage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const allPlans = useMemo(
    () => productData.flatMap((item) => item.plans.map((plan) => ({ item, plan }))),
    []
  );

  const filtered = allPlans.filter(({ item, plan }) => {
    const matchCat = category === "all" || item.category === category;
    const matchQ = (item.name + " " + plan.title).toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <main className={`min-h-screen ${theme.bgSurface} ${theme.textPrimary}`}>
      <div className="px-4 md:px-20 pt-24 pb-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Products</h1>
          <p className={`text-sm ${theme.textSecondary}`}>Choose a plan that fits your needs</p>
        </div>
      </div>

      <div className="px-4 md:px-20 pb-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textMuted}`} size={13} />
            <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className={`w-full pl-8 pr-3 py-2 rounded-lg ${theme.bgInput} border ${theme.borderDefault} ${theme.textPrimary} text-sm outline-none ${theme.borderFocus}`} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {productCategories.map((c) => (
              <button key={c.value} onClick={() => setCategory(c.value)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === c.value ? `bg-emerald-600 text-white` : `${theme.bgCard} border ${theme.borderDefault} ${theme.textSecondary} ${theme.borderHover}`}`}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 md:px-20 pb-20">
        <div className="max-w-5xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filtered.map(({ item, plan }, i) => <ProductCard key={i} item={item} plan={plan} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className={theme.textSecondary}>No products found</p>
              <button onClick={() => { setQuery(""); setCategory("all"); }} className={`mt-2 text-sm ${theme.textAccent}`}>Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
