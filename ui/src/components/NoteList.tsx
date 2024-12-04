import { Card, Text } from '@mantine/core'
import { Note } from '../domain/Note'

interface NoteCardProps {
  note: Note
}

const NoteCard = ({ note }: NoteCardProps) => (
  <Card shadow="sm" p="lg" radius="md" withBorder>
    <Text>{note.title}</Text>
    <Text>{note.body}</Text>
  </Card>
)

export interface NoteListProps {
  notes: Note[]
}

export const NoteList = ({ notes }: NoteListProps) => (
  <div>{notes.length ? notes.map(note => <NoteCard key={note.id} {...{ note }} />) : <Text>Empty</Text>}</div>
)
