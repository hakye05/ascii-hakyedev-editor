import React from "react";

interface ColorProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export const InputColor: React.FC<ColorProps> = ({
    label,
    value,
    onChange,
}) => {
    return (
        <div className="flex items-center gap-2 text-xs mt-2">
            <span className="font-medium w-50 text-zinc-400 truncate select-text" title={label}>
                {label}
            </span>

            {/* Color Cube & Input */}
            <div className="flex-1 flex items-center">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-7 h-7 bg-zinc-900 border border-zinc-700 cursor-pointer appearance-none p-0 
                        [&::-webkit-color-swatch-wrapper]:p-0 
                        [&::-webkit-color-swatch]:border-none 
                        [&::-webkit-color-swatch]:rounded-none
                        [&::-moz-focus-inner]:p-0
                        [&::-moz-color-swatch]:border-none"
                />

                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="-ml-px flex-1 h-7 w-36 bg-zinc-1000 border border-zinc-700 text-zinc-400 px-2 text-xs font-mono uppercase focus:outline-none focus:border-zinc-500 select-text"
                />
            </div>
        </div>
    );
};