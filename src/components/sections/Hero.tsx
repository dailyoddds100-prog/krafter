import React from "react";
import { usePromo } from "../../context/PromoContext";
import { SITE_CONFIG, buildEmberRushFastWhatsAppLink } from "../../data/siteConfig";
import { trackWhatsAppClick } from "../../utils/analytics";
import { CheckCircle, Clock, Smartphone, ArrowDown, Flame, MessageCircle, Sparkles, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  const { isPromoActive, priceFormatted, originalPriceFormatted } = usePromo();

  const scrollToForm = () => {
    const el = document.getElementById("project-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleWhatsAppFastTrack = () => {
    trackWhatsAppClick("hero_fast_track", { promo: "The Ember Rush 75k Promo" });
  };

  return (
    <section id="hero" className="relative pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden">
      {/* Background Subtle Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 -z-10" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-amber-100/50 via-blue-50/50 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main Headline with Dynamic Strikethrough & Promo Tag */}
          {isPromoActive && (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300/80 text-amber-900 text-xs font-bold shadow-xs mb-4 animate-fadeIn">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
              <span className="tracking-wide uppercase">THE EMBER RUSH 75K PROMO • STRICTLY 2 WEEKS ONLY</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.15]">
            Get a Professional Website for{" "}
            <span className="text-blue-600 relative inline-block whitespace-nowrap">
              {priceFormatted}
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-blue-300 -z-10"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
            {isPromoActive && (
              <span className="block sm:inline sm:ml-3 text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-400 line-through">
                {originalPriceFormatted}
              </span>
            )}
          </h1>

          {/* Subheading focused on Meta Ads & Nigerian SMEs */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Don't enter December losing clients in Instagram DMs. We design, build, and launch a custom, high-converting website with free domain & hosting — delivered in <strong>5–7 days</strong>.
          </p>

          {/* Value Proposition Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-neutral-800">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Domain Included (1 Year)</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Fast Cloud Hosting (1 Year)</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Ready in 5–7 Days</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <Smartphone className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Mobile & WhatsApp Ready</span>
            </div>
          </div>

          {/* Dual Action: Fill Form or WhatsApp Direct (For lazy users) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto">
            <button
              type="button"
              onClick={scrollToForm}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md hover:shadow-blue-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start Project Intake Below</span>
              <ArrowDown className="w-4 h-4 ml-2 animate-bounce" />
            </button>

            <a
              href={buildEmberRushFastWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppFastTrack}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md hover:shadow-emerald-600/25 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>Send Info on WhatsApp</span>
            </a>
          </div>

          <p className="mt-3 text-[11px] text-neutral-400">
            *{SITE_CONFIG.deliveryDisclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

