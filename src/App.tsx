import { useState } from 'react';
import './App.css'
import { ConfigPanel } from './components/ConfigPanel'
import { Preview } from './components/Preview'

export const CHARSETS: Record<string, string> = {
  STANDARD: " .:-=+*#%@",
  BINARY: " 01",
  DETAILED: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  BLOCKS: " ░▒▓█"
};

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("png");
  const [asciiSettings, setAsciiSettings] = useState({
    scale: 3,
    spacing: -2,
    charSet: "STANDARD",
    customChar: " .:-=+*#%@"
  });
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hueRotation: 0,
    gamma: 1.0
  });
  const [postProcess, setPostProcess] = useState({
    bloom: false,
    grain: false,
    chromatic: false,
    vignette: false,
    crt: false
  });  
  const [bgColor, setBgColor] = useState("#000000");

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden">
      <ConfigPanel
        file={file}
        setFile={setFile}
        charSets={CHARSETS}
        asciiSettings={asciiSettings}
        setAsciiSettings={setAsciiSettings}
        adjustments={adjustments}
        setAdjustments={setAdjustments}
        bgColor={bgColor}
        setBgColor={setBgColor}
        postProcess={postProcess}
        setPostProcess={setPostProcess}
        format={format}
        setFormat={setFormat}
      />

      <main className="flex-1 ml-80 flex items-center justify-center text-slate-500 bg-[#0A0A0A]">
        <Preview
          file={file}
          charSets={CHARSETS}
          asciiSettings={asciiSettings}
          adjustments={adjustments}
          bgColor={bgColor}
        />
      </main>
    </div>
  )
}

export default App
