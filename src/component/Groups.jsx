import { useState, useEffect, useContext, Suspense, lazy } from 'react';

import Group from './Group.jsx';
import Load from './Load';
import { context } from '../App';

import '../assets/css/group.css';


const Groups = () => {
  const [groups, setGroups] = useState();
  const { username } = useContext(context);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_WHATSAPP_BACKEND_URL}/api/groups/?admin=${username}`)
    .then(r => r.json())
    .then(r => setGroups(r))
    .catch(err => console.log(err));
  }, [])

  if (typeof groups === "undefined") return <Load />;

  const handleCreate = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_WHATSAPP_BACKEND_URL}/api/groups/`, {
      method: "POST",
      body: JSON.stringify(username)
    })
    // .then(r => r.json())
    // .then(r => setGroups(r))
    // .catch(err => console.log(err));
  }
  
  return (
    <main className='whatsapp__main'>
      <main className='whatsapp__main-group'>
      <article className='whatsapp__main-group_content'>
      <form>
        <input placeholder='add new group' onClick={e => e.stopPropagation()} />
        <button title="add group" onClick={handleCreate}>
          <svg style={{ transform: 'rotate(45deg)' }} viewBox="0 0 16 16" height="16" width="16" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 16 16" xmlSpace="preserve"><path fill="currentColor" d="M12.174,4.661l-0.836-0.835L8,7.165L4.661,3.826L3.826,4.661 L7.165,8l-3.339,3.339l0.835,0.835L8,8.835l3.338,3.339l0.836-0.835L8.835,8L12.174,4.661z"></path></svg>
        </button>
      </form>
      </article>
        {
            groups?.length > 0 ? (
              groups.map(group => <Group key={group.id} group={group} />)
            ) : (
              groups?.length === 0 ? (
                "No groups yet!"
              ) : (
                <Load />
              )
            )
        }
      </main>
    </main>
  )
}

export default Groups