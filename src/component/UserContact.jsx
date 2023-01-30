import { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import '../assets/css/UserContact.css';
import UserLayout from './UserLayout';
import Boxes from '../utils/Boxes';
import Form from './Form';
import Load from './Load';
import Nav from './Nav';

import { context } from '../App';

import recivedSound from '../assets/audio/recieveOn.mp3';
import { getFormattedDate } from '../utils';
import moment from 'moment';

const date = [];
const lastMessage = [];

const Main = ({ username, name, setUserInfo }) => {
    const [messages, setMessages] = useState(null);
    const content = useRef();
    const soundRef = useRef();
    const soundReciveRef = useRef();
    const { currentMessage } = useContext(context);

    useEffect(() => {
        setMessages([]);
        date.length = 0;
        lastMessage.length = 0;
        fetch('http://127.0.0.1:5000/api/messages/', {
            method: "POST",
            body: JSON.stringify({ username, name })
        }).then(res => res.json())
            .then(res => {
                setMessages(Boxes(res.messages.length > 0 ? res.messages : [{date: moment("DD/MM/YY")}],
                        lastMessage,
                        username,
                        date
                    )
                );
                setUserInfo({
                    avatar: res.avatar,
                    isOpened: res.is_opened
                })
            })

            setTimeout(() => {
                content.current?.scrollIntoView({
                    block: 'end'
                });
              }, 250)

    }, [name]);

    useEffect(() => {
        if (currentMessage.content) {
            if (currentMessage.content === "start new chat") {
                if (currentMessage.username === username) setMessages(Boxes([{date: getFormattedDate()}], lastMessage, username, []));
                return;
            }
            setMessages(ms => [...ms, Boxes([currentMessage], lastMessage, username, date)]);
            if (currentMessage.username === username) {
                // soundReciveRef.current.play();
            } else {
                soundRef.current.play();
            }
            setTimeout(() => {
                content.current?.scrollIntoView({
                    block: 'end'
                });
            }, 250)
        } else if (currentMessage.avatar) {
            setUserInfo(prev => ({
                ...prev,
                avatar: currentMessage.avatar
            }))
        }
        if (typeof currentMessage.is_opened === "boolean") {
            setUserInfo(prev => ({
                ...prev,
                isOpened: currentMessage.is_opened
            }))
        }
    }, [currentMessage])
    

    return (
        <main className='whatsapp__main-main'>
            <audio src={recivedSound} ref={soundRef} />
            <audio src={"on recive"} ref={soundReciveRef} />
            <article className='whatsapp__main-main_content' ref={content}>
                {
                    messages?.length > 0 ?
                        messages
                    :
                        messages?.length === 0 ?
                            ""
                        :
                            <Load />
                }
            </article>
        </main>
    )
}

const UserContact = ({ isNotConnecting }) => {
    const { connect } = useContext(context);
    const [error, setError] = useState(false); // to => true

    const refPopup = useRef();

    const { target } = useParams();
    const [userInfo, setUserInfo] = useState();

    const username = JSON.parse(window.localStorage.getItem('whatsapp')).username;

    connect.onopen = () => {
        setError(false);
        refPopup.current?.classList.remove("active");
    }

    connect.onclose = () => {
        if (!isNotConnecting) {
            setError(true);
        }
    }

    useEffect(() => {
        // setConnect(new WebSocket(`ws://127.0.0.1:5000/ws/${username}/?target=${target}`));
        // setUserInfo(prev => ({
        //     ...prev,
        //     target
        // }))
        connect.send(JSON.stringify({target}));
    }, [target]);

    useEffect(() => {
        if (isNotConnecting) refPopup.current.classList.add("active");
    }, [isNotConnecting]);


    return (
        <main className='whatsapp__main'>
            <span ref={refPopup} className="popup">No connection</span>
            {
                !error && (
                    <>
                        <header className='whatsapp__main-header'>
                            <UserLayout src={process.env.REACT_APP_WHATSAPP_BACKEND_URL + userInfo?.avatar} name={target} />
                            <Nav arr={[
                                "M15.9,14.3H15L14.7,14c1-1.1,1.6-2.7,1.6-4.3c0-3.7-3-6.7-6.7-6.7S3,6,3,9.7 s3,6.7,6.7,6.7c1.6,0,3.2-0.6,4.3-1.6l0.3,0.3v0.8l5.1,5.1l1.5-1.5L15.9,14.3z M9.7,14.3c-2.6,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6 s4.6,2.1,4.6,4.6S12.3,14.3,9.7,14.3z",
                                "M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z",
                            ]} />
                        </header>
                        <Main username={username} name={target} setUserInfo={setUserInfo} />
                        {userInfo?.isOpened &&
                        <footer className='whatsapp__main-footer'>
                            <Chat connect={connect} />
                        </footer>}
                    </>
                )
            }
        </main>
    )
}

export default UserContact;

const Chat = ({ connect }) => {
    // console.log(connect);
    const [value, setValue] = useState("");

    const handleSend = () => {
        if (value.match(/\S/)) {
            connect.send(JSON.stringify({
                "message": value,
            }));
            // console.log(JSON.stringify({
            //     "message": value,
            // }));
            setValue("");
        }
    }

    return <article className='whatsapp__main-footer-article'>
        {/* <form> */}
            {/* <div className='emoji'> */}
                {/* <label> */}
                    {/* <img src='' alt='' /> */}
                    {/* 😆 */}
                    {/* <input type="radio" name="imoji" /> */}
                {/* </label> */}
            {/* </div> */}
        {/* </form> */}
        <Nav arr={[
            { onClick: "28", content: "M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z" },
            { onClick: "28", content: "M1.816,15.556v0.002c0,1.502,0.584,2.912,1.646,3.972s2.472,1.647,3.974,1.647 c1.501,0,2.91-0.584,3.972-1.645l9.547-9.548c0.769-0.768,1.147-1.767,1.058-2.817c-0.079-0.968-0.548-1.927-1.319-2.698 c-1.594-1.592-4.068-1.711-5.517-0.262l-7.916,7.915c-0.881,0.881-0.792,2.25,0.214,3.261c0.959,0.958,2.423,1.053,3.263,0.215 c0,0,3.817-3.818,5.511-5.512c0.28-0.28,0.267-0.722,0.053-0.936c-0.08-0.08-0.164-0.164-0.244-0.244 c-0.191-0.191-0.567-0.349-0.957,0.04c-1.699,1.699-5.506,5.506-5.506,5.506c-0.18,0.18-0.635,0.127-0.976-0.214 c-0.098-0.097-0.576-0.613-0.213-0.973l7.915-7.917c0.818-0.817,2.267-0.699,3.23,0.262c0.5,0.501,0.802,1.1,0.849,1.685 c0.051,0.573-0.156,1.111-0.589,1.543l-9.547,9.549c-0.756,0.757-1.761,1.171-2.829,1.171c-1.07,0-2.074-0.417-2.83-1.173 c-0.755-0.755-1.172-1.759-1.172-2.828l0,0c0-1.071,0.415-2.076,1.172-2.83c0,0,5.322-5.324,7.209-7.211 c0.157-0.157,0.264-0.579,0.028-0.814c-0.137-0.137-0.21-0.21-0.342-0.342c-0.2-0.2-0.553-0.263-0.834,0.018 c-1.895,1.895-7.205,7.207-7.205,7.207C2.4,12.645,1.816,14.056,1.816,15.556z" },
        ]} />
        <Form placeholder={'Type a message'} setValue={setValue} value={value} />
        <span onClick={handleSend}>
            <Nav arr={[
                value.match(/\S/) ?
                    "M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                    :
                    "M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
            ]} />
        </span>
    </article>;
}