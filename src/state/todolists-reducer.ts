import { v1 } from "uuid"
import { FilteredValueType, TodoListsPropsType } from "../App"


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>


type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: Array<TodoListsPropsType> = [
    { id: todoListId1, title: 'What to learn', filter: 'All' },
    { id: todoListId2, title: 'What to buy', filter: 'All' }
]

export const todolistsReducer = (state: Array<TodoListsPropsType> = initialState, action: ActionsType): Array<TodoListsPropsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [...state, { id: action.payload.todolistId, title: action.payload.title, filter: 'All' }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.id ? { ...el, title: action.payload.title } : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el)
        }
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', payload: { todolistId } } as const
}

export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', payload: { title, todolistId: v1() } } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id: todolistId, title } } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilteredValueType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id: todolistId, filter } } as const
}