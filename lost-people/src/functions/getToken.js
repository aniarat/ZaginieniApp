import jwt_decode from "jwt-decode";
import getCookie from "./getCookie";

export default function getToken() {

    const token = getCookie()
    const decoded = jwt_decode(token);
    // console.log(decoded)             
    // const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    // console.log(role)

    return (decoded)
}
