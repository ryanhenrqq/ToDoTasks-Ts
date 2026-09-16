import { useState } from 'react'
import './header.css'
import type { NoteUpdaterHeaderProp } from '../../types/types'
import { CreateTask } from '../creator/notecreator'

import addIcon from '../../assets/more.svg'
import clearIcon from '../../assets/clear.png'

export function Header({note, onChange}: NoteUpdaterHeaderProp) {
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