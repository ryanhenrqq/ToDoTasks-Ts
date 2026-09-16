import React, { useEffect, useState } from 'react'

import addIcon from './assets/more.svg'
import clearIcon from './assets/clear.png'

import doneIcon from './assets/ok-symbol.svg'

import './App.css'

function App() {
  return (
    <>
      <Header />
      <CleanView />
    </>
  )
}

function Header() {
  const [createView, setCreateView] = useState<boolean>(false)

  const handleCreateView = () => {
    !createView ? setCreateView(true) : setCreateView(false)
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
            <button><img src={clearIcon} alt="Limpar Lista" id="clear-all" /></button>
          </div>
      </header>
      {createView ? <CreateTask /> : null}
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

function CreateTask() {
  // Handler pra definir o horario, se assim preferir o usuario
  const [timeView, setTimeView] = useState<boolean>(false)
  const handleTimeView = () => {
    !timeView ? setTimeView(true) : setTimeView(false)
  }
  // Apenas temporario enquanto o programa não esta funcional
  const [errorView, setErrorView] = useState<boolean>(false)
  const handleShowError = () => {
    setErrorView(true)
  }
  useEffect(() => {
    if (!errorView) return

    const countdown = setTimeout(() => {
      setErrorView(false)
    }, 3000)

    return () => clearTimeout(countdown)
  }, [errorView])
  
  const [noteTitle, setNoteTitle] = useState('')
  const [noteDesc, setNoteDesc] = useState('')
  const [noteDate, setNoteDate] = useState('')
  const [noteTime, setNoteTime] = useState('')
  const handleCreate = () => {
    console.log(noteTitle, noteDesc, noteDate, noteTime)
    handleShowError() // temporario apenas pra nao dar erro

    // TRATAMENTO PRO LOCAL STORAGE > EXIBIÇÃO PRO USUARIO AO ATUALIZAR - PROXIMO PASSO
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
          {errorView ? <NotFunctionalFeature /> : null}
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
function NotFunctionalFeature() {
  return <span style={{ color: 'red' }}>Sinto muito, esta função está desabilitada agora!</span>
}

export default App
