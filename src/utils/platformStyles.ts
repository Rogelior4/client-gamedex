export interface PlatformStyle {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  gradient?: string;
}

export function getPlatformStyle(platform: string, isDark: boolean): PlatformStyle {
  const normalized = (platform || '').trim().toLowerCase();

  // Steam
  if (normalized.includes("steam") && !normalized.includes("deck")) {
    return {
      label: "Steam",
      color: isDark ? "#93c5fd" : "#2563eb",
      bgColor: isDark ? "rgba(147, 197, 253, 0.08)" : "rgba(37, 99, 235, 0.06)",
      borderColor: isDark ? "rgba(147, 197, 253, 0.18)" : "rgba(37, 99, 235, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // Steam Deck
  if (normalized.includes("steam deck")) {
    return {
      label: "Steam Deck",
      color: isDark ? "#a5b4fc" : "#4f46e5",
      bgColor: isDark ? "rgba(165, 180, 252, 0.08)" : "rgba(79, 70, 229, 0.06)",
      borderColor: isDark ? "rgba(165, 180, 252, 0.18)" : "rgba(79, 70, 229, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // Epic Games
  if (normalized.includes("epic")) {
    return {
      label: "Epic Games",
      color: isDark ? "#d8b4fe" : "#7c3aed",
      bgColor: isDark ? "rgba(216, 180, 254, 0.08)" : "rgba(124, 58, 237, 0.06)",
      borderColor: isDark ? "rgba(216, 180, 254, 0.18)" : "rgba(124, 58, 237, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // Riot Games
  if (normalized.includes("riot")) {
    return {
      label: "Riot Games",
      color: isDark ? "#fda4af" : "#e11d48",
      bgColor: isDark ? "rgba(253, 164, 175, 0.08)" : "rgba(225, 29, 72, 0.06)",
      borderColor: isDark ? "rgba(253, 164, 175, 0.18)" : "rgba(225, 29, 72, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // Battle.net / Blizzard
  if (normalized.includes("battle") || normalized.includes("blizzard")) {
    return {
      label: "Battle.net",
      color: isDark ? "#93c5fd" : "#0284c7",
      bgColor: isDark ? "rgba(147, 197, 253, 0.08)" : "rgba(2, 132, 199, 0.06)",
      borderColor: isDark ? "rgba(147, 197, 253, 0.18)" : "rgba(2, 132, 199, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // EA App / Origin
  if (normalized.includes("ea") || normalized.includes("origin")) {
    return {
      label: "EA App",
      color: isDark ? "#fed7aa" : "#ea580c",
      bgColor: isDark ? "rgba(254, 215, 170, 0.08)" : "rgba(234, 88, 12, 0.06)",
      borderColor: isDark ? "rgba(254, 215, 170, 0.18)" : "rgba(234, 88, 12, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // Ubisoft Connect
  if (normalized.includes("ubisoft") || normalized.includes("uplay")) {
    return {
      label: "Ubisoft",
      color: isDark ? "#c4b5fd" : "#7c3aed",
      bgColor: isDark ? "rgba(196, 181, 253, 0.08)" : "rgba(124, 58, 237, 0.06)",
      borderColor: isDark ? "rgba(196, 181, 253, 0.18)" : "rgba(124, 58, 237, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // PlayStation
  if (
    normalized.includes("playstation") ||
    normalized.includes("ps5") ||
    normalized.includes("ps4") ||
    normalized.includes("ps")
  ) {
    return {
      label: platform.toUpperCase().includes("PS") ? platform.toUpperCase() : "PlayStation",
      color: isDark ? "#93c5fd" : "#1d4ed8",
      bgColor: isDark ? "rgba(147, 197, 253, 0.08)" : "rgba(29, 78, 216, 0.06)",
      borderColor: isDark ? "rgba(147, 197, 253, 0.18)" : "rgba(29, 78, 216, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // Xbox
  if (normalized.includes("xbox")) {
    return {
      label: normalized.includes("series") ? "Xbox Series" : "Xbox",
      color: isDark ? "#86efac" : "#16a34a",
      bgColor: isDark ? "rgba(134, 239, 172, 0.08)" : "rgba(22, 163, 74, 0.06)",
      borderColor: isDark ? "rgba(134, 239, 172, 0.18)" : "rgba(22, 163, 74, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // Nintendo DS
  if (normalized.includes("ds") && !normalized.includes("3ds") && !normalized.includes("deck")) {
    return {
      label: "Nintendo DS",
      color: isDark ? "#fca5a5" : "#dc2626",
      bgColor: isDark ? "rgba(252, 165, 165, 0.08)" : "rgba(220, 38, 38, 0.06)",
      borderColor: isDark ? "rgba(252, 165, 165, 0.18)" : "rgba(220, 38, 38, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // Nintendo 3DS
  if (normalized.includes("3ds")) {
    return {
      label: "Nintendo 3DS",
      color: isDark ? "#fca5a5" : "#dc2626",
      bgColor: isDark ? "rgba(252, 165, 165, 0.08)" : "rgba(220, 38, 38, 0.06)",
      borderColor: isDark ? "rgba(252, 165, 165, 0.18)" : "rgba(220, 38, 38, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // Nintendo (Switch / Wii / Retro)
  if (
    normalized.includes("switch") ||
    normalized.includes("nintendo") ||
    normalized.includes("wii") ||
    normalized.includes("gamecube")
  ) {
    let lbl = "Nintendo";
    if (normalized.includes("switch")) lbl = "Nintendo Switch";
    else if (normalized.includes("wii u")) lbl = "Wii U";
    else if (normalized.includes("wii")) lbl = "Wii";
    else if (normalized.includes("gamecube")) lbl = "GameCube";
    else if (normalized.includes("64")) lbl = "Nintendo 64";
    return {
      label: lbl,
      color: isDark ? "#fca5a5" : "#dc2626",
      bgColor: isDark ? "rgba(252, 165, 165, 0.08)" : "rgba(220, 38, 38, 0.06)",
      borderColor: isDark ? "rgba(252, 165, 165, 0.18)" : "rgba(220, 38, 38, 0.12)",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    };
  }

  // GOG Galaxy
  if (normalized.includes("gog")) {
    return {
      label: "GOG Galaxy",
      color: isDark ? "#f0abfc" : "#c026d3",
      bgColor: isDark ? "rgba(240, 171, 252, 0.08)" : "rgba(192, 38, 211, 0.06)",
      borderColor: isDark ? "rgba(240, 171, 252, 0.18)" : "rgba(192, 38, 211, 0.12)",
    };
  }

  // General PC / Windows
  if (normalized.includes("pc") || normalized.includes("windows")) {
    return {
      label: "PC",
      color: isDark ? "#cbd5e1" : "#475569",
      bgColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)",
      borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
    };
  }

  return {
    label: platform,
    color: isDark ? "#a1a1aa" : "#64748b",
    bgColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
    borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
  };
}

export interface StoreAction {
  label: string;
  url: string;
  storeName: string;
}

/**
 * Genera el enlace dinámico y la etiqueta correspondiente para la tienda de la plataforma
 */
export function getStoreSearchUrl(platform: string, title: string): StoreAction {
  const norm = (platform || "").toLowerCase();
  const encTitle = encodeURIComponent(title.trim());

  if (norm.includes("epic")) {
    return {
      label: "Ver en Epic Games",
      url: `https://store.epicgames.com/browse?q=${encTitle}`,
      storeName: "Epic Games Store",
    };
  }

  if (norm.includes("nintendo") || norm.includes("switch")) {
    return {
      label: "Ver en Nintendo eShop",
      url: `https://www.nintendo.com/search/#q=${encTitle}`,
      storeName: "Nintendo eShop",
    };
  }

  if (norm.includes("xbox")) {
    return {
      label: "Ver en Tienda Xbox",
      url: `https://www.xbox.com/games/store/search?q=${encTitle}`,
      storeName: "Xbox Store",
    };
  }

  if (norm.includes("playstation") || norm.includes("ps5") || norm.includes("ps4") || norm.includes("ps")) {
    return {
      label: "Ver en PlayStation Store",
      url: `https://store.playstation.com/search/${encTitle}`,
      storeName: "PlayStation Store",
    };
  }

  if (norm.includes("riot")) {
    return {
      label: "Ver en Riot Games",
      url: `https://www.riotgames.com/`,
      storeName: "Riot Games",
    };
  }

  if (norm.includes("battle") || norm.includes("blizzard")) {
    return {
      label: "Ver en Battle.net",
      url: `https://shop.battle.net/search?q=${encTitle}`,
      storeName: "Battle.net",
    };
  }

  if (norm.includes("ea") || norm.includes("origin")) {
    return {
      label: "Ver en EA Store",
      url: `https://www.ea.com/games/library`,
      storeName: "EA App",
    };
  }

  if (norm.includes("ubisoft") || norm.includes("uplay")) {
    return {
      label: "Ver en Ubisoft Store",
      url: `https://store.ubisoft.com/search?q=${encTitle}`,
      storeName: "Ubisoft Connect",
    };
  }

  if (norm.includes("gog")) {
    return {
      label: "Ver en GOG",
      url: `https://www.gog.com/games?query=${encTitle}`,
      storeName: "GOG.com",
    };
  }

  // Por defecto (Steam o PC)
  return {
    label: "Ver en Steam",
    url: `https://store.steampowered.com/search/?term=${encTitle}`,
    storeName: "Steam Store",
  };
}

/**
 * Obtiene el esquema de protocolo de lanzamiento de escritorio para la plataforma
 */
export function getLauncherUri(platform: string): { label: string; uri: string } | null {
  const norm = (platform || "").toLowerCase();

  if (norm.includes("steam")) {
    return { label: "Abrir Steam", uri: "steam://open/main" };
  }
  if (norm.includes("epic")) {
    return { label: "Abrir Epic Games", uri: "com.epicgames.launcher://" };
  }
  if (norm.includes("riot")) {
    return { label: "Abrir Riot Client", uri: "riotclient://" };
  }
  if (norm.includes("battle") || norm.includes("blizzard")) {
    return { label: "Abrir Battle.net", uri: "battlenet://" };
  }
  if (norm.includes("ubisoft") || norm.includes("uplay")) {
    return { label: "Abrir Ubisoft Connect", uri: "uplay://" };
  }
  if (norm.includes("ea") || norm.includes("origin")) {
    return { label: "Abrir EA App", uri: "origin2://" };
  }

  return null;
}
