import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import authAxios from "../functions/authAxios";
import getToken from "../functions/getToken";
import deleteUser from "../functions/deleteUser";
import editRole from "../functions/editRole";

export default function UserList(props) {

    const role = props.role;
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [firstNameSearch, setFirstNameSearch] = useState('');
    const [lastNameSearch, setLastNameSearch] = useState('');
    const [roleSearch, setRoleSearch] = useState('');
    const [usernameSearch, setUsernameSearch] = useState('');
    const [emailSearch, setEmailSearch] = useState('');
    const [phoneSearch, setPhoneSearch] = useState('');


    useEffect(() => {
        authAxios()
            .get(`https://localhost:7162/api/admin/users/all/withRoles`)
            .then(function (response) {
                setData(response.data)
                // console.log(data)
            })
            .catch(function (error) {
                console.log(error);
                navigate("/")
            });
    }, [data, navigate]);

    const [sortType, setSortType] = useState('descending');
    const [dataType, setDataType] = useState('id');


    function handleSort() {
        if (sortType === "descending") {
            return data.sort((a, b) => b[dataType] - a[dataType]);
        }
        else if (sortType === "ascending") {
            return data.sort((a, b) => a[dataType] - b[dataType]);
        }
    }


    const search = handleSort()
        .filter((user) => {
            return firstNameSearch.toLowerCase() === '' ? user : user.firstName.toLowerCase().includes(firstNameSearch.toLowerCase());
        })
        .filter((user) => {
            return lastNameSearch.toLowerCase() === '' ? user : user.lastName.toLowerCase().includes(lastNameSearch.toLowerCase());
        })
        .filter((user) => {
            return roleSearch === '' ? user : user.roles[0] === roleSearch;
        })
        .filter((user) => {
            return usernameSearch.toLowerCase() === '' ? user : user.username.toLowerCase().includes(usernameSearch.toLowerCase());
        })
        .filter((user) => {
            return emailSearch === '' ? user : user.email === emailSearch;
        })
        .filter((user) => {
            return phoneSearch === '' ? user : user.phoneNumber === phoneSearch;
        })


    return (
        <div>
            {role === "Admin" ?
                <>
                    <div className="filter-btn">
                        <button
                            className="btn btn-danger btn-block my-2 my-sm-0"
                            data-toggle="collapse"
                            data-target="#searchCollapse"
                            aria-expanded="false"
                            aria-controls="searchCollapse">
                            Wyszukiwanie <i className="bi bi-chevron-expand"></i>
                        </button>
                        <div style={{ paddingLeft: 5 }}></div>
                        <button
                            className="btn btn-danger dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Sortuj
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item"
                                href="#"
                                onClick={() => { setSortType('ascending'); setDataType('id') }}>
                                Data dodania <i className="bi bi-arrow-up"></i>
                            </a>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => { setSortType('descending'); setDataType('id') }}>
                                Data dodania <i className="bi bi-arrow-down"></i>
                            </a>
                        </div>
                    </div>

                    <div className="collapse show" id="searchCollapse">
                    <div className="box">
                        <div className="formBox" style={{ paddingBottom: 10, paddingTop: 20 }}>
                            <form>
                                <div className="searchBox" >
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={data.firstName}
                                        onChange={(e) => setFirstNameSearch(e.target.value)}
                                        placeholder="Imię" />
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={data.lastName}
                                        onChange={(e) => setLastNameSearch(e.target.value)}
                                        placeholder="Nazwisko" />
                                </div>
                                <div className="searchBox">
                                    <div className="userSearch">
                                        <select
                                            className="custom-select custom-select-sm"
                                            value={data.roles}
                                            onChange={(e) => setRoleSearch(e.target.value)}>
                                            <option value=''>Rola</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Member">Member</option>
                                        </select>
                                    </div>
                                    <div className="userSearch">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={data.username}
                                            onChange={(e) => setUsernameSearch(e.target.value)}
                                            placeholder="Nazwa użytkownika" />
                                    </div>
                                </div>
                                <div className="searchBox">
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={data.email}
                                        onChange={(e) => setEmailSearch(e.target.value)}
                                        placeholder="Email" />
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={data.phoneNumber}
                                        onChange={(e) => setPhoneSearch(e.target.value)}
                                        placeholder="Numer telefonu" />
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>

                    {search.map((user, userId) =>
                        <div key={userId}>
                            <div className="box">
                                <div className="homeMissingList">
                                    <div className="missingContent">
                                        <div>
                                            <img className="photos" src={"https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"} alt=""></img>
                                        </div>
                                        <div>
                                            <div className="homeMissingText">
                                                <b><h4>{user.firstName} {user.lastName}</h4></b>
                                                {user.roles}
                                            </div>
                                            <div className="homeMissingText">
                                                {user.username}
                                            </div>
                                            <div className="homeMissingText">
                                                {user.email}
                                            </div>
                                            <div className="homeMissingText">
                                                {user.phoneNumber}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="adminBtnsCard">
                                        {getToken().nameid !== String(user.id) ?
                                            <>
                                                {user.roles[0] !== 'Admin' ?
                                                    <>
                                                        <button className="btn btn-danger btn-sm" type="button" onClick={() => { editRole({ editRole: user.id }) }}>Zmień uprawnienia</button>
                                                        <button className="btn btn-danger btn-sm" onClick={() => { deleteUser({ deleteId: user.id }) }}>Usuń</button>
                                                    </>
                                                    :
                                                    <></>
                                                }
                                            </>
                                            :
                                            <button className="btn btn-danger btn-sm" onClick={() => { deleteUser({ deleteId: user.id }) }}>Usuń</button>

                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
                :
                <></>

            }

        </div>
    )

}