import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import deleteReport from "../functions/deleteReport";
import getToken from "../functions/getToken";
import statusAccept from "../functions/statusAccept";
import statusReject from "../functions/statusReject";

const AdminButtons = (props) => {

    const role = props.role;
    const prevStatus = props.status;
    const [state, setState] = useState('');
    const [color, setColor] = useState("");
    const [status, setStatus] = useState('');
    const navigate = useNavigate();


    useEffect(()=> {    

        if (prevStatus === "reported") {
            setState("Złożone");
            setColor("btn-warning");      
        }
        else if (prevStatus === "accepted") {
            setState("Zaakceptowane");
            setColor("btn-success");
        }
        else if (prevStatus === "rejected") {
            setState("Odrzucone");
            setColor("btn-danger");
        }     

    }, [state, prevStatus])



    const id = props.id;
    const createdId = props.createdId;
    if (role === "Admin") {
        return (
            <div className="adminBtnsCard">
                <div className="btn-group dropright">
                    <button
                        className={`btn btn-sm dropdown-toggle ${color}`}
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        {state}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" id="accept" onClick={() => {setState("Zaakceptowane"); statusAccept({ acceptId: id }) }}>
                            Akceptuj
                        </a>
                        <a
                            className="dropdown-item" id="reject" onClick={() => {setState("Odrzucone"); statusReject({ rejectId: id})}}>
                            Odrzuć
                        </a>
                    </div>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => { navigate(`/edit-report/${id}`); }}>Edytuj</button>
                <button className="btn btn-danger btn-sm" onClick={() => { deleteReport({ deleteId: id }) }}>Usuń</button>
            </div>
        )
    }
    else if (getToken().nameid === JSON.stringify(createdId)) {
        return (
            <div className="adminBtnsCard">
                <button className="btn btn-danger btn-sm" onClick={() => { navigate(`/edit-report/${id}`); }}>Edytuj</button>
                <button className="btn btn-danger btn-sm" onClick={() => { deleteReport({ deleteId: id }) }}>Usuń</button>

            </div>
        )
    }



}
export default AdminButtons;