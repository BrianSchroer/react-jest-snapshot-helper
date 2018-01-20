import React from 'react';

/* eslint-disable react/prop-types */

const FacultyMember = ({ name, role }) => (
  <div className="faculty-member">
    <p>name: {name}</p>
    <p>role: {role}</p>
  </div>
);

export default FacultyMember;
