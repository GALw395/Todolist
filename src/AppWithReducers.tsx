import { useReducer} from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTasksAC, changeTasksStatusAC, changeTasksTitleAC, removeTasksAC, tasksReducer } from './state/tasks-reducer';

export type FilteredValueType = 'All' | 'Active' | 'Completed'

export type TodoListsPropsType = {
    id: string,
    title: string,
    filter: FilteredValueType

}

export type TasksStateType = {
    [key: string]: Array<TaskType>
    
}

function AppWithReducers() {

    let todoListId1 = v1()
    let todoListId2 = v1()
    
    let [todoLists, dispatchToTodoListReducer] = useReducer(todolistsReducer, [
        { id: todoListId1, title: 'What to learn', filter: 'All' },
        { id: todoListId2, title: 'What to buy', filter: 'All' }
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
    })
    
    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTasksAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTasksAC(title, todolistId))
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTasksStatusAC(taskId, isDone, todolistId))
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTasksTitleAC(taskId, newTitle, todolistId))
    }

    
    function changeFilter(value: FilteredValueType, todolistId: string) {        
        dispatchToTodoListReducer(changeTodolistFilterAC(todolistId, value))
    }
    let removeTodolist = (todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatchToTasksReducer(action)
        dispatchToTodoListReducer(action)
    }
    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchToTodoListReducer(changeTodolistTitleAC(id, newTitle))
    }
    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodoListReducer(action)
    } 


    return (
        <div className="App">

            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge="start" color='inherit' aria-label='menu'>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((el) => {

                        let tasksForTodolist = tasksObj[el.id]
                        if (el.filter === 'Active') {
                            tasksForTodolist = tasksForTodolist.filter(el => el.isDone === false)
                        }
                        if (el.filter === 'Completed') {
                            tasksForTodolist = tasksForTodolist.filter(el => el.isDone === true)
                        }

                        return (
                            <Grid item>
                                <Paper style={ {padding: "20px"} }>
                                    <Todolist
                                        key={el.id}
                                        id={el.id}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div >
    )
}

export default AppWithReducers;
