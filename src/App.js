import './App.css';
import socketIO from "socket.io-client";
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';

function App() {
  // const ENDPOINT = "http://localhost:5000/";
  // const socket = socketIO(ENDPOINT, { transports: ['websocket'] });

  // socket.on("connect", () => {
  //   console.log("Client Connected");
  // });

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Join />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
