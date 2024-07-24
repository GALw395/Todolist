import { IconButton } from "@mui/material"
import { EditableSpan } from "./EditableSpan"
import { SuperCheckbox } from "./SuperCheckbox"
import { Delete } from "@mui/icons-material"
import { TaskType } from "./Todolist"
import { memo, useCallback } from "react"

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    el: TaskType
    todolistId: string
}


export const Task = memo((props: TaskPropsType) => {

    const changeTaskStatusHandler = (tID: string, checked: boolean) => {
        props.changeTaskStatus(tID, checked, props.todolistId)
    }

    const onRemoveHandler = () => props.removeTask(props.el.id, props.todolistId)

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.el.id, newValue, props.todolistId)
    }, [props.changeTaskTitle, props.el.id, props.todolistId])

    return <div key={props.el.id} className={props.el.isDone ? 'is-done' : ''}>
        <SuperCheckbox
            checked={props.el.isDone}
            callBack={(checked) => changeTaskStatusHandler(props.el.id, checked)}
        />
        <EditableSpan title={props.el.title} onChange={onChangeTitleHandler} />
        <IconButton onClick={onRemoveHandler}>
            <Delete />
        </IconButton>
    </div>

})