export type ParticipantData = {
  id: string
  name: string
  assignedReceiver: string
  giver: boolean
}

export type Participant = {
  name: string
  assignedReceiver: string
}

export type DesireData = {
  id: string
  participant: string
  wants: string
  expand: {
    participant: {
      name: string
    }
  }
}

export type Desire = {
  participantName: string
  wants: string
}
