import { FilteredValueType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import { IconButton } from "@mui/material"
import Button from "@mui/material/Button"
import { Delete } from "@mui/icons-material"
import { SuperCheckbox } from "./SuperCheckbox"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type PropsType = {
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
  changeTodolistTitle: (id: string, newTitle: string) => void
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

  const changeTaskStatusHandler = (tID: string, checked: boolean) => {
      props.changeTaskStatus(tID,checked, props.id )
  }

  return (
    <div>

      <h3>
        <EditableSpan onChange={changeTodolistTitle} title={props.title} />
        <IconButton onClick={removeTodoListButton}>
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTask} />

      {props.tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <div>
          {props.tasks.map(el => {

            const onRemoveHandler = () => props.removeTask(el.id, props.id)

            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(el.id, newValue, props.id)
            }

            return <div key={el.id} className={el.isDone ? 'is-done' : ''}>
              <SuperCheckbox
                checked={el.isDone}
                callBack={(checked)=>changeTaskStatusHandler(el.id, checked)}
              />
              <EditableSpan title={el.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={onRemoveHandler}>
                <Delete />
              </IconButton>
            </div>
          }
          )}
        </div>
      )}
      <div>
        <Button variant={props.filter === 'All' ? "contained" : 'text'} onClick={onAllClickHandler}>All</Button>
        <Button color={"primary"} variant={props.filter === 'Active' ? "contained" : 'text'} onClick={onActiveClickHandler}>Active</Button>
        <Button color={"secondary"} variant={props.filter === 'Completed' ? "contained" : 'text'} onClick={onCompletedClickHandler}>Completed</Button>
      </div>
    </div>
  )





}



