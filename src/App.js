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
  
    // Calculate the maximum number of shifts a participant can have together
    const maxTogetherShifts = Math.min(shifts, Math.ceil(participantList.length / personLimit));
  
    // Distribute the participants among the shifts
    for (let i = 0; i < shifts; i++) {
      const shiftStart = i * shiftLength;
      const shiftEnd = shiftStart + Number(shiftLength);
  
      for (let j = 0; j < personLimit; j++) {
        const participantIndex = (i + j * maxTogetherShifts) % participantList.length;
        const participant = participantList[participantIndex];
        schedule.push({
          name: participant,
          start: shiftStart,
          end: shiftEnd,
        });
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
      <ol>
      {schedule.reduce((acc, shift, index) => {
        if (index % personLimit === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(shift);
        return acc;
      }, []).map((shiftGroup, index) => (
        <li key={index}>
          Shift {index + 1} ({shiftGroup[0].start} - {shiftGroup[0].end} minutes):{" "}
          {shiftGroup.map((shift) => shift.name).join(', ')}
        </li>
      ))}
    </ol>
    </div>
  );
}

export default App;
