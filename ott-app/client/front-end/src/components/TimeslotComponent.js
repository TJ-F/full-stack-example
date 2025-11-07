// src/components/TimeslotComponent.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TimeslotComponent({ time, num_golfers, onClick }) {
  if (!time) return null;

  return (
    <div className="card mt-2" style={{ width: '95%' }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5>{time}</h5>
          <span>{num_golfers} {num_golfers > 1 ? 's' : ''}</span>
        </div>
        <button className="btn btn-success" name='reserve' onClick={onClick}>
          Reserve
        </button>
      </div>
    </div>
  );
}

export default TimeslotComponent;
