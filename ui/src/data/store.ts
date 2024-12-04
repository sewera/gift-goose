import { create } from 'zustand'
import { Desire, Participant } from './dataTypes'

export type State = {
  participant: Participant | null
  desires: Desire[]
  error: Error | null

  setParticipant: (participants: Participant) => void
  setDesires: (desires: Desire[]) => void
  setError: (error: Error | null) => void
}
export type SetState = (partial: State | Partial<State> | ((state: State) => State | Partial<State>)) => void

const store = (set: SetState): State => ({
  participant: null,
  desires: [],
  error: null,

  setParticipant: participant => set({ participant }),
  setDesires: desires => set({ desires }),
  setError: error => set({ error }),
})

export const useStore = create<State>()(store)
