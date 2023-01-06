import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import data from 'polskie-miejscowosci';
import Cards from "./Cards";

function Home(props) {

    const navigate = useNavigate();
    const role = props.role;
    const isLoggedIn = props.logged;

    const [peopleData, setPeopleData] = useState([]);
    // const [photo, setPhoto] = useState('');
    // const id=4;

    const [firstNameSearch, setFirstNameSearch] = useState('');
    const [lastNameSearch, setLastNameSearch] = useState('');
    const [genderSearch, setGenderSearch] = useState('');
    // const [heightSearch, setHeightSearch] = useState(0); 
    // const [figureSearch, setFigureSearch] = useState('');
    const [eyeColorSearch, setEyeColorSearch] = useState('');
    const [hairColorSearch, setHairColorSearch] = useState('');
    const [skinColorSearch, setSkinColorSearch] = useState('');
    const [cityOfResidenceSearch, setCityOfResidenceSearch] = useState('');
    const [voivodeshipOfResidenceSearch, setVoivodeSoRSearch] = useState('');
    const [ageFromSearch, setAgeFromSearch] = useState(0);
    const [ageToSearch, setAgeToSearch] = useState(0);
    // const [policeUnitSearch, setPoliceUnitSearch] = useState('');
    // const [reportedPolice, setReportedToThePolice] = useState('');
    // const [confirmedPolice, setConfirmedByThePolice] = useState('');
    // const [lastSeenDate, setLastSeenDate] = useState('');
    const [lastSeenCitySearch, setLastSeenCitySearch] = useState('');
    const [voivodeshipSearch, setVoivodeshipSearch] = useState('');

    const [province, setProvince] = useState('');
    const [lastSeenProvince, setLastSeenProvince] = useState('');

    useEffect(() => {
        axios
            .get(`https://localhost:7162/api/missingPeople/all`)
            .then(function (response) {
                setPeopleData(response.data);
                // console.log(peopleData)
                // console.log(peopleData[0].photosMissingPerson[0].photoUrl)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [peopleData]);

  
    const filtered = peopleData
        // .filter((person) => {
        //     return person.status === "accepted"
        // })
        .filter((person) => {
            return firstNameSearch.toLowerCase() === '' ? person : person.firstName.toLowerCase().includes(firstNameSearch.toLowerCase());
        })
        .filter((person) => {
            return lastNameSearch.toLowerCase() === '' ? person : person.lastName.toLowerCase().includes(lastNameSearch.toLowerCase());
        })
        .filter((person) => {
            return genderSearch === '' ? person : person.gender === genderSearch;
        })
        .filter((person) => {
            return skinColorSearch === '' ? person : person.skinColor === skinColorSearch;
        })
        .filter((person) => {
            return hairColorSearch === '' ? person : person.hairColor === hairColorSearch;
        })
        .filter((person) => {
            return eyeColorSearch === '' ? person : person.eyeColor === eyeColorSearch;
        })
        .filter((person) => {
            return voivodeshipOfResidenceSearch === '' ? person : person.voivodeshipOfResidence === voivodeshipOfResidenceSearch.toLowerCase();
        })
        .filter((person) => {
            return cityOfResidenceSearch === '' ? person : person.cityOfResidence === cityOfResidenceSearch;
        })
        .filter((person) => {
            return voivodeshipSearch === '' ? person : person.voivodeship === voivodeshipSearch.toLowerCase();
        })
        .filter((person) => {
            return lastSeenCitySearch === '' ? person : person.lastSeenCity === lastSeenCitySearch;
        })
        .filter((person) => {

            if (ageFromSearch == '' && ageToSearch == '') {
                return person;
            }
            else if (ageFromSearch !== '' && ageToSearch == '') {
                return JSON.stringify(person.age) >= ageFromSearch;
            }
            else if (ageToSearch !== '' && ageFromSearch == '') {
                return JSON.stringify(person.age) <= ageToSearch;
            }
            else if (ageFromSearch !== '' && ageToSearch !== '') {
                return (ageFromSearch <= JSON.stringify(person.age) && ageToSearch >= JSON.stringify(person.age));
            }
        })

   
    const [sortType, setSortType] = useState('descending');
    const [dataType, setDataType] = useState('id');


    function handleSort() {
        if (sortType === "descending") { 
            return filtered.sort((a, b) => b[dataType] - a[dataType]);
        }
        else if (sortType === "ascending") {
            return filtered.sort((a, b) => a[dataType] - b[dataType]);            
        }
    }

// const daty = [new Date("2022-11-11T00:00:00"), new Date("2022-12-12T00:00:00"), new Date("2022-11-09T00:00:00")];
// const sortowanie = daty.sort((a, b) => a-b);
// console.log(sortowanie)



    return (
        <div>
            <div>
                <div className="filter-btn">
                    <button
                        className="btn btn-danger btn-block my-2 my-sm-0"
                        data-toggle="collapse"
                        data-target="#formCollapse"
                        aria-expanded="false"
                        aria-controls="formCollapse">
                        Szukaj <span className="bi bi-arrow-down-up"></span>
                    </button>
                    <div style={{paddingLeft: 5}}></div>
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
                        {/* <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => { setSortType('ascending'); setDataType('new Date(${lastSeenDate})') }}>
                            Data zaginięcia <i className="bi bi-arrow-up"></i>
                        </a>
                        <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => { setSortType('descending'); setDataType('new Date(lastSeenDate)') }}>
                            Data zaginięcia <i className="bi bi-arrow-down"></i>
                        </a> */}
                        <a 
                        className="dropdown-item" 
                        href="#"
                        onClick={() => { setSortType('ascending'); setDataType('age') }}>
                            Wiek <i className="bi bi-arrow-up"></i>
                            </a>
                            {/* {console.log(handleSort())} */}
                        <a 
                        className="dropdown-item" 
                        href="#"
                        onClick={() => { setSortType('descending'); setDataType('age') }}>
                            Wiek <i className="bi bi-arrow-down"></i>
                        </a>
                    </div>

                </div>
                <div className="collapse" id="formCollapse">
                    <div className="box" style={{ paddingTop: 5, paddingBottom: 5 }}>
                        <div className="formBox">
                            <form>
                                <div>
                                    <a
                                        className="collapseLink"
                                        data-toggle="collapse"
                                        href="#generalCollapse"
                                        role="button"
                                        aria-expanded="true"
                                        aria-controls="generalCollapse"
                                        title="Kliknij aby rozwinąć lub ukryć">
                                        <label>
                                            Ogólne <span className="bi bi-chevron-expand"></span>
                                        </label>
                                    </a>
                                    <div className="collapse show" id="generalCollapse">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                value={peopleData.firstName}
                                                onChange={(e) => setFirstNameSearch(e.target.value)}
                                                placeholder="Imię" />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                value={peopleData.lastName}
                                                onChange={(e) => setLastNameSearch(e.target.value)}
                                                placeholder="Nazwisko" />
                                        </div>
                                        <div className="form-group">
                                            <select
                                                className="custom-select custom-select-sm"
                                                value={peopleData.gender}
                                                onChange={(e) => setGenderSearch(e.target.value)}>
                                                <option value=''>Płeć</option>
                                                <option value="Kobieta">Kobieta</option>
                                                <option value="Mężczyzna">Mężczyzna</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <div className="ageFilter">
                                                <div style={{ color: "#6c757d", fontWeight: "lighter" }}>
                                                    Wiek:
                                                </div>
                                                <div className="age-filter">
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-sm"
                                                        value={peopleData.age}
                                                        onChange={(e) => setAgeFromSearch(e.target.value)}
                                                        placeholder="Od" />
                                                </div>
                                                <div className="">
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-sm"
                                                        value={peopleData.age} onChange={(e) => setAgeToSearch(e.target.value)}
                                                        placeholder="Do" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <a
                                        className="collapseLink"
                                        data-toggle="collapse"
                                        href="#looksCollapse"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="looksCollapse"
                                        title="Kliknij aby rozwinąć lub ukryć">
                                        <label>
                                            Wygląd <span className="bi bi-chevron-expand"></span>
                                        </label>
                                    </a>
                                    <div className="collapse" id="looksCollapse">
                                        <div className="form-group">
                                            <select
                                                className="custom-select custom-select-sm"
                                                value={peopleData.skinColor}
                                                onChange={(e) => setSkinColorSearch(e.target.value)}>
                                                <option value=''>Kolor skóry</option>
                                                <option value="Biała">Biała</option>
                                                <option value="Czarna">Czarna</option>
                                                <option value="Żółta">Żółta</option>
                                                <option value="Inna">Inna</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <select
                                                className="custom-select custom-select-sm"
                                                value={peopleData.hairColor}
                                                onChange={(e) => setHairColorSearch(e.target.value)}>
                                                <option value=''>Kolor włosów</option>
                                                <option value="Biały">Biały</option>
                                                <option value="Jasny blond">Jasny blond</option>
                                                <option value="Blond">Blond</option>
                                                <option value="Ciemny blond">Ciemny blond</option>
                                                <option value="Rudy">Rudy</option>
                                                <option value="Rudoblond">Rudoblond</option>
                                                <option value="Jasnobrązowy">Jasnobrązowy</option>
                                                <option value="Brązowy">Brązowy</option>
                                                <option value="Ciemnobrązowy">Ciemnobrązowy</option>
                                                <option value="Czarny">Czarny</option>
                                                <option value="Siwy">Siwy</option>
                                                <option value="Siwy">Inny</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <select
                                                className="custom-select custom-select-sm"
                                                value={peopleData.eyeColor}
                                                onChange={(e) => setEyeColorSearch(e.target.value)}>
                                                <option value=''>Kolor oczu</option>
                                                <option value="Brązowy">Brązowy</option>
                                                <option value="Jasnobrązowy">Jasnobrązowy</option>
                                                <option value="Zielony">Zielony</option>
                                                <option value="Szary">Szary</option>
                                                <option value="Niebieski">Niebieski</option>
                                                <option value="Inny">Inny</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <a
                                        className="collapseLink"
                                        data-toggle="collapse"
                                        href="#residenceCollapse"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="residenceCollapse"
                                        title="Kliknij aby rozwinąć lub ukryć">
                                        <label>
                                            Miejsce zamieszkania <span className="bi bi-chevron-expand"></span>
                                        </label>
                                    </a>
                                    <div className="collapse" id="residenceCollapse">
                                        <div className="form-group">
                                            <select
                                                className="custom-select custom-select-sm"
                                                value={peopleData.voivodeshipOfResidence}
                                                onChange={(e) => { setVoivodeSoRSearch(e.target.value); setProvince(e.target.value) }}>
                                                <option value="">Województwo</option>
                                                <option value="poza Polską">Poza granicami Polski</option>
                                                <option value="dolnośląskie">dolnośląskie</option>
                                                <option value="kujawsko-pomorskie">kujawsko-pomorskie</option>
                                                <option value="lubelskie">lubelskie</option>
                                                <option value="lubuskie">lubuskie</option>
                                                <option value="łódzkie">łódzkie</option>
                                                <option value="małopolskie">małopolskie</option>
                                                <option value="mazowieckie">mazowieckie</option>
                                                <option value="opolskie">opolskie</option>
                                                <option value="podkarpackie">podkarpackie</option>
                                                <option value="podlaskie">podlaskie</option>
                                                <option value="pomorskie">pomorskie</option>
                                                <option value="śląskie">śląskie</option>
                                                <option value="świętokrzyskie">świętokrzyskie</option>
                                                <option value="warmińsko-mazurskie">warmińsko-mazurskie</option>
                                                <option value="wielkopolskie">wielkopolskie</option>
                                                <option value="zachodniopomorskie">zachodniopomorskie</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <select
                                                className="custom-select custom-select-sm"
                                                value={peopleData.cityOfResidence}
                                                onChange={(e) => setCityOfResidenceSearch(e.target.value)}>
                                                <option value="">Miejscowość</option>
                                                {
                                                    data
                                                        .filter((p) => (p.Province) === province)
                                                        .map((place, index) => (
                                                            <option key={index} value={[place.Name, place.District]}>
                                                                {`${place.Name}, powiat ${place.District}`}
                                                            </option>
                                                        ))

                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <a
                                        className="collapseLink"
                                        data-toggle="collapse"
                                        href="#lastSeenCollapse"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="lastSeenCollapse"
                                        title="Kliknij aby rozwinąć lub ukryć">
                                        <label>Ostatnio widziany/a
                                            <span className="bi bi-chevron-expand"></span>
                                        </label>
                                    </a>
                                    <div className="collapse" id="lastSeenCollapse">
                                        <div className="form-group">
                                            <select
                                                className="custom-select custom-select-sm"
                                                value={peopleData.voivodeship}
                                                onChange={(e) => { setVoivodeshipSearch(e.target.value); setLastSeenProvince(e.target.value) }}>
                                                <option value="">Województwo</option>
                                                <option value="poza Polską">Poza granicami Polski</option>
                                                <option value="dolnośląskie">dolnośląskie</option>
                                                <option value="kujawsko-pomorskie">kujawsko-pomorskie</option>
                                                <option value="lubelskie">lubelskie</option>
                                                <option value="lubuskie">lubuskie</option>
                                                <option value="łódzkie">łódzkie</option>
                                                <option value="małopolskie">małopolskie</option>
                                                <option value="mazowieckie">mazowieckie</option>
                                                <option value="opolskie">opolskie</option>
                                                <option value="podkarpackie">podkarpackie</option>
                                                <option value="podlaskie">podlaskie</option>
                                                <option value="pomorskie">pomorskie</option>
                                                <option value="śląskie">śląskie</option>
                                                <option value="świętokrzyskie">świętokrzyskie</option>
                                                <option value="warmińsko-mazurskie">warmińsko-mazurskie</option>
                                                <option value="wielkopolskie">wielkopolskie</option>
                                                <option value="zachodniopomorskie">zachodniopomorskie</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <select
                                                className="custom-select custom-select-sm"
                                                value={peopleData.lastSeenCity}
                                                onChange={(e) => setLastSeenCitySearch(e.target.value)}>
                                                <option value="">Miejscowość</option>
                                                {
                                                    data
                                                        .filter((p) => (p.Province) === province)
                                                        .map((place, index) => (
                                                            <option key={index} value={[place.Name, place.District]}>
                                                                {`${place.Name}, powiat ${place.District}`}
                                                            </option>
                                                        ))

                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Cards
                role={role}
                data={handleSort()}
                logged = {isLoggedIn} />
            {/* <button className="btn btn-danger btn-block my-2 my-sm-0" type="submit"><span className="bi bi-search"></span></button> */}

        </div>
    )
}

export default Home;
