import { AdminParticipantData } from './datatypes'

export function shuffleReceivers(participants: AdminParticipantData[]) {
  for (let i = 0; i < 100; i++) {
    const included = structuredClone(participants).filter(participant => !participant.exclude)
    const excluded = structuredClone(participants).filter(participant => participant.exclude)

    const shuffled = shuffleArray(included)
    const valid = assign(included, shuffled)
    if (valid) {
      return [...included, ...excluded]
    }
  }

  console.warn('Could not properly shuffle and assign receivers')
  return participants
}

function assign(target: AdminParticipantData[], shuffled: AdminParticipantData[]) {
  for (let i = 0; i < target.length; i++) {
    target[i].assignedReceiver = shuffled[i].id
    if (target[i].assignedReceiver === target[i].id) {
      return false
    }
  }
  return true
}

function shuffleArray<T>(array: T[]): T[] {
  const cloned = structuredClone(array)
  for (let i = cloned.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cloned[i], cloned[j]] = [cloned[j], cloned[i]]
  }
  return cloned
}
