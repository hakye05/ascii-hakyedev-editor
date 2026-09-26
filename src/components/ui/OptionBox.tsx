import React from "react";

export interface OptionItem {
    id: string;
    title: string;
    subtitle: string;
}

interface OptionBoxProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: OptionItem[];
}

export const OptionBox: React.FC<OptionBoxProps> = ({
    label,
    value,
    onChange,
    options,
}) => {
    return (
        <div className="flex flex-col gap-2 text-xs mt-2">
            {label && (
                <span className="font-medium text-zinc-400 truncate select-none">
                    {label}
                </span>
            )}

            {/* 2 Boxes Per Row Grid */}
            <div className="grid grid-cols-2 gap-2">
                {options.map((opt) => {
                    const isSelected = value === opt.id;
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => onChange(opt.id)}
                            className={`px-3 py-1.5 border transition-colors flex flex-col items-start justify-center cursor-pointer ${
                                isSelected
                                    ? "bg-zinc-800 border-zinc-500 text-zinc-200"
                                    : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-zinc-200"
                            }`}
                        >
                            {/* Main Title */}
                            <span className="text-xs font-medium uppercase tracking-wide">
                                {opt.title}
                            </span>
                            {/* Subtitle */}
                            <span className="text-[12px] font-mono text-zinc-500">
                                {opt.subtitle}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};