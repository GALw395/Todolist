import { v1 } from "uuid";
import { TasksStateType, TodoListsPropsType } from "../App";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer";
import { addTasksAC, changeTasksStatusAC, changeTasksTitleAC, removeTaskstAC, tasksReducer } from "./tasks-reducer";

let todolistId1 = v1()
let todolistId2 = v1()
let todolistId3 = v1()
let todolistId4 = v1()

let newTodolistTitle = 'New Todolist'

const startState: Array<TodoListsPropsType> = [
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' }
]

const endStateCase1 = todolistsReducer(startState, removeTodolistAC(todolistId1))
const endStateCase2 = todolistsReducer(startState, addTodolistAC(newTodolistTitle))
const endStateCase3 = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, newTodolistTitle))
const endStateCase4 = todolistsReducer(startState, changeTodolistFilterAC(todolistId1, 'All'))



const startStateTASKS: TasksStateType = {
    [todolistId1]: [
        { id: "1", title: 'HTML&CSS', isDone: true },
        { id: "2", title: 'JS', isDone: true },
        { id: "3", title: 'ReactJS', isDone: false }
    ],
    [todolistId2]: [
        { id: "1", title: 'Milk', isDone: true },
        { id: "2", title: 'Book', isDone: true },
        { id: "3", title: 'Apple', isDone: false }
    ]
}


const endStateTasksCase1 = tasksReducer(startStateTASKS, removeTaskstAC("1", todolistId1))
const endStateTasksCase2 = tasksReducer(startStateTASKS, addTasksAC( 'newTask', todolistId1))
const endStateTasksCase3 = tasksReducer(startStateTASKS, changeTasksTitleAC('2', 'newTitle', todolistId2))
const endStateTasksCase4 = tasksReducer(startStateTASKS, changeTasksStatusAC("3", true, todolistId2))