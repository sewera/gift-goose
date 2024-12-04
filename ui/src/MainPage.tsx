import { Button, createTheme, MantineProvider, TextInput } from '@mantine/core'
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

  useEffect(() => {
    fetchParticipant(participantId, setParticipant, setError)
  }, [participantId])
  const [participantWants, setParticipantWants] = useState(participant?.wants ?? '')

  if (error) return <Provider>Participant was not found. Error: {JSON.stringify(error)}</Provider>
  return (
    <Provider>
      <p>Name: {participant?.name}</p>
      <p>Wants: {participant?.wants}</p>
      {participant?.assignedReceiverWants ? (
        <p>Assigned receiver wants: {participant.assignedReceiverWants}</p>
      ) : (
        <p>No assigned receiver</p>
      )}
      {participant?.assignedReceiverDesireId ? <p>Put on the gift: {participant.assignedReceiverDesireId}</p> : <></>}
      <TextInput
        value={participantWants}
        onChange={event => setParticipantWants(event.currentTarget.value)}
      ></TextInput>
      <Button
        onClick={() => {
          if (participant) updateWants(participant, participantWants, setError)
        }}
      >
        Click me!
      </Button>
    </Provider>
  )
}
