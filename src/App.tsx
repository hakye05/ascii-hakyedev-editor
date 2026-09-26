import { useState } from 'react';
import './App.css'
import { ConfigPanel } from './components/ConfigPanel'
import { Preview } from './components/Preview'

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [asciiSettings, setAsciiSettings] = useState({
    scale: 1,
    spacing: 0,
    charSet: "STANDARD",
    customChar: " .:+*#@"
  });
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hueRotation: 0,
    sharpness: 0,
    gamma: 1.0
  });
  const [bgColor, setBgColor] = useState("#000000");
  const [postProcess, setPostProcess] = useState({
    bloom: false,
    grain: false,
    chromatic: false,
    vignette: false,
    crt: false
  });
  const [format, setFormat] = useState("png");

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden">
      <ConfigPanel
        file={file}
        setFile={setFile}
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
          asciiText='asd'
        />
      </main>
    </div>
  )
}

export default App
