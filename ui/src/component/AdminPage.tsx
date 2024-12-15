import { useEffect, useMemo, useState } from 'react'
import { adminFetchParticipants, adminUpdateAssignedReceiver } from '../data/backendClient'
import { adminKeyFromURL, participantIdFromURL, participantURLFromId } from '../data/session'
import { AdminParticipantData } from '../data/datatypes'
import { Button, Container, Group, Table, Text } from '@mantine/core'
import { translate } from '../intl/translate'
import { LoadingPage } from './LoadingPage'
import { ErrorPage } from './ErrorPage'
import { included, randomlyAssignReceivers } from '../data/shuffle'
import { ADMIN_PARTICIPANT_ID } from '../config'

export const AdminPage = () => {
  const [loading, setLoading] = useState(true)
  const [participants, setParticipants] = useState<AdminParticipantData[]>([])
  const [fetchError, setFetchError] = useState(false)
  const [updateError, setUpdateError] = useState(false)
  const [hidden, setHidden] = useState(true)
  const toggleHidden = () => setHidden(!hidden)

  const adminParticipantId = useMemo(participantIdFromURL, [location.pathname])!
  const adminKey = useMemo(adminKeyFromURL, [location.pathname])!

  const fetchParticipants = () => {
    adminFetchParticipants(adminParticipantId, adminKey)
      .then(p => {
        setLoading(false)
        if (p instanceof Error) {
          setFetchError(true)
        } else if (p) {
          setFetchError(false)
          setParticipants(p)
        }
      })
      .catch(() => {})
  }

  const [pendingUpdates, setPendingUpdates] = useState(0)
  const addPendingUpdate = () => setPendingUpdates(pendingUpdates + 1)
  const removePendingUpdate = () => setPendingUpdates(pendingUpdates - 1)
  const pendingUpdateDone = (isSuccess: boolean) => {
    if (isSuccess) {
      setUpdateError(false)
      removePendingUpdate()
    } else {
      setUpdateError(true)
      removePendingUpdate()
    }
  }
  const randomlyUpdateReceivers = () => {
    const assigned = included(randomlyAssignReceivers(participants))
    assigned.forEach(participant => {
      addPendingUpdate()
      adminUpdateAssignedReceiver(
        adminParticipantId,
        adminKey,
        participant.id,
        participant.assignedReceiver!,
        pendingUpdateDone,
      )
    })
  }
  const clearReceivers = () => {
    participants.forEach(participant => {
      addPendingUpdate()
      adminUpdateAssignedReceiver(adminParticipantId, adminKey, participant.id, '', pendingUpdateDone)
    })
  }

  useEffect(() => {
    if (pendingUpdates > 0) {
      return
    }
    fetchParticipants()
  }, [pendingUpdates])

  if (loading) {
    return <LoadingPage />
  }

  if (fetchError || participants.length === 0) {
    return <ErrorPage error="Could not fetch participants. Check if the key is correct" />
  }

  const displayAssignedReceiver = (assignedReceiver: string | undefined) => {
    if (!assignedReceiver) {
      return translate('none')
    } else {
      const found = participants.find(participant => participant.id === assignedReceiver)!
      return hidden ? translate('hidden') : found.name
    }
  }

  const rows = participants
    .filter(participant => participant.id != ADMIN_PARTICIPANT_ID)
    .map(participant => (
      <Table.Tr key={participant.id}>
        <Table.Td>
          <a href={participantURLFromId(participant.id) ?? ''}>{participant.id}</a>
        </Table.Td>
        <Table.Td>{participant.name}</Table.Td>
        <Table.Td>{participant.desire}</Table.Td>
        <Table.Td>{participant.isDesireSet ? '✓' : '✕'}</Table.Td>
        <Table.Td>{displayAssignedReceiver(participant.assignedReceiver)}</Table.Td>
        <Table.Td>{participant.exclude ? '✓' : '✕'}</Table.Td>
      </Table.Tr>
    ))

  return (
    <Container size="lg" mt="lg">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>{translate('ID')}</Table.Td>
            <Table.Td>{translate('Name')}</Table.Td>
            <Table.Td>{translate('Desire ID (Gift ID)')}</Table.Td>
            <Table.Td>{translate('Desire set')}</Table.Td>
            <Table.Td>
              {translate('Assigned receiver')}
              <Button size="compact-xs" onClick={toggleHidden} ml="sm">
                {hidden ? translate('show') : translate('hide')}
              </Button>
            </Table.Td>
            <Table.Td>{translate('Excluded')}</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Group mt="md">
        <Button
          onClick={() => {
            randomlyUpdateReceivers()
            fetchParticipants()
          }}
        >
          {translate('Shuffle receivers')}
        </Button>
        <Button onClick={clearReceivers} variant="subtle">
          {translate('Clear receivers')}
        </Button>
      </Group>
      {updateError && <Text>{translate('There is a problem with updating receivers')}</Text>}
    </Container>
  )
}
