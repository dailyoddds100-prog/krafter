/**
 * Google Analytics (GA4 / gtag.js) integration module
 * Enhanced for Meta Ads traffic & krafter.com.ng attribution
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Google Analytics 4 Measurement ID
export const GA_MEASUREMENT_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GA_MEASUREMENT_ID) ||
  "G-3MD794P3YK";

export const DOMAIN_NAME = "krafter.com.ng";

/**
 * Capture URL UTM parameters & Meta Ads Click IDs (fbclid)
 */
export function getStoredUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
    const currentUtms: Record<string, string> = {};

    utmKeys.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        currentUtms[key] = val;
        sessionStorage.setItem(`analytics_${key}`, val);
      } else {
        const stored = sessionStorage.getItem(`analytics_${key}`);
        if (stored) currentUtms[key] = stored;
      }
    });

    return currentUtms;
  } catch (e) {
    return {};
  }
}

/**
 * Initialize Google Analytics script in the browser
 */
export function initGoogleAnalytics(measurementId: string = GA_MEASUREMENT_ID): void {
  if (typeof window === "undefined" || !measurementId) return;

  // Set up dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function (...args: any[]) {
      window.dataLayer?.push(arguments);
    };
  }

  const utms = getStoredUtmParams();

  // If script not loaded yet, inject it
  if (!document.getElementById("google-analytics-script")) {
    const script = document.createElement("script");
    script.id = "google-analytics-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: true,
    page_location: window.location.href,
    page_title: document.title,
    transport_type: "beacon",
    cookie_domain: "auto",
    ...utms,
  });

  // Track initial promotion view for Meta Ads
  trackEvent("view_promotion", {
    promotion_id: "EMBER_RUSH_75K",
    promotion_name: "The Ember Rush 75k Promo",
    domain: DOMAIN_NAME,
    duration: "2_weeks",
    price: 75000,
    currency: "NGN",
    ...utms,
  });
}

/**
 * Track custom user events in Google Analytics
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, any> = {}
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    const utms = getStoredUtmParams();
    window.gtag("event", eventName, {
      domain: DOMAIN_NAME,
      ...utms,
      ...eventParams,
    });
  }
}

/**
 * Track WhatsApp leads (specifically for Meta Ads and fast-track clicks)
 */
export function trackWhatsAppClick(
  source: string = "floating_button",
  details: Record<string, any> = {}
): void {
  trackEvent("whatsapp_click", {
    click_source: source,
    event_category: "Lead",
    event_label: "WhatsApp Chat",
    promotion_name: "The Ember Rush 75k Promo",
    ...details,
  });

  // Also record standard GA4 generate_lead event
  trackEvent("generate_lead", {
    lead_type: "whatsapp",
    value: 75000,
    currency: "NGN",
    source,
    ...details,
  });
}

/**
 * Track custom page view
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      domain: DOMAIN_NAME,
      ...getStoredUtmParams(),
    });
  }
}
