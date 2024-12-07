import { useEffect, useState } from 'react'
import { adminFetchParticipants } from '../data/backendClient'
import { adminKeyFromURL, participantIdFromURL, participantURLFromId } from '../data/session'
import { AdminParticipantData } from '../data/datatypes'
import { Button, Container, Table } from '@mantine/core'
import { translate } from '../intl/translate'
import { LoadingPage } from './LoadingPage'
import { ErrorPage } from './ErrorPage'

export const AdminPage = () => {
  const [loading, setLoading] = useState(true)
  const [participants, setParticipants] = useState<AdminParticipantData[]>([])
  const [fetchError, setFetchError] = useState(false)
  const [updateError, setUpdateError] = useState(false)

  useEffect(() => {
    const adminParticipantId = participantIdFromURL()
    const adminKey = adminKeyFromURL()
    adminFetchParticipants(adminParticipantId!, adminKey!).then(p => {
      setLoading(false)
      if (p instanceof Error) {
        setFetchError(true)
      } else if (p) {
        setFetchError(false)
        setParticipants(p)
      }
    })
  }, [])

  if (fetchError || participants.length === 0) {
    return <ErrorPage error="Could not fetch participants. Check if the key is correct" />
  }

  if (loading) {
    return <LoadingPage />
  }

  const rows = participants.map(participant => (
    <Table.Tr key={participant.id}>
      <Table.Td>
        <a href={participantURLFromId(participant.id) ?? ''}>{participant.id}</a>
      </Table.Td>
      <Table.Td>{participant.name}</Table.Td>
      <Table.Td>{participant.desire}</Table.Td>
      <Table.Td>{participant.assignedReceiver || translate('none')}</Table.Td>
      <Table.Td>{participant.exclude ? '✓' : '✕'}</Table.Td>
    </Table.Tr>
  ))

  return (
    <Container size="lg">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>{translate('ID')}</Table.Td>
            <Table.Td>{translate('Name')}</Table.Td>
            <Table.Td>{translate('Desire ID (Gift ID)')}</Table.Td>
            <Table.Td>{translate('Assigned receiver')}</Table.Td>
            <Table.Td>{translate('Excluded')}</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Button onClick={() => {}}>{translate('Shuffle receivers')}</Button>
    </Container>
  )
}
