import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Participants({ participants, maxParticipants, onParticipantChange, onRemoveParticipant, onAddParticipant, onMaxParticipantsChange }) {
  return (
    <Form.Group controlId="participants">
      <Form.Label>Participants</Form.Label>
      {participants.map((participant, index) => (
        <div key={index} className="d-flex align-items-center">
          <Form.Control
            type="text"
            value={participant}
            onChange={(e) => onParticipantChange(index, e.target.value)}
          />
          {participants.length > 1 && (
            <Button
              variant="outline-danger"
              className="ml-2"
              onClick={() => onRemoveParticipant(index)}
            >
              X
            </Button>
          )}
        </div>
      ))}
      {participants.length < maxParticipants && (
        <Button
          variant="outline-secondary"
          onClick={onAddParticipant}
          className="mt-2"
        >
          Add Participant
        </Button>
      )}

      <Form.Group controlId="maxParticipants" className="mt-3">
        <Form.Label>Maximum Participants</Form.Label>
        <Form.Control
          as="select"
          value={maxParticipants}
          onChange={onMaxParticipantsChange}
        >
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form.Group>
  );
}

export default Participants;
