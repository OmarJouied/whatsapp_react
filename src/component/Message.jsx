const Message = ({type, content, date}) => {
    // console.log(content);
    return (
        <article className={'whatsapp__main-main_content-message '+type}>
            {
                type === 'date' ?
                    content
                :
                    <>
                        <span className='whatsapp__main-main_content-message_arrow'>
                            <svg viewBox="0 0 8 13" width="8" height="13">
                                <path opacity=".13" fill="#0000000" d="M1.533 3.568 8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path>
                                <path fill="currentColor" d="M1.533 2.568 8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path>
                            </svg>
                        </span>
                        <p className='whatsapp__main-main_content-message_content' style={{direction: content[0] >= 'ؠ' ? "rtl" : "ltr"}}>{content}</p>
                        <p className='whatsapp__main-main_content-message_time'>{date}</p>
                    </>
            }
        </article>
    )
}

export default Message;