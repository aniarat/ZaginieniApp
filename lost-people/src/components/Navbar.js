import React, { useState } from 'react';
import missing_icon from "../images/missing_icon2.png";
import { useNavigate } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

function Navbar(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isPaneOpen: false,
  });

  const isLoggedIn = props.logged;
  const role = props.role;

  return (
    <div className='navBox'>

      <nav className="navbar navbar-expand-lg navbar-light navCss">
        <button className="btn" onClick={() => setState({ isPaneOpen: true })}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <SlidingPane
          className="topSlider"
          overlayClassName="topSlider"
          isOpen={state.isPaneOpen}
          title={<a className="navbar-brand logo" onClick={() => { navigate("/"); setState({ isPaneOpen: false }) }}><img className='logoImg' src={missing_icon}></img></a>}
          width='75%'
          from='left'
          onRequestClose={() => {
            setState({ isPaneOpen: false });
          }}>
          {isLoggedIn ? <></>
            :
            <ul>
              <li><a onClick={() => { navigate("/login"); setState({ isPaneOpen: false }); }}>Zaloguj się</a></li>
              <li><a onClick={() => { navigate("/register"); setState({ isPaneOpen: false }); }}>Zarejestruj się</a></li>
            </ul>}
          <ul>
            <li><a className="slideMenu" onClick={() => { navigate("/report-missing-person"); setState({ isPaneOpen: false }); }}>Zgłoś zaginięcie</a></li>
            <li><a className="slideMenu" onClick={() => { navigate("/testy"); setState({ isPaneOpen: false }); }}>Rozpoznaj osobę</a></li>
            <li><a className="slideMenu" onClick={() => { navigate("/"); setState({ isPaneOpen: false }); }}>Wyświetl zaginionych</a></li>
            {isLoggedIn ?
              <li><a className="slideMenu" onClick={() => { navigate("/my-reports"); setState({ isPaneOpen: false }); }}>Moje zgłoszenia</a></li>
              :
              <></>
            }
            {role === "Admin" ?
              <li><a className="slideMenu" onClick={() => { navigate("/users-list"); setState({ isPaneOpen: false }); }}>Wyświetl użytkowników</a></li>
              :
              <></>
            }
          </ul>
          {isLoggedIn ?
            <ul className='logOut'>
              <li><button type="submit" className="btn btn-danger"
                onClick={() => {
                  navigate("/login"); setState({ isPaneOpen: false });
                  document.cookie = "Bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  window.location.reload();
                }}>Wyloguj się</button></li>
            </ul>
            :
            <></>
          }
        </SlidingPane>
        <a className="navbar-brand logo" onClick={() => { navigate("/") }}>ZAGI<img className='logoImg' src={missing_icon}></img>IENI</a>
      </nav>

    </div>

  )
}

export default Navbar;