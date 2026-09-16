import './taskview.css'
import type { TaskViewProps, TaskCardsProps } from '../../types/types'

import hourglassIcon from '../../assets/hourglass.svg'
//import monthIcon from '../../assets/month.svg'
import timerIcon from '../../assets/timer.svg'
import trashIcon from '../../assets/trash.svg'
import doneIcon from '../../assets/ok-symbol.svg'

export function TasksView({note, onChangeNotes}: TaskViewProps) {
  const handleDeleteSingleNote = (excludeId: string) => {
    const upList = note.filter((notes) => notes.id !== excludeId)
    onChangeNotes(upList)
    localStorage.setItem('notes-storage', JSON.stringify(upList))
  }
  return (
    <>
      <main className="tasker-listing" id="tasker-listing">
          <div className="today-list pad-hor" id="today-list">
            <div className="title-list"><img src={hourglassIcon} alt="Ampulheta" />Proximas Tarefas</div>
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
      </main>
    </>
  )
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
            <img src={timerIcon} className="timer-ch-note" alt="Temporizador" style={{display:'none'}} />
            <img src={trashIcon} alt="Lixeira" className="trash-ind-note" onClick={onDelete} />
        </div>
      </div>
    </>
  )
}

export function CleanView() {
  return (
    <>
      <main className="all-done-main" id="all-done-main">
          <img src={doneIcon} alt="Tudo Feito" />
          <b>Todas as suas tarefas estão feitas! Adicione uma nova tarefa no +.</b>
          <a href="https://ryanhenrqq.github.io/RHSCode/#/direct" target='_blank'>Sinta-se à vontade de dar um feedback diretamente ao dev.</a>
      </main>
    </>
  )
}