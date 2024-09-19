// Data for machine activity log
import '../sta/MAlog.css'; 
const activityLog = [
    { time: '10:00 AM', machine: 'Machine 41', event: 'Started' },
    { time: '10:05 AM', machine: 'Robot 3 Axis', event: 'Alarm Triggered' },
    { time: '10:10 AM', machine: 'Robot 3 Axis', event: 'Alarm Reset by Operator' },
    { time: '10:15 AM', machine: 'Robot 6 Axis', event: 'Started' },
  ];
  
  // Function to render machine activity log
  const MachineActivityLog = () => {
    return (
      <div className="machine-activity-log">
        <h2>Machine Activity Log</h2>
        <ul>
          {activityLog.map((log, index) => (
            <li key={index}>
              <span className="log-time">{log.time}</span> - 
              <span className="log-machine">{log.machine}</span> - 
              <span className="log-event">{log.event}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MachineActivityLog;
  