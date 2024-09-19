// import React, { useState, useEffect } from 'react';
// import './sta/sta.css';  // Assuming the CSS file is named sta.css
// import StatusCard from './StatusCard';  // Import StatusCard component
// import Tooltip from './Tooltip';  // Import Tooltip component
// import MachineStatusList from './das/MachineStatusList ';

// const StatusDashboard = () => {
//   const [input, setInput] = useState([]); // ข้อมูลที่ดึงมาจาก API
//   const [selectedSensor, setSelectedSensor] = useState(null); // เก็บเซนเซอร์ที่ถูกคลิก
//   const [error, setError] = useState(null); // จัดการข้อผิดพลาด
//   const [loadingMessage, setLoadingMessage] = useState('Loading...'); // ข้อความสำหรับสถานะการโหลด

//   // Function to fetch data from API
//   const fetchData = async () => {
//     setLoadingMessage('Loading...'); // เริ่มโหลดข้อมูล
//     setError(null); // รีเซ็ตข้อผิดพลาดก่อน
//     try {
//       const response = await fetch('https://api2-one-iota.vercel.app/api/alarm1');  // Replace with your API
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`); // ตรวจสอบการตอบกลับของ API
//       }
//       const data = await response.json();
//       setInput(data);  // Store the fetched data in state
//       setLoadingMessage('Load Complete'); // เปลี่ยนข้อความเมื่อโหลดเสร็จ
//     } catch (error) {
//       setError(error.message);  // จับข้อผิดพลาดและเก็บใน state
//       setLoadingMessage('Error while loading'); // เปลี่ยนข้อความเมื่อเกิดข้อผิดพลาด
//     }
//   };

//   // Use useEffect to set up polling
//   useEffect(() => {
//     fetchData(); // Fetch data when the component mounts

//     // Set an interval to fetch data every 5 seconds (5000 ms)
//     const interval = setInterval(fetchData, 1000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   const handleClick = (sensor) => {
//     setSelectedSensor(sensor); // เมื่อคลิกให้แสดงข้อมูลเซนเซอร์ใน tooltip
//   };

//   const handleCloseTooltip = () => {
//     setSelectedSensor(null); // ปิด tooltip เมื่อคลิกปุ่มปิด
//   };

//   // ทำการแมปข้อมูลจาก API มาเป็นเซนเซอร์
//   const mapInputToSensors = (inputData) => {
//     if (inputData.length === 0) return []; // ถ้าไม่มีข้อมูลจาก API ให้คืนค่าว่าง

//     // API ที่คุณส่งมา มีข้อมูล input_1 - input_16 ต้องแมปกับ status ต่าง ๆ
//     return [
//       { id: 'X111', name: 'Mold Lock', status: inputData[0].input_1 === 1 ? 'Alarm' : 'Normal', details: 'โมลไม่ล็อก  เช็ค X101' },
//       { id: 'X116', name: 'Pump OFF', status: inputData[0].input_2 === 1 ? 'Alarm' : 'Normal', details: 'The pump is turned off' },
//       { id: 'X101', name: 'Ejector Return', status: inputData[0].input_3 === 1 ? 'Alarm' : 'Normal', details: 'Ejector system is returning' },
//       { id: 'X110', name: 'Front Door', status: inputData[0].input_4 === 1 ? 'Alarm' : 'Normal', details: 'Front door is closed' },
//       { id: 'X109', name: 'Wait Suction', status: inputData[0].input_5 === 1 ? 'Alarm' : 'Normal', details: 'Waiting for suction to start' },
//       { id: 'X130', name: 'Sefty 3 Axis', status: inputData[0].input_6 === 1 ? 'Alarm' : 'Normal', details: '3-axis safety system is OK' },
//       { id: 'Y230', name: 'Heater OFF', status: inputData[0].input_7 === 1 ? 'Alarm' : 'Normal', details: 'Heater system is turned off' },
//       { id: 'Y121', name: 'Robot Run', status: inputData[0].input_8 === 1 ? 'Alarm' : 'Normal', details: 'Robot is running' },
//       // คุณสามารถเพิ่มข้อมูล input อื่น ๆ ได้ตามต้องการ
//     ];
//   };

//   const sensors = mapInputToSensors(input);

//   return (
//     <div>
//     <div className="app-container__1">
//       <div className="status-section_">
//         <h2>Alarm list</h2>
//       </div>

//       <div className="status-section">
//         {sensors.map(sensor => (
//           <div
//             key={sensor.id}
//             className="sensor-container"
//             onClick={() => handleClick(sensor)} // เมื่อคลิกเซนเซอร์จะแสดง tooltip
//           >
//             <StatusCard status={sensor.status} label={sensor.name} />
//           </div>
//         ))}
//       </div>

//       {/* Tooltip */}
//       {selectedSensor && (
//         <Tooltip sensor={selectedSensor} onClose={handleCloseTooltip} />
//       )}

//       {/* ข้อความ Loading หรือ Error */}
//       <div className="loading-section">
//         {error ? ( // แสดงข้อความข้อผิดพลาดถ้ามี
//           <div>Error: {error}</div>
//         ) : (
//           <div>{loadingMessage}</div> // แสดงข้อความ Loading และเปลี่ยนเป็นข้อความเมื่อโหลดเสร็จ
//         )}
//       </div>

//       {/* Bottom Navigation */}
//       <MachineStatusList/>
//     </div>
//     {/* <MachineActivityLog/> */}
//     </div>
//   );
// };

// export default StatusDashboard;

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // Import Socket.io client
import './sta/sta.css';
import StatusCard from './StatusCard';
import Tooltip from './Tooltip';
import MachineStatusList from './das/MachineStatusList ';

const StatusDashboard = () => {
  const [input, setInput] = useState([]); // ข้อมูลจาก WebSocket
  const [selectedSensor, setSelectedSensor] = useState(null); // เก็บเซนเซอร์ที่ถูกคลิก
  const [error, setError] = useState(null); // จัดการข้อผิดพลาด
  const [logMessages, setLogMessages] = useState([]); // เก็บ log ข้อมูล

  useEffect(() => {
    // เชื่อมต่อกับ WebSocket server
    // const socket = io('http://localhost:5000');    http://172.20.10.3:5000    http://192.168.1.33:5000
    const socket = io("http://192.168.1.35:5000", {
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      }
    });


    // รับข้อมูลเมื่อเซิร์ฟเวอร์ส่งข้อมูล alarmData
    socket.on('alarmData', (data) => {
      setInput(data);
      setLogMessages(prev => [...prev, 'Data received: ' + JSON.stringify(data)]);
    });

    // รับข้อผิดพลาดจาก WebSocket server
    socket.on('alarmDataError', (errorData) => {
      setError(errorData.message);
      setLogMessages(prev => [...prev, 'Error: ' + errorData.details]);
    });

    // รับข้อความทดสอบจากเซิร์ฟเวอร์เพื่อเช็คการเชื่อมต่อ
    socket.on('testMessage', (message) => {
      console.log(message);
      setLogMessages(prev => [...prev, 'Test Message: ' + message]);
    });

    return () => socket.disconnect();  // ปิดการเชื่อมต่อเมื่อ component ถูก unmount
  }, []);

  const handleClick = (sensor) => {
    setSelectedSensor(sensor); // เมื่อคลิกให้แสดงข้อมูลเซ็นเซอร์ใน tooltip
  };

  const handleCloseTooltip = () => {
    setSelectedSensor(null); // ปิด tooltip เมื่อคลิกปุ่มปิด
  };

  // ทำการแมปข้อมูลจาก WebSocket มาเป็นเซ็นเซอร์
  const mapInputToSensors = (inputData) => {
    if (!inputData.length) return [];
    return [
      { id: 'x111', name: 'โมลไม่ล็อก', status: inputData[0].input_1 === 1 ? 'Alarm' : 'Normal', details: 'กรุณาเช็ค เช็ค X111 ว่าทำงานไหม หรือ เช็คว่ามีงานโดนโมลหนีบทับไหม' },
      { id: 'x116', name: 'เครื่องฉีดปั้มดับ', status: inputData[0].input_2 === 1 ? 'Alarm' : 'Normal', details: 'กรุณาเช็คปั่ม ว่าได้เปิดทำงานหรือเล่า' },
      { id: 'x101', name: 'กระทุ้งไม่กลับ', status: inputData[0].input_3 === 1 ? 'Alarm' : 'Normal', details: 'เช็คกระทุ้ง ทำงานไหมเนื่องจากอ่านค่าไม่ได้' },
      { id: 'x110', name: 'ประตูหน้าไม่ได้ปิด', status: inputData[0].input_4 === 1 ? 'Alarm' : 'Normal', details: 'ทำการปิดประตูให้สนิทก่อนเดินเครื่อง' },
      { id: 'y230', name: 'ฮีตเตอร์ดับ', status: inputData[0].input_5 === 1 ? 'Alarm' : 'Normal', details: 'เช็คว่าเปิดฮีตเตอร์หรือยัง เปิดฮีตเตอร์เพื่อฉีดงาน' },
      { id: 'x130', name: 'โมลไม่เปิด', status: inputData[0].input_6 === 1 ? 'Alarm' : 'Normal', details: 'รีเนี่ยไม่อ่านค่า  ให้ช็ด กระทุ้งกลับสุดและรีเนี่ยไม่อ่านค่า' },
      { id: 'y2', name: 'สั่งsafety Robot3Axis', status: inputData[0].input_7 === 1 ? 'Alarm' : 'Normal', details: 'ให้ปิดSafety Y2  เพื่อรันRobot 6Axis  และ  ให้ Robot 3 Axisออกมาวางงานได้' },
      { id: 'x4', name: 'Robot6Axis ไม่ดูด', status: inputData[0].input_8 === 1 ? 'Alarm' : 'Normal', details: 'X4 ไม่ทำงาน หรือ ไม่ดูดชิ้นงาน' },
      { id: 'x2', name: 'มีงานค้าง Senser ', status: inputData[0].input_9 === 1 ? 'Alarm' : 'Normal', details: 'Alarm  งานค้าง senser ดูดไม่ออก เอางานออกรัน Robot 6 axis ใหม่' },
      { id: 'x3', name: 'home 3 Axis', status: inputData[0].input_10 === 1 ? 'Alarm' : 'Normal', details: 'Robot 3 แกนอยู่ Home ออกมาไม่ได้' },
      
    ];
  };

  const sensors = mapInputToSensors(input);

  return (
    <div className="app-container__1">
      <div className="status-section_">
        <h2>Alarm list</h2>
      </div>

      <div className="status-section">
        {sensors.map(sensor => (
          <div key={sensor.id} className="sensor-container" onClick={() => handleClick(sensor)}>
            <StatusCard status={sensor.status} label={sensor.name} />
          </div>
        ))}
      </div>

      {selectedSensor && (
        <Tooltip sensor={selectedSensor} onClose={handleCloseTooltip} />
      )}

      <div className="loading-section">
        {error ? <div>Error: {error}</div> : <div>Data Loaded Successfully</div>}
      </div>

      {/* <div className="log-section">
        <h3>Log Messages:</h3>
        <ul>
          {logMessages.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
        
      </div> */}

      <MachineStatusList />
    </div>
  );
};

export default StatusDashboard;
