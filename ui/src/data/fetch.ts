import Pocketbase, { ClientResponseError } from 'pocketbase'
import { BACKEND_URL } from '../config'
import { Participant, ParticipantData } from './dataTypes'

const client = new Pocketbase(BACKEND_URL)

export async function fetchParticipant(participantId: string) {
  try {
    const participantData = await client.collection('participants').getOne<ParticipantData>(participantId, {
      expand: 'desire,assignedReceiver,assignedReceiver.desire',
    })
    if (!participantData.expand.desire) {
      console.warn('participantData does not have a desire assigned')
    }
    return {
      id: participantData.id,
      name: participantData.name,
      desireId: participantData.desire,
      wants: participantData.expand.desire?.wants ?? '',
      assignedReceiverDesireId: participantData.expand.assignedReceiver?.expand.desire?.id,
      assignedReceiverWants: participantData.expand.assignedReceiver?.expand.desire?.wants,
    }
  } catch (e) {
    const error = <ClientResponseError>e
    if (error.status === 404) {
      return Error('not found')
    } else if (error.isAbort) {
      return null
    } else {
      console.log(`error: ${JSON.stringify(error)}`)
      return null
    }
  }
}

export function updateWants(participant: Participant, wants: string, setError: (isError: boolean) => void) {
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
      setError(false)
    })
    .catch(() => setError(true))
}
