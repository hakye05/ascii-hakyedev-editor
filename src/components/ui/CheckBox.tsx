import React from "react";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
}) => {
    return (
        <div className="flex items-center gap-2 text-xs mt-2">
            <span className="font-medium w-27 text-zinc-400 truncate select-none" title={label}>
                {label}
            </span>

            {/* Checkbox Input Box Container */}
            <div className="flex items-center h-7">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="w-4 h-4 bg-zinc-1000 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-zinc-500 cursor-pointer accent-zinc-200"
                />
            </div>
        </div>
    );
};