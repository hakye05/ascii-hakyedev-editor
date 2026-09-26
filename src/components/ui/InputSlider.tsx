import React from "react";

interface SliderInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    defaultValue: number;
    unit?: string;
    decimals?: number;
}

export const InputSlider: React.FC<SliderInputProps> = ({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    defaultValue,
    unit = "",
    decimals
}) => {
    const handleReset = () => {
        onChange(defaultValue);
    };

    const formattedValue = decimals !== undefined ? value.toFixed(decimals) : value;
    const formattedDefault = decimals !== undefined ? defaultValue.toFixed(decimals) : defaultValue;

    return (
        <div className="flex items-center gap-2 text-xs margin-top-2">
            <span className="font-medium w-50 text-zinc-400 truncate" title={label}>
                {label}
            </span>

            {/* Current Number Value */}
            <span className="font-mono w-12 text-zinc-400 text-right">
                {formattedValue}{unit}
            </span>

            {/* Slider */}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="flex-1 control-slider"
            />

            {/* Reset Button */}
            <button
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-app-text py-1 hover:text-zinc-100 rounded transition-colors"
                title={`Reset to ${formattedDefault}${unit}`}
            >Reset</button>
        </div>
    );
};