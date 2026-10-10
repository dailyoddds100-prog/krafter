import React from "react";
import { usePromo } from "../../context/PromoContext";
import { SITE_CONFIG, buildEmberRushFastWhatsAppLink } from "../../data/siteConfig";
import { trackWhatsAppClick } from "../../utils/analytics";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Sparkles, Flame, MessageCircle } from "lucide-react";

export const FinalCTA: React.FC = () => {
  const { isPromoActive, priceFormatted, originalPriceFormatted, formattedCountdown } = usePromo();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Glow lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-teal-500/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-bold mb-6">
          {isPromoActive ? (
            <>
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-amber-300">50% DISCOUNT CLOSING SOON</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>START YOUR WEBSITE TODAY</span>
            </>
          )}
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-3xl mx-auto">
          Ready to Take Your Business Online?
        </h2>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Get a professional website, domain and hosting for{" "}
          <strong className="text-white underline decoration-blue-500 decoration-4 underline-offset-4">
            {priceFormatted}
          </strong>
          {isPromoActive && (
            <span className="ml-2 text-neutral-400 line-through text-lg">
              {originalPriceFormatted}
            </span>
          )}
          .
        </p>

        {isPromoActive && (
          <p className="mt-3 text-xs sm:text-sm text-amber-300 font-bold flex items-center justify-center gap-1.5">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
            <span>The Ember Rush 75k Promo is strictly valid for 2 weeks only (first 15 clients).</span>
          </p>
        )}

        {/* Badges bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-neutral-300 font-medium">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>1 Year Domain Name Included</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>1 Year Web Hosting Included</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>5–7 Day Delivery</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <button
            type="button"
            onClick={() => scrollTo("project-form")}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base font-bold shadow-xl shadow-blue-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{isPromoActive ? "Claim ₦75k Offer" : "Start My Website"}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

          <a
            href={buildEmberRushFastWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("final_cta", { promo: "The Ember Rush 75k Promo" })}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm sm:text-base font-bold shadow-xl shadow-emerald-600/25 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>Send Info on WhatsApp</span>
          </a>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          *{SITE_CONFIG.deliveryDisclaimer}
        </p>
      </div>
    </section>
  );
};

