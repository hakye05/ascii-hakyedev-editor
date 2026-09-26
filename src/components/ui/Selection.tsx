import React from "react";

interface OptionItem {
    label: string;
    value: string;
}

interface OptionProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: (string | OptionItem)[];
}

export const Selection: React.FC<OptionProps> = ({
    label,
    value,
    onChange,
    options
}) => {
    return (
        <div className="flex items-center gap-2 text-xs margin-top-2">
            <span className="font-medium w-50 text-zinc-400 truncate" title={label}>
                {label}
            </span>

            {/* Dropdown Box */}
            <div className="flex-1">
                <select value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-43 bg-zinc-1000 border border-zinc-700 text-zinc-400 px-2 py-1 text-xs focus:outline-none focus:border-zinc-500 cursor-pointer"
                >
                    {options.map((opt) => {
                        const optionValue = typeof opt === "string" ? opt : opt.value;
                        const optionLabel = typeof opt === "string" ? opt : opt.label;
                        
                        return (
                            <option key={optionValue} value={optionValue} className="bg-zinc-800 text-zinc-400">
                                {optionLabel}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};