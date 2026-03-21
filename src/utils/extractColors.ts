import { useThemeStore } from "@/store/useThemeStore";

interface ColorWithFrequency {
  hex: string;
  frequency: number;
  percentage: number;
}

/**
 * Extract the top N dominant colors from an image
 * @param imageUrl - URL of the image to analyze
 * @param count - Number of colors to extract (default: 3)
 * @returns Promise with array of color hex codes (for backward compatibility) or ColorWithFrequency[]
 */
const extractColorsFromImage = async (
  imageUrl: string,
  count: number = 3,
  includeFrequencies: boolean = false
): Promise<string[] | ColorWithFrequency[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    // Timeout para evitar esperas infinitas
    const timeoutId = setTimeout(() => {
      img.src = ""; // Detener carga
      reject(new Error("Image loading timeout"));
    }, 10000);

    img.onload = () => {
      clearTimeout(timeoutId);
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image to canvas
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Map to store color frequencies
        const colorMap = new Map<string, number>();
        let totalPixels = 0;

        // Colors to exclude (black/near-black colors)
        const excludedColors = new Set([
          "#000000",
          "#101010",
          "#121212",
          "#010101",
          "#0f0f0f",
          "#1a1a1a",
          "#080808",
          "#090909",
          "#111111",
          "#0a0a0a",
          "#060606",
          "#26124d",
          "#31314a",
          "#2d2d2d",
          "#6b6574",
          "#070707"
        ]);

        // Sample every 4th pixel for performance
        for (let i = 0; i < pixels.length; i += 16) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];

          // Skip transparent or very transparent pixels
          if (a < 200) continue;

          // Convert to hex
          const hex = `#${[r, g, b]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("")}`;

          // Skip excluded colors
          if (excludedColors.has(hex)) continue;

          colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
          totalPixels++;
        }

        // Sort by frequency and get top colors
        const sortedColors = Array.from(colorMap.entries())
          .sort((a, b) => b[1] - a[1])
        .slice(0, count);

        if (includeFrequencies) {
          const colorsWithFreq: ColorWithFrequency[] = sortedColors.map(
            ([hex, frequency]) => ({
              hex,
              frequency,
              percentage: (frequency / totalPixels) * 100,
            })
          );
          resolve(colorsWithFreq);
        } else {
          const hexColors = sortedColors.map(([hex]) => hex);
          resolve(hexColors);
        }
      }
      catch (error) { reject(error) }
      finally { img.src = "" }
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      img.src = "";
      reject(new Error("Failed to load image - CORS issue or invalid URL"));
    };

    img.onabort = () => {
      clearTimeout(timeoutId);
      img.src = "";
      reject(new Error("Image loading was aborted"));
    };

    img.src = imageUrl;
  });
};

/**
 * Normaliza colores que pueden venir como string o como objeto
 */
const normalizeColor = (color: string | ColorWithFrequency): string => {
  if (typeof color === "string") return color;
  return color.hex;
};

/**
 * Convierte un color hex a RGB
 */
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
};

/**
 * Calcula la distancia euclidiana entre dos colores en el espacio RGB
 * Rango: 0-442 (distancia máxima: sqrt(255^2 + 255^2 + 255^2))
 */
const getColorDistance = (hex1: string, hex2: string): number => {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  
  const rDiff = r1 - r2;
  const gDiff = g1 - g2;
  const bDiff = b1 - b2;
  
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
};

/**
 * Verifica si dos colores son demasiado similares
 * @param hex1 Primer color en hex
 * @param hex2 Segundo color en hex
 * @param threshold Distancia mínima para considerar que no son similares (0-442, default: 80)
 */
const areColorsSimilar = (hex1: string, hex2: string, threshold: number = 80): boolean => {
  return getColorDistance(hex1, hex2) < threshold;
};

/**
 * Selecciona 3 colores distintos de una lista, evitando similares
 * @param colorList Lista de colores ordenados por frecuencia
 * @param similarityThreshold Umbral de similitud (default: 80)
 * @returns Array con 3 colores distintos
 */
const selectDistinctColors = (
  colorList: string[],
  similarityThreshold: number = 80
): string[] => {
  if (colorList.length === 0) return [];
  
  const selected: string[] = [colorList[0]];
  let colorIndex = 1;
  
  while (selected.length < 3 && colorIndex < colorList.length) {
    const currentColor = colorList[colorIndex];
    const isSimilarToAny = selected.some(selectedColor =>
      areColorsSimilar(currentColor, selectedColor, similarityThreshold)
    );
    
    if (!isSimilarToAny) {
      selected.push(currentColor);
    }
    
    colorIndex++;
  }
  
  // Si no hay suficientes colores distintos, rellenar con los disponibles
  while (selected.length < 3 && colorIndex < colorList.length) {
    selected.push(colorList[colorIndex]);
    colorIndex++;
  }
  
  return selected;
};

/**
 * @title Apply Colors From Image
 * @description Extracts colors from the given image URL and applies them to the theme store.
 * @param imageUrl URL of the image to extract colors from
 * @param count Number of colors to extract (default: 3)
 * @returns Promise<void>
 */
export const applyColorsFromImage = async (imageUrl: string, count: number = 3) => {
  try {
    const colors = await extractColorsFromImage(imageUrl, count * 2);

    if (!Array.isArray(colors) || colors.length === 0) {
      console.warn("No colors extracted from image");
      return;
    }

    const normalizedColors = colors.map(normalizeColor);
    const similarityThreshold = useThemeStore.getState().similarityThreshold;
    const distinctColors = selectDistinctColors(normalizedColors, similarityThreshold);

    if (distinctColors.length < 3) {
      console.warn("Could not extract 3 visually distinct colors");
      return;
    }

    const [primary, secondary, accent] = distinctColors;

    useThemeStore.getState().setColors([
      { name: "primary", hex: primary },
      { name: "secondary", hex: secondary },
      { name: "accent", hex: accent }
    ]);
  } catch (error) {
    console.error("Error applying colors from image:", error instanceof Error ? error.message : "Unknown error");
  }
};
