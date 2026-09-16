export interface NoteUpdaterHeaderProp{
  note: Note[]
  onChange: (newNote: Note[]) => void
}

export interface TaskViewProps{
  note: Note[],
  onChangeNotes: (newNotes: Note[]) => void
}

export interface Note{
  id: string,
  noteTitle: string,
  noteDesc:string,
  noteDate:string,
  noteTime:string
}
export interface TaskCardsProps {
  title: string,
  description: string,
  date: string,
  hour: string
  onDelete: () => void
}

export interface NoteTimeProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface NoteCreatorProps{
  onChange: (newNote: Note[]) => void
}