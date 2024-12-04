import Pocketbase from 'pocketbase'
import { BACKEND_URL } from '../config'
import { Participant, ParticipantData } from './dataTypes'

const client = new Pocketbase(BACKEND_URL)

type ErrorHandler = (error: Error | null) => void

export const updateWants = (participant: Participant, wants: string, setError: ErrorHandler) => {
  client
    .collection('desires')
    .update(
      participant.desireId,
      { wants },
      {
        headers: {
          'X-Participant-Id': participant.id,
        },
      },
    )
    .then(() => {
      setError(null)
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
    .getOne<ParticipantData>(participantId, {
      expand: 'desire,assignedReceiver,assignedReceiver.desire',
    })
    .then(
      (participantData): Participant => ({
        id: participantData.id,
        name: participantData.name,
        desireId: participantData.desire,
        wants: participantData.expand.desire.wants,
        assignedReceiverDesireId: participantData.expand.assignedReceiver?.expand.desire.id,
        assignedReceiverWants: participantData.expand.assignedReceiver?.expand.desire.wants,
      }),
    )
    .then(participant => {
      console.log(`participant: ${JSON.stringify(participant)}`)
      return participant
    })
    .then(participant => {
      setParticipant(participant)
      setError(null)
    })
    .catch(error => setError(error))
}
