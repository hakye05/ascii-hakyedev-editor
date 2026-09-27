import React from "react";

interface ButtonFullProps {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

export const ButtonFull: React.FC<ButtonFullProps> = ({
    onClick,
    disabled = false,
    children
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full mt-2 py-2 px-4 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-950 disabled:text-zinc-600 border border-zinc-700 hover:border-zinc-500 disabled:border-zinc-900 text-zinc-200 text-xs font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
            {children}
        </button>
    );
};