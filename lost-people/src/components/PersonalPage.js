import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import Maptiler from "./Maptiler";
import moment from "moment";
import ageCount from "../functions/ageCount";
import deleteReport from "../functions/deleteReport";
import AdminButtons from "./AdminButtons";

function PersonalPage(props) {    

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [photo, setPhoto] = useState('');
    const role = props.role;
    const navigate = useNavigate();

    
    useEffect(() => {      
        axios
          .get(`https://localhost:7162/api/missingPeople/${id}`)
          .then(function (response) {
            setData(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [data, id]);

    useEffect(() => {      
        axios
          .get(`https://localhost:7162/api/user/missingPeople/downloadPhoto/${id}`)
          .then(function (response) {
                setPhoto(response.data.photoUrl)
          })
          .catch(function (error) {
            // console.log(error);
            setPhoto("https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg")
          });
      }, [ photo, id]);

    // const person = data.find((p) => String(p.id)===id);
    const person = data;
    
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },3000)
    },[])
    
    if(!person) 
    {        
        return (
        <div className="box">    
       { loading ?
                    <div>Loading...</div>
                    :             
            <div className="personalPageDetails">     
                <div className="homeMissingText">
                ZGŁOSZENIE O TAKIM ID NIE ISTNIEJE!
                </div>
            </div>}
        </div>);
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
            return(`, ${province}`);
        }
    }

       
    return(       
            <div className="box">                                
                    <div className="personalPageDetails">   
                    <AdminButtons id={person.id} createdId={person.createdById} role={role} status={person.status}/>             
                        <div className="homeMissingText">
                                    <b><h4>{person.firstName} {person.lastName}</h4></b>
                                    #TODO tu zdjecia mają sie przewijać
                        </div>         
                        <div>  
                            <img className="photos" src={photo} alt=""></img>
                        </div>   
                        <div>
                            <div className="homeMissingText">
                                <b>Wiek: </b><>{ageCount({birth:person.dateOfBirth})}</>                                
                            </div>
                            <div className="homeMissingText">
                                        <b> Ostatnio widziany/a:</b> {moment(person.lastSeenDate).format('DD.MM.YYYY')} w {writeCity(person.lastSeenCity)}, {person.voivodeship}
                                        
                                    </div>
                                    <div className="homeMissingText">
                                    <b>Płeć:</b> {person.gender}
                                    </div>
                                    <div className="homeMissingText">
                                    <b>Wzrost:</b> {person.height}
                                    </div>
                                    <div className="homeMissingText">
                                    <b>Miejsce zamieszkania:</b> {writeCity(person.cityOfResidence)}{writeProvince(person.voivodeshipOfResidence)}
                                    </div>
                                    <div className="homeMissingText">
                                    <b>Opis:</b> {person.description}
                                    </div>                       
                        </div>  
                        <div>
                            <Maptiler/>
                        </div>    
                    </div>
                
            </div>
            )
        }      

export default PersonalPage;