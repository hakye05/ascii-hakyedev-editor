interface AccordionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, isOpen, onToggle, children }) => (
    <div className="space-y-3 controls-section">
        <button
            onClick={onToggle}
            className="text-[13px] font-medium text-zinc-200 block title-label"
        >
            {isOpen ? "−" : "+"} {title}
        </button>
        
        {isOpen && <div className="space-y-2">{children}</div>}
    </div>
);