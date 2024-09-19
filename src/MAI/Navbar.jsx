import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './nav/nav.css'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // เชื่อมต่อกับ WebSocket server
    const socketClient = io('http://192.168.1.35:5000');  // http://172.20.10.3:3000/  http://192.168.1.33:3000
    
    socketClient.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    setSocket(socketClient);

    // Cleanup เมื่อ component ถูก unmount
    return () => {
      socketClient.disconnect();
    };
  }, []);

  // ฟังก์ชันสำหรับส่งข้อมูลไปยัง WebSocket server เพื่อส่งต่อไปยัง MQTT
  const sendMessageToMQTT = (topic, message) => {
    if (socket) {
      socket.emit('sendToMQTT', { topic, message });
      console.log(`Sent message to MQTT: ${message} for topic: ${topic}`);
    }
  };

  return (
    <div>
    <div className="top-navigation">
         <button className="nav-btn" onClick={() => navigate('/home')}>Home</button>
        <button className="nav-btn " onClick={() => navigate('/listalarm')}>ListAlarm</button>
         <button className="nav-btn" onClick={() => navigate('/dashboard')}>Dashboard</button>
         {/* <button className="nav-btn" onClick={() => navigate('/position')}>Position</button> */}
       </div>
    <div className="bottom-navigation">
      {/* ปุ่มสำหรับส่งข้อมูลไปยัง WebSocket server */}
      <button onClick={() => sendMessageToMQTT('/pap/001', 'ON_1')} className="nav-btn">Send Safety Y2</button>
      <button onClick={() => sendMessageToMQTT('/pap/001', 'ON_2')} className="nav-btn">Send Start</button>
      <button onClick={() => sendMessageToMQTT('/pap/001', 'ON_3')} className="nav-btn">Send Stop</button>
      <button onClick={() => sendMessageToMQTT('/pap/001', 'ON_4')} className="nav-btn">Send Set Y2</button>
    </div>
    </div>

    
  );
}

export default Navbar;
