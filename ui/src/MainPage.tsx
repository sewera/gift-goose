import { Button, createTheme, MantineProvider } from '@mantine/core'
import { fetchDesires, fetchParticipant, updateWants } from './data/fetch'
import { useStore } from './data/store'
import { FC, ReactNode } from 'react'

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
  const desires = useStore(state => state.desires)
  const error = useStore(state => state.error)

  const setParticipant = useStore(state => state.setParticipant)
  const setDesires = useStore(state => state.setDesires)
  const setError = useStore(state => state.setError)

  fetchDesires(setDesires, setError)
  fetchParticipant(participantId, setParticipant, setError)

  if (error) return <Provider>Participant was not found</Provider>
  return (
    <Provider>
      <p>Participant: ${JSON.stringify(participant)}</p>
      <p>Desires: ${JSON.stringify(desires)}</p>
      <Button onClick={() => updateWants(participantId, 'test', setError)}>Click me!</Button>
    </Provider>
  )
}
