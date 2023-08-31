import React, { useState } from 'react';
import "../styles/join.css";
import logo from "../styles/logo.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../App.css"

let user;

const Join = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setName(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(name);
    setName("");
    if(name.length<3){
      alert('Enter Valid Name')
    }else{
      user = name;
      navigate("/chat");
    }
    
    
  }

  return (
    <div id="container">
      <div id="box">
        <img id = "img-log" src={logo} alt="LIVE CHAT" />
        <h1 id="joinh1">CHIRP NOW</h1>
        <form id='form-log'>
          <input 
            id='input-log'
            onChange={handleOnChange} 
            value={name}
            type="text" 
            placeholder='Enter Your name'
            required
          />
          <button id='btn-log' onClick={handleLogin}>JOIN CHANNEL</button>
        </form>
      </div>
    </div>
  )
}

export default Join;
export {user};
