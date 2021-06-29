import { useState } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import check from '../../assets/check.svg'
import more from '../../assets/more.svg'

import './styles.scss'

type TaskPropsType = {
    tId: number,
    checked: boolean;
    task: string;
    deleteTask: (taskId: number) => void;
    updateTask: (taskId: number, updatedTask: string) => void;
}

export function Task(props: TaskPropsType) {
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);
    const [isChecked, setIsChecked] = useState(props.checked);
    const [isEditing, setIsEditing] = useState(false);

    const [updateField, setUpdateField] = useState<string>(props.task);



    return (
        <div className={isChecked ? "task done" : "task"}>
            <img className="check" src={check} alt="Caixa marcada" onClick={() => { setIsChecked(!isChecked) }} />
            <div className="box" onClick={() => { setIsChecked(!isChecked) }}></div>

            {isEditing ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <textarea onChange={(e) => { setUpdateField(e.target.value) }} value={updateField} />
                    <div className="wrapper">
                        <button className="cancel" onClick={() => {
                            setIsEditing(false);
                            setUpdateField(props.task)
                        }} >Cancelar</button>
                        <button onClick={(e) => {
                            props.updateTask(props.tId, updateField)
                            setIsEditing(false)
                        }}>Salvar</button>
                    </div>
                </form>
            ) :
                (<p>{props.task}</p>)}

            <button {...buttonProps} className="options" onClick={() => setIsOpen(true)}><img src={more} alt="Opções da tarefa" /></button>
            <div className={isOpen ? "optionsBox visible" : "optionsBox"} role="options">
                <p onClick={() => setIsEditing(true)}><a {...itemProps[0]} className="edit">Editar</a></p>
                <p onClick={() => props.deleteTask(props.tId)} ><a {...itemProps[1]} className="delete">Excluir</a></p>
            </div>
        </div>
    )
}