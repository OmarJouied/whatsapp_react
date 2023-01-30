import { Link } from "react-router-dom";

const Nav = ({arr}) => <nav className='nav'>{arr.map(src => <Link to={src.to} key={src.content} className='nav_button' onClick={src.onClick}>
            <svg viewBox={`0 0 ${src.size ?? "24"} ${src.size ?? "24"}`} height={src.size ?? "24"} width={src.size ?? "24"} preserveAspectRatio="xMidYMid meet" version="1.1" id="ee51d023-7db6-4950-baf7-c34874b80976" x="0px" y="0px" enableBackground="new 0 0 24 24" xmlSpace="preserve"><path fill="currentColor" d={src.content}></path></svg>
        </Link>)
        }
    </nav>

export default Nav;