import { createContext, ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    createNewUserWithEmailAndPassword: (email: string, password: string) => Promise<void>;
    signInWithGitHub: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const history = useHistory()

    const [user, setUser] = useState<User>();

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid, email } = user;
                if (!email) {
                    throw new Error('User missing email address')
                }

                setUser({
                    id: uid,
                    name: displayName ? displayName : email,
                    avatar: photoURL ? photoURL : "markup",
                })
                history.push('/')
            } else {
                history.push('/login')
            }
        })

        return () => {
            unsubscribe();
        }
    }, [history])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if (result.user) {
            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error('Missing information from GitHub Account.')
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })

        }

    }
    async function signInWithGitHub() {
        const provider = new firebase.auth.GithubAuthProvider();
        const result = await auth.signInWithPopup(provider);

        if (result.user) {

            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.')
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })

        }

    }

    async function signInWithEmailAndPassword(email: string, password: string) {
        try {
            const result = await firebase.auth().signInWithEmailAndPassword(email, password)
            if (result.user && result.user.email) {
                //console.log(result)
                const { uid, email } = result.user;


                setUser({
                    id: uid,
                    name: email,
                    avatar: "markup"
                })
                console.log('logado com email e senha')

            }
        } catch (err) {
            console.error(err);
        }
    }
    async function createNewUserWithEmailAndPassword(email: string, password: string) {
        if (!email || !password) {
            console.error('Missing email or password')
            return;
        }
        let res;
        try {
            res = await firebase.auth().createUserWithEmailAndPassword(email, password);
            if (res.user && res.user.email) {
                //console.log(result)
                const { uid, email } = res.user;


                setUser({
                    id: uid,
                    name: email,
                    avatar: "markup"
                })
                console.log('logado com email e senha')

            }
        } catch (err) {
            console.error(err)
            throw new Error(err)
        }
    }
    async function signOut() {
        try {
            firebase.auth().signOut();
            setUser(undefined);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signInWithEmailAndPassword,
            signOut,
            createNewUserWithEmailAndPassword,
            signInWithGitHub

        }}>
            {props.children}
        </AuthContext.Provider>
    );
}