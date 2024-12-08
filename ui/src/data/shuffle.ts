import { AdminParticipantData } from './datatypes'

export function shuffleReceivers(participants: AdminParticipantData[]) {
  for (let i = 0; i < 100; i++) {
    const target = included(participants)
    const excludedParticipants = excluded(participants)

    const shuffled = shuffleArray(target)
    const valid = assign(target, shuffled)
    if (valid) {
      return [...target, ...excludedParticipants]
    }
  }

  console.warn('Could not properly shuffle and assign receivers')
  return participants
}

export function included(participants: AdminParticipantData[]) {
  return structuredClone(participants).filter(participant => !participant.exclude)
}

function excluded(participants: AdminParticipantData[]) {
  return structuredClone(participants).filter(participant => participant.exclude)
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
