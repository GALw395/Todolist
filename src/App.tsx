import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilteredValueType = 'All' | 'Active' | 'Completed'

function App() {


    // const tasks1: TaskType[] = [
    //     { id: 1, title: 'HTML&CSS', isDone: true },
    //     { id: 2, title: 'JS', isDone: true },
    //     { id: 3, title: 'ReactJS', isDone: false },
    //     { id: 4, title: 'Redux', isDone: true },
    //     { id: 5, title: 'Typescript', isDone: false },
    //     { id: 6, title: 'RTK query', isDone: true },
    // ]

    let [tasks, setTasks] = useState<TaskType[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: true },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: true },
    ])


    let [filter, setFilter] = useState<FilteredValueType>('All')


    function removeTask(id: string) {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTask = { id: v1(), title: title, isDone: false }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)


    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])

    }

    function changeFilter(value: FilteredValueType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(el => el.isDone === false)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(el => el.isDone === true)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />


        </div>
    )
}

export default App;
