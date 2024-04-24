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
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: FilteredValueType
}

export const Todolist = ({ title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter }: PropsType) => {

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)


  const onNewTitleChangeHandler = (el: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(el.currentTarget.value)
  }


  const addTaskButton = () => {

    if (newTaskTitle.trim() !== '') {
      addTask(newTaskTitle.trim())
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

            const onRemoveHandler = () => removeTask(el.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => (
              changeTaskStatus(el.id, e.currentTarget.checked)
            )

            return <li key={el.id} className={ el.isDone ? 'is-done' : ''}>
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
        <button className={ filter === 'All' ? "active-filter" : ''} onClick={onAllClickHandler}>All</button>
        <button className={ filter === 'Active' ? "active-filter" : ''} onClick={onActiveClickHandler}>Active</button>
        <button className={ filter === 'Completed' ? "active-filter" : ''} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}