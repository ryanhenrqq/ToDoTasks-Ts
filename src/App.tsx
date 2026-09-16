import React, { useEffect, useState } from 'react'

import addIcon from './assets/more.svg'
import clearIcon from './assets/clear.png'
import hourglassIcon from './assets/hourglass.svg'
import monthIcon from './assets/month.svg'
import timerIcon from './assets/timer.svg'
import trashIcon from './assets/trash.svg'

import doneIcon from './assets/ok-symbol.svg'

import './App.css'

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

interface NoteUpdaterHeaderProp{
  note: Note[]
  onChange: (newNote: Note[]) => void
}
function Header({note, onChange}: NoteUpdaterHeaderProp) {
  const [createView, setCreateView] = useState<boolean>(false)

  const handleCreateView = () => {
    !createView ? setCreateView(true) : setCreateView(false)
  }
  const handleDeleteAll = () => {
    onChange([])
  }
  return (
    <>
      <header>
          <div className="left-side">
            <img src='/task.svg' alt="Tarefas" />
            <h1>To-Do Tasks</h1>
          </div>
          <div className="right-side">
            <button><img src={addIcon} alt="Adicionar" id="popup-add-note" onClick={handleCreateView}
            style={createView ? { transform: 'rotate(45deg)'} : { transform: 'rotate(0deg)'}}
            /></button>
            {note.length>0 &&
              <button><img src={clearIcon} alt="Limpar Lista" id="clear-all" onClick={handleDeleteAll} /></button>
            }
            
          </div>
      </header>
      {createView ? <CreateTask onChange={onChange} /> : null}
    </>
  )
}

function CleanView() {
  return (
    <>
      <main className="all-done-main" id="all-done-main">
          <img src={doneIcon} alt="Tudo Feito" />
          <b>Todas as suas tarefas estão feitas! Adicione uma nova tarefa no +.</b>
          <a href="#">Sinta-se à vontade de dar um feedback diretamente ao dev.</a>
      </main>
    </>
  )
}

interface TaskViewProps{
  note: Note[],
  onChangeNotes: (newNotes: Note[]) => void
}
function TasksView({note, onChangeNotes}: TaskViewProps) {
  const handleDeleteSingleNote = (excludeId: string) => {
    const upList = note.filter((notes) => notes.id !== excludeId)
    onChangeNotes(upList)
    localStorage.setItem('notes-storage', JSON.stringify(upList))
  }
  return (
    <>
      <main className="tasker-listing" id="tasker-listing">
          <div className="today-list pad-hor" id="today-list">
            <div className="title-list"><img src={hourglassIcon} alt="Ampulheta" />Para Hoje</div>
            {note.map((note) => (
              <div key={note.id}>
                <TaskCard title={note.noteTitle}
                    description={note.noteDesc}
                    date={note.noteDate}
                    hour={note.noteTime}
                    onDelete={() => handleDeleteSingleNote(note.id)}              
                    />
                </div>
            ))}
          </div>
          <div className="tomorrow-list pad-hor" id="tomorrow-list">
            <div className="title-list"><img src={hourglassIcon} alt="Ampulheta" />Amanhã</div>
          </div>
          <div className="weekly-list pad-hor" id="weekly-list">
            <div className="title-list"><img src={monthIcon} alt="Ampulheta" />Esta Semana</div>
          </div>
          <div className="alltime-list pad-hor" id="alltime-list">
            <div className="title-list"><img src={monthIcon} alt="Ampulheta" />Todo o Tempo</div>
          </div>
      </main>
    </>
  )
}

interface Note{
  id: string,
  noteTitle: string,
  noteDesc:string,
  noteDate:string,
  noteTime:string
}
interface TaskCardsProps {
  title: string,
  description: string,
  date: string,
  hour: string
  onDelete: () => void
}
function TaskCard({title, description, date, hour, onDelete}: TaskCardsProps) {
  return(
    <>
      <div className="task-object">         
        <div className="left-side-tsk-obj">
            <b className="three-dotter-set">{title}</b>
            <i className="three-dotter-set">{description}</i>
        </div>
        <div className="right-side-tsk-obj">
            <div className="rsto-txt">
                <b>{date}</b>
                <i>{hour}</i>
            </div>
            <img src={timerIcon} className="timer-ch-note" alt="Temporizador" />
            <img src={trashIcon} alt="Lixeira" className="trash-ind-note" onClick={onDelete} />
        </div>
      </div>
    </>
  )
}

interface NoteCreatorProps{
  onChange: (newNote: Note[]) => void
}
function CreateTask({onChange}: NoteCreatorProps) {
  // Handler pra definir o horario, se assim preferir o usuario
  const [timeView, setTimeView] = useState<boolean>(false)
  const handleTimeView = () => {
    !timeView ? setTimeView(true) : setTimeView(false)
  }
  const [noteTitle, setNoteTitle] = useState('')
  const [noteDesc, setNoteDesc] = useState('')
  const [noteDate, setNoteDate] = useState('')
  const [noteTime, setNoteTime] = useState('')
  const handleCreate = () => {
    console.log(noteTitle, noteDesc, noteDate, noteTime, Date.now())

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

interface NoteTimeProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
function TimeViewCreateTask({value, onChange}: NoteTimeProps) {
  return <input type="time" name="time-set" id="time-set" value={value} onChange={onChange} />
}

export default App
