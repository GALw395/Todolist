import { FilteredValueType } from "./App"
import { Button } from "./Button"

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: number)=>void
  changeFilter: (value: FilteredValueType)=>void
}

export const Todolist = ({ title, tasks, removeTask, changeFilter }: PropsType) => {



  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(el => <li key={el.id}>
            <input type="checkbox" checked={el.isDone} />
            <span>{el.title}</span>
            <button onClick= {() => {removeTask(el.id)} }>x</button>
          </li>
          )}
        </ul>
      )}
      <div>
        <button onClick={ ()=>changeFilter('All') }>All</button>
        <button onClick={ ()=>changeFilter('Active') }>Active</button>
        <button onClick={ ()=>changeFilter('Completed') }>Completed</button>
        {/* <Button title={'All'} changeFilter={changeFilter}/>
        <Button title={'Active'} changeFilter={changeFilter}/>
        <Button title={'Completed'} changeFilter={changeFilter}/> */}
      </div>
    </div>
  )
}