import check from '../../assets/check.svg'

import './styles.scss'
export function Task() {

    return (
        <div className="task">
            <img src={check} alt="Caixa marcada" />
            <div className="box"></div>
            <p>Marcação para tarefa Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, ea ut. Accusamus earum quasi nulla fugiat quia, quaerat, vitae eum commodi adipisci voluptas reprehenderit provident, blanditiis ipsa. Eum, eius id.</p>
        </div>
    )
}