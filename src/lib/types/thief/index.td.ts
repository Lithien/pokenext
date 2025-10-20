declare module 'colorthief' {
  export default class ColorThief {
    getPalette(image: HTMLImageElement, colorCount: number, quality?: number): number[][];
    getColor(image: HTMLImageElement): number[];
  }
}
