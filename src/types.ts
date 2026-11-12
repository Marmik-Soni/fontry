export type FontSource = 'system' | 'google' | 'upload' | 'local'

export interface Session {
  text: string
  x: number // 0–1 fraction of canvas width
  y: number // 0–1 fraction of canvas height
  font: { source: FontSource; family: string; fileKey?: string }
  size: number // px
  weight: number // 1–1000
  lineHeight: number // unitless
  letterSpacing: number // em
  wordSpacing: number // em
  align: 'left' | 'center' | 'right'
  textCase: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  color: string // hex
  opacity: number // 0–1
  background: string // CSS gradient string, or '' for neutral
}

