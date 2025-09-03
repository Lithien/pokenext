import { RefObject } from "react"
import { convertArrayToRGBA, mapPaletteToThemeColors, toBase64 } from "."
import ColorThief from "colorthief"

export const loadImage = async (
  imageUrl: string,
  imgRef: RefObject<HTMLImageElement | null>,
  setColors: (colors: { primary: string; secondary: string; accent: string }) => void,
  mounted?: boolean,
  setGradient?: (gradient: string) => void,
) => {
      const base64Url = await toBase64(imageUrl ?? '')

      if (imgRef.current) {
        imgRef.current.src = base64Url

        const handleLoad = () => {
          try {
            const colorThief = new ColorThief()
            const colors = colorThief.getPalette(imgRef.current as HTMLImageElement, 3)
            const mappedColors = mapPaletteToThemeColors(colors)
            setColors(mappedColors)
            if (mounted && setGradient) {
              setGradient(`linear-gradient(180deg,${convertArrayToRGBA(colors[0])} 0%, ${convertArrayToRGBA(colors[2])} 100%)`)
            }
          } catch (err) {
            console.error("Error extracting colors:", err)
          }
        }

        if (imgRef.current.complete) {
          handleLoad()
        } else {
          imgRef.current.addEventListener("load", handleLoad, { once: true })
        }
      }
    }