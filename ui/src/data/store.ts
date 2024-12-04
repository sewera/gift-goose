import { create } from 'zustand'
import { Participant } from './dataTypes'

export type State = {
  participant: Participant | null
  error: Error | null

  setParticipant: (participants: Participant) => void
  setError: (error: Error | null) => void
}
export type SetState = (partial: State | Partial<State> | ((state: State) => State | Partial<State>)) => void

const store = (set: SetState): State => ({
  participant: null,
  error: null,

  setParticipant: participant => set({ participant }),
  setError: error => set({ error }),
})

export const useStore = create<State>()(store)
