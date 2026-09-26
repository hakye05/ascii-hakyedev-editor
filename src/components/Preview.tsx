import React, { useEffect, useRef, useState } from 'react';
import type { GridCache } from '../types/ascii';
import { sampleImageGrid } from '../utils/AsciiConverter';
import { renderAsciiToCanvas } from '../utils/AsciiRenderer';

interface PreviewProps {
    file: File | null;
    charSets: Record<string, string>;
    asciiSettings: {
        scale: number;
        spacing: number;
        charSet: string;
        customChar: string;
    };
    adjustments: {
        brightness: number;
        contrast: number;
        saturation?: number;
        hueRotation?: number;
        sharpness?: number;
        gamma: number;
    };
    bgColor: string;
}

export const Preview: React.FC<PreviewProps> = ({
    file,
    charSets,
    asciiSettings,
    adjustments,
    bgColor
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const gridCacheRef = useRef<GridCache | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Load file
    useEffect(() => {
        if (!file) {
            setImageSrc(null);
            gridCacheRef.current = null;
            return;
        }
        const url = URL.createObjectURL(file);
        setImageSrc(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    // Image Sampling
    useEffect(() => {
        if (!imageSrc) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;

        img.onload = () => {
            const cache = sampleImageGrid(img, asciiSettings, adjustments);
            if (!cache) return;

            gridCacheRef.current = cache;
            triggerRender();
        };

        img.onerror = () => {
            setError('Failed to load image file.');
        };
    }, [imageSrc, asciiSettings.scale, adjustments]);

    // Interactive Rendering Trigger
    const triggerRender = () => {
        const canvas = canvasRef.current;
        const cache = gridCacheRef.current;
        if (!canvas || !cache) return;

        renderAsciiToCanvas(canvas, cache, asciiSettings, adjustments, charSets, bgColor);
    };

    useEffect(() => {
        triggerRender();
    }, [asciiSettings.spacing, asciiSettings.charSet, asciiSettings.customChar, bgColor]);
    return (
        <div 
            ref={containerRef} 
            className="relative w-full h-full flex items-center justify-center overflow-auto p-4"
            style={{ backgroundColor: bgColor }}
        >
            {!file ? (
                <div className="text-slate-500 flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 stroke-current opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">Upload an image to start editing</p>
                </div>
            ) : error ? (
                <div className="text-red-400 text-sm">{error}</div>
            ) : (
                <canvas 
                    ref={canvasRef} 
                    className="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-75"
                />
            )}
        </div>
    );
};