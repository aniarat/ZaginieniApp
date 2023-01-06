import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authAxios from "../functions/authAxios";
import axios from "axios";
import moment from "moment";
import data from 'polskie-miejscowosci';
import ageCount from "../functions/ageCount";

function Edit(props) {

  const { id } = useParams();
  const role = props.role;
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
  const [reportedPolice, setReportedToThePolice] = useState('');
  const [confirmedPolice, setConfirmedByThePolice] = useState('');
  const [lastSeenDate, setLastSeenDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [circumstances, setCircumstances] = useState('');
  const [description, setDescription] = useState('');
  const [lastSeenCity, setLastSeenCity] = useState('');
  const [voivodeship, setVoivodeship] = useState('');
  const [age, setAge] = useState('');


  const [province, setProvince] = useState('');
  const [lastSeenProvince, setLastSeenProvince] = useState('');



  useEffect(() => {
    axios
      .get(`https://localhost:7162/api/missingPeople/${id}`)
      .then(function (response) {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setGender(response.data.gender);
        setHeight(response.data.height);
        setFigure(response.data.figure);
        setSkinColor(response.data.skinColor);
        setEyeColor(response.data.eyeColor);
        setHairColor(response.data.hairColor);
        setCityOfResidence(response.data.cityOfResidence);
        setVoivodeSoR(response.data.voivodeshipOfResidence);
        setPoliceUnit(response.data.policeUnit);
        setPoliceUnitContact(response.data.policeUnitContact);
        setReportedToThePolice(response.data.reportedPolice);
        setConfirmedByThePolice(response.data.confirmedPolice);
        setLastSeenDate(response.data.lastSeenDate);
        setDateOfBirth(response.data.dateOfBirth);
        setCircumstances(response.data.circumstances);
        setDescription(response.data.description);
        setLastSeenCity(response.data.lastSeenCity);
        setVoivodeship(response.data.voivodeship);
        setContactNumber(response.data.contactNumber);
        setAge(response.data.age);

        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });


    if (voivodeship == "poza Polską") {
      setLastSeenCity('')
    }

    if (voivodeshipOfResidence == "poza Polską") {
      setCityOfResidence('')
    }


  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    authAxios()
      .put(`https://localhost:7162/api/user/missingPeople/update/${id}`,
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
        })
      .then((response) => {
        // setData(response.data);
        console.log(response.data)
        navigate(`/person/${id}`)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (

    <div className="box">
      <div className="formBox">
        <div className="title">Formularz zaginięcia</div>
        <form>
          <div className="form-group">
            <label>Imię</label>
            <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nazwisko</label>
            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Płeć</label>
            <select className="custom-select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="Kobieta">Kobieta</option>
              <option value="Mężczyzna">Mężczyzna</option>
              {/* {console.log(contactNumber)} */}

            </select>
          </div>
          <div className="form-group">
            <label>Data urodzenia</label>
            <input type="date" className="form-control" value={moment(dateOfBirth).format('YYYY-MM-DD')} onChange={(e) => { setDateOfBirth(e.target.value); setAge(ageCount({ birth: e.target.value })) }} />
          </div>
          <div className="form-group">
            <label>Rasa</label>
            <select className="custom-select custom-select" value={skinColor} onChange={(e) => setSkinColor(e.target.value)}>
              <option value="Biała">Biała</option>
              <option value="Czarna">Czarna</option>
              <option value="Żółta">Żółta</option>
              <option value="Inna">Inna</option>
            </select>
          </div>
          <div className="form-group">
            <label>Wzrost</label>
            <input type="number" className="form-control" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Sylwetka</label>
            <select className="custom-select custom-select" value={figure} onChange={(e) => setFigure(e.target.value)}>
              <option value="Szczupła">Szczupła</option>
              <option value="Chuda">Chuda</option>
              <option value="Korpulentna">Korpulentna</option>
              <option value="Pulchna">Pulchna</option>
              <option value="Umięśniona">Umięśniona</option>
            </select>
          </div>
          <div className="form-group">
            <label>Kolor włosów</label>
            <select className="custom-select custom-select" value={hairColor} onChange={(e) => setHairColor(e.target.value)}>
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
            <label>Kolor oczu</label>
            <select className="custom-select custom-select" value={eyeColor} onChange={(e) => setEyeColor(e.target.value)}>
              <option value="Brązowy">Brązowy</option>
              <option value="Jasnobrązowy">Jasnobrązowy</option>
              <option value="Zielony">Zielony</option>
              <option value="Szary">Szary</option>
              <option value="Niebieski">Niebieski</option>
              <option value="Inny">Inny</option>
            </select>
          </div>
          <div className="form-group">
            <label>Miejsce zamieszkania</label>
            <select className="custom-select custom-select" value={voivodeshipOfResidence} onChange={(e) => { setVoivodeSoR(e.target.value); setProvince(e.target.value) }}>
              <option value={voivodeshipOfResidence}>{voivodeshipOfResidence}</option>
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
            <select className="custom-select custom-select" value={cityOfResidence} onChange={(e) => setCityOfResidence(e.target.value)}>
              <option value={cityOfResidence}>{cityOfResidence}</option>
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
            <label>Jednostka Policji</label>
            <input type="text" className="form-control" value={policeUnit} onChange={(e) => setPoliceUnit(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Kontakt do jednostki policji</label>
            <input type="number" className="form-control" value={policeUnitContact} onChange={(e) => setPoliceUnitContact(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Numer kontaktowy</label>
            <input type="number" className="form-control" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
          </div>
          {/* <div className="form-group">
            <label>Zgłoszono na policji</label>
            <select className="custom-select" value={reportedPolice} onChange={(e) => setReportedToThePolice(e.target.value)}>
              <option value="Nie">Nie</option>
              <option value="Tak">Tak</option>
            </select>
          </div> */}
          <div className="form-group">
            <label>Zgłoszono</label>
            <select className="custom-select" value={reportedPolice} onChange={(e) => setReportedToThePolice(e.target.value)}>
              <option value="Tak">Tak</option>
              <option value="Nie">Nie</option>
            </select>
          </div>
          <div className="form-group">
            <label>Potwierdzono</label>
            <select className="custom-select" value={confirmedPolice} onChange={(e) => setConfirmedByThePolice(e.target.value)}>
              <option value="Tak">Tak</option>
              <option value="Nie">Nie</option>
            </select>
          </div>
          {/* <div className="form-group">
            <label>Potwierdzone przez policję</label>
            <select className="custom-select" value={confirmedPolice} onChange={(e) => setConfirmedByThePolice(e.target.value)}>
              <option value="Nie">Nie</option>
              <option value="Tak">Tak</option>
            </select>
          </div> */}
          <div className="form-group">
            <label >Opis wyglądu</label>
            <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label >Okoliczności</label>
            <input type="text" className="form-control" value={circumstances} onChange={(e) => setCircumstances(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Ostatnio widziany/a</label>
            <input type="date" className="form-control" value={moment(lastSeenDate).format('YYYY-MM-DD')} onChange={(e) => setLastSeenDate(e.target.value)} />
          </div>
          <div className="form-group">
            <select className="custom-select custom-select" value={voivodeship} onChange={(e) => { setVoivodeship(e.target.value); setLastSeenProvince(e.target.value) }}>
              <option value={voivodeship}>{voivodeship}</option>
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
            <select className="custom-select custom-select" defaultValue={lastSeenCity} onChange={(e) => { setLastSeenCity(e.target.value) }}>
              <option value={lastSeenCity}>{lastSeenCity}</option>
              {
                data.filter((p) => (p.Province) === lastSeenProvince).map((place, index) => (
                  <option key={index} value={[place.Name, place.District]}>{`${place.Name}, powiat ${place.District}`}</option>
                ))
              }
            </select>
          </div>

          {/* <div className="form-group">
            <label>Okoliczności zaginiecia</label>
            <input type="text" className="form-control" value={circumstances} onChange={(e) => setCircumstances(e.target.value)} />
          </div> */}


          <button className="btn btn-danger btn-block my-2 my-sm-0" type="submit" onClick={handleSubmit}>Zatwierdź edycję</button>
        </form>
      </div>
    </div>
  )



}
export default Edit;