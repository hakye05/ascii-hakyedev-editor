import React from "react";

interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    value,
    onChange,
    placeholder = ""
}) => {
    return (
        <div className="flex items-center gap-2 text-xs margin-top-2">
            <span className="font-medium w-50 text-zinc-400 truncate" title={label}>
                {label}
            </span>

            {/* Text Input Box */}
            <div className="flex-1">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-43 bg-zinc-1000 border border-zinc-700 text-zinc-400 px-2 py-1 text-xs focus:outline-none focus:border-zinc-500 select-text"
                />
            </div>
        </div>
    );
};