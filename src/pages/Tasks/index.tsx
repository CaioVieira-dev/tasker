
import "./styles.scss"

import { Task } from '../../components/task'
import { FormEvent, useEffect, useState } from "react"

import { Header } from '../../components/Header'

import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useFirestore } from '../../hooks/useFirestore'




export function Tasks() {

    const [taskField, setTaskField] = useState('');
    const { user } = useAuth();
    const { tasklist, saveNewTask, getUserTasks } = useFirestore()
    const history = useHistory()

    async function newTask(e: FormEvent) {
        e.preventDefault();
        if (taskField.trim() === '') {
            return
        }
        let teste
        try {
            teste = await saveNewTask(taskField)
            setTaskField('')
        } catch (err) {
            console.error(err)
            return;
        }
        console.log(teste)
    }

    useEffect(() => {
        if (!user) { return history.push('/login') }
        getUserTasks();
    }, [user, getUserTasks])


    if (!user) {
        return (
            <div><p>carregando</p></div>
        )
    }

    return (
        <div id="tasks">
            <Header />
            <main>
                <form onSubmit={(e) => { e.preventDefault(); newTask(e) }} >
                    <label htmlFor="task">Nova tarefa:</label>
                    <input onChange={(e) => setTaskField(e.target.value)} value={taskField} type="text" name="task" id="newTask" />
                    <button type="submit">Adicionar</button>
                </form>
                {tasklist?.map((task, index) => {
                    return <Task
                        key={task.id}
                        tId={task.id}
                        checked={task.checked}
                        task={task.task} />
                })}

            </main>
        </div>)
}