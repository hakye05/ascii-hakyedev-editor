import React, { useState } from "react";
import { Accordion } from "./ui/Accordion";
import { Upload } from "./ui/Upload";
import { InputSlider } from "./ui/InputSlider";
import { OptionBox } from "./ui/OptionBox";
import { Input } from "./ui/Input";
import { Selection } from "./ui/Selection";
import { InputColor } from "./ui/InputColor";
import { Checkbox } from "./ui/CheckBox";

interface ConfigPanelProps {
    file: File | null;
    setFile: (file: File | null) => void;
    charSets: Record<string, string>;
    asciiSettings: any;
    setAsciiSettings: React.Dispatch<React.SetStateAction<any>>;
    adjustments: any;
    setAdjustments: React.Dispatch<React.SetStateAction<any>>;
    bgColor: string;
    setBgColor: (color: string) => void;
    postProcess: any;
    setPostProcess: React.Dispatch<React.SetStateAction<any>>;
    format: string;
    setFormat: (format: string) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
    file,
    setFile,
    charSets,
    asciiSettings,
    setAsciiSettings,
    adjustments,
    setAdjustments,
    bgColor,
    setBgColor,
    postProcess,
    setPostProcess,
    format,
    setFormat
}) => {
    const charSetList = [...Object.keys(charSets), "CUSTOM"];
    const [openSections, setOpenSections] = useState({
        input: true,
        ascii: true,
        adjustments: true,
        colour: true,
        postprocessing: true,
        export: true
    });
    const options = [
        { id: "png", title: "PNG", subtitle: ".png" },
        { id: "jpeg", title: "JPEG", subtitle: ".jpg" },
        { id: "text", title: "Text", subtitle: ".txt" },
        { id: "threejs", title: "Three.js", subtitle: ".html" }
    ];

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const updateSetting = <T extends object>(
        setter: React.Dispatch<React.SetStateAction<T>>,
        key: keyof T
    ) => {
        return (value: any) => {
            setter(prev => ({ ...prev, [key]: value }));
        };
    };

    return (
        <aside className="fixed top-0 left-0 h-screen w-80 text-white flex flex-col border-r border-zinc-800 bg-[#121214]">
            {/* Title Header */}
            <div className="h-12 border-b border-zinc-800 flex items-center px-5">
                <h1 className="text-l">ASCII</h1>
            </div>

            {/* Config Fields */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                <Accordion
                    title="Input File"
                    isOpen={openSections.input}
                    onToggle={() => toggleSection('input')}
                >
                    <Upload
                        file={file}
                        setFile={setFile}
                    />
                </Accordion>

                <Accordion
                    title="ASCII Settings"
                    isOpen={openSections.ascii}
                    onToggle={() => toggleSection('ascii')}
                >
                    <InputSlider
                        label="Scale"
                        value={asciiSettings.scale}
                        onChange={updateSetting(setAsciiSettings, 'scale')}
                        min={0.2}
                        max={4}
                        step={0.2}
                        defaultValue={3}
                        decimals={1}
                    />
                    <InputSlider
                        label="Spacing"
                        value={asciiSettings.spacing}
                        onChange={updateSetting(setAsciiSettings, 'spacing')}
                        min={-2.0}
                        max={4.0}
                        step={0.1}
                        defaultValue={-2.0}
                        decimals={1}
                    />
                    <Selection
                        label="Character Set"
                        value={asciiSettings.charSet}
                        onChange={updateSetting(setAsciiSettings, 'charSet')}
                        options={charSetList}
                    />
                    {asciiSettings.charSet === "CUSTOM" && (
                        <Input
                            label="Custom Chars"
                            value={asciiSettings.customChar}
                            onChange={updateSetting(setAsciiSettings, 'customChar')}
                            placeholder="Enter characters..."
                        />
                    )}
                </Accordion>

                <Accordion
                    title="Adjustments"
                    isOpen={openSections.adjustments}
                    onToggle={() => toggleSection('adjustments')}
                >
                    <InputSlider
                        label="Brightness"
                        value={adjustments.brightness}
                        onChange={updateSetting(setAdjustments, 'brightness')}
                        min={-100.0}
                        max={100.0}
                        step={1}
                        defaultValue={0}
                    />
                    <InputSlider
                        label="Contrast"
                        value={adjustments.contrast}
                        onChange={updateSetting(setAdjustments, 'contrast')}
                        min={-100.0}
                        max={100.0}
                        step={1}
                        defaultValue={0}
                    />
                    <InputSlider
                        label="Saturation"
                        value={adjustments.saturation}
                        onChange={updateSetting(setAdjustments, 'saturation')}
                        min={-100.0}
                        max={100.0}
                        step={1}
                        defaultValue={0}
                    />
                    <InputSlider
                        label="Hue"
                        value={adjustments.hueRotation}
                        onChange={updateSetting(setAdjustments, 'hueRotation')}
                        min={0}
                        max={360}
                        step={1}
                        defaultValue={0}
                        unit="°"
                    />
                    <InputSlider
                        label="Gamma"
                        value={adjustments.gamma}
                        onChange={updateSetting(setAdjustments, 'gamma')}
                        min={0.1}
                        max={3.0}
                        step={0.1}
                        defaultValue={1.0}
                        decimals={1}
                    />
                </Accordion>

                <Accordion
                    title="Colour"
                    isOpen={openSections.colour}
                    onToggle={() => toggleSection('colour')}
                >
                    <InputColor
                        label="Background"
                        value={bgColor}
                        onChange={setBgColor}
                    />
                </Accordion>

                <Accordion
                    title="Post-Processing"
                    isOpen={openSections.postprocessing}
                    onToggle={() => toggleSection('postprocessing')}
                >
                    <Checkbox
                        label="Bloom"
                        checked={postProcess.bloom}
                        onChange={updateSetting(setPostProcess, 'bloom')}
                    />
                    <Checkbox
                        label="Grain"
                        checked={postProcess.grain}
                        onChange={updateSetting(setPostProcess, 'grain')}
                    />
                    <Checkbox
                        label="Chromatic"
                        checked={postProcess.chromatic}
                        onChange={updateSetting(setPostProcess, 'chromatic')}
                    />
                    <Checkbox
                        label="Vignette"
                        checked={postProcess.vignette}
                        onChange={updateSetting(setPostProcess, 'vignette')}
                    />
                    <Checkbox
                        label="CRT Effect"
                        checked={postProcess.crt}
                        onChange={updateSetting(setPostProcess, 'crt')}
                    />
                </Accordion>

                <Accordion
                    title="Export"
                    isOpen={openSections.export}
                    onToggle={() => toggleSection('export')}
                >
                    <OptionBox
                        label="Format"
                        value={format}
                        onChange={setFormat}
                        options={options}
                    />
                </Accordion>
            </div>
        </aside>
    );
};