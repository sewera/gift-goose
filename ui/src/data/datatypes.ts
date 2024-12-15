export type DesireData = {
  id: string
  wants: string
}

export type ParticipantData = {
  id: string
  name: string
  desire: string
  expand: {
    desire?: DesireData
    assignedReceiver?: {
      expand: {
        desire?: DesireData
      }
    }
  }
}

export type Participant = {
  id: string
  name: string
  desireId: string
  wants: string
  assignedReceiverDesireId?: string
  assignedReceiverWants?: string
}

export type AdminParticipantData = {
  id: string
  name: string
  assignedReceiver?: string
  desire?: string
  expand: {
    desire?: DesireData
  }
  isDesireSet?: boolean
  exclude: boolean
}
