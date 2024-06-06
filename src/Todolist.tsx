import { ChangeEvent } from "react"
import { FilteredValueType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"

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
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string)=>void
}

export const Todolist = (props: PropsType) => {

  const onAllClickHandler = () => props.changeFilter('All', props.id)
  const onActiveClickHandler = () => props.changeFilter('Active', props.id)
  const onCompletedClickHandler = () => props.changeFilter('Completed', props.id)
  const removeTodoListButton = () => props.removeTodolist(props.id)
  const addTask = (title: string) => props.addTask(title, props.id)

  const changeTodolistTitle = (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle)
  }

  return (
    <div>

      <h3>
        <EditableSpan onChange={changeTodolistTitle} title={props.title} />
        <button onClick={removeTodoListButton}>x</button>
      </h3>

      <AddItemForm addItem={addTask} />

      {props.tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {props.tasks.map(el => {

            const onRemoveHandler = () => props.removeTask(el.id, props.id)
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
            }

            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(el.id, newValue, props.id)
            }

            return <li key={el.id} className={el.isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                onChange={onChangeStatusHandler}
                checked={el.isDone} />
              <EditableSpan title={el.title} onChange={onChangeTitleHandler} />
              <button onClick={onRemoveHandler}>x</button>
            </li>
          }
          )}
        </ul>
      )}
      <div>
        <button className={props.filter === 'All' ? "active-filter" : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'Active' ? "active-filter" : ''} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'Completed' ? "active-filter" : ''} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )





}



