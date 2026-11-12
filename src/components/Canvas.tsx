import { useSessionStore } from '../store/session'
import TextBlock from './TextBlock'

export default function Canvas() {
  const background = useSessionStore((s) => s.background)

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: background || '#f5f5f4',
      }}
    >
      <TextBlock />
    </div>
  )
}

