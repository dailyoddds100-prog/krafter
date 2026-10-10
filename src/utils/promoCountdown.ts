import { useState, useEffect } from "react";

// Local storage key for promo target end time
const PROMO_STORAGE_KEY = "krafters_ember_rush_promo_end";
const PROMO_SIMULATION_OVERRIDE_KEY = "krafters_promo_simulation_override";

// 14 Days in Milliseconds (Strictly 2 weeks)
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

export interface PromoState {
  promoTitle: string;
  promoDurationBadge: string;
  isPromoActive: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSecondsRemaining: number;
  formattedCountdown: string;
  promoEndDate: Date;
  promoEndDateFormatted: string;
  priceFormatted: string;
  originalPriceFormatted: string;
  priceNumber: number;
  originalPriceNumber: number;
  depositFormatted: string;
  depositNumber: number;
  discountPercent: number;
  simulationMode: "auto" | "active" | "expired";
  setSimulationMode: (mode: "auto" | "active" | "expired") => void;
  resetPromoTimer: () => void;
}

/**
 * Initializes and retrieves the 2-week promo deadline timestamp
 */
function getOrCreatePromoDeadline(): number {
  if (typeof window === "undefined") return Date.now() + TWO_WEEKS_MS;

  try {
    const stored = localStorage.getItem(PROMO_STORAGE_KEY);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed > Date.now()) {
        return parsed;
      }
    }
  } catch (e) {
    // Ignore storage read errors
  }

  // Create new 14-day deadline from now
  const newDeadline = Date.now() + TWO_WEEKS_MS;
  try {
    localStorage.setItem(PROMO_STORAGE_KEY, newDeadline.toString());
  } catch (e) {
    // Ignore storage write errors
  }
  return newDeadline;
}

export function usePromoCountdown(): PromoState {
  const [deadline, setDeadline] = useState<number>(() => getOrCreatePromoDeadline());
  const [simulationMode, setSimulationModeState] = useState<"auto" | "active" | "expired">(() => {
    if (typeof window === "undefined") return "auto";
    try {
      const mode = localStorage.getItem(PROMO_SIMULATION_OVERRIDE_KEY);
      if (mode === "active" || mode === "expired") return mode;
    } catch (e) {
      // Ignore
    }
    return "auto";
  });

  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    const diff = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
    return diff;
  });

  // Ticking effect every second
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((deadline - now) / 1000));
      setTimeRemaining(diff);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const setSimulationMode = (mode: "auto" | "active" | "expired") => {
    setSimulationModeState(mode);
    try {
      localStorage.setItem(PROMO_SIMULATION_OVERRIDE_KEY, mode);
    } catch (e) {
      // Ignore
    }
  };

  const resetPromoTimer = () => {
    const newDeadline = Date.now() + TWO_WEEKS_MS;
    setDeadline(newDeadline);
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, newDeadline.toString());
      localStorage.removeItem(PROMO_SIMULATION_OVERRIDE_KEY);
    } catch (e) {
      // Ignore
    }
    setSimulationModeState("auto");
  };

  // Determine active state
  let isPromoActive = timeRemaining > 0;
  if (simulationMode === "active") isPromoActive = true;
  if (simulationMode === "expired") isPromoActive = false;

  const days = Math.floor(timeRemaining / (3600 * 24));
  const hours = Math.floor((timeRemaining % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining % 60);

  const formattedCountdown = `${days}d ${hours.toString().padStart(2, "0")}h ${minutes
    .toString()
    .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;

  const endDate = new Date(deadline);
  const promoEndDateFormatted = endDate.toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Pricing values
  const priceNumber = isPromoActive ? 75000 : 150000;
  const originalPriceNumber = 150000;
  const priceFormatted = isPromoActive ? "₦75,000" : "₦150,000";
  const originalPriceFormatted = "₦150,000";
  const depositNumber = isPromoActive ? 37500 : 75000;
  const depositFormatted = isPromoActive ? "₦37,500" : "₦75,000";
  const discountPercent = isPromoActive ? 50 : 0;

  return {
    promoTitle: "The Ember Rush 75k Promo",
    promoDurationBadge: "Strictly 2 Weeks Only",
    isPromoActive,
    days,
    hours,
    minutes,
    seconds,
    totalSecondsRemaining: timeRemaining,
    formattedCountdown,
    promoEndDate: endDate,
    promoEndDateFormatted,
    priceFormatted,
    originalPriceFormatted,
    priceNumber,
    originalPriceNumber,
    depositFormatted,
    depositNumber,
    discountPercent,
    simulationMode,
    setSimulationMode,
    resetPromoTimer,
  };
}
