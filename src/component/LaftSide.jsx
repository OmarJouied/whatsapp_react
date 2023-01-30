import { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Aside  from './Aside';
import { context } from '../App';

const LaftSide = ({ isNotConnecting }) => {
    const [userData, setUserData] = useState({});
    const { username } = useContext(context);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/", {
            method: 'POST',
            body: JSON.stringify({username})
        })
            .then(res => res.json())
            .then(user => setUserData(user))
            .catch(e => console.log(e));
    }, []);

    if (!userData.connections) return null;

    return (
        <>
            <Header avatar={userData.avatar} />
            <Aside connections={userData.connections} isNotConnecting={isNotConnecting} />
            <Outlet />
        </>
    );
}

export default LaftSide;