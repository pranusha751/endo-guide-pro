import { registerSW } from "virtual:pwa-register";

declare global {
  interface Window {
    deferredPrompt: any;
  }
}

export function initPWA() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    registerSW({ immediate: true });

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      window.deferredPrompt = e;
      // Notify application of installability
      window.dispatchEvent(new CustomEvent("pwa-installprompt", { detail: e }));
    });

    window.addEventListener("appinstalled", () => {
      window.deferredPrompt = null;
      window.dispatchEvent(new CustomEvent("pwa-installed"));
    });
  }
}

