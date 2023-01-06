import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment/moment";
import ageCount from "../functions/ageCount";
// import deleteReport from "../functions//deleteReport";
// import getToken from "../functions/getToken";
import InfiniteScroll from 'react-infinite-scroll-component';
import AdminButtons from "./AdminButtons";

function Cards(props) {
    const role = props.role;
    const data = props.data;
    const isLoggedIn = props.logged;
    const [end, setEnd] = useState(7);
    const navigate = useNavigate();

    const handlePhoto = (props) => {

        const photo = props.photo;

        if (photo !== undefined) {
            return photo.photoUrl;

        } else {
            return "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg";
        }
    }

    const writeCity = (place) => {

        if (place != null && place.includes(',')) {
            return (place.split(',')[0]);
        }
        else {
            return (place);
        }
    }
    const writeProvince = (province) => {
        if (province === "poza Polską") {
            return "poza granicami Polski";
        }
        else {
            return (`, ${province}`);
        }
    }

    function handleSlice(index) {
        setEnd(end + index)
    }

    function sliceData() {
        const sliced = data.slice(0, end);
        return sliced;

    }


    // const showButtons = (props) => {
    //     const id = props.id;
    //     const createdId = props.createdId;
    //     if (role === "Admin") {
    //         return (
    //             <div className="adminBtnsCard">
    //                 <div className="btn-group dropright">
    //                     <button
    //                         className="btn btn-danger btn-sm dropdown-toggle"
    //                         type="button"
    //                         id="dropdownMenuButton"
    //                         data-toggle="dropdown"
    //                         aria-haspopup="true"
    //                         aria-expanded="false">
    //                         {state}
    //                     </button>
    //                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    //                         <a className="dropdown-item" id="accept" onClick={() => setStatus("Zaakceptowane")}>
    //                             Akceptuj
    //                         </a>
    //                         <a
    //                             className="dropdown-item" id="reject" onClick={() => setStatus("Odrzucone")}>
    //                             Odrzuć
    //                         </a>
    //                     </div>
    //                 </div>
    //                 <button className="btn btn-danger btn-sm" onClick={() => { navigate(`/edit-report/${id}`); }}>Edytuj</button>
    //                 <button className="btn btn-danger btn-sm" onClick={() => { deleteReport({ deleteId: id }) }}>Usuń</button>
    //             </div>
    //         )
    //     }
    //     else if (getToken().nameid === JSON.stringify(createdId)) {
    //         return (
    //             <div className="adminBtnsCard">
    //                 <button className="btn btn-danger btn-sm" onClick={() => { navigate(`/edit-report/${id}`); }}>Edytuj</button>
    //                 <button className="btn btn-danger btn-sm" onClick={() => { deleteReport({ deleteId: id }) }}>Usuń</button>

    //             </div>
    //         )
    //     }
    // }

    return (
        <InfiniteScroll
            dataLength={sliceData().length}
            next={() => handleSlice(7)}
            hasMore={true}
        >
            <div>
                {sliceData().map(person =>
                    <div key={person.id}>
                        <div className="box">
                            <div className="homeMissingList">
                                <div className="missingContent" onClick={() => { navigate(`/person/${person.id}`); }}>
                                    <div>
                                        <img className="photos" src={handlePhoto({ photo: person.photosMissingPerson[0] })} alt=""></img>

                                    </div>
                                    <div>
                                        <div className="homeMissingText">
                                            <b><h4>{person.firstName} {person.lastName}</h4></b>
                                        </div>
                                        <div className="homeMissingText">
                                            Ostatnio widziany/a:  {moment(person.lastSeenDate).format('DD.MM.YYYY')} w {writeCity(person.lastSeenCity)}
                                        </div>
                                        <div className="homeMissingText">
                                            Wiek: <>{ageCount({ birth: person.dateOfBirth })}</>
                                        </div>
                                        <div className="homeMissingText">
                                            Płeć: {person.gender}
                                        </div>
                                        <div className="homeMissingText">
                                            Wzrost: {person.height}
                                        </div>
                                        <div className="homeMissingText">
                                            Miejsce zamieszkania: {writeCity(person.cityOfResidence)}{writeProvince(person.voivodeshipOfResidence)}
                                        </div>
                                    </div>
                                </div>
                                {isLoggedIn ?
                                    // <> {showButtons({ id: person.id, createdId: person.createdById })}
                                    <> <AdminButtons id={person.id} createdId={person.createdById} role={role} status={person.status}/>

                                    </>
                                    :
                                    <></>
                                }

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </InfiniteScroll>
    )

}
export default Cards;