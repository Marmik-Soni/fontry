import { useSessionStore } from '../store/session'

export default function Controls() {
  const reset = useSessionStore((s) => s.reset)

  return (
    <div className="flex h-full flex-col gap-4 border-l border-neutral-200 bg-white p-4">
      <h1 className="text-lg font-semibold text-neutral-900">Fontry</h1>
      <button
        type="button"
        onClick={reset}
        className="rounded border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100"
      >
        Reset
      </button>
    </div>
  )
}

