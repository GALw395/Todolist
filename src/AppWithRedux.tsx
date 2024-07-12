import './App.css';
import { TaskType, Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer';
import { addTasksAC, changeTasksStatusAC, changeTasksTitleAC, removeTasksAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilteredValueType = 'All' | 'Active' | 'Completed'

export type TodoListsPropsType = {
    id: string,
    title: string,
    filter: FilteredValueType

}

export type TasksStateType = {
    [key: string]: Array<TaskType>

}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootState, Array<TodoListsPropsType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTasksAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatch(addTasksAC(title, todolistId))
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTasksStatusAC(taskId, isDone, todolistId))
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch(changeTasksTitleAC(taskId, newTitle, todolistId))
    }


    function changeFilter(value: FilteredValueType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }
    let removeTodolist = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }
    function changeTodolistTitle(id: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }
    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
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
                <Grid container style={{ padding: "20px" }}>
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
                                <Paper style={{ padding: "20px" }}>
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

export default AppWithRedux;
