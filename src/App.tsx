import { useEffect, useState } from 'react'

import './App.css'
import type { Note } from './types/types'
import { Header } from './components/header/header'
import { TasksView, CleanView } from './components/views/taskview'

function App() {
  const [noteList, setNoteList] = useState<Note[]>([])
  const [allowNots, setAllowNots] = useState(false)
  const [requestingNots, setRequestingNots] = useState(false)
  useEffect(() => {
    const checker = JSON.parse(localStorage.getItem('notes-storage') ?? '[]');
    setNoteList(checker)
    if (Notification.permission !== 'granted'){
      setAllowNots(false)
    } else {
      setAllowNots(true)
    }
  }, []);
  const updateNotes = (newNotes: Note[]) => {
    if (!requestingNots){
      setRequestingNots(true)
      givePerms()
    } else {
      if (Notification.permission !== 'granted'){
        setAllowNots(false)
        setRequestingNots(true)
      } else {
        setAllowNots(true)
        setRequestingNots(false)
      }
    }
    console.log(newNotes)  //debug
    console.log(noteList)  //debug
    setNoteList(newNotes);
    localStorage.setItem('notes-storage', JSON.stringify(newNotes));
  };
  return (
    <>
      <Header note={noteList} onChange={updateNotes} />
      {noteList.length == 0 ? <CleanView /> : <TasksView note={noteList} onChangeNotes={updateNotes} />}
      <div className="center-ver">
        {!allowNots ? <b>Notificações bloqueadas</b>:null}
      </div>
    </>
  )
}

async function givePerms(): Promise<boolean> {
  if (!("Notification" in window)){
    console.error('Notificações Indisponíveis')
  }
  if (Notification.permission === 'granted'){
    return true
  }
  if (Notification.permission !== 'denied'){
    const perm = await Notification.requestPermission()
    return perm === 'granted'
  }
  return false
}

export default App