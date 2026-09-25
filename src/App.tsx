import './App.css'
import ConfigPanel from './components/ConfigPanel'

function App() {
  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden">
      <ConfigPanel />

      <main className="flex-1 ml-80 flex items-center justify-center text-slate-500 bg-[#0A0A0A]">
        {/* Placeholder main view area */}
        <div className="text-center space-y-2">
          <p className="text-sm font-mono">ASCII Preview Area</p>
          <p className="text-xs text-slate-600">Upload an image from the sidebar to preview.</p>
        </div>
      </main>
    </div>
  )
}

export default App
