import { useCallback, useEffect, useRef } from 'react'
import { useSessionStore } from '../store/session'

const TEXT_CASE_MAP: Record<string, string> = {
  none: 'none',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
}

/**
 * Plain-text editable block positioned at (x, y) fractions of the canvas.
 *
 * Auto-sizing approach: we use a hidden <span> mirror element that shares the
 * same font/text styles. On every input we copy the text content into the
 * mirror and read its scrollWidth/scrollHeight, then apply those as explicit
 * width/height on the editable <div>. This is the most cross-browser-reliable
 * technique — `field-sizing: content` is not yet supported in Firefox/Safari,
 * and a <textarea> would need manual row/col calculation.
 */
export default function TextBlock() {
  const {
    text, x, y, font, size, weight, lineHeight, letterSpacing,
    wordSpacing, align, textCase, color, opacity, update,
  } = useSessionStore()

  const editableRef = useRef<HTMLDivElement>(null)
  const mirrorRef = useRef<HTMLSpanElement>(null)

  // Sync mirror dimensions → editable
  const syncSize = useCallback(() => {
    const mirror = mirrorRef.current
    const editable = editableRef.current
    if (!mirror || !editable) return

    // Copy text into mirror. We append a zero-width space so that trailing
    // newlines contribute to the measured height.
    mirror.textContent = editable.textContent + '\u200b'
    editable.style.width = `${mirror.scrollWidth}px`
    editable.style.height = `${mirror.scrollHeight}px`
  }, [])

  // Resize on mount and whenever text-related styles change
  useEffect(() => {
    syncSize()
  }, [syncSize, text, size, weight, lineHeight, letterSpacing, wordSpacing, font.family, textCase])

  // Sync store text → DOM when it changes externally (e.g. reset)
  useEffect(() => {
    const el = editableRef.current
    if (el && el.textContent !== text) {
      el.textContent = text
      syncSize()
    }
  }, [text, syncSize])

  const handleInput = () => {
    const el = editableRef.current
    if (!el) return
    update({ text: el.textContent ?? '' })
    syncSize()
  }

  // Strip formatting on paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const plain = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, plain)
  }

  const sharedStyles: React.CSSProperties = {
    fontFamily: font.family,
    fontSize: `${size}px`,
    fontWeight: weight,
    lineHeight,
    letterSpacing: `${letterSpacing}em`,
    wordSpacing: `${wordSpacing}em`,
    textAlign: align,
    textTransform: TEXT_CASE_MAP[textCase] as React.CSSProperties['textTransform'],
    whiteSpace: 'pre',
  }

  return (
    <>
      {/* Hidden mirror for measuring */}
      <span
        ref={mirrorRef}
        aria-hidden
        style={{
          ...sharedStyles,
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          // Must match editable padding/border exactly
          padding: 0,
          border: 'none',
          display: 'inline-block',
        }}
      />

      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onInput={handleInput}
        onPaste={handlePaste}
        style={{
          ...sharedStyles,
          position: 'absolute',
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          transform: 'translate(-50%, -50%)',
          color,
          opacity,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          resize: 'none',
          padding: 0,
          cursor: 'text',
          minWidth: '1px',
          minHeight: '1em',
        }}
      />
    </>
  )
}

