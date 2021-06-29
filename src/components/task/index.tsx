import { useState } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import check from '../../assets/check.svg'
import more from '../../assets/more.svg'

import './styles.scss'

type TaskPropsType = {
    checked: boolean;
    task: string;
}

export function Task(props: TaskPropsType) {
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);
    const [isChecked, setIsChecked] = useState(props.checked);

    return (
        <div className={isChecked ? "task done" : "task"}>
            <img className="check" src={check} alt="Caixa marcada" onClick={() => { setIsChecked(!isChecked) }} />
            <div className="box" onClick={() => { setIsChecked(!isChecked) }}></div>
            <p>{props.task}</p>
            <button {...buttonProps} className="options" onClick={() => setIsOpen(true)}><img src={more} alt="Opções da tarefa" /></button>
            <div className={isOpen ? "optionsBox visible" : "optionsBox"} role="options">
                <p><a {...itemProps[0]} className="edit">Editar</a></p>
                <p><a {...itemProps[1]} className="delete">Excluir</a></p>
            </div>
        </div>
    )
}