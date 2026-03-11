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
      } catch (error) {
        reject(error);
      } finally {
        // Cleanup: liberar recursos del canvas
        img.src = "";
      }
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
 * @title Apply Colors From Image
 * @description Extracts colors from the given image URL and applies them to the theme store.
 * @param imageUrl URL of the image to extract colors from
 * @param count Number of colors to extract (default: 3)
 * @returns Promise<void>
 */
export const applyColorsFromImage = async (imageUrl: string, count: number = 3) => {
  try {
    const colors = await extractColorsFromImage(imageUrl, count);

    if (!Array.isArray(colors) || colors.length < count) {
      console.warn("Not enough colors extracted from image");
      return;
    }

    const primary = normalizeColor(colors[0]);
    const secondary = normalizeColor(colors[1]);
    const accent = normalizeColor(colors[2]);

    useThemeStore.getState().setColors([
      { name: "primary", hex: primary },
      { name: "secondary", hex: secondary },
      { name: "accent", hex: accent }
    ]);
  } catch (error) {
    console.error("Error applying colors from image:", error instanceof Error ? error.message : "Unknown error");
  }
};
