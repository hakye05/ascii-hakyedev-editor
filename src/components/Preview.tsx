interface PreviewProps {
    asciiText: string;
    fontSize?: number;
    lineHeight?: number;
}

export const Preview = ({ asciiText, fontSize = 8, lineHeight = 1 }: PreviewProps) => {
    if (!asciiText) {
        return (
            <div className="text-center space-y-2">
                <p className="text-sm font-mono">ASCII Preview Area</p>
                <p className="text-xs text-slate-600">Upload an image from the sidebar to preview.</p>
            </div>
        )
    }

    return (
        // <div className="w-full h-full overflow-auto flex items-center justify-center p-8 bg-[#0A0A0A]">
        //   <pre
        //     className="font-mono whitespace-pre text-slate-200 select-all"
        //     style={{
        //       fontSize: `${fontSize}px`,
        //       lineHeight: `${lineHeight}`,
        //     }}
        //   >
        //     {asciiText}
        //   </pre>
        // </div>
        <div className="text-center space-y-2">
            <p className="text-sm font-mono">ASCII Preview Area</p>
            <p className="text-xs text-slate-600">Upload an image from the sidebar to preview.</p>
        </div>
    )
}