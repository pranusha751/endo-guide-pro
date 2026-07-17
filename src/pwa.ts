import { registerSW } from "virtual:pwa-register";

export function initPWA() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    registerSW({ immediate: true });
  }
}
