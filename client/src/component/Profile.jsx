import React from 'react';
import Navbar from './navbar'; 
import AddExperience from './add';

function Profile() {
  return (
    <div>
        <div>
        <Navbar /> 
      <h2>Profile Page</h2>
      <AddExperience />
        </div>
    </div>
  );
}

export default Profile;
