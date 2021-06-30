import { useHistory } from 'react-router-dom'

import facebook from '../../assets/facebook.svg';
import google from '../../assets/google.svg';
import github from '../../assets/github.svg';

import { useAuth } from '../../hooks/useAuth'

import './styles.scss';

export function Login() {
    const { signInWithGoogle, user } = useAuth();
    const history = useHistory();

    async function handleSignInWithGoogle() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/');
    }

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
            <button onClick={handleSignInWithGoogle}><img src={google} alt="Logo Google" /><span>Entrar com o google</span></button>
            <button><img src={facebook} alt="Logo facebook" /><span>Entrar com o Facebook</span></button>
            <button><img src={github} alt="Logo github" /><span>Entrar com o Github</span></button>
        </div>
    )
}