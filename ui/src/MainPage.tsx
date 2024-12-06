import { Badge, Button, Card, Container, createTheme, Group, MantineProvider, Text, TextInput } from '@mantine/core'
import { fetchParticipant, updateWants } from './data/fetch'
import { useStore } from './data/store'
import { FC, ReactNode, useEffect, useState } from 'react'

const participantIdRegex = new RegExp('([0-9]{4})')

function getParticipantId() {
  const matches = participantIdRegex.exec(location.pathname)
  return matches ? matches[1] : undefined
}

interface ProviderProps {
  children: ReactNode
}

const Provider: FC<ProviderProps> = ({ children }) => {
  const theme = createTheme({})
  return <MantineProvider theme={theme}>{children}</MantineProvider>
}

export const MainPage = () => {
  const participantId = getParticipantId()
  if (!participantId) {
    return <Provider>Error: participantId is required</Provider>
  }

  const participant = useStore(state => state.participant)
  const error = useStore(state => state.error)

  const setParticipant = useStore(state => state.setParticipant)
  const setError = useStore(state => state.setError)

  const [editMode, setEditMode] = useState(false)
  const [participantWants, setParticipantWants] = useState(participant?.wants ?? '')

  useEffect(() => {
    fetchParticipant(participantId, setParticipant, setError)
  }, [participantId])

  if (error || !participant) {
    return <Provider>Participant was not found. Error: {JSON.stringify(error)}</Provider>
  }

  return (
    <Provider>
      <Container size="sm">
        <Card shadow="sm" padding="md" radius="md">
          <Group justify="space-between" my="md">
            <Text fw="bold">{participant.name}</Text>
            <Group>
              <Badge size="sm" color="red">
                set your wish
              </Badge>
              <Badge size="sm" color="yellow">
                not assigned
              </Badge>
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
                  updateWants(participant, participantWants, setError)
                  setEditMode(false)
                }}
              >
                Set
              </Button>
            ) : (
              <Button onClick={() => setEditMode(true)}>Edit</Button>
            )}
          </Group>
        </Card>

        <Card shadow="sm" padding="md" radius="md">
          {participant.assignedReceiverDesireId && participant.assignedReceiverWants ? (
            <>
              <Text fw="bold">Assigned receiver</Text>
              <Text>{participant.assignedReceiverWants}</Text>
              <Text>
                Put on the gift: <b>{participant.assignedReceiverDesireId}</b>
              </Text>
            </>
          ) : (
            <>
              <Text fw="bold">No assigned receiver</Text>
            </>
          )}
        </Card>
      </Container>
    </Provider>
  )
}
