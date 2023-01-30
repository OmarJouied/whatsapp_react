import { useEffect, useRef, useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../assets/css/User.css";
import UserLayout from "./UserLayout";
import recievedSound from '../assets/audio/recieveOff.mp3';
import { urlFor } from "../utils";
import { context } from "../App";

const User = ({ src, name, date, shortcatMessage, is_opened, unRead, username }) => {
    const { connect } = useContext(context);
    const soundRef = useRef();
    const popup = useRef();

    const handleRightClick = (e) => {
        e.preventDefault();
        popup.current.classList.add("active");
    }

    const toggleBlock = () => {
        connect.send(JSON.stringify({
            target: name,
            blockIt: is_opened
        }));
        popup.current.classList.remove("active");
    }

    return <NavLink to={`@${name}`} onContextMenu={handleRightClick} style={({isActive}) => ({backgroundColor: isActive ? "#2a3942":"", display: "block"})} className={({isActive}) => isActive ? "active":""}>
        <ul className="user_logo-popup" ref={popup}>
            <li onClick={toggleBlock}>
                {is_opened ? "Block" : "Unblock"}
            </li>
        </ul>
        <audio src={recievedSound} ref={soundRef} />
        <div className="user" title={unRead ? "unreadable message" : ""}>
            <UserLayout src={urlFor(src)} name={name} date={date} unread={unRead}>
                <div className="user__shortcat-message">
                    <div className="user__shortcat-message_text" title={shortcatMessage} style={{direction: shortcatMessage[0] >= 'ؠ' ? "rtl" : "ltr"}}>
                        {shortcatMessage}
                    </div>
                    {unRead > 0 && <span className="user__shortcat-message_count">{unRead}</span>}
                    <span className="arrow">
                        <svg viewBox="0 0 19 20" height="20" width="20" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" xmlSpace="preserve"><path fill="currentColor" d="M3.8,6.7l5.7,5.7l5.7-5.7l1.6,1.6l-7.3,7.2L2.2,8.3L3.8,6.7z"></path></svg>
                    </span>
                </div>
            </UserLayout>
        </div>
    </NavLink>
}

export default User;