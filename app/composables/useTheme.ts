export function useTheme() {
  const isDark = useState("theme-dark", () => false);

  function init() {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const dark = stored ? stored === "dark" : prefersDark;

    apply(dark);
  }

  function apply(dark: boolean) {
    isDark.value = dark;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  function toggle() {
    document.documentElement.classList.add("theme-transition");
    apply(!isDark.value);
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 300);
  }

  return { isDark, init, toggle };
}
