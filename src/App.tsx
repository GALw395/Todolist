import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';

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
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: true },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: true },
    ])

    let [filter, setFilter] = useState<FilteredValueType>('All')

    
    function removeTask(id: number) {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter (value: FilteredValueType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter( el => el.isDone === false )
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter( el => el.isDone === true )
    }

// function filterTasks(title) {
//         if ()
//         let filtTasks = tasks.filter( el => el.isDone )
//     }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter} />
        </div>
    )
}

export default App;
