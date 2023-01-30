import { Fragment } from 'react';
import Message from "../component/Message";

const Boxes = (messages, lastMessage, username, date) => {
    return messages?.map((message, ind) => {
        let comp;
        if (date[0] === message.date.split("-")[0]) {
            comp = <Message key={message.id} type={`${message.username === lastMessage[0]?.username ? "" : "first"}${message.username === username ? " active" : ""}`} content={message.content} date={message.date.split("-")[1]} />;
        } else {
            date[0] = message.date.split("-")[0];
            comp = <Fragment key={message.id ?? 1}><Message type={"date"} content={date[0]} />{ message.content && <Message type={`first${message.username === username ? " active" : ""}`} content={message.content} date={message.date.split("-")[1]} /> }</Fragment>
        }
        lastMessage[0] = messages[ind];
        return comp;
    });
}

export default Boxes;