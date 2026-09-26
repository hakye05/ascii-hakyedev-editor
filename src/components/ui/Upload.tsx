import React from "react";

export const Upload: React.FC = () => {
    const supportedFormats = ["PNG", "JPG", "JPEG", "GIF", "WEBP", "MP4"];

    return (
        <div className="space-y-4">
            <div className="border-1 border-dashed border-zinc-700 hover:border-zinc-500 p-4 text-center transition-colors cursor-pointer relative">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-1 pointer-events-none">
                    <p className="text-xs text-zinc-300 font-medium">Click or drag & drop file</p>
                    <p className="text-[13px] text-zinc-500">{supportedFormats.join(", ")}</p>
                </div>
            </div>
        </div>
    );
};