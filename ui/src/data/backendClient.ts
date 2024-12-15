import Pocketbase, { ClientResponseError } from 'pocketbase'
import { BACKEND_HOST } from '../config'
import {
  AdminParticipantData,
  AdminParticipantDataExpanded,
  DesireData,
  Participant,
  ParticipantData,
} from './datatypes'

const client = new Pocketbase(BACKEND_HOST)

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
    return handleError(e)
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

export async function adminFetchParticipants(adminParticipantId: string, adminKey: string) {
  try {
    const adminParticipantData = await client.collection('participants').getFullList<AdminParticipantDataExpanded>({
      expand: 'desire',
      headers: {
        'X-Participant-Id': adminParticipantId,
        'X-Admin-Key': adminKey,
      },
    })

    return adminParticipantData.map(participant => ({
      ...participant,
      isDesireSet: !!participant.expand.desire?.wants,
    }))
  } catch (e) {
    return handleError(e)
  }
}

export function adminUpdateAssignedReceiver(
  adminParticipantId: string,
  adminKey: string,
  participantId: string,
  assignedReceiverParticipantId: string,
  done: (isSuccess: boolean) => void,
) {
  client
    .collection('participants')
    .update(
      participantId,
      { assignedReceiver: assignedReceiverParticipantId },
      {
        headers: {
          'X-Participant-Id': adminParticipantId,
          'X-Admin-Key': adminKey,
        },
      },
    )
    .then(() => {
      done(true)
    })
    .catch(() => done(false))
}

export function adminAddNewParticipant(
  adminParticipantId: string,
  adminKey: string,
  newParticipantName: string,
  done: (isSuccess: boolean) => void,
) {
  client
    .collection('desires')
    .create<DesireData>(
      {},
      {
        headers: {
          'X-Participant-Id': adminParticipantId,
          'X-Admin-Key': adminKey,
        },
      },
    )
    .then(desireData => {
      client
        .collection('participants')
        .create<AdminParticipantData>(
          { name: newParticipantName, desire: desireData.id },
          {
            headers: {
              'X-Participant-Id': adminParticipantId,
              'X-Admin-Key': adminKey,
            },
          },
        )
        .then(() => {
          done(true)
        })
        .catch(() => done(false))
    })
    .catch(() => done(false))
}

function handleError(e: any) {
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
