
import "./styles.scss"

import { Task } from '../../components/task'

export function Tasks() {

    return (
        <div id="tasks">
            <header>
                <h2>Tasker</h2>
                <div className="user"></div>
            </header>
            <main>
                <form >
                    <label htmlFor="task">Nova tarefa:</label>
                    <input type="text" name="task" id="newTask" />
                    <button type="submit">Adicionar</button>
                </form>
                <Task />
                <Task />
                <Task />
                <Task />
            </main>
        </div>
    )
}