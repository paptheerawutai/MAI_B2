import React from 'react';
import '../sta/MAlist.css';

// Data for machine status
const machineData = [
  { name: 'Machine 41', status: 'Normal', lastAlarm: '10.55', downtime: 0 },
  { name: 'Robot 3 Axis', status: 'Alarm', lastAlarm: '11:05 AM', downtime: 2 },
  { name: 'Robot 6 Axis', status: 'Normal', lastAlarm: '12.30', downtime: 0 }
];

// Function to render machine status
const MachineStatusList = () => {
  return (
    <div className="machine-status-list">
      <h2>Machine Status</h2>
      <table>
        <thead>
          <tr>
            <th>Machine Name</th>
            <th>Status</th>
            <th>Last Alarm Time</th>
            <th>Downtime (hrs)</th>
          </tr>
        </thead>
        <tbody>
          {machineData.map((machine, index) => (
            <tr key={index}>
              <td>{machine.name}</td>
              <td className={machine.status === 'Alarm' ? 'alarm-status' : 'normal-status'}>
                {machine.status}
              </td>
              <td>{machine.lastAlarm}</td>
              <td>{machine.downtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineStatusList;
