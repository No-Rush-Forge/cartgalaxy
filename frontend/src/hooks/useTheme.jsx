
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "ownsite-theme";
const ACCENT_STORAGE_KEY = "ownsite-accent";

const ThemeContext = createContext(null);

// Accent color palettes.
// Values are RGB channels so Tailwind can also apply opacity.
const ACCENT_PALETTES = {
  Blue: {
    50: "239 246 255",
    100: "219 234 254",
    400: "96 165 250",
    500: "59 130 246",
    600: "37 99 235",
    700: "29 78 216",
    main: "#3B82F6",
    hover: "#2563EB",
    soft: "rgba(59, 130, 246, 0.14)",
  },
  Purple: {
    50: "250 245 255",
    100: "243 232 255",
    400: "192 132 252",
    500: "168 85 247",
    600: "147 51 234",
    700: "126 34 206",
    main: "#A855F7",
    hover: "#9333EA",
    soft: "rgba(168, 85, 247, 0.14)",
  },
  Orange: {
    50: "255 247 237",
    100: "255 237 213",
    400: "251 146 60",
    500: "249 115 22",
    600: "234 88 12",
    700: "194 65 12",
    main: "#F97316",
    hover: "#EA580C",
    soft: "rgba(249, 115, 22, 0.14)",
  },
  Green: {
    50: "240 253 244",
    100: "220 252 231",
    400: "74 222 128",
    500: "34 197 94",
    600: "22 163 74",
    700: "21 128 61",
    main: "#22C55E",
    hover: "#16A34A",
    soft: "rgba(34, 197, 94, 0.14)",
  },
};

function getInitialThemeMode() {
  if (typeof window === "undefined") return "system";

  const stored = localStorage.getItem(STORAGE_KEY);

  return ["light", "dark", "system"].includes(stored)
    ? stored
    : "system";
}

function getInitialAccentColor() {
  if (typeof window === "undefined") return "Blue";

  const stored = localStorage.getItem(ACCENT_STORAGE_KEY);

  return ACCENT_PALETTES[stored] ? stored : "Blue";
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(getInitialThemeMode);

  const [accentColor, setAccentColor] = useState(
    getInitialAccentColor
  );

  const [systemTheme, setSystemTheme] = useState(() => {
    if (typeof window === "undefined") return "light";

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Listen for changes in the device's system theme.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (event) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const theme = themeMode === "system" ? systemTheme : themeMode;

  // Apply the selected Light/Dark theme.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    localStorage.setItem(STORAGE_KEY, themeMode);
  }, [theme, themeMode]);

  // Apply the selected accent color throughout the application.
  useEffect(() => {
    const palette = ACCENT_PALETTES[accentColor];

    if (!palette) return;

    const root = document.documentElement;

    root.style.setProperty("--accent-50", palette[50]);
    root.style.setProperty("--accent-100", palette[100]);
    root.style.setProperty("--accent-400", palette[400]);
    root.style.setProperty("--accent-500", palette[500]);
    root.style.setProperty("--accent-600", palette[600]);
    root.style.setProperty("--accent-700", palette[700]);

    root.style.setProperty("--accent", palette.main);
    root.style.setProperty("--accent-hover", palette.hover);
    root.style.setProperty("--accent-soft", palette.soft);

    localStorage.setItem(ACCENT_STORAGE_KEY, accentColor);
  }, [accentColor]);

  const toggleTheme = () => {
    setThemeMode(theme === "dark" ? "light" : "dark");
  };

  const value = {
    theme,
    themeMode,
    setThemeMode,
    toggleTheme,
    accentColor,
    setAccentColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
