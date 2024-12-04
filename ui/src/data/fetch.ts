import Pocketbase from 'pocketbase'
import { BACKEND_URL } from '../config'
import { Desire, DesireData, Participant, ParticipantData } from './dataTypes'

const client = new Pocketbase(BACKEND_URL)

type ErrorHandler = (error: Error) => void

export const fetchDesires = (setDesires: (desires: Desire[]) => void, setError: ErrorHandler) => {
  client
    .collection('desires')
    .getFullList<DesireData>({
      expand: 'participant',
      fields: '*,expand.participant.name',
    })
    .then(desiresData => {
      const desires: Desire[] = desiresData.map(d => ({ participantName: d.expand.participant.name, wants: d.wants }))
      setDesires(desires)
    })
    .catch(error => setError(error))
}

export const updateWants = (participantId: string, wants: string, setError: ErrorHandler) => {
  client
    .collection('desires')
    .getFirstListItem<DesireData>(`participant = "${participantId}"`)
    .then(desireData => {
      desireData.id
      client.collection('desires').update(
        desireData.id,
        { wants },
        {
          headers: {
            'X-Participant-Id': participantId,
          },
        },
      )
    })
    .catch(error => setError(error))
}

export const fetchParticipant = (
  participantId: string,
  setParticipant: (participant: Participant) => void,
  setError: ErrorHandler,
) => {
  client
    .collection('participants')
    .getOne<ParticipantData>(participantId)
    .then(participantData => {
      setParticipant(participantData)
    })
    .catch(error => setError(error))
}
