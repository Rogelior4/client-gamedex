export interface PlatformStyle {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function getPlatformStyle(platform: string, isDark: boolean): PlatformStyle {
  const normalized = platform.trim().toLowerCase();

  if (normalized.includes("pc") || normalized.includes("steam") || normalized.includes("windows")) {
    return {
      label: "PC",
      color: isDark ? "#38bdf8" : "#0284c7",
      bgColor: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 132, 199, 0.1)",
      borderColor: isDark ? "rgba(56, 189, 248, 0.35)" : "rgba(2, 132, 199, 0.25)",
    };
  }

  if (normalized.includes("playstation") || normalized.includes("ps5") || normalized.includes("ps4") || normalized.includes("ps")) {
    return {
      label: platform.toUpperCase().includes("PS") ? platform.toUpperCase() : "PlayStation",
      color: isDark ? "#818cf8" : "#4f46e5",
      bgColor: isDark ? "rgba(129, 140, 248, 0.15)" : "rgba(79, 70, 229, 0.1)",
      borderColor: isDark ? "rgba(129, 140, 248, 0.35)" : "rgba(79, 70, 229, 0.25)",
    };
  }

  if (normalized.includes("xbox")) {
    return {
      label: "Xbox",
      color: isDark ? "#4ade80" : "#16a34a",
      bgColor: isDark ? "rgba(74, 222, 128, 0.15)" : "rgba(22, 163, 74, 0.1)",
      borderColor: isDark ? "rgba(74, 222, 128, 0.35)" : "rgba(22, 163, 74, 0.25)",
    };
  }

  if (normalized.includes("switch") || normalized.includes("nintendo")) {
    return {
      label: "Switch",
      color: isDark ? "#fb7185" : "#e11d48",
      bgColor: isDark ? "rgba(251, 113, 133, 0.15)" : "rgba(225, 29, 72, 0.1)",
      borderColor: isDark ? "rgba(251, 113, 133, 0.35)" : "rgba(225, 29, 72, 0.25)",
    };
  }

  return {
    label: platform,
    color: isDark ? "#c084fc" : "#9333ea",
    bgColor: isDark ? "rgba(192, 132, 252, 0.15)" : "rgba(147, 51, 234, 0.1)",
    borderColor: isDark ? "rgba(192, 132, 252, 0.35)" : "rgba(147, 51, 234, 0.25)",
  };
}
