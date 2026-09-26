import React, { useState, useEffect } from "react";

interface UploadProps {
    file: File | null;
    setFile: (file: File | null) => void;
}

export const Upload: React.FC<UploadProps> = ({ file, setFile }) => {
    const supportedFormats = ["PNG", "JPG", "JPEG", "GIF", "WEBP", "MP4"];
    const [resolution, setResolution] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setResolution(null);
            return;
        }

        // Check if file is an image to extract resolution
        if (file.type.startsWith("image/")) {
            const objectUrl = URL.createObjectURL(file);
            const img = new Image();
            
            img.onload = () => {
                setResolution(`${img.width} × ${img.height} px`);
                URL.revokeObjectURL(objectUrl); // Clean up memory
            };
            
            img.src = objectUrl;
        } else if (file.type.startsWith("video/")) {
            setResolution("Video file");
        } else {
            setResolution(null);
        }
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-3">
            <div className="border-1 border-dashed border-zinc-700 hover:border-zinc-500 p-4 text-center transition-colors cursor-pointer relative">
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="space-y-1 pointer-events-none">
                    <p className="text-xs text-zinc-300 font-medium">Click or drag & drop file</p>
                    <p className="text-[11px] text-zinc-500">{supportedFormats.join(", ")}</p>
                </div>
            </div>

            {/* Separate File Meta Details Display */}
            {file && (
                <div className="bg-zinc-900 border border-zinc-800 p-3 text-xs space-y-1.5">
                    <div className="flex justify-between items-center text-zinc-400">
                        <span className="text-zinc-300">File Name:</span>
                        <span className="truncate max-w-[160px]" title={file.name}>{file.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-400">
                        <span className="text-zinc-300">Resolution:</span>
                        <span className="text-zinc-200">{resolution || "Loading..."}</span>
                    </div>
                </div>
            )}
        </div>
    );
};