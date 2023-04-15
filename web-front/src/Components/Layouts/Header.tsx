import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import './Header.css';

export default function Header(props: any) {
    const { username } = useContext(UserContext);

    return (
        <div className="header-container">
            <div className="header">
                <span className="header-username">
                    Bonjour { username } !
                </span>
                <DisconnectButton />
            </div>
        </div>
    );
}

const DisconnectButton = () => {
    const { setUsername, setToken } = useContext(UserContext);
    return (
        <button
            className="header-disconnect form-btn"
            onClick={() => {
                setUsername(null);
                setToken(null);
            }}
        >
            Disconnect
        </button>
    );
};
