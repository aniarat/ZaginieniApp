import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPsswd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [psswConfWarning, setPsswConfWarning] = useState('');
    const [psswWarning, setPsswWarning] = useState('');
    const [phoneWarning, setPhoneWarning] = useState('');
    const [emailWarning, setEmailWarning] = useState('');
    const [nullWarning, setNullWarning] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://localhost:7162/api/account/register",
                {
                    username,
                    email,
                    password,
                    confirmPassword,
                    firstName,
                    lastName,
                    phoneNumber,
                })
            .then(function (response) {
                console.log(response.data);
                navigate("/login");

            })
            .catch(function (error) {
                console.log(error)
                console.log(error.response.status)

                if (!/@/.test(email)) {
                    setEmailWarning(`Adres email musi zawierać znak "@".`)
                } else if (error.response.data === "E-mail jest zajęty") {
                    //DO POPRAWY!
                    setEmailWarning(`Podany adres email jest zajęty.`);
                } else {
                    setEmailWarning('')
                }

                if (password !== confirmPassword) {
                    setPsswConfWarning("Hasła muszą być identyczne!")
                } else {
                    setPsswConfWarning('')
                }

                if (phoneNumber.length !== 9) {
                    setPhoneWarning("Numer telefonu powinien zawierać 9 cyfr.")
                } else {
                    setPhoneWarning('')
                }

                if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || password.length < 8) {
                    setPsswWarning("Hasło powinno składać się z co najmniej 8 znaków, w tym małe i duże litery, oraz cyfry.")
                } else {
                    setPsswWarning('')
                }

                if (email === '' || password === '' || confirmPassword === '' || firstName === '' || lastName === '' || phoneNumber === '') {
                    setNullWarning("Każde pole musi zostać wypełnione!")
                }
                else {
                    setNullWarning('')
                }
            });
    };

    return (
        <div className="box">
            <div className="signBox">
                <form>
                    <div className="title">Zarejestruj się</div>
                    <div className="warning">
                        {nullWarning}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                        <div className="warning">
                            {emailWarning}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Nazwa użytkownika</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" />
                        {/* <div className="warning">
                            {emailWarning}
                        </div>  */}
                    </div>
                    <div className="form-group">
                        <label>Imię</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" placeholder="Imię" />
                    </div>
                    <div className="form-group">
                        <label>Nazwisko</label>
                        <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} className="form-control" placeholder="Nazwisko" />
                    </div>
                    <div className="form-group">
                        <label>Numer telefonu</label>
                        <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" placeholder="+48" />
                        <div className="warning">
                            {phoneWarning}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Hasło</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Hasło" />
                        <div className="warning">
                            {psswWarning}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Powtórz hasło</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPsswd(e.target.value)} className="form-control" placeholder="Powtórz hasło" />
                        <div className="warning">
                            {psswConfWarning}
                        </div>
                    </div>
                    <div className="signBtn">
                        <button type="submit" className="btn btn-block btn-danger submitForm" onClick={handleSubmit}>Zatwierdź</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Registration;