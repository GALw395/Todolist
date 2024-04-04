import './App.css';
import { Todolist } from './Todolist';



function App() {
    const tasks1 = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: true },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: true },
    ]

    const tasks2 = []

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1} />
            <Todolist title="Songs" tasks={tasks2} />
        </div>
    )
}

export default App;
