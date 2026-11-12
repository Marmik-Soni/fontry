import Canvas from './components/Canvas'
import Controls from './components/Controls'

export default function App() {
  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Canvas area */}
      <div className="flex-1 min-h-0 min-w-0 overflow-hidden">
        <Canvas />
      </div>

      {/* Controls panel */}
      <div className="w-full shrink-0 md:w-80 md:h-full">
        <Controls />
      </div>
    </div>
  )
}
