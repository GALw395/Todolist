import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilteredValueType = 'All' | 'Active' | 'Completed'

type TodoListsPropsType = {
    id: string,
    title: string,
    filter: FilteredValueType

}

type TasksStateType = {
    [key: string]: Array<TaskType>

}

function App() {


    // const tasks1: TaskType[] = [
    //     { id: 1, title: 'HTML&CSS', isDone: true },
    //     { id: 2, title: 'JS', isDone: true },
    //     { id: 3, title: 'ReactJS', isDone: false },
    //     { id: 4, title: 'Redux', isDone: true },
    //     { id: 5, title: 'Typescript', isDone: false },
    //     { id: 6, title: 'RTK query', isDone: true },
    // ]


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

    let todoListId1 = v1()
    let todoListId2 = v1()


    let [todoLists, setTodoList] = useState<Array<TodoListsPropsType>>([
        { id: todoListId1, title: 'What to learn', filter: 'All' },
        { id: todoListId2, title: 'What to buy', filter: 'All' }
    ])

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
            <AddItemForm addItem={addTodolist} />
            {todoLists.map((el) => {

                let tasksForTodolist = tasksObj[el.id]
                if (el.filter === 'Active') {
                    tasksForTodolist = tasksForTodolist.filter(el => el.isDone === false)
                }
                if (el.filter === 'Completed') {
                    tasksForTodolist = tasksForTodolist.filter(el => el.isDone === true)
                }

                return (
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
                )
            })}
        </div>
    )
}

export default App;
