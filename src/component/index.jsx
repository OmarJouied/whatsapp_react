import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import '../assets/css/index.css';

const LaftSide = lazy(() => import('./LaftSide'));
const PlaceholderContact = lazy(() => import('./PlaceholderContact'));
const UserContact = lazy(() => import('./UserContact'));
const Profile = lazy(() => import('./Profile'));
const Groups = lazy(() => import('./Groups'));

const errorLogo = lazy(() => import('../assets/images/whatsappError.png'));

const Index = () => {
    const [isNotConnecting, setIsNotConnecting] = useState(false);

    useEffect(() => {
      const connect = new WebSocket("ws://127.0.0.1:5000/ws/");
      connect.onclose = () => setIsNotConnecting(true);
    }, [])

    return (
            <>
                <Suspense fallback={<></>}>
                    <Routes>
                        <Route path='/' element={window.location.pathname !== '/' && window.innerWidth <= '565' ? <Outlet /> : <LaftSide isNotConnecting={isNotConnecting} />}>
                            <Route index element={window.innerWidth > '565' && <PlaceholderContact />} />
                            <Route path='@:target' element={<UserContact />} />
                            <Route path='groups' element={<Groups isNotConnecting={isNotConnecting} />} />
                            <Route path='profile' element={<Profile />} />
                            <Route path='*' element={<h1>not found</h1>} />
                        </Route>
                    </Routes>
                </Suspense>
            </>
    );
}

export default Index;