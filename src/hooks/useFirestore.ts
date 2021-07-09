import { useContext } from 'react'
import { FirestoreContext } from '../contexts/FirestoreContextProvider'

export function useFirestore() {
    const val = useContext(FirestoreContext)
    return val;
}