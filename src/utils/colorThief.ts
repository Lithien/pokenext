import { mapPaletteToThemeColors } from "."
import ColorThief from "colorthief"

export const extractColors = async (
  imageUrl: string,
  setColors: (colors: { primary: string; secondary: string; accent: string }) => void
) => {
  const img = new window.Image()
  img.crossOrigin = 'Anonymous'

  img.onload = () => {
    const colorThief = new ColorThief()
    const palette = colorThief.getPalette(img, 3)
    const newColors = mapPaletteToThemeColors(palette)

    setColors(newColors)
  }

  img.src = imageUrl
}