import { useThemeStore } from "@/store/useThemeStore";

export interface ColorWithFrequency {
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
export async function extractColorsFromImage(
  imageUrl: string,
  count: number = 3,
  includeFrequencies: boolean = false
): Promise<string[] | ColorWithFrequency[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
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
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageUrl;
  });
}

/**
 * @title Apply Colors From Image
 * @description Extracts colors from the given image URL and applies them to the theme store.
 * @param imageUrl URL of the image to extract colors from
 * @param count Number of colors to extract (default: 3)
 * @returns Promise<void>
 */
export async function applyColorsFromImage(imageUrl: string, count: number = 3) {
  try {
    const colors = await extractColorsFromImage(imageUrl, count)

    if (!Array.isArray(colors) || colors.length < count) {
      console.warn("Not enough colors extracted from image")
      return
    }

    // Normalizamos: si viene como string o como objeto { hex, frequency }
    const normalize = (c: any) => (typeof c === "string" ? c : c.hex)

    const primary = normalize(colors[0])
    const secondary = normalize(colors[1])
    const accent = normalize(colors[2])

    useThemeStore.getState().setColors([
      { name: "primary", hex: primary },
      { name: "secondary", hex: secondary },
      { name: "accent", hex: accent }
    ])


  } catch (error) {
    console.error("Error applying colors:", error)
  }
}
