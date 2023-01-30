import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { urlFor } from '../utils';
import { context } from '../App';

import '../assets/css/Profile.css';
import camera from '../assets/images/camera.png';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const { username } = useContext(context);
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in userData) {
        formData.append(key, userData[key]);
    }
    fetch(process.env.REACT_APP_WHATSAPP_BACKEND_URL + `/api/user/`, {
        method: 'PUT',
        body: formData
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) return;
      navigate('/');

      if (typeof userData.avatar === "object") {
        const connect = new WebSocket(`ws://127.0.0.1:5000/ws/profile/${username}/`);
        connect.onopen = () => {
          connect.send('{}');
          connect.close();
        }
      }
    })
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_WHATSAPP_BACKEND_URL+'/api/user/?username='+username)
    .then(res => res.json())
    .then(res => setUserData({username, ...res}));
  }, []);
  
  return (
    <main className='whatsapp__main'>
        <div className='profile__container'>
            <form onSubmit={handleSend}>
                <div className='profile-field img'>
                    <img src={urlFor(userData.avatar)} alt="avatar" />
                    <label htmlFor='img'>
                        <img src={camera} alt="camera" />
                    </label>
                    <input id='img' type="file" onChange={e => setUserData(prev => ({...prev, avatar: e.target.files[0]}))} />
                </div>
                <div className='profile-field'>
                    <input id='username' value={userData.username} />
                    <label htmlFor='username'>username</label>
                </div>
                <div className='profile-field'>
                    <input id='email' value={userData.email} onChange={e => setUserData(prev => ({...prev, email: e.target.value}))} />
                    <label htmlFor='email'>email</label>
                </div>
                <div className='profile-field'>
                    <input id='password' type="password" value={userData.password} onChange={e => setUserData(prev => ({...prev, password: e.target.value}))} />
                    <label htmlFor='password'>password</label>
                </div>
                <input type="submit" value="save" />
            </form>
        </div>
    </main>
  )
}

export default Profile;