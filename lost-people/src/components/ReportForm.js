import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "../functions/authAxios";
import data from 'polskie-miejscowosci';
import ageCount from "../functions/ageCount";
import getToken from "../functions/getToken";
import FormInfo from "./FormInfo";
import ReportWarning from "./ReportWarning";


function ReportForm(props) {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [figure, setFigure] = useState('');
    const [eyeColor, setEyeColor] = useState('');
    const [hairColor, setHairColor] = useState('');
    const [skinColor, setSkinColor] = useState('');
    const [cityOfResidence, setCityOfResidence] = useState('');
    const [voivodeshipOfResidence, setVoivodeSoR] = useState('');
    const [policeUnit, setPoliceUnit] = useState('');
    const [policeUnitContact, setPoliceUnitContact] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [reportedPolice, setReportedToThePolice] = useState('Nie');
    const [confirmedPolice, setConfirmedByThePolice] = useState('Nie');
    const [lastSeenDate, setLastSeenDate] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [circumstances, setCircumstances] = useState('');
    const [description, setDescription] = useState('');
    const [lastSeenCity, setLastSeenCity] = useState('');
    const [voivodeship, setVoivodeship] = useState('');
    const [age, setAge] = useState(0);
    const [createdById, setCreatedById] = useState(0);

    const [file, setFile] = useState([]);

    const [disable, setDisable] = useState(true);
    const [disableLastSeenCity, setDisableLastSeenCity] = useState(true);
    const [province, setProvince] = useState('');
    const [lastSeenProvince, setLastSeenProvince] = useState('');

    const [sectionId, setSectionId] = useState('');
    const [isOn, setIsOn] = useState(false);

    

    function noData() {
        if (circumstances === '') {
            setCircumstances("Brak danych")
        }
        if (description === '') {
            setDescription("Brak danych")
        }
        if (policeUnitContact === '') {
            setPoliceUnitContact(100000000)
        }
    }

    function handlePhoto(e) {
        setFile(e.target.files[0])
    }

    function handleUploadPhoto(props) {
        const id = props.id;
        const formData = new FormData()
        formData.append('name', file)

        authAxios()
            .post(`https://localhost:7162/api/user/missingPeople/uploadPhoto/${id}`,
                {
                    file,
                },
                {
                    headers: {
                        'Content-Type': `multipart/form-data`,
                    }
                }
            )
            .then(function (response) {
                console.log(response);
                navigate("/");
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const handleSubmit = (e) => {
        e.preventDefault();       

        noData();
        setIsOn(true);

        if (props.logged === true) {
            authAxios()
                .post("https://localhost:7162/api/user/missingPeople/report",
                    {
                        firstName,
                        lastName,
                        gender,
                        height,
                        figure,
                        eyeColor,
                        hairColor,
                        skinColor,
                        cityOfResidence,
                        voivodeshipOfResidence,
                        policeUnit,
                        policeUnitContact,
                        contactNumber,
                        reportedPolice,
                        confirmedPolice,
                        lastSeenDate,
                        dateOfBirth,
                        circumstances,
                        description,
                        lastSeenCity,
                        voivodeship,
                        age,
                        createdById,
                    }
                )
                .then(function (response) {
                    console.log(response.data);
                    handleUploadPhoto({ id: response.data.id });

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            console.log("Nie jeste?? zalogowany!")
        }
    }
    

    const handleDisable = (e) => {
        if (e.target.value === "Wojew??dztwo" || e.target.value === "poza Polsk??" || e.target.value === "Brak danych") {
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    }


    const handleDisableLastSeenCity = (e) => {
        if (e.target.value === "Wojew??dztwo" || e.target.value === "poza Polsk??" || e.target.value === "Brak danych") {
            setDisableLastSeenCity(true);
        }
        else {
            setDisableLastSeenCity(false);
        }
    }


    const [isCollapsed, setIsCollapsed] = useState('collapse');

    const handleCollapse = (e) => {
        if (e.target.value === "Tak") {
            setIsCollapsed("collapse show");
        }
        else {
            setIsCollapsed("collapse");
            setConfirmedByThePolice("Nie");
            setPoliceUnit("");
            setPoliceUnitContact("");
        }
    }


    const disableFuture = () => {
        var today = new Date();
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0');
        var year = today.getFullYear();

        return (`${year}-${month}-${day}`)
    }


    return (
        <div className="box">
            {props.logged ?
                <div className="formBox">
                    <form encType="multipart/form-data">
                        <div className="title">Formularz zagini??cia</div>
                        <label>
                            Og??lne <span
                                className="bi bi-info-circle"
                                data-toggle="modal"
                                data-target="#generalModal"
                                onClick={()=>{setSectionId("generalModal")}}>
                            </span>
                        </label>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value); setCreatedById(getToken().nameid) }}
                                placeholder="Imi??"
                                required />
                               <ReportWarning fieldName={firstName} isOn={isOn}/>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Nazwisko" 
                                required/>
                                <ReportWarning fieldName={lastName} isOn={isOn}/>
                        </div>
                        <div className="form-group">
                            <select
                                className="custom-select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required>
                                <option value="">P??e??</option>
                                <option value="Kobieta">Kobieta</option>
                                <option value="M????czyzna">M????czyzna</option>
                            </select>
                            <ReportWarning fieldName={gender} isOn={isOn}/>
                        </div>
                        <div className="form-group">
                            <label>
                                Data urodzenia <span
                                    className="bi bi-info-circle"
                                    data-toggle="modal"
                                    data-target="#birthDateModal"
                                    onClick={()=>{setSectionId("birthDateModal")}}>
                                </span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                value={dateOfBirth}
                                onChange={(e) => { setDateOfBirth(e.target.value); setAge(ageCount({ birth: e.target.value })) }}
                                placeholder="Data" 
                                max={disableFuture()}/>
                                <ReportWarning fieldName={dateOfBirth} isOn={isOn}/>
                        </div>



                        <div className="form-group">
                            <label>
                                Wygl??d <span
                                    className="bi bi-info-circle"
                                    data-toggle="modal"
                                    data-target="#looksModal"
                                    onClick={()=>setSectionId("looksModal")}>
                                </span></label>
                            <select
                                className="custom-select"
                                value={hairColor}
                                onChange={(e) => setHairColor(e.target.value)}
                                required>
                                <option value="">Kolor w??os??w</option>
                                <option value="Brak danych">Brak danych</option>
                                <option value="Bia??y">Bia??y</option>
                                <option value="Jasny blond">Jasny blond</option>
                                <option value="Blond">Blond</option>
                                <option value="Ciemny blond">Ciemny blond</option>
                                <option value="Rudy">Rudy</option>
                                <option value="Rudoblond">Rudoblond</option>
                                <option value="Jasnobr??zowy">Jasnobr??zowy</option>
                                <option value="Br??zowy">Br??zowy</option>
                                <option value="Ciemnobr??zowy">Ciemnobr??zowy</option>
                                <option value="Czarny">Czarny</option>
                                <option value="Siwy">Siwy</option>
                                <option value="Inny">Inny</option>
                            </select>
                            <ReportWarning fieldName={hairColor} isOn={isOn}/>
                        </div>
                        <div className="form-group">
                            <select
                                className="custom-select"
                                value={eyeColor}
                                onChange={(e) => setEyeColor(e.target.value)}
                                required>
                                <option value="">Kolor oczu</option>
                                <option value="Brak danych">Brak danych</option>
                                <option value="Br??zowy">Br??zowy</option>
                                <option value="Jasnobr??zowy">Jasnobr??zowy</option>
                                <option value="Ciemnobr??zowy">Jasnobr??zowy</option>
                                <option value="Zielony">Zielony</option>
                                <option value="Szary">Szary</option>
                                <option value="Niebieski">Niebieski</option>
                                <option value="Inny">Inny</option>
                            </select>
                            <ReportWarning fieldName={eyeColor} isOn={isOn}/>
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="Wzrost" />
                        </div>
                        <div className="form-group">
                            <select
                                className="custom-select"
                                value={figure}
                                onChange={(e) => setFigure(e.target.value)}
                                required>
                                <option value="">Typ sylwetki</option>
                                <option value="Brak danych">Brak danych</option>
                                <option value="Chuda">Chuda</option>
                                <option value="Szczup??a">Szczup??a</option>
                                <option value="Umi????niona">Umi????niona</option>
                                <option value="Pulchna">Pulchna</option>
                                <option value="Korpulentna">Korpulentna</option>
                                <option value="Inna">Inna</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select
                                className="custom-select"
                                value={skinColor}
                                onChange={(e) => setSkinColor(e.target.value)}
                                required>
                                <option value="">Rasa</option>
                                <option value="Brak danych">Brak danych</option>
                                <option value="Bia??a">Bia??a</option>
                                <option value="Czarna">Czarna</option>
                                <option value="??????ta">??????ta</option>
                                <option value="Inna">Inna</option>
                            </select>
                            <ReportWarning fieldName={skinColor} isOn={isOn}/>
                        </div>
                        <div className="form-group">
                            <textarea
                                type="text"
                                rows="2"
                                className="form-control"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                placeholder="Cechy wygl??du zewn??trznego" />
                        </div>

                        <div className="form-group">
                            <label>Miejsce zamieszkania <span
                                className="bi bi-info-circle"
                                data-toggle="modal"
                                data-target="#residenceModal"
                                onClick={()=>setSectionId("residenceModal")}>
                            </span></label>
                            <select
                                className="custom-select"
                                value={voivodeshipOfResidence}
                                onChange={(e) => { setVoivodeSoR(e.target.value); handleDisable(e); setProvince(e.target.value) }}
                                required>
                                <option value="Wojew??dztwo">Wojew??dztwo</option>
                                <option value="poza Polsk??">Poza granicami Polski</option>
                                <option value="Brak danych">Brak danych</option>
                                <option value="dolno??l??skie">dolno??l??skie</option>
                                <option value="kujawsko-pomorskie">kujawsko-pomorskie</option>
                                <option value="lubelskie">lubelskie</option>
                                <option value="lubuskie">lubuskie</option>
                                <option value="????dzkie">????dzkie</option>
                                <option value="ma??opolskie">ma??opolskie</option>
                                <option value="mazowieckie">mazowieckie</option>
                                <option value="opolskie">opolskie</option>
                                <option value="podkarpackie">podkarpackie</option>
                                <option value="podlaskie">podlaskie</option>
                                <option value="pomorskie">pomorskie</option>
                                <option value="??l??skie">??l??skie</option>
                                <option value="??wi??tokrzyskie">??wi??tokrzyskie</option>
                                <option value="warmi??sko-mazurskie">warmi??sko-mazurskie</option>
                                <option value="wielkopolskie">wielkopolskie</option>
                                <option value="zachodniopomorskie">zachodniopomorskie</option>
                            </select>
                            <ReportWarning fieldName={voivodeshipOfResidence} isOn={isOn}/>
                        </div>
                        <div className="form-group">
                            <select
                                className="custom-select"
                                disabled={disable}
                                value={cityOfResidence}
                                onChange={(e) => setCityOfResidence(e.target.value)}>
                                <option value="">Miejscowo????</option>
                                <option value="Brak danych">Brak danych</option>
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


                        <div className="form-group">
                            <label>Ostatnio widziany/a <span
                                className="bi bi-info-circle"
                                data-toggle="modal"
                                data-target="#lastSeenModal"
                                onClick={()=>setSectionId("lastSeenModal")}>
                            </span></label>
                            <input
                                type="date"
                                className="form-control"
                                value={lastSeenDate}
                                onChange={(e) => setLastSeenDate(e.target.value)}
                                placeholder="Data" 
                                max={disableFuture()}
                                required/>
                                <ReportWarning fieldName={lastSeenDate} isOn={isOn}/>
                        </div>
                        <div className="form-group">
                            <select
                                className="custom-select"
                                value={voivodeship}
                                onChange={(e) => { setVoivodeship(e.target.value); handleDisableLastSeenCity(e); setLastSeenProvince(e.target.value) }}>
                                <option value="Wojew??dztwo">Wojew??dztwo</option>
                                <option value="poza Polsk??">Poza granicami Polski</option>
                                <option value="Brak danych">Brak danych</option>
                                <option value="dolno??l??skie">dolno??l??skie</option>
                                <option value="kujawsko-pomorskie">kujawsko-pomorskie</option>
                                <option value="lubelskie">lubelskie</option>
                                <option value="lubuskie">lubuskie</option>
                                <option value="????dzkie">????dzkie</option>
                                <option value="ma??opolskie">ma??opolskie</option>
                                <option value="mazowieckie">mazowieckie</option>
                                <option value="opolskie">opolskie</option>
                                <option value="podkarpackie">podkarpackie</option>
                                <option value="podlaskie">podlaskie</option>
                                <option value="pomorskie">pomorskie</option>
                                <option value="??l??skie">??l??skie</option>
                                <option value="??wi??tokrzyskie">??wi??tokrzyskie</option>
                                <option value="warmi??sko-mazurskie">warmi??sko-mazurskie</option>
                                <option value="wielkopolskie">wielkopolskie</option>
                                <option value="zachodniopomorskie">zachodniopomorskie</option>
                            </select>
                            <ReportWarning fieldName={voivodeship} isOn={isOn}/>
                        </div>
                        <div className="form-group">
                            <select className="custom-select" disabled={disableLastSeenCity} value={lastSeenCity} onChange={(e) => { setLastSeenCity(e.target.value) }}>
                                <option value="">Miejscowo????</option>
                                <option value="Brak danych">Brak danych</option>
                                {
                                    data.filter((p) => (p.Province) === lastSeenProvince).map((place, index) => (
                                        <option key={index} value={[place.Name, place.District]}>{`${place.Name}, powiat ${place.District}`}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Okoliczno??ci zaginiecia <span
                                className="bi bi-info-circle"
                                data-toggle="modal"
                                data-target="#circumstancesModal"
                                onClick={()=>setSectionId("circumstancesModal")}>
                            </span></label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={circumstances}
                                onChange={(e) => setCircumstances(e.target.value)}
                                placeholder="Opis" />
                        </div>
                        <div className="form-group">
                            <label>Numer kontaktowy <span
                                className="bi bi-info-circle"
                                data-toggle="modal"
                                data-target="#contactModal"
                                onClick={()=>setSectionId("contactModal")}>
                            </span></label>
                            <input
                                type="number"
                                className="form-control"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                placeholder="Numer"
                                required />
                                <ReportWarning fieldName={contactNumber} isOn={isOn}/>
                        </div>

                        <div className="form-group">
                            <label>Zg??oszono na policji <span
                                className="bi bi-info-circle"
                                data-toggle="modal"
                                data-target="#policeModal"
                                onClick={()=>setSectionId("policeModal")}>
                            </span></label>
                            <select
                                className="custom-select"
                                value={reportedPolice}
                                onChange={(e) => { setReportedToThePolice(e.target.value); handleCollapse(e) }}>
                                <option value="Nie">Nie</option>
                                <option value="Tak">Tak</option>
                            </select>
                        </div>
                        <div className={isCollapsed} >
                            <div className="form-group">
                                <label>Potwierdzone przez policj??</label>
                                <select
                                    className="custom-select"
                                    value={confirmedPolice}
                                    onChange={(e) => { setConfirmedByThePolice(e.target.value) }}>
                                    <option value="Nie">Nie</option>
                                    <option value="Tak">Tak</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={policeUnit}
                                    onChange={(e) => setPoliceUnit(e.target.value)}
                                    placeholder="Jednostka policji" />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={policeUnitContact}
                                    onChange={(e) => setPoliceUnitContact(e.target.value)}
                                    placeholder="Kontakt do jednostki policji" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Zdj??cie</label>
                            <input
                                id="photoFile"
                                type="file"
                                accept="image/*"
                                name="file"
                                onChange={(e) => { handlePhoto(e) }} />
                        </div>

                        <button
                            className="btn btn-danger btn-block my-2 my-sm-0"
                            type="submit"
                            onClick={handleSubmit}>
                            Zg??o?? zagini??cie
                        </button>
                    </form>
                </div>
                :
                <div className="personalPageDetails">
                    <div className="homeMissingText">
                        TYLKO ZALOGOWANI U??YTKOWNICY MOG?? DODAWA?? ZG??OSZENIA
                        <div style={{ paddingTop: 20 }}>
                            <a href="/login">Zaloguj si??</a> lub <a href="/register">Zarejestruj si??</a></div>
                    </div>
                </div>}

                <FormInfo sectionId={sectionId}/>          

        </div>
    )
}

export default ReportForm;