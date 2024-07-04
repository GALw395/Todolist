import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export type FilteredValueType = 'All' | 'Active' | 'Completed'

export type TodoListsPropsType = {
    id: string,
    title: string,
    filter: FilteredValueType

}

export type TasksStateType = {
    [key: string]: Array<TaskType>
    
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()
    
    let [todoLists, setTodoList] = useState<Array<TodoListsPropsType>>([
        { id: todoListId1, title: 'What to learn', filter: 'All' },
        { id: todoListId2, title: 'What to buy', filter: 'All' }
    ])

    let [tasksObj, setTasks] = useState<TasksStateType>({
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
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(el => el.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({ ...tasksObj })
    }
    function addTask(title: string, todolistId: string) {
        let newTask = { id: v1(), title: title, isDone: false }
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({ ...tasksObj })


    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]

        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({ ...tasksObj })
        }

    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]

        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({ ...tasksObj })
        }

    }

    
    function changeFilter(value: FilteredValueType, todolistId: string) {
        let todoList = todoLists.find(el => el.id === todolistId)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }
    let removeTodolist = (todoListId: string) => {
        let filteredTodolist = todoLists.filter(el => el.id !== todoListId)
        setTodoList(filteredTodolist)
        delete tasksObj[todoListId]
        setTasks({ ...tasksObj })
    }
    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todoLists.find(el => el.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoList([...todoLists])
        }
    }
    function addTodolist(title: string) {
        let todolist: TodoListsPropsType = { id: v1(), title: title, filter: 'All' }
        setTodoList([todolist, ...todoLists])
        setTasks(
            {
                ...tasksObj,
                [todolist.id]: []
            }
        )
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

export default App;
