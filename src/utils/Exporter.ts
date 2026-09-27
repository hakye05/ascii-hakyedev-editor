import type { Adjustments, AsciiSettings, GridCache } from "../types/ascii";
import { sampleImageGrid } from "./AsciiConverter";
import { renderAsciiToCanvas } from "./AsciiRenderer";

export const exportAsciiArt = (
    file: File | null,
    format: string,
    asciiSettings: AsciiSettings,
    adjustments: Adjustments,
    charSets: Record<string, string>,
    bgColor: string
) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const cache = sampleImageGrid(img, asciiSettings, adjustments);
            if (!cache) return;

            // 1. Create canvas for raster exports (PNG/JPEG)
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
                renderAsciiToCanvas(canvas, cache, asciiSettings, adjustments, charSets);

                const asciiTempCanvas = document.createElement('canvas');
                asciiTempCanvas.width = canvas.width;
                asciiTempCanvas.height = canvas.height;
                
                renderAsciiToCanvas(asciiTempCanvas, cache, asciiSettings, adjustments, charSets);

                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(asciiTempCanvas, 0, 0);
            }

            if (format === "png" || format === "jpeg") {
                const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
                const dataUrl = canvas.toDataURL(mimeType);
                triggerDownload(dataUrl, `ascii-art.${format === "jpeg" ? "jpg" : "png"}`);
            } else if (format === "text") {
                const textContent = generateAsciiText(cache, asciiSettings, adjustments, charSets);
                const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
                triggerDownload(URL.createObjectURL(blob), 'ascii-art.txt');
            }
        };
        img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
};

// Helper to extract text grid (for .txt export)
const generateAsciiText = (
    cache: GridCache,
    asciiSettings: AsciiSettings,
    adjustments: Adjustments,
    charSets: Record<string, string>
): string => {
    const { imgData, cols, rows } = cache;
    let chars = asciiSettings.charSet === "CUSTOM" 
        ? asciiSettings.customChar 
        : (charSets[asciiSettings.charSet] || charSets["STANDARD"]);
    if (!chars) chars = " .:-=+*#%@";

    let result = "";
    for (let y = 0; y < rows; y++) {
        let rowStr = "";
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
            rowStr += chars[charIndex] || ' ';
        }
        result += rowStr + "\n";
    }
    return result;
};

const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};