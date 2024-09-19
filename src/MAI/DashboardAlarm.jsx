import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import './sta/style1.css';

Chart.register(...registerables);

const DashboardAlarm = () => {
  const [inputData, setInputData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const apiUrl = 'https://api2-one-iota.vercel.app/api/alarm';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('API not available');
        }
        return response.json();
      })
      .then(data => {
        setInputData(data);
        updateDashboard(data);
      })
      .catch(error => {
        console.error('Error fetching API data:', error);
      });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const updateDashboard = (inputData) => {
    const signalValues = inputData.map(input => input.operational);
    const signalLabels = inputData.map(input => input.name);

    const topSignals = signalValues
      .map((value, index) => ({ label: signalLabels[index], value, index }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('overviewChart').getContext('2d');
    const backgroundColors = signalValues.map((_, index) => {
      if (index === topSignals[0].index) return 'rgba(255, 0, 0, 0.6)';
      if (index === topSignals[1].index) return 'rgba(255, 165, 0, 0.6)';
      if (index === topSignals[2].index) return 'rgba(255, 255, 0, 0.6)';
      return 'rgba(75, 192, 192, 0.6)';
    });
    const borderColors = signalValues.map((_, index) => {
      if (index === topSignals[0].index) return 'rgba(255, 0, 0, 1)';
      if (index === topSignals[1].index) return 'rgba(255, 165, 0, 1)';
      if (index === topSignals[2].index) return 'rgba(255, 255, 0, 1)';
      return 'rgba(75, 192, 192, 1)';
    });

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: signalLabels,
        datasets: [{
          label: 'Operational Signal Value',
          data: signalValues,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div className="app-container">
      {/* Status Section */}
      <div className="overview-card">
        <h2>Signals Overview</h2>
        <div className="card-content">
          <canvas id="overviewChart"></canvas>
        </div>
        <div className="ranking">
          <h3>Top 3 Signals</h3>
          <ol>
            {inputData.slice(0, 3).map((signal, index) => (
              <li key={index}>
                {signal.name}: {signal.operational}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="stats-container">
        {inputData.map((input, index) => (
          <div className="stat-card" key={index}>
            <h3>{input.name}</h3>
            <ul>
              <li><span className="status-label">All</span><span className="status-value">{input.operational}</span></li>
              <li><span className="status-label">Chg</span><span className="status-value">{input.pending}</span></li>
              <li><span className="status-label">Pm</span><span className="status-value">{input.maintenance}</span></li>
            </ul>
          </div>
        ))}
      </div>

      <div className="ticket-card">
        <h2>Signal by Machine</h2>
        <table>
          <thead>
            <tr>
              <th>เครื่องจักร</th>
              <th>จำนวนการทำงาน</th>
              <th>Pending</th>
              <th>ซ่อมแล้ว</th>
            </tr>
          </thead>
          <tbody>
            {inputData.map((input, index) => (
              <tr key={index}>
                <td>{input.name}</td>
                <td>{input.operational}</td>
                <td>{input.pending}</td>
                <td>{input.maintenance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAlarm;
