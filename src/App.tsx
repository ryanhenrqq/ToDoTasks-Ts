import { useEffect, useState } from 'react'

import './App.css'
import type { Note } from './types/types'
import { Header } from './components/header/header'
import { TasksView, CleanView } from './components/views/taskview'

function App() {
  const [noteList, setNoteList] = useState<Note[]>([])
  useEffect(() => {
    const checker = JSON.parse(localStorage.getItem('notes-storage') ?? '[]');
    setNoteList(checker)
  }, []);
  const updateNotes = (newNotes: Note[]) => {
    console.log(newNotes)
    console.log(noteList)
    setNoteList(newNotes);
    localStorage.setItem('notes-storage', JSON.stringify(newNotes));
  };
  return (
    <>
      <Header note={noteList} onChange={updateNotes} />
      {noteList.length == 0 ? <CleanView /> : <TasksView note={noteList} onChangeNotes={updateNotes} />}
    </>
  )
}

export default App