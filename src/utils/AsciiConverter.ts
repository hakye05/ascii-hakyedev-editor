import type { Adjustments, AsciiSettings, GridCache } from "../types/ascii";

/**
 * Samples the image pixels down into a smaller grid based on scale settings.
 */
export const sampleImageGrid = (
    img: HTMLImageElement,
    asciiSettings: AsciiSettings,
    adjustments: Adjustments
): GridCache | null => {
    const cellSize = Math.max(4, Math.floor(16 / asciiSettings.scale));
    const cols = Math.floor(img.width / cellSize);
    const rows = Math.floor(img.height / cellSize);

    if (cols <= 0 || rows <= 0) return null;

    const offScreen = document.createElement('canvas');
    offScreen.width = cols;
    offScreen.height = rows;
    const offCtx = offScreen.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return null;

    offCtx.filter = `
        brightness(${100 + adjustments.brightness}%) 
        contrast(${100 + adjustments.contrast}%)
    `;
    offCtx.drawImage(img, 0, 0, cols, rows);
    const imgData = offCtx.getImageData(0, 0, cols, rows).data;

    return { imgData, cols, rows, cellSize };
};