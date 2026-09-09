/** Moves focus to the main landmark, used by the skip link. */
export function focusMain() {
  const main = document.getElementById("main-content");
  if (!main) return;
  main.setAttribute("tabindex", "-1");
  main.focus();
  main.scrollIntoView({ behavior: "auto", block: "start" });
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
