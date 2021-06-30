
import facebook from '../../assets/facebook.svg';
import google from '../../assets/google.svg';
import github from '../../assets/github.svg';

import './styles.scss';

export function Login() {

    return (
        <div id="login">
            <h1>Tasker</h1>
            <form>
                <label htmlFor="user">Email</label>
                <input type="email" name="user" placeholder="Email" />
                <label htmlFor="password">Senha</label>
                <input type="password" name="password" />

                <div className="wrapper">
                    <button>Cadastre-se</button>
                    <button type="submit">Entrar</button>
                </div>
            </form>
            <div className="separator">
                <p>ou</p>
            </div>
            <button><img src={google} alt="Logo Google" /><span>Entrar com o google</span></button>
            <button><img src={facebook} alt="Logo facebook" /><span>Entrar com o Facebook</span></button>
            <button><img src={github} alt="Logo github" /><span>Entrar com o Github</span></button>
        </div>
    )
}