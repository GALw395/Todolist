import { combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


export type AppRootState = ReturnType<typeof rootReducer>


export const store = legacy_createStore(rootReducer)

