import type { Adjustments, AsciiSettings, GridCache } from "../types/ascii";

/**
 * Renders the ASCII grid onto the target HTMLCanvasElement.
 */
export const renderAsciiToCanvas = (
    canvas: HTMLCanvasElement,
    cache: GridCache,
    asciiSettings: AsciiSettings,
    adjustments: Adjustments,
    charSets: Record<string, string>,
    bgColor: string
) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { imgData, cols, rows, cellSize } = cache;

    let chars = asciiSettings.charSet === "CUSTOM" 
        ? asciiSettings.customChar 
        : (charSets[asciiSettings.charSet] || charSets["STANDARD"]);

    if (!chars || chars.length === 0) chars = " .:-=+*#%@";

    const spacingOffset = asciiSettings.spacing;
    const fontSize = cellSize;

    canvas.width = cols * (fontSize + spacingOffset);
    canvas.height = rows * (fontSize + spacingOffset);

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const idx = (y * cols + x) * 4;
            let r = imgData[idx];
            let g = imgData[idx + 1];
            let b = imgData[idx + 2];

            if (adjustments.gamma !== 1.0) {
                r = 255 * Math.pow(r / 255, 1 / adjustments.gamma);
                g = 255 * Math.pow(g / 255, 1 / adjustments.gamma);
                b = 255 * Math.pow(b / 255, 1 / adjustments.gamma);
            }

            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            const charIndex = Math.floor(luminance * (chars.length - 1));
            const selectedChar = chars[charIndex] || ' ';

            const drawX = x * (fontSize + spacingOffset);
            const drawY = y * (fontSize + spacingOffset);

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillText(selectedChar, drawX, drawY);
        }
    }
};