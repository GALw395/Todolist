import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilteredValueType } from "./App"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeFilter: (value: FilteredValueType) => void
  addTask: (title: string) => void
}

export const Todolist = ({ title, tasks, removeTask, changeFilter, addTask }: PropsType) => {

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const onNewTitleChangeHandler = (el: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(el.currentTarget.value)
  }

  const onKeyPressHandler = (el: KeyboardEvent<HTMLInputElement>) => {
    if (el.key === 'Enter') {
      addTask(newTaskTitle)
      setNewTaskTitle('')
    }
  }

  const addTaskButton = () => {
    addTask(newTaskTitle)
    setNewTaskTitle('')
  }

  const onAllClickHandler = () => changeFilter('All')
  const onActiveClickHandler = () => changeFilter('Active')
  const onCompletedClickHandler = () => changeFilter('Completed')

  return (
    <div>

      <h3>{title}</h3>

      <div>

        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler} />

        <button onClick={addTaskButton}>+</button>

      </div>

      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(el => {

            const onRemoveHandler = () => removeTask(el.id)

            return <li key={el.id}>
              <input type="checkbox" checked={el.isDone} />
              <span>{el.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          }
          )}
        </ul>
      )}
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}