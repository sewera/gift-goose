import { useEffect, useState } from 'react'
import { Badge, Button, Card, Center, Container, Group, Loader, Text, TextInput } from '@mantine/core'
import { fetchParticipant, updateWants } from './data/fetch'
import { Participant } from './data/dataTypes'
import { translate } from './intl/translate'

const participantIdRegex = new RegExp('([0-9]{4})')

function getParticipantId() {
  const matches = participantIdRegex.exec(location.pathname)
  return matches ? matches[1] : undefined
}

export const MainPage = () => {
  const participantId = getParticipantId()
  if (!participantId) {
    return <>{translate('Error: participantId is required')}</>
  }

  const [loading, setLoading] = useState(true)
  const [participant, setParticipant] = useState<Participant | null>(null)
  const [participantWants, setParticipantWants] = useState('')

  const [editMode, setEditMode] = useState(false)

  const [fetchError, setFetchError] = useState(false)
  const [updateError, setUpdateError] = useState(false)

  useEffect(() => {
    fetchParticipant(participantId).then(p => {
      setLoading(false)
      if (p instanceof Error) {
        setFetchError(true)
      } else if (p) {
        setFetchError(false)
        setParticipant(p)
        setParticipantWants(p.wants)
      }
    })
  }, [participantId])

  if (fetchError) {
    return <>{translate('Participant was not found')}</>
  }

  if (loading || !participant) {
    return (
      <>
        <Container size="sm">
          <Center>
            <Loader />
          </Center>
        </Container>
      </>
    )
  }

  return (
    <>
      <Container size="sm">
        <Card shadow="sm" padding="md" radius="md">
          <Group justify="space-between" my="md">
            <Text fw="bold">{participant.name}</Text>
            <Group>
              {participant.wants || participantWants ? (
                <></>
              ) : (
                <Badge size="sm" color="red">
                  {translate('set your wish')}
                </Badge>
              )}
              {participant.assignedReceiverDesireId ? (
                <></>
              ) : (
                <Badge size="sm" color="yellow">
                  {translate('not assigned')}
                </Badge>
              )}
            </Group>
          </Group>

          {editMode ? (
            <TextInput
              value={participantWants}
              onChange={event => setParticipantWants(event.currentTarget.value)}
            ></TextInput>
          ) : (
            <Text>{participantWants ?? participant.wants}</Text>
          )}
          <Group justify="space-between">
            {editMode ? (
              <Button
                onClick={() => {
                  updateWants(participant, participantWants, setUpdateError)
                  setEditMode(false)
                }}
              >
                {translate('Set')}
              </Button>
            ) : (
              <Button onClick={() => setEditMode(true)}>{translate('Edit')}</Button>
            )}
          </Group>
          {updateError && (
            <Text>{translate('There is a problem with updating your gift preference. Please try again')}</Text>
          )}
        </Card>

        <Card shadow="sm" padding="md" radius="md">
          {participant.assignedReceiverDesireId && participant.assignedReceiverWants ? (
            <>
              <Text fw="bold">{translate('Assigned receiver')}</Text>
              <Text>{participant.assignedReceiverWants}</Text>
              <Text>
                {translate('Put on the gift:')} <b>{participant.assignedReceiverDesireId}</b>
              </Text>
            </>
          ) : (
            <>
              <Text fw="bold">{translate('No assigned receiver')}</Text>
            </>
          )}
        </Card>
      </Container>
    </>
  )
}
