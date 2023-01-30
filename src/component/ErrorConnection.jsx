import { useState } from "react";

import '../assets/css/ErrorConnection.css';

const ErrorConnection = () => {
    const [connecting, setConnecting] = useState(false);

    const handleConnecting = () => {
        setConnecting(true);
        fetch('http://127.0.0.1:5000/api/')
            .then(_ => {
                window.location.reload();
            }).catch(e => {
                if (e.message === "Failed to fetch") setConnecting(false);
            })

    }

    return (
        <div className='connection-error'>
            <span>
                <svg viewBox="0 0 48 48" height="48" width="48" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 48 48" xmlSpace="preserve"><path fill="currentColor" d="M24.154,2C11.919,2,2,11.924,2,24.165S11.919,46.33,24.154,46.33 s22.154-9.924,22.154-22.165S36.389,2,24.154,2z M23.985,34.138L12.976,19.459c3.028-2.294,6.881-3.67,11.009-3.67 c4.129,0,7.982,1.376,11.009,3.67L23.985,34.138z M23.04,28.488h1.981v-1.981H23.04V28.488z M23.04,24.526h1.981v-5.017H23.04 V24.526z"></path></svg>
            </span>
            <div>
                {connecting ?
                    <h3>Connecting</h3>
                    :
                    <>
                        <h3>Computer not connected</h3>
                        <p>Make sure your computer has an active Internet connection.</p>
                        <button onClick={handleConnecting}>Reconnect
                            <svg viewBox="0 0 8 12" height="12" width="8" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 12" xmlSpace="preserve"><path fill="currentColor" d="M2.173,1l4.584,4.725L2.142,10.34L1.039,9.237l3.512-3.512L1,2.173L2.173,1z"></path></svg>
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default ErrorConnection;