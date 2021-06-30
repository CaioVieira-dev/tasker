
import "./styles.scss"

import { Task } from '../../components/task'
import { useEffect, useState } from "react"
import { database } from '../../services/firebase'

import { useAuth } from '../../hooks/useAuth'
type TaskType = {
    id: number;
    task: string;
    checked: boolean
}
type TaskListType = TaskType[]


export function Tasks() {

    const [tasklist, setTasklist] = useState<TaskListType>();

    const [taskField, setTaskField] = useState('');
    const { user } = useAuth();

    async function test() {
        const tasksRef = database.collection('user_tasks').doc('uI7mJMLpTWfC9cxfAtfh').collection('user');
        const res = await tasksRef.get();

        if (res) {
            // console.log('resposta ', res.docs.map(doc => doc.data().task))

            const tasks = res.docs.map((doc, index) => {
                const data = doc.data()
                const taskObj: TaskType = {
                    id: index,
                    task: data.task,
                    checked: data.checked
                }
                return taskObj;

            })
            setTasklist(tasks)

        } else {
            console.error("without res")
        }
    }
    /*
        async function testSave() {
            const tasksRef = database.collection('user_tasks').doc("uI7mJMLpTWfC9cxfAtfh");
            const info = {
                checked: true,
                task: 'teste de função de salvar'
            }
            await tasksRef.collection('user').add(info);
        }
    */
    test();
    //testSave()

    function createTask(e: any) {
        e.preventDefault();
        if (taskField !== '') {
            /*
            tasklist.push({
                id: tasklist[tasklist.length - 1].id + 1,
                task: taskField,
                checked: false
            })
            */
            setTaskField('');
        }
    }

    function deleteTask(taskId: number) {

        setTasklist(tasklist?.filter(task => task.id !== taskId));
    }
    function updateTask(taskId: number, updatedTask: string) {
        setTasklist(tasklist?.map(task => {
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

    if (!user) {
        return (
            <div><p>carregando</p></div>
        )
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
                {tasklist?.map((task, index) => {
                    return <Task
                        key={`task_${index}`}
                        tId={task.id}
                        deleteTask={deleteTask}
                        checked={task.checked}
                        updateTask={updateTask}
                        task={task.task} />
                })}

            </main>
        </div>)
}