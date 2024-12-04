import { Note } from '../domain/Note'
import Pocketbase from 'pocketbase'
import { BACKEND_URL } from '../config'

const client = new Pocketbase(BACKEND_URL)

export const fetchNotes = (setNotes: (notes: Note[]) => void) => {
  client
    .collection('notes')
    .getList<Note>(1, 30, {
      expand: 'author.job',
    })
    .then(({ items: notesData }) => {
      console.log(notesData)
      setNotes(notesData)
    })
}

type Action = 'create' | 'update' | 'delete'

export const streamNotes = (
  addNote: (note: Note) => void,
  updateNote: (note: Note) => void,
  deleteNote: (note: Note) => void,
) => {
  client.realtime.subscribe('notes', ({ action, record }) => {
    const note = record as Note
    switch (action as Action) {
      case 'create':
        addNote(note)
        break
      case 'update':
        updateNote(note)
        break
      case 'delete':
        deleteNote(note)
    }
  })
}
