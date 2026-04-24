// This file exists only so Tailwind's source scanner picks up dynamically
// constructed class names like `bg-${color}` used in the app.
// Do not import — it is scanned at build time only.

export const SAFELIST = [
  "bg-mint", "bg-peach", "bg-warning", "bg-destructive",
  "text-mint-foreground", "text-peach-foreground", "text-warning-foreground", "text-destructive-foreground",
  "bg-mint/30", "bg-mint/40", "bg-peach/40", "bg-warning/30", "bg-warning/40",
  "border-mint", "border-peach", "border-warning",
  "text-mint-foreground/70", "text-mint-foreground/80", "text-mint-foreground/90",
  "text-peach-foreground/70", "text-peach-foreground/80", "text-peach-foreground/90",
  "text-warning-foreground/90",
];
