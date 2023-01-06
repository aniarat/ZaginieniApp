import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import PropTypes from 'prop-types';

function Login(props) {
    // console.log(props.logged);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('')

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://localhost:7162/api/account/login",
                {
                    email,
                    password
                })
            .then(function (response) {
                const token = response.data.token;
                document.cookie = `Bearer=${token}`;
                // sessionStorage.setItem("Bearer", token);
                navigate("/");
                window.location.reload();
            })
            .catch(function (error) {

            })
    }


    useEffect(() => {
        if (props.logged === true) {
            navigate("/");
        }
    }, [props.logged, navigate]);



    return (
        <div className="box">
            <div className="signBox">
                <form>
                    <div className="title">Zaloguj się</div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label>Hasło</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Hasło" />
                    </div>
                    <div className="warning">
                        {warning}
                    </div>
                    <div className="signBtn">
                        <button type="submit" className="btn btn-block btn-danger submitForm" onClick={handleSubmit}>Zatwierdź</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;