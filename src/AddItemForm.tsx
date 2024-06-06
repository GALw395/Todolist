import { ChangeEvent, KeyboardEvent, useState } from "react"

export type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (el: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(el.currentTarget.value)
  }

  const onKeyPressHandler = (el: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (el.key === 'Enter') {
      addTaskButton()
    }
  }

  const addTaskButton = () => {

    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('Title is required')
    }

  }

  return (
    <div>

      <input value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler} className={error ? 'error' : ''} />
      <button onClick={addTaskButton}>+</button>
      {error && <div className="error-message">{error}</div>}

    </div>
  )

}