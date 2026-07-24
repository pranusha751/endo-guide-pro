import { useState, useEffect } from "react";

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check display-mode
      const isStandalone = 
        window.matchMedia("(display-mode: standalone)").matches || 
        (window.navigator as any).standalone || 
        document.referrer.includes("android-app://");
      
      setIsInstalled(isStandalone);

      if (window.deferredPrompt) {
        setInstallPrompt(window.deferredPrompt);
      }

      const handlePrompt = (e: Event) => {
        setInstallPrompt((e as CustomEvent).detail || window.deferredPrompt);
      };

      const handleInstalled = () => {
        setIsInstalled(true);
        setInstallPrompt(null);
      };

      window.addEventListener("pwa-installprompt", handlePrompt);
      window.addEventListener("pwa-installed", handleInstalled);

      return () => {
        window.removeEventListener("pwa-installprompt", handlePrompt);
        window.removeEventListener("pwa-installed", handleInstalled);
      };
    }
  }, []);

  const install = async () => {
    const promptEvent = installPrompt || window.deferredPrompt;
    if (!promptEvent) return false;

    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    
    window.deferredPrompt = null;
    setInstallPrompt(null);

    return outcome === "accepted";
  };

  return {
    isInstallable: !!installPrompt || (typeof window !== "undefined" && !!window.deferredPrompt),
    isInstalled,
    install,
  };
}
