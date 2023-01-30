import { useState } from 'react';

import '../assets/css/Sign.css';
import Logo from '../assets/images/Logo.svg';

const Sign = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formdata, setFormdata] = useState({})
  const [errorMessage, setErrorMessage] = useState("");
  const handleToggle = e => {
    e.preventDefault();
    setIsSignup(pre => !pre);
  }
  const handleChange = (key, value) => {
    setFormdata({
      ...formdata,
      [key]: value
    })
  }
  const log = e => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/api/user/', {
      method: 'POST',
      body: JSON.stringify(formdata)
    })
      .then(res => res.json())
      .then(res => {
        if (res.isExist) {
          window.localStorage.setItem("whatsapp", JSON.stringify({ username: formdata.username }));
          window.location.reload();
        } else {
          console.error('Something Wrong!');
          setErrorMessage("username or password incorrect");
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      }).catch(e => {
        if (e.message === "Failed to fetch") {
          setErrorMessage("CONNECTION REFUSED");
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      })
  }

  return true ?
    <div className='signin'>
      <div className="signin__container">
        <div className="signin__container-logo">
          <img src={Logo} alt="Logo Image" />
          <p className='signin__container-title'>
            WhatsApp Web
          </p>
        </div>
        <form className="signin__container-form" onSubmit={log}>
          <div className={'signin__container-form_error' + (errorMessage ? " active" : "")}>
            {errorMessage}
          </div>
          <h2>Log in to WhatsApp</h2>
          {isSignup && <input name='email' required type="email" placeholder="Email address" value={formdata.email} onChange={e => handleChange('email', e.target.value)} />}
          <input name='username' required placeholder="username" value={formdata.username} onChange={e => handleChange('username', e.target.value)} />
          <input name='password' required type='password' placeholder="Password" value={formdata.password} onChange={e => handleChange('password', e.target.value)} />
          {isSignup && <input name='confirm' required type='password' placeholder="confirm" value={formdata.confirm} onChange={e => handleChange('confirm', e.target.value)} />}
          <input type='submit' value='log in' className="signin__container-form_send" />
          <div className="signin__container-form_other">
            <a href='/'>Forgot password?</a>
            <a href='/' onClick={handleToggle}>Sign up to WhatsApp</a>
          </div>
        </form>
      </div>
    </div>
    :
    <div className='load-error'>
      <div className='load-error_content'>
        <h2>Computer not connected</h2>
        <p>Make sure your computer has an active Internet connection.</p>
      </div>
    </div>
}

export default Sign;
