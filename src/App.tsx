/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { PromoProvider, usePromo } from "./context/PromoContext";
import { TopPromoBanner } from "./components/common/TopPromoBanner";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { OfferSection } from "./components/sections/OfferSection";
import { WhyChooseUs } from "./components/sections/WhyChooseUs";
import { Portfolio } from "./components/sections/Portfolio";
import { Process } from "./components/sections/Process";
import { ProjectForm } from "./components/form/ProjectForm";
import { FAQ } from "./components/sections/FAQ";
import { FinalCTA } from "./components/sections/FinalCTA";
import { Footer } from "./components/layout/Footer";
import { SITE_CONFIG, buildEmberRushFastWhatsAppLink } from "./data/siteConfig";
import { trackEvent, trackWhatsAppClick } from "./utils/analytics";
import { Sparkles, MessageCircle, ArrowUp, FileText, CheckCircle2 } from "lucide-react";

function MainContent() {
  const { isPromoActive, priceFormatted } = usePromo();
  const [showScrollToForm, setShowScrollToForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const formEl = document.getElementById("project-form");
      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        // Show floating jump button if the user scrolled past the form container
        setShowScrollToForm(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById("project-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col antialiased">
      {/* 0. Top Promo Notification Banner */}
      <TopPromoBanner />

      {/* 1. Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Direct-to-Form Centerpiece for Meta Ads Traffic */}
        <section id="project-form" className="pt-2 pb-16 sm:pb-24 bg-neutral-100/60 border-b border-neutral-200/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>STEP-BY-STEP PROJECT INTAKE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 leading-tight">
                Start Your Website Project
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Provide your basic business and website details below so we can start designing your <strong>{priceFormatted}</strong> website without unnecessary delays.
              </p>
            </div>

            {/* Fast-Track WhatsApp Alternative Card for Busy/Lazy Users */}
            <div className="max-w-3xl mx-auto mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-teal-500/10 border border-emerald-300/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 sm:mt-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-neutral-900">
                      Prefer to skip the form?
                    </h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Instant WhatsApp Option
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    If you don't have time to fill out the steps right now, just chat directly with us on WhatsApp and send your business details in 60 seconds!
                  </p>
                </div>
              </div>

              <a
                href={buildEmberRushFastWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("form_header_fast_track", { promo: "The Ember Rush 75k Promo" })}
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-emerald-600/25 transition-all shrink-0 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Info on WhatsApp</span>
              </a>
            </div>

            {/* Multi-step Onboarding Container */}
            <ProjectForm />
          </div>
        </section>

        {/* 4. What's Included / Offer Breakdown */}
        <OfferSection />

        {/* 5. Portfolio / Websites We've Built */}
        <Portfolio />

        {/* 6. Why Choose Us */}
        <WhyChooseUs />

        {/* 7. How It Works */}
        <Process />

        {/* 8. FAQ Section */}
        <FAQ />

        {/* 9. Final CTA */}
        <FinalCTA />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Persistent Quick Action Buttons (Bottom Left / Bottom Right) */}
      {showScrollToForm && (
        <button
          type="button"
          onClick={scrollToForm}
          className="fixed bottom-6 left-6 z-40 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 animate-fadeIn cursor-pointer border border-blue-400"
          title="Return to Intake Form"
        >
          <FileText className="w-4 h-4" />
          <span>Complete Intake Form ({priceFormatted})</span>
        </button>
      )}

      {/* Floating Quick WhatsApp Floating Widget */}
      <a
        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
          `Hi Krafters! I would like to inquire about the ${priceFormatted} professional website package.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("whatsapp_click", {
            source: "floating_widget",
            price_displayed: priceFormatted,
          })
        }
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        title="Chat with Krafters on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold group-hover:ml-2">
          Chat With Krafters
        </span>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <PromoProvider>
      <MainContent />
    </PromoProvider>
  );
}
