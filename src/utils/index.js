export const urlFor = (src) => {
    if (typeof src === "object") return URL.createObjectURL(src);
    return process.env.REACT_APP_WHATSAPP_BACKEND_URL + src;
};

export const getFormattedDate = () => {
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const mounth = '' + dateNow.getMonth() + 1;
    const day = (dateNow.getDate() < 10 ? '0' : '') + dateNow.getDate();

    return `${mounth}/${day}/${(""+year).slice(-2)}`;
};