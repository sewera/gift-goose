import {
  Badge,
  Button,
  Card,
  Center,
  Container,
  createTheme,
  Group,
  Loader,
  MantineProvider,
  Text,
  TextInput,
} from '@mantine/core'
import { fetchParticipant, updateWants } from './data/fetch'
import { FC, ReactNode, useEffect, useState } from 'react'
import { Participant } from './data/dataTypes'

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
    return <Provider>Participant was not found.</Provider>
  }

  if (loading || !participant) {
    return (
      <Provider>
        <Container size="sm">
          <Center>
            <Loader />
          </Center>
        </Container>
      </Provider>
    )
  }

  return (
    <Provider>
      <Container size="sm">
        <Card shadow="sm" padding="md" radius="md">
          <Group justify="space-between" my="md">
            <Text fw="bold">{participant.name}</Text>
            <Group>
              {participant.wants || participantWants ? (
                <></>
              ) : (
                <Badge size="sm" color="red">
                  set your wish
                </Badge>
              )}
              {participant.assignedReceiverDesireId ? (
                <></>
              ) : (
                <Badge size="sm" color="yellow">
                  not assigned
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
                Set
              </Button>
            ) : (
              <Button onClick={() => setEditMode(true)}>Edit</Button>
            )}
          </Group>
          {updateError && <Text>There is a problem with updating your gift preference. Please try again.</Text>}
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
