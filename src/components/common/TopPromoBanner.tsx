import React from "react";
import { usePromo } from "../../context/PromoContext";
import { buildEmberRushFastWhatsAppLink } from "../../data/siteConfig";
import { trackWhatsAppClick } from "../../utils/analytics";
import { Flame, Clock, ArrowRight, MessageCircle } from "lucide-react";

export const TopPromoBanner: React.FC = () => {
  const { isPromoActive, priceFormatted, originalPriceFormatted } = usePromo();

  const scrollToForm = () => {
    const el = document.getElementById("project-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleWhatsAppFastTrack = () => {
    trackWhatsAppClick("top_promo_banner", { promo: "The Ember Rush 75k Promo" });
  };

  return (
    <div className="bg-gradient-to-r from-neutral-950 via-blue-950 to-neutral-950 text-white border-b border-blue-900/40 py-2 px-3 sm:px-6 relative z-50 text-xs shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
        {/* Left message with active indicator */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
          {isPromoActive ? (
            <>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-extrabold text-amber-300 uppercase tracking-wide text-[11px] sm:text-xs flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline" />
                The Ember Rush 75k Promo:
              </span>
              <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase border border-amber-500/30">
                2 Weeks Only • 15 Slots
              </span>
              <span className="text-neutral-200 hidden md:inline">
                Get your custom website, 1-yr domain & hosting for <strong className="text-white">{priceFormatted}</strong> (Reg: <span className="line-through text-neutral-400">{originalPriceFormatted}</span>)
              </span>
              <span className="text-neutral-200 md:hidden">
                <strong className="text-white">{priceFormatted}</strong> (<span className="line-through text-neutral-400">{originalPriceFormatted}</span>)
              </span>
            </>
          ) : (
            <>
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-semibold text-neutral-300">
                Standard Package: <strong className="text-white">₦150,000 Total</strong> (5–7 Day Turnaround)
              </span>
            </>
          )}
        </div>

        {/* Right Actions: WhatsApp Fast-Track + Form Jump */}
        <div className="flex items-center space-x-3 text-xs shrink-0">
          <a
            href={buildEmberRushFastWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppFastTrack}
            className="inline-flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-bold text-[11px] sm:text-xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp Fast-Track</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <span className="text-neutral-700">|</span>

          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-bold hover:underline cursor-pointer text-[11px] sm:text-xs"
          >
            <span>{isPromoActive ? "Claim ₦75k Offer" : "Start Project"}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
