import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilteredValueType } from "./App"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: TaskType[]
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilteredValueType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilteredValueType
  removeTodolist: (todolistId: string) => void
}

export const Todolist = ({ id, title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, removeTodolist }: PropsType) => {

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)


  const onNewTitleChangeHandler = (el: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(el.currentTarget.value)
  }


  const addTaskButton = () => {

    if (newTaskTitle.trim() !== '') {
      addTask(newTaskTitle.trim(), id)
      setNewTaskTitle('')
    } else {
      setError('Title is required')
    }

  }
  const onKeyPressHandler = (el: KeyboardEvent<HTMLInputElement>) => {
    setError(null)

    if (el.key === 'Enter') {
      addTaskButton()
    }

    // if (newTaskTitle.trim() !== '' && el.key === 'Enter') {
    //   setError(null)
    //   addTask(newTaskTitle.trim())
    //   setNewTaskTitle('')
    // } else {
    //   setError('Title is required')
    // }
  }

  const onAllClickHandler = () => changeFilter('All', id)
  const onActiveClickHandler = () => changeFilter('Active', id)
  const onCompletedClickHandler = () => changeFilter('Completed', id)
  const removeTodoListButton = () => {
    removeTodolist(id)
  }

  return (
    <div>

      <h3>{title}<button onClick={ removeTodoListButton }>x</button></h3>

      <div>

        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTaskButton}>+</button>

        {error && <div className="error-message">{error}</div>}

      </div>

      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(el => {

            const onRemoveHandler = () => removeTask(el.id, id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => (
              changeTaskStatus(el.id, e.currentTarget.checked, id)
            )

            return <li key={el.id} className={el.isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={el.isDone} />
              <span>{el.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          }
          )}
        </ul>
      )}
      <div>
        <button className={filter === 'All' ? "active-filter" : ''} onClick={onAllClickHandler}>All</button>
        <button className={filter === 'Active' ? "active-filter" : ''} onClick={onActiveClickHandler}>Active</button>
        <button className={filter === 'Completed' ? "active-filter" : ''} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}