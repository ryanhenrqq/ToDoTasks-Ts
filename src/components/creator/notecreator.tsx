import { useEffect, useState } from 'react'

import './notecreator.css'
import type { NoteCreatorProps, Note, NoteTimeProps } from '../../types/types'

export function CreateTask({onChange}: NoteCreatorProps) {
  // Handler pra definir o horario, se assim preferir o usuario
  const [timeView, setTimeView] = useState<boolean>(false)
  const handleTimeView = () => {
    if (!timeView) {
      const actualDate: Date = new Date()
      const hour = actualDate.getHours()
      const min = actualDate.getMinutes()
      const locHour = `${hour}:${min}`
      setNoteTime(locHour)
      setTimeView(true)
    } else {
      setNoteTime('')
      setTimeView(false)
    }
  }
  const [noteTitle, setNoteTitle] = useState('')
  const [noteDesc, setNoteDesc] = useState('')
  const [noteDate, setNoteDate] = useState('')
  const [noteTime, setNoteTime] = useState('')
  const handleCreate = () => {
    console.log(noteTitle, noteDesc, noteDate, noteTime, Date.now())
    if (noteTitle==""&&noteDesc==""){
      console.log("Nenhuma nota adicionada")
      return
    }

    const newNote: Note = {
      id: String(Date.now()),
      noteTitle,
      noteDesc,
      noteDate,
      noteTime
    }
    const savedNotes = localStorage.getItem('notes-storage')
    const noteList: Note[] = savedNotes ? JSON.parse(savedNotes) : []
    const listUpdater = [...noteList, newNote]
    console.log(listUpdater)
    localStorage.setItem('notes-storage', JSON.stringify(listUpdater))
    setNoteTitle('')
    setNoteDesc('')
    setNoteDate('')
    setNoteTime('')
    onChange([...noteList, newNote])
  }

  useEffect(() => {
    const actualDate: Date = new Date()
    const y = actualDate.getFullYear()
    const m = String(actualDate.getMonth() + 1).padStart(2, '0')
    const d = String(actualDate.getDate()).padStart(2, '0')
    
    const locDate = `${y}-${m}-${d}`
    
    console.log(locDate)
    setNoteDate(locDate)
  }, [timeView])
  return (
    <>
      <div className="create-pop" id="create-pop">
          <div className="flex-hor pup-title" id="normal-title-popup-div">
              <b>Criar nova Tarefa</b>
          </div>
          <div className="list-flex-hor" id="save-changes-new-popup" style={{ display: 'none'}}>
              <b>Descartar?</b>
              <button id="save-option-yes" className="pup-buttons">Sim</button>
              <button id="save-option-no" className="pup-buttons">Não</button>
          </div>
          <div className="list-flex-hor">
              <p>Titulo</p>
              <input type="text" id="title-set"
                value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
          </div>
          <div className="list-flex-hor">
              <p>Descrição</p>
              <textarea id="desc-set" value={noteDesc} onChange={(e) => setNoteDesc(e.target.value)}></textarea>
          </div>
          <div className="list-flex-hor">
              <p>Data</p>
              <input type="date" name="date-set" id="date-set" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} />
          </div>
          <p><input type="checkbox" name="activate-time" id="activate-time" onChange={handleTimeView} />Horario</p>
          {timeView ? <TimeViewCreateTask value={noteTime} onChange={(e) => setNoteTime(e.target.value)} /> : null}
          <button id="button-set" className="pup-buttons" onClick={handleCreate}>Criar</button>
      </div>
    </>
  )
}

function TimeViewCreateTask({value, onChange}: NoteTimeProps) {
  return <input type="time" name="time-set" id="time-set" value={value} onChange={onChange} />
}