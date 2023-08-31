import React from 'react'
import { useState,useEffect } from 'react';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import socketIo from 'socket.io-client';
import Message from './Message';
import {user} from "../components/Join"
import logo from "../styles/logo.png"
import { Link } from 'react-router-dom'
import {AiOutlineCloseSquare} from "react-icons/ai";
import "../styles/chat.css"

let socket;
const ENDPOINT = "https://chirpnow.onrender.com/";

const Chat = () => {

  const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    console.log(messages);
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            setid(socket.id);

        })
        console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])



  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>CHIRP NOW</h2>
          <a href="/"><AiOutlineCloseSquare fontSize={"2rem"} style={{margin:"1.5vmax",cursor:"pointer"}}/></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {
            messages.map((item,i)=> <Message key={i} message={item.message} user={item.id===id?'':item.user} classs={item.id===id?'right':'left'}/>)
          }
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(event)=>event.key==='Enter' ? send():null} type="text" id='chatInput' />
          <button onClick={send} className='sendBtn'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat
