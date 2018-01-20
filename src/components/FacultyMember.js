import React from 'react';

/* eslint-disable react/prop-types */

export default class FacultyMember extends React.Component {
  render() {
    const { name, role, speciality } = this.props;
    return (
      <div className="faculty-member">
        <p>name: {name}</p>
        <p>role: {role}</p>
        <div>
          <p>{speciality.subject}</p>
          <p>
            {speciality.accredited ? (
              <span>Accredited</span>
            ) : (
              <span>Not Accredited</span>
            )}
          </p>
        </div>
      </div>
    );
  }
}
