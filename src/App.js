import React, { useState } from 'react';
import './App.css';

function App() {
  const [participants, setParticipants] = useState('');
  const [personLimit, setPersonLimit] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [shiftLength, setShiftLength] = useState('');
  const [schedule, setSchedule] = useState([]);

  const calculateShifts = () => {
    const participantList = participants.split(',').map((p) => p.trim());
    const shifts = Math.ceil(totalTime / shiftLength);
    const schedule = [];

    for (let i = 0; i < shifts; i++) {
      const shiftStart = i * shiftLength;
      const shiftEnd = shiftStart + Number(shiftLength);

      for (let j = i * personLimit; j < (i + 1) * personLimit; j++) {
        if (participantList[j]) {
          schedule.push({
            name: participantList[j],
            start: shiftStart,
            end: shiftEnd,
          });
        }
      }
    }

    setSchedule(schedule);
  };

  return (
    <div className="App">
      <h1>SaunaWise</h1>
      <div>
        <label>
          Participants (comma separated):
          <input
            type="text"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Sauna person limit:
          <input
            type="number"
            value={personLimit}
            onChange={(e) => setPersonLimit(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Total length of time (minutes):
          <input
            type="number"
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Length of shift (minutes):
          <input
            type="number"
            value={shiftLength}
            onChange={(e) => setShiftLength(e.target.value)}
          />
        </label>
      </div>
      <button onClick={calculateShifts}>Calculate Shifts</button>
      <h2>Shift Schedule:</h2>
      <ul>
        {schedule.map((shift, index) => (
          <li key={index}>
            {shift.name} - {shift.start} to {shift.end} minutes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
