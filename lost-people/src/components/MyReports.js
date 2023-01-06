import getToken from "../functions/getToken";
import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";

function MyReports(props) {
    const role = props.role;
    const isLoggedIn = props.logged;
    const userId = getToken().nameid;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`https://localhost:7162/api/missingPeople/all`)
            .then(function (response) {
                setData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [data]);

    const filtered = data.filter((person) => {
        return userId === person.createdById ? person : JSON.stringify(person.createdById) === userId;
    })


    return (
        <div>
            {isLoggedIn ?
                <Cards data={filtered} role={role} logged={isLoggedIn}/>
                :
                <div className="personalPageDetails">
                    <div className="homeMissingText">
                        Nie jesteś zalogowany!
                        <div style={{ paddingTop: 20 }}>
                            <a href="/login">Zaloguj się</a> lub <a href="/register">Zarejestruj się</a></div>
                    </div>
                </div>}
        </div>
    )

}
export default MyReports;