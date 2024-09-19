import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './sta/home.css';
import MachineActivityLog from './das/MachineActivityLog';

// Register the necessary chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Example alarm data for the chart
const alarmData = {
  labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '11:25'],
  datasets: [{
    label: 'Number of Alarms',
    data: [2, 0, 1, 3, 1, 0], // Example data points for the number of alarms
    backgroundColor: 'rgba(75, 192, 192, 0.6)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
  }],
};

// Function to render the status
const StatusIndicator = ({ isAlarm }) => (
  <div 
    style={{
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      backgroundColor: isAlarm ? 'red' : 'green',
      marginLeft: '10px',
      boxShadow: '0 0 5px rgba(0,0,0,0.2)',
    }}
  ></div>
);

const DAS = () => {
  // Example statuses for the machines
  const machineStatus = {
    machine41: { isAlarm: false },
    robot3Axis: { isAlarm: true },
    robot6Axis: { isAlarm: false },
  };

  return (
    <div>
      {/* Machine 41 Section */}
      <div className="app-container1">
        <img className="img1" src="../MACHINE/Injection-Mold-Machine-Photoroom.png" alt="Machine 41" />
        <div className="T-MC41">
          <div className="status-text">
            <p>Machine 41</p>
            <StatusIndicator isAlarm={machineStatus.machine41.isAlarm} />
          </div>
          <div style={{ width: '100px', height: '60px' }}>
            <Bar data={alarmData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Robot 3 Axis Section */}
      <div className="app-container2">
        <img className="img2" src="../MACHINE/Robot3a-Photoroom.png" alt="Robot3Axis" />
        <div className="T-R341">
          <div className="status-text">
            <p>Robot3Axis</p>
            <StatusIndicator isAlarm={machineStatus.robot3Axis.isAlarm} />
          </div>
          <div style={{ width: '100px', height: '60px' }}>
            <Bar data={alarmData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Robot 6 Axis Section */}
      <div className="app-container3">
        <img className="img3" src="../MACHINE/R6A-Photoroom.png" alt="Robot6Axis" />
        <div className="T-R641">
          <div className="status-text">
            <p>Robot6Axis</p>
            <StatusIndicator isAlarm={machineStatus.robot6Axis.isAlarm} />
          </div>
          <div style={{ width: '100px', height: '60px' }}>
            <Bar data={alarmData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      {/* <MachineActivityLog/> */}
    </div>

  );
};

export default DAS;


