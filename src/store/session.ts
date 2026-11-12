import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Session } from '../types'

const defaults: Session = {
  text: 'Type something',
  x: 0.5,
  y: 0.5,
  font: { source: 'system', family: 'system-ui' },
  size: 64,
  weight: 400,
  lineHeight: 1.2,
  letterSpacing: 0,
  wordSpacing: 0,
  align: 'center',
  textCase: 'none',
  color: '#111111',
  opacity: 1,
  background: '',
}

interface SessionStore extends Session {
  update: (partial: Partial<Session>) => void
  reset: () => void
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      ...defaults,
      update: (partial) => set(partial),
      reset: () => set(defaults),
    }),
    {
      name: 'fontry-session',
      version: 1,
      partialize: (state) => {
        const { update: _, reset: __, ...session } = state
        return session as Session
      },
    },
  ),
)

