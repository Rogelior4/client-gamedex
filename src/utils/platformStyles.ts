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
      color: isDark ? "#38bdf8" : "#0284c7",
      bgColor: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 132, 199, 0.1)",
      borderColor: isDark ? "rgba(56, 189, 248, 0.35)" : "rgba(2, 132, 199, 0.25)",
      gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
    };
  }

  // Steam Deck
  if (normalized.includes("steam deck")) {
    return {
      label: "Steam Deck",
      color: isDark ? "#818cf8" : "#4f46e5",
      bgColor: isDark ? "rgba(129, 140, 248, 0.15)" : "rgba(79, 70, 229, 0.1)",
      borderColor: isDark ? "rgba(129, 140, 248, 0.35)" : "rgba(79, 70, 229, 0.25)",
      gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    };
  }

  // Epic Games
  if (normalized.includes("epic")) {
    return {
      label: "Epic Games",
      color: isDark ? "#c084fc" : "#7c3aed",
      bgColor: isDark ? "rgba(192, 132, 252, 0.15)" : "rgba(124, 58, 237, 0.1)",
      borderColor: isDark ? "rgba(192, 132, 252, 0.35)" : "rgba(124, 58, 237, 0.25)",
      gradient: "linear-gradient(135deg, #2b2b2b 0%, #0074e4 100%)",
    };
  }

  // Riot Games
  if (normalized.includes("riot")) {
    return {
      label: "Riot Games",
      color: isDark ? "#f43f5e" : "#e11d48",
      bgColor: isDark ? "rgba(244, 63, 94, 0.15)" : "rgba(225, 29, 72, 0.1)",
      borderColor: isDark ? "rgba(244, 63, 94, 0.35)" : "rgba(225, 29, 72, 0.25)",
      gradient: "linear-gradient(135deg, #d90429 0%, #ef233c 100%)",
    };
  }

  // Battle.net / Blizzard
  if (normalized.includes("battle") || normalized.includes("blizzard")) {
    return {
      label: "Battle.net",
      color: isDark ? "#38bdf8" : "#0284c7",
      bgColor: isDark ? "rgba(14, 165, 233, 0.15)" : "rgba(2, 132, 199, 0.1)",
      borderColor: isDark ? "rgba(14, 165, 233, 0.35)" : "rgba(2, 132, 199, 0.25)",
      gradient: "linear-gradient(135deg, #002244 0%, #00a4e4 100%)",
    };
  }

  // EA App / Origin
  if (normalized.includes("ea") || normalized.includes("origin")) {
    return {
      label: "EA App",
      color: isDark ? "#fb923c" : "#ea580c",
      bgColor: isDark ? "rgba(251, 146, 60, 0.15)" : "rgba(234, 88, 12, 0.1)",
      borderColor: isDark ? "rgba(251, 146, 60, 0.35)" : "rgba(234, 88, 12, 0.25)",
      gradient: "linear-gradient(135deg, #ff4747 0%, #ff8008 100%)",
    };
  }

  // Ubisoft Connect
  if (normalized.includes("ubisoft") || normalized.includes("uplay")) {
    return {
      label: "Ubisoft",
      color: isDark ? "#a78bfa" : "#7c3aed",
      bgColor: isDark ? "rgba(167, 139, 250, 0.15)" : "rgba(124, 58, 237, 0.1)",
      borderColor: isDark ? "rgba(167, 139, 250, 0.35)" : "rgba(124, 58, 237, 0.25)",
      gradient: "linear-gradient(135deg, #001244 0%, #0050ef 100%)",
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
      color: isDark ? "#818cf8" : "#4f46e5",
      bgColor: isDark ? "rgba(129, 140, 248, 0.15)" : "rgba(79, 70, 229, 0.1)",
      borderColor: isDark ? "rgba(129, 140, 248, 0.35)" : "rgba(79, 70, 229, 0.25)",
      gradient: "linear-gradient(135deg, #003791 0%, #0070d1 100%)",
    };
  }

  // Xbox
  if (normalized.includes("xbox")) {
    return {
      label: normalized.includes("series") ? "Xbox Series" : "Xbox",
      color: isDark ? "#4ade80" : "#16a34a",
      bgColor: isDark ? "rgba(74, 222, 128, 0.15)" : "rgba(22, 163, 74, 0.1)",
      borderColor: isDark ? "rgba(74, 222, 128, 0.35)" : "rgba(22, 163, 74, 0.25)",
      gradient: "linear-gradient(135deg, #107c10 0%, #0e6210 100%)",
    };
  }

  // Nintendo DS
  if (normalized.includes("ds") && !normalized.includes("3ds") && !normalized.includes("deck")) {
    return {
      label: "Nintendo DS",
      color: isDark ? "#fb7185" : "#e11d48",
      bgColor: isDark ? "rgba(251, 113, 133, 0.15)" : "rgba(225, 29, 72, 0.1)",
      borderColor: isDark ? "rgba(251, 113, 133, 0.35)" : "rgba(225, 29, 72, 0.25)",
      gradient: "linear-gradient(135deg, #e60012 0%, #c1121f 100%)",
    };
  }

  // Nintendo 3DS
  if (normalized.includes("3ds")) {
    return {
      label: "Nintendo 3DS",
      color: isDark ? "#fb7185" : "#e11d48",
      bgColor: isDark ? "rgba(251, 113, 133, 0.15)" : "rgba(225, 29, 72, 0.1)",
      borderColor: isDark ? "rgba(251, 113, 133, 0.35)" : "rgba(225, 29, 72, 0.25)",
      gradient: "linear-gradient(135deg, #e60012 0%, #c1121f 100%)",
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
      color: isDark ? "#fb7185" : "#e11d48",
      bgColor: isDark ? "rgba(251, 113, 133, 0.15)" : "rgba(225, 29, 72, 0.1)",
      borderColor: isDark ? "rgba(251, 113, 133, 0.35)" : "rgba(225, 29, 72, 0.25)",
      gradient: "linear-gradient(135deg, #e60012 0%, #ff3b30 100%)",
    };
  }

  // GOG Galaxy
  if (normalized.includes("gog")) {
    return {
      label: "GOG Galaxy",
      color: isDark ? "#e879f9" : "#c026d3",
      bgColor: isDark ? "rgba(232, 121, 249, 0.15)" : "rgba(192, 38, 211, 0.1)",
      borderColor: isDark ? "rgba(232, 121, 249, 0.35)" : "rgba(192, 38, 211, 0.25)",
    };
  }

  // General PC / Windows
  if (normalized.includes("pc") || normalized.includes("windows")) {
    return {
      label: "PC",
      color: isDark ? "#38bdf8" : "#0284c7",
      bgColor: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 132, 199, 0.1)",
      borderColor: isDark ? "rgba(56, 189, 248, 0.35)" : "rgba(2, 132, 199, 0.25)",
    };
  }

  return {
    label: platform,
    color: isDark ? "#c084fc" : "#9333ea",
    bgColor: isDark ? "rgba(192, 132, 252, 0.15)" : "rgba(147, 51, 234, 0.1)",
    borderColor: isDark ? "rgba(192, 132, 252, 0.35)" : "rgba(147, 51, 234, 0.25)",
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
