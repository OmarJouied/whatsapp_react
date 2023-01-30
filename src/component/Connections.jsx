import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Load from './Load';
import { urlFor } from '../utils';
import UserLayout from './UserLayout';
import '../assets/css/connections.css';

const Connections = ({ id }) => {
    const [connections, setConnections] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_WHATSAPP_BACKEND_URL}/api/groups/?id=${id}`)
            .then(r => r.json())
            .then(r => setConnections(r))
            .catch(err => console.log(err));

        return () => setConnections([]);

    }, [id])

    if (typeof connections === "undefined") return <Load />;

    return (
        <div className='whatsapp__main-group_content-connections_content'>
            {
                connections?.map(connection => (
                    <div key={connection.id}>
                        <Link to={`/@${connection.username}`}>
                            <UserLayout src={urlFor(connection.avatar)} name={connection.username} />
                        </Link>
                        <button title={'delete ' + Object.keys({ connection })[0]}>
                            <svg viewBox="0 0 16 16" height="16" width="16" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 16 16" xmlSpace="preserve"><path fill="currentColor" d="M12.174,4.661l-0.836-0.835L8,7.165L4.661,3.826L3.826,4.661 L7.165,8l-3.339,3.339l0.835,0.835L8,8.835l3.338,3.339l0.836-0.835L8.835,8L12.174,4.661z"></path></svg>
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default Connections