import { ControlPoint } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
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

      <TextField
        label={'bla bla'}
        variant={'outlined'}
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTaskButton} color={"primary"}>
        <ControlPoint />
      </IconButton>

    </div>
  )

}