import React from 'react';

/* eslint-disable react/prop-types */

const TestComponent = ({ className, text, details }) => (
  <div className={className}>
    <p>{text}</p>
    <p>{details.description}</p>
  </div>
);

export default TestComponent;
