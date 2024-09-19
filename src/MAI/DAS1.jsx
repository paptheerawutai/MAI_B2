import React from 'react';
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

const DAS1 = () => {
  // Example statuses for the machines
  const machineStatus = {
    machine41: { isAlarm: false },
    robot3Axis: { isAlarm: true },
    robot6Axis: { isAlarm: false },
  };

  return (
    <div className='All'>
      {/* Machine 41 Section */}
      <div className="app-container1">
        <img className="img1" src="../MACHINE/Injection-Mold-Machine-Photoroom.png" alt="Machine 41" />
        <div className="T-MC41">
          <div className="status-text">
            <p>Machine 41</p>
            <StatusIndicator isAlarm={machineStatus.machine41.isAlarm} />
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
          
        </div>
      </div>
      
    </div>

  );
};

export default DAS1;


