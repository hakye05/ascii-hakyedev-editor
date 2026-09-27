# ASCII Converter and Image Editor

Web application built with **React**, **Vite**, and **TypeScript** that transforms standard images into customizable ASCII art. 

## Features

* **Image Conversion:** Upload image and convert it into a ASCII version.
* **Character Sets:** Choose from sets like `STANDARD`, `BINARY`, `DETAILED`, `BLOCKS`, or define a `CUSTOM` character sequence.
* **Adjustments:** Fine-tune your output with real-time controls for:
  * **Scale & Spacing:** Adjust grid resolution and character density.
  * **Color Corrections:** Modify Brightness, Contrast, Saturation, Hue rotation, and Gamma.
* **Export Options:** Save your creations directly as:
  * **Images:** PNG (`.png`) and JPG (`.jpg`) via HTML5 Canvas rendering.
  * **Text:** Plain text file (`.txt`) export for raw ASCII text without colours and spacing.

## Tech Stack

* **Framework:** React (Functional Components, Hooks)
* **Build Tool:** Vite
* **Language:** TypeScript
* **Core APIs:** HTML5 Canvas API (`CanvasRenderingContext2D`)

## Core Modules

### 1. `AsciiConverter.ts`
Handles image down-sampling and pixel extraction. It calculates proportional rows and columns based on the image's aspect ratio and applies filters (brightness, contrast, saturation, hue rotation) to an off-screen canvas.

```typescript
// Samples image pixels down into a proportion-based grid with filters applied
export const sampleImageGrid = (
    img: HTMLImageElement,
    asciiSettings: AsciiSettings,
    adjustments: Adjustments
): GridCache | null => { ... }

```

### 2. `AsciiRenderer.ts`

Performs rendering of the ASCII grid onto the target canvas element.

```typescript
// Renders the ASCII grid onto the target HTMLCanvasElement
export const renderAsciiToCanvas = (
    canvas: HTMLCanvasElement,
    cache: GridCache,
    asciiSettings: AsciiSettings,
    adjustments: Adjustments,
    charSets: Record<string, string>
) => { ... }

```

## Usage

1. **Upload an Image:** Drag and drop or select an image file through the file picker interface.
2. **Customize Settings:** Use the sidebar controls to tweak the Scale, Spacing, and select your preferred Character Set.
3. **Fine-tune Adjustments:** Adjust sliders for Brightness, Contrast, Saturation, Hue, and Gamma to achieve the desired look.
4. **Export:** Click your preferred format (**PNG**, **JPG**, or **TXT**) to download your artwork.

## TODO

### Rendering

* [ ] Switch the current Canvas-based rendering pipeline to **WebGPU** for improved rendering performance and responsiveness.
* [ ] Optimize GPU-based ASCII rendering for high character counts.
* [ ] Minimize CPU-side processing and reduce unnecessary canvas redraws.

### Visual Effects

* [ ] Add **Bloom** effect.
* [ ] Add **Grain** effect.
* [ ] Add **Vignette** effect.
* [ ] Add **CRT** effect.
* [ ] Add **Chromatic Aberration** effect.
* [ ] Add additional post-processing effects and visual adjustments.

## Future Improvements

The rendering pipeline is planned to move from the current HTML5 Canvas implementation to **WebGPU**, allowing more of the ASCII conversion and visual processing to be handled on the GPU. This should improve performance when working with larger images, higher ASCII resolutions, and real-time visual effects.

The project will also be extended with GPU-based post-processing effects such as Bloom, Film Grain, Vignette, CRT distortion, Chromatic Aberration, and other visual effects.
