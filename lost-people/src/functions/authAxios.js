import getCookie from "../functions/getCookie";
import axios from "axios";

const authAxios = () => {
    const accessToken = getCookie();

    const authorizeAxios = axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,            
        },
    });

    return authorizeAxios;
}
export default authAxios;


