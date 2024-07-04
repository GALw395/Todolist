import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"


export type RemoveTasksActionType = ReturnType<typeof removeTaskstAC>

export type AddTasksActionType = ReturnType<typeof addTasksAC>

export type ChangeTasksTitleActionType = ReturnType<typeof changeTasksTitleAC>

export type ChangeTasksStatusActionType = ReturnType<typeof changeTasksStatusAC>


type ActionsType = RemoveTasksActionType
    | AddTasksActionType
    | ChangeTasksTitleActionType
    | ChangeTasksStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // let tasks = state[action.payload.todolistId]
            // let filteredTasks = tasks.filter(el => el.id !== action.payload.id)
            // state[action.payload.todolistId] = filteredTasks
            // return { ...state }
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id) }
        }
        case 'ADD-TASK': {
            // let newTask = { id: v1(), title: action.payload.title, isDone: false }          
            // let tasks = state[action.payload.todolistId]
            // let newTasks = [newTask, ...tasks]
            // state[action.payload.todolistId] = newTasks
            // return { ...state }
            let newTask = { id: v1(), title: action.payload.title, isDone: false }
            return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
        }
        case 'CHANGE-TASK-TITLE': {
            // let tasks = state[action.payload.todolistId]
            // let task = tasks.find(t => t.id === action.payload.taskId)
            // if (task) {
            //     task.title = action.payload.newTitle
            // }
            // return { ...state }
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    el => el.id === action.payload.taskId ? { ...el, title: action.payload.newTitle } : el
                )
            }
        }
        case 'CHANGE-TASK-STATUS': {
            // let tasks = state[action.payload.todolistId]
            // let task = tasks.find(t => t.id === action.payload.taskId)
            // if (task) {task.isDone = action.payload.isDone}
            // return { ...state }
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(
                        el => el.id === action.payload.taskId ? { ...el, isDone: action.payload.isDone } : el
                    )
            }
        }
        case 'ADD-TODOLIST': {
            return { ...state, [action.payload.todolistId]: [] }
        }
        case 'REMOVE-TODOLIST': {
            // let { [action.payload.todolistId] : [], ...rest } = state  
            // return rest                        //другой вариант удаления из массива объект по ключу с помощью диструктуризации
            let copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        default:
            return state
    }
}
export const removeTaskstAC = (id: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', payload: { id, todolistId } } as const
}

export const addTasksAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', payload: { title, todolistId } } as const
}

export const changeTasksTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return { type: 'CHANGE-TASK-TITLE', payload: { taskId, newTitle, todolistId } } as const
}

export const changeTasksStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', payload: { taskId, isDone, todolistId } } as const
}


