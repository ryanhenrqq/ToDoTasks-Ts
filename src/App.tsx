import { useEffect, useState } from 'react'

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
            <button><img src={addIcon} alt="Adicionar" id="popup-add-note" onClick={handleCreateView} /></button>
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
  return (
    <>
      <div className="create-pop" id="create-pop">
          <div className="flex-hor pup-title" id="normal-title-popup-div">
              <b>Criar nova Tarefa</b>
              <button id="close-new-popup" disabled>Cancelar</button>
              {/* Plano - Integrar esse botao de cancelar ao header */}
          </div>
          <div className="list-flex-hor" id="save-changes-new-popup" style={{ display: 'none'}}>
              <b>Descartar?</b>
              <button id="save-option-yes" className="pup-buttons">Sim</button>
              <button id="save-option-no" className="pup-buttons">Não</button>
          </div>
          {errorView ? <NotFunctionalFeature /> : null}
          <div className="list-flex-hor">
              <p>Titulo</p>
              <input type="text" id="title-set" />
          </div>
          <div className="list-flex-hor">
              <p>Descrição</p>
              <textarea id="desc-set"></textarea>
          </div>
          <div className="list-flex-hor">
              <p>Data</p>
              <input type="date" name="date-set" id="date-set" />
          </div>
          <p><input type="checkbox" name="activate-time" id="activate-time" onChange={handleTimeView} />Horario</p>
          {timeView ? <TimeViewCreateTask /> : null}
          <button id="button-set" className="pup-buttons" onClick={handleShowError}>Criar</button>
      </div>
    </>
  )
}

function TimeViewCreateTask() {
  return <input type="time" name="time-set" id="time-set" />
}
function NotFunctionalFeature() {
  return <span style={{ color: 'red' }}>Sinto muito, esta função está desabilitada agora!</span>
}

export default App
