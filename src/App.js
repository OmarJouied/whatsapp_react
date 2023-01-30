import { Suspense, lazy, createContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './assets/css/App.css';

import { InitialStartUp } from './component/InitialStartUp';
const Sign = lazy(() => import('./component/Sign'));
const Main = lazy(() => import('./component'));

export const context = createContext();

function App() {

  const username = JSON.parse(window.localStorage.getItem("whatsapp"))?.username;

  /** start connect */

  const [connect] = useState(new WebSocket(`ws://127.0.0.1:5000/ws/${username}/`));
  const [currentMessage, setCurrentMessage] = useState({});

  // useEffect(() => {
  connect.onmessage = ({ data }) => {
    const res = JSON.parse(data).data;
    setCurrentMessage(res.message);
    console.log(res.message);
  }
  // }, [])
  
  // navigator.mediaDevices.getUserMedia({
  //   audio: true,
  //   video: true
  // }).then((value) => {
  //   console.log(value);
  // })
  // (async function () {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //       video: true
  //     });
  //     console.log(stream);
  //   }
  //   catch {

  //   }
  // })();
  /** end connect */

  return (
      <Suspense fallback={<InitialStartUp />}>
        <Routes>
          <Route
            path='/login'
            element={username ? <Navigate to='/' /> : <Sign />}
          />
          <Route
            path='*'
            element={
              username ?
                <context.Provider value={{username, connect, currentMessage}}>
                  <Main />
                </context.Provider>
              :
                <Navigate to='/login' />
            }
          />
        </Routes>
      </Suspense>
  );
}

export default App;
