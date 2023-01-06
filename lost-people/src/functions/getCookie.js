function getCookie() {

    if (document.cookie) {
        const cookieArr = document.cookie.split("=")[1]
        return (cookieArr)
    }
    else {
        return null;
    }
}
export default getCookie;