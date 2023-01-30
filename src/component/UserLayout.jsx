import "../assets/css/UserLayout.css";

const UserLayout = ({ children, src, date, name, unread }) => {
  return (
    <>
        <div className="user__avatar" title={name}>
            <img src={src} alt={name + " logo"} />
        </div>
        {
            date ?
                <div className="user__shortcat">
                    <div className="user__shortcat-info">
                        <div className="user__shortcat-info_name" title={name}>{name}</div>
                        <div className="user__shortcat-info_date" style={{fontWeight: unread ? "600" : "", color: unread ? "var(--top-background-color)" : "", transition: "0s"}}>{date}</div>
                    </div>
                    { children }
                </div>
            :
                <div className="user__shortcat-info_name" title={name}>{name}</div>
        }
    </>
  )
}

export default UserLayout