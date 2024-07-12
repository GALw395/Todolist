import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType, todoListId1, todoListId2 } from "./todolists-reducer"


export type RemoveTasksActionType = ReturnType<typeof removeTasksAC>

export type AddTasksActionType = ReturnType<typeof addTasksAC>

export type ChangeTasksTitleActionType = ReturnType<typeof changeTasksTitleAC>

export type ChangeTasksStatusActionType = ReturnType<typeof changeTasksStatusAC>


type ActionsType = RemoveTasksActionType
    | AddTasksActionType
    | ChangeTasksTitleActionType
    | ChangeTasksStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


const initialState: TasksStateType = {
    [todoListId1]: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: true },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: true },
    ],
    [todoListId2]: [
        { id: v1(), title: 'Milk', isDone: true },
        { id: v1(), title: 'Book', isDone: true },
        { id: v1(), title: 'Apple', isDone: false },
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id) }
        }
        case 'ADD-TASK': {
            let newTask = { id: v1(), title: action.payload.title, isDone: false }
            return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    el => el.id === action.payload.taskId ? { ...el, title: action.payload.newTitle } : el
                )
            }
        }
        case 'CHANGE-TASK-STATUS': {
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
            let copyState = { ...state }
            delete copyState[action.payload.todolistId]
            return copyState
        }
        default:
            return state
    }
}
export const removeTasksAC = (id: string, todolistId: string) => {
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


