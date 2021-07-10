import { useHistory } from 'react-router-dom'

import google from '../../assets/google.svg';
import github from '../../assets/github.svg';

import { useAuth } from '../../hooks/useAuth'

import './styles.scss';
import { useState } from 'react';

type SignInProps = {
    toggle: () => void;
}
type NewUserProps = {
    toggle: () => void;
}
function SignIn(props: SignInProps) {
    const { signInWithGoogle, user, signInWithEmailAndPassword, signInWithGitHub } = useAuth();
    const history = useHistory();

    async function handleSignInWithGoogle() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/');
    }
    async function handleSignInWithEmailAndPassword(e: any) {
        e.preventDefault();
        await signInWithEmailAndPassword(e.target.user.value, e.target.password.value)

    }
    async function handleSignInWithGithub() {
        try {
            await signInWithGitHub()
        } catch (err) {
            console.log(err)
        }

    }


    return (<>
        <form onSubmit={(e) => handleSignInWithEmailAndPassword(e)}>
            <label htmlFor="user">Email</label>
            <input type="email" name="user" placeholder="Email" />
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" />

            <div className="wrapper">
                <button onClick={() => props.toggle()}>Cadastre-se</button>
                <button type="submit">Entrar</button>
            </div>
        </form>
        <div className="separator">
            <p>ou</p>
        </div>
        <button onClick={handleSignInWithGoogle}><img src={google} alt="Logo Google" /><span>Entrar com o google</span></button>
        <button onClick={handleSignInWithGithub}><img src={github} alt="Logo github" /><span>Entrar com o Github</span></button>
    </>
    )
}
function NewUser(props: NewUserProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const { createNewUserWithEmailAndPassword } = useAuth();
    const history = useHistory();


    async function handleCreateUser() {
        if (!email || !password || !password2) {
            console.error('Missing email or password')
            return;
        }
        if (password !== password2) {
            console.error('Both passwords must be equal');
            return;
        }
        try {
            await createNewUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
            return;
        }
        history.push('/');
    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleCreateUser();
            }}>
                <label htmlFor="user">Email</label>
                <input
                    type="email"
                    name="user"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <label htmlFor="confirmPassword">Confirme sua senha</label>
                <input
                    type="password"
                    name="confirmPassword"
                    required
                    onChange={(e) => setPassword2(e.target.value)}
                    value={password2}
                />
                <div className="wrapper">
                    <button onClick={() => props.toggle()} type="button">Logar</button>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </>
    )
}

export function Login() {
    const [isLogging, setIsLogging] = useState(true)
    function toggleIsLogging() {
        setIsLogging(!isLogging)
    }
    return (
        <div id="login">
            <h1>Tasker</h1>
            {isLogging ?
                <SignIn toggle={toggleIsLogging} />
                :
                <NewUser toggle={toggleIsLogging} />
            }
        </div>
    )
}