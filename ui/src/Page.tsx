import { useEffect, useState } from 'react'
import { fetchParticipant } from './data/backendClient'
import { Participant } from './data/datatypes'
import { ErrorPage } from './component/ErrorPage'
import { LoadingPage } from './component/LoadingPage'
import { AdminPage } from './component/AdminPage'
import { isAdmin, participantIdFromURL } from './data/session'
import { ParticipantPage } from './component/ParticipantPage'

export const Page = () => {
  const participantId = participantIdFromURL()
  if (!participantId) {
    return <ErrorPage error="Error: participantId is required" />
  }

  if (isAdmin()) {
    return <AdminPage />
  }

  const [loading, setLoading] = useState(true)
  const [participant, setParticipant] = useState<Participant | null>(null)
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    fetchParticipant(participantId).then(p => {
      setLoading(false)
      if (p instanceof Error) {
        setFetchError(true)
      } else if (p) {
        setFetchError(false)
        setParticipant(p)
      }
    })
  }, [participantId])

  if (fetchError) {
    return <ErrorPage error="Participant was not found" />
  }

  if (loading || !participant) {
    return <LoadingPage />
  }

  return <ParticipantPage participant={participant} />
}
