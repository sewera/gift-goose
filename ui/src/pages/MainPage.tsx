import { Container, MantineProvider, Title } from '@mantine/core'
import { useEffect } from 'react'
import { NoteList } from '../components/NoteList'
import { fetchNotes, streamNotes } from '../data/fetch'
import { useStore } from '../data/store'
export const MainPage = () => {
  useEffect(() => {
    const { addOrUpdateNote, deleteNote, setNotes } = useStore.getState()
    fetchNotes(setNotes)
    streamNotes(addOrUpdateNote, addOrUpdateNote, deleteNote)
  }, [])

  const notes = useStore(state => Object.values(state.notes))

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">Hello</div>
      <Container size="xs" p="md">
        <Title order={2}>Fetched notes</Title>
        <NoteList {...{ notes }} />
      </Container>
    </MantineProvider>
  )
}
