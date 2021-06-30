import { createContext, ReactNode, useEffect, useState } from "react";
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
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

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


            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

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

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signInWithEmailAndPassword }}>
            {props.children}
        </AuthContext.Provider>
    );
}