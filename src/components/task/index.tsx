import { useState } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import check from '../../assets/check.svg'
import more from '../../assets/more.svg'
import { useFirestore } from '../../hooks/useFirestore'

import './styles.scss'

type TaskPropsType = {
    tId: string,
    checked: boolean;
    task: string;
}

export function Task(props: TaskPropsType) {
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

    const [isEditing, setIsEditing] = useState(false);

    const [updateField, setUpdateField] = useState<string>(props.task);
    const { toggleCheck, deleteTask, updateTask } = useFirestore()

    async function handleUpdateTask() {
        if (!updateField || updateField === props.task) {
            console.error("invalid request")
            return;
        }
        let res;
        try {
            res = await updateTask(props.tId, updateField)
        } catch (e) {
            console.error(e);
        }
        console.log(res);

    }


    return (
        <div className={props.checked ? "task done" : "task"}>
            <img className="check" src={check} alt="Caixa marcada" onClick={() => toggleCheck(props.tId)} />
            <div className="box" onClick={() => toggleCheck(props.tId)}></div>

            {isEditing ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <textarea onChange={(e) => { setUpdateField(e.target.value) }} value={updateField} />
                    <div className="wrapper">
                        <button className="cancel"
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setUpdateField(props.task)
                            }} >Cancelar</button>
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                handleUpdateTask()
                                setIsEditing(false)
                            }}>Salvar</button>
                    </div>
                </form>
            ) :
                (<p>{props.task}</p>)}

            <button {...buttonProps} className="options" onClick={() => setIsOpen(true)}><img src={more} alt="Opções da tarefa" /></button>
            <div className={isOpen ? "optionsBox visible" : "optionsBox"} role="options">
                <p onClick={() => setIsEditing(true)}><a {...itemProps[0]} className="edit">Editar</a></p>
                <p onClick={() => deleteTask(props.tId)}><a {...itemProps[1]} className="delete">Excluir</a></p>
            </div>
        </div>
    )
}