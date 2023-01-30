import { useState, Suspense, lazy } from 'react';

import UserLayout from './UserLayout';
import { urlFor } from '../utils';
import { Link } from 'react-router-dom';

const Connections = lazy(() => import('./Connections'));

const Group = ({ group }) => {
    const [isMenuShowing, setIsMenuShowing] = useState(false);
    const [deleted, setDeleted] = useState(false);

    if (deleted) return null;

    const handeleClick = (e, id) => {
        e.stopPropagation();
        fetch(`${process.env.REACT_APP_WHATSAPP_BACKEND_URL}/api/groups/`, {
            method: 'PUT',
            body: id
        }).then(r =>  r.json()).then(r => setDeleted(r.deleted))
        .catch(err => console.log(err));
    }

    return (
        <article className='whatsapp__main-group_content' onClick={() => setIsMenuShowing(p => !p)}>
            <Link to={`/@${group.group_name}`}>
                <UserLayout src={urlFor(group.avatar)} name={group.group_name} />
            </Link>
            <span>
                {
                    group.number_of_connection === 1 ? (
                        <>Just You in {group.group_name} group!</>
                    ) : (
                        <>{group.number_of_connection} connections in there!</>
                    )
                }
                <button title={'delete ' + Object.keys({ group })[0]} onClick={(e) => handeleClick(e, group.id)}>
                    <svg viewBox="0 0 16 16" height="16" width="16" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 16 16" xmlSpace="preserve"><path fill="currentColor" d="M12.174,4.661l-0.836-0.835L8,7.165L4.661,3.826L3.826,4.661 L7.165,8l-3.339,3.339l0.835,0.835L8,8.835l3.338,3.339l0.836-0.835L8.835,8L12.174,4.661z"></path></svg>
                </button>
            </span>
            {/* onClick show this menu */}
            {
                isMenuShowing && (
                    <div className='whatsapp__main-group_content-connections'>
                        <form>
                            <button title='search'>
                                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24" xmlSpace="preserve"><path fill="currentColor" d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z"></path></svg>
                            </button>
                            <input placeholder='add new user' onClick={e => e.stopPropagation()} />
                            <button title="add connection">
                                <svg style={{ transform: 'rotate(45deg)' }} viewBox="0 0 16 16" height="16" width="16" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 16 16" xmlSpace="preserve"><path fill="currentColor" d="M12.174,4.661l-0.836-0.835L8,7.165L4.661,3.826L3.826,4.661 L7.165,8l-3.339,3.339l0.835,0.835L8,8.835l3.338,3.339l0.836-0.835L8.835,8L12.174,4.661z"></path></svg>
                            </button>
                        </form>
                        <Suspense fallback={<></>}>
                            <Connections id={group.id} />
                        </Suspense>
                    </div>
                )
            }
        </article>
    );
}

export default Group;