import { lazy, Suspense, useEffect, useState, useContext } from 'react';
import moment from 'moment/moment';
import Form from './Form';
import User from './User';

import '../assets/css/Aside.css';
import Load from './Load';

import { context } from '../App';

const ErrorConnection = lazy(() => import('./ErrorConnection'));

const user = (key, name, src, date, shortcatMessage, is_opened, username) => <User
                        key={key}
                        name={name}
                        src={src}
                        date={date}
                        shortcatMessage={shortcatMessage}
                        is_opened={is_opened}
                        username={username}
                    />;

const Aside = ({ connections = [], isNotConnecting }) => {
    const [value, setValue] = useState("");
    const [fetching, setFetching] = useState(false)
    const [searchConnections, setSearchConnections] = useState(null);
    const { currentMessage, username } = useContext(context);
    const [show, setShow] = useState(
        connections.length ?
            connections.map(connection => connection.name.startsWith(value) ? <User key={connection.id} name={connection.name} unRead={connection.unRead} src={connection.avatar} date={moment(connection.date).format('MM/DD/YY')} shortcatMessage={connection.shortcatMessage} username={username} is_opened={connection.is_opened} /> : "")
        :
            <div className='whatsapp__aside-main_content-placholder'>
                Start A Chat!
            </div>
    );

    useEffect(() => {
        
        if (JSON.stringify(currentMessage) !== '{}' && currentMessage.room >= 0) {

            let index = connections.findIndex(connection => connection.id === currentMessage.room);
            
            if (currentMessage.content) {
                if (index === -1) {
                    connections.unshift({});
                    index = 0;
                }
                connections[index].avatar = currentMessage.avatar ?? connections[index].avatar;
                connections[index].date = currentMessage.date?.split('-')[1] ?? connections[index].date;
                connections[index].shortcatMessage = currentMessage.content ?? connections[index].shortcatMessage;
                connections[index].is_opened = currentMessage.is_opened ?? connections[index].is_opened;
                setShow([
                    user(currentMessage.room, currentMessage.name, connections[index].avatar, currentMessage.date.split('-')[1], currentMessage.content, connections[index].is_opened, currentMessage.username),
                    ...show.filter(item => +item.key !== currentMessage.room)
                ]);
            } else if (currentMessage.avatar) {

                connections[index].avatar = currentMessage.avatar;
                setShow([
                    ...show.slice(0, index),
                    user(connections[index].room, connections[index].name, connections[index].avatar, connections[index].date, connections[index].shortcatMessage, connections[index].is_opened, connections[index].username),
                    ...show.slice(index + 1)
                ]);
            } else if (typeof currentMessage.is_opened === "boolean" && index >= 0) {

                connections[index].is_opened = currentMessage.is_opened;
                setShow([
                    ...show.slice(0, index),
                    user(connections[index].room, connections[index].name, connections[index].avatar, connections[index].date, connections[index].shortcatMessage, connections[index].is_opened, connections[index].username),
                    ...show.slice(index + 1)
                ]);
            }

            // let user = [];
            // // if (typeof currentMessage.id === "undefined") {
            //     user[0] = <User
            //                 key={connections[index].id}
            //                 name={connections[index].name}
            //                 src={connections[index].avatar}
            //                 date={connections[index].date}
            //                 shortcatMessage={connections[index].shortcatMessage}
            //                 username={username}
            //                 order={currentMessage.content ? --i : i}
            //             />;
            // }
            // if (index === -1) {
            //     setShow([
            //         ...user,
            //         ...show,
            //     ]);
            // } else {
                // connections[index].avatar = currentMessage.avatar ?? connections[index].avatar;
                // connections[index].date = currentMessage.date?.split('-')[1] ?? connections[index].date;
                // connections[index].shortcatMessage = currentMessage.content ?? connections[index].shortcatMessage;
                // setShow([
                //     ...show.slice(0, index),
                //     ...user,
                //     ...show.slice(index + 1)
                // ]);
            // }
        } else if (!currentMessage.avatar && JSON.stringify(currentMessage) !== '{}') {

        }
    }, [currentMessage])
    
    const search = () => {
        setFetching(true);
        if (value) {
            fetch("http://127.0.0.1:5000")
            .then(res => res.json())
            .then(res => {
                setSearchConnections(res);
                setFetching(false);
            })
            .catch(error => console.log(error));
        }
    }
    
    return (
        <aside className='whatsapp__aside'>
            {
                isNotConnecting && <Suspense fallback=""><ErrorConnection /></Suspense>
            }
            <header className='whatsapp__aside-header'>
                <Form value={value} setValue={setValue} setSearchConnections={setSearchConnections} searchConnections={searchConnections} search={search} />
                <button>
                    <svg viewBox="0 0 24 24" height="20" width="20" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24" xmlSpace="preserve"><path fill="currentColor" d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z"></path></svg>
                </button>
            </header>
            <main className='whatsapp__aside-main'>
                <article className='whatsapp__aside-main_content'>
                    <article>
                        {fetching && <Load />}
                        {
                            searchConnections?.length ?
                                searchConnections.map(connection => connection.name.startsWith(value) ? <User key={connection.id} name={connection.name} src={connection.avatar} date={connection.date} shortcatMessage={connection.shortcatMessage} /> : "")
                            :
                                searchConnections !== null && <div className='whatsapp__aside-main_content-placholder'>
                                    No Connections Like This!
                                </div>
                        }
                        { show }
                    </article>
                    <footer className='whatsapp__aside-main_footer'>
                        <div>
                            Your personal messages are
                            {' '}
                            <a role="button" rel="noreferrer noopener" target="_blank">end-to-end encrypted</a>
                        </div>
                    </footer>
                </article>
            </main>
        </aside>
    )
}

export default Aside
