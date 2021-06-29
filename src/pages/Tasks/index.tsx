
import "./styles.scss"

import { Task } from '../../components/task'
import { useState } from "react"



export function Tasks() {

    const [tasklist, setTasklist] = useState([
        {
            id: 1,
            checked: false,
            task: "Marcação para tarefa Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, ea ut. Accusamus earum quasi nulla fugiat quia, quaerat, vitae eum commodi adipisci voluptas reprehenderit provident, blanditiis ipsa. Eum, eius id."
        },
        {
            id: 2,
            checked: false,
            task: "Marcação para tarefa Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, ea ut. Accusamus earum quasi nulla fugiat quia, quaerat, vitae eum commodi adipisci voluptas reprehenderit provident, blanditiis ipsa. Eum, eius id."
        },
        {
            id: 3,
            checked: false,
            task: "Marcação para tarefa Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, ea ut. Accusamus earum quasi nulla fugiat quia, quaerat, vitae eum commodi adipisci voluptas reprehenderit provident, blanditiis ipsa. Eum, eius id."
        },
        {
            id: 4,
            checked: false,
            task: "Marcação para tarefa Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, ea ut. Accusamus earum quasi nulla fugiat quia, quaerat, vitae eum commodi adipisci voluptas reprehenderit provident, blanditiis ipsa. Eum, eius id."
        },
    ])

    const [taskField, setTaskField] = useState('');


    function createTask(e: any) {
        e.preventDefault();
        if (taskField !== '') {
            tasklist.push({
                id: tasklist[tasklist.length - 1].id + 1,
                task: taskField,
                checked: false
            })
            setTaskField('');
        }
    }

    function deleteTask(taskId: number) {
        setTasklist(tasklist.filter(task => task.id !== taskId));
    }
    function updateTask(taskId: number, updatedTask: string) {
        setTasklist(tasklist.map(task => {
            if (task.id === taskId) {
                return {
                    id: task.id,
                    task: updatedTask,
                    checked: task.checked
                }
            }
            return task;
        }))
    }

    return (
        <div id="tasks">
            <header>
                <h2>Tasker</h2>
                <div className="user"></div>
            </header>
            <main>
                <form onSubmit={(e) => { createTask(e) }} >
                    <label htmlFor="task">Nova tarefa:</label>
                    <input onChange={(e) => setTaskField(e.target.value)} value={taskField} type="text" name="task" id="newTask" />
                    <button type="submit">Adicionar</button>
                </form>
                {tasklist.map((task, index) => {
                    return <Task
                        key={`task_${index}`}
                        tId={task.id}
                        deleteTask={deleteTask}
                        checked={task.checked}
                        updateTask={updateTask}
                        task={task.task} />
                })}

            </main>
        </div>
    )
}