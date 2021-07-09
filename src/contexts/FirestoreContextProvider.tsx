import { createContext, ReactNode, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type FirestoreContextType = {
    tasklist: TaskListType | undefined;
    getUserTasks: () => Promise<void>;
    saveNewTask: (newTask: string) => Promise<void>;
    toggleCheck: (taskId: string) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    updateTask: (taskId: string, updatedTask: string) => Promise<void>;
}
type FirestoreContextProviderProps = {
    children: ReactNode;
}

type TaskType = {
    id: string;
    task: string;
    checked: boolean
}
type TaskListType = TaskType[]


export const FirestoreContext = createContext({} as FirestoreContextType)

export function FirestoreContextProvider(props: FirestoreContextProviderProps) {
    const { user } = useAuth();
    const [tasklist, setTasklist] = useState<TaskListType>();

    async function getUserTasks() {
        if (!user) { return }
        const tasksRef = database.collection('user_tasks').doc(user?.id).collection('user');
        let res;
        try {
            res = await tasksRef.get();
            const tasks = res.docs.map(doc => {
                const data = doc.data()
                const taskObj: TaskType = {
                    id: doc.id,
                    task: data.task,
                    checked: data.checked
                }
                return taskObj;

            })
            setTasklist(tasks)
        } catch (err) {
            console.error(err);
        }
    }
    async function saveNewTask(task: string) {
        const tasksRef = database.collection('user_tasks').doc(`${user?.id}`);
        const info = {
            checked: false,
            task: `${task}`
        }
        // console.log(user?.id)
        let res;
        try {
            res = await tasksRef.collection('user').add(info);
        } catch (error) {
            console.log(error)
        }
    }
    async function toggleCheck(taskId: string) {
        const taskRef = database.collection('user_tasks').doc(`${user?.id}`).collection('user').doc(taskId);
        const checkedState = tasklist?.find(task => task.id === taskId)?.checked
        let res;
        try {
            res = await taskRef.update({ checked: !checkedState });
        } catch (error) {
            console.log(error)
        }
        console.log(res);

    }
    async function updateTask(taskId: string, updatedTask: string) {
        console.log(taskId, updatedTask)
        if (!taskId || !updatedTask) {
            console.error('Missing needed data for update')
            return;
        }

        const taskRef = database.collection('user_tasks').doc(`${user?.id}`).collection('user').doc(taskId);
        let res;
        try {
            res = await taskRef.update({ task: updatedTask });
        } catch (error) {
            console.log(error)
        }
        console.log(res);
    }
    async function deleteTask(taskId: string) {
        const taskRef = database.collection('user_tasks').doc(`${user?.id}`).collection('user').doc(taskId);
        try {
            await taskRef.delete();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {


        const tasksRef = database.collection('user_tasks').doc(user?.id).collection('user');
        const unsub = tasksRef.onSnapshot((res) => {
            const tasks = res.docs.map(doc => {
                const data = doc.data()
                const taskObj: TaskType = {
                    id: doc.id,
                    task: data.task,
                    checked: data.checked
                }
                return taskObj;

            })
            setTasklist(tasks)
        });
        return () => unsub()


    }, [user])
    return (
        <FirestoreContext.Provider value={{
            tasklist,
            getUserTasks,
            saveNewTask,
            toggleCheck,
            deleteTask,
            updateTask
        }}>
            {props.children}
        </FirestoreContext.Provider>
    )
}