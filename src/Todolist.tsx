import { FilteredValueType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import { IconButton } from "@mui/material"
import Button from "@mui/material/Button"
import { Delete } from "@mui/icons-material"
import { SuperCheckbox } from "./SuperCheckbox"
import { memo, useCallback } from "react"
import { Task } from "./Task"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type PropsType = {
  id: string
  title: string
  tasks: TaskType[]
  changeFilter: (value: FilteredValueType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  filter: FilteredValueType
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  removeTask: (id: string, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {


  const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])

  const removeTodoListButton = () => props.removeTodolist(props.id)

  const changeTodolistTitle = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }, [props.changeTodolistTitle, props.id])

  // const changeTaskStatusHandler = (tID: string, checked: boolean) => {
  //   props.changeTaskStatus(tID, checked, props.id)
  // }

  const onAllClickHandler = useCallback(() => props.changeFilter('All', props.id), [props.changeFilter, props.id])
  const onActiveClickHandler = useCallback(() => props.changeFilter('Active', props.id), [props.changeFilter, props.id])
  const onCompletedClickHandler = useCallback(() => props.changeFilter('Completed', props.id), [props.changeFilter, props.id])

  let tasksForTodolist = props.tasks
  if (props.filter === 'Active') {
    tasksForTodolist = props.tasks.filter(el => el.isDone === false)
  }
  if (props.filter === 'Completed') {
    tasksForTodolist = props.tasks.filter(el => el.isDone === true)
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
          {props.tasks.map(el => <Task
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            el={el}
            removeTask={props.removeTask}
            todolistId={props.id}
            key={el.id}
          />
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
})
