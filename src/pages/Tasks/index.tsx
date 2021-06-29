
import "./styles.scss"

import { Task } from '../../components/task'
import { useState } from "react"

let tasklist = [
    {
        checked: false,
        task: "Marcação para tarefa Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, ea ut. Accusamus earum quasi nulla fugiat quia, quaerat, vitae eum commodi adipisci voluptas reprehenderit provident, blanditiis ipsa. Eum, eius id."
    },
    {
        checked: false,
        task: "Marcação para tarefa Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, ea ut. Accusamus earum quasi nulla fugiat quia, quaerat, vitae eum commodi adipisci voluptas reprehenderit provident, blanditiis ipsa. Eum, eius id."
    },
    {
        checked: false,
        task: "Marcação para tarefa Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, ea ut. Accusamus earum quasi nulla fugiat quia, quaerat, vitae eum commodi adipisci voluptas reprehenderit provident, blanditiis ipsa. Eum, eius id."
    },
    {
        checked: false,
        task: "Marcação para tarefa Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, ea ut. Accusamus earum quasi nulla fugiat quia, quaerat, vitae eum commodi adipisci voluptas reprehenderit provident, blanditiis ipsa. Eum, eius id."
    },
]

export function Tasks() {
    const [taskField, setTaskField] = useState('');

    return (
        <div id="tasks">
            <header>
                <h2>Tasker</h2>
                <div className="user"></div>
            </header>
            <main>
                <form >
                    <label htmlFor="task">Nova tarefa:</label>
                    <input onChange={(e) => setTaskField(e.target.value)} value={taskField} type="text" name="task" id="newTask" />
                    <button type="submit">Adicionar</button>
                </form>
                {tasklist.map((task, index) => { return <Task key={`task_${index}`} checked={task.checked} task={task.task} /> })}

            </main>
        </div>
    )
}