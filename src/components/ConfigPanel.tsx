import React, { useState } from "react";

export const ConfigPanel: React.FC = () => {
    
    return (
        <aside className="fixed top-0 left-0 h-screen w-80 text-white flex flex-col border-r border-zinc-800 bg-[#121214]">
            {/* Title Header */}
            <div className="h-12 border-b border-zinc-800 flex items-center px-5">
                <h1 className="text-l">ASCII</h1>
            </div>
        </aside>
    );
};

export default ConfigPanel;