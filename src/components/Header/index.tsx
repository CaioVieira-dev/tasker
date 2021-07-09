import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import userCircle from '../../assets/user-circle.svg'

import { useAuth } from '../../hooks/useAuth'

import './styles.scss';

export function Header() {
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(1);
    const { signOut, user } = useAuth();

    function handleSignOut() {
        try {
            signOut();
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <header>
            <h2>Tasker</h2>
            <div className="user">
                <button {...buttonProps}
                    onClick={() => setIsOpen(true)}
                ><img src={user?.avatar === "markup" ? userCircle : user?.avatar}
                    alt="Foto de perfil do usuário" />
                </button>
                <div className={isOpen ? 'options visible' : 'options'}>
                    <button onClick={handleSignOut}><a {...itemProps[0]}>Logout</a></button>
                </div>
            </div>
        </header>
    )

}