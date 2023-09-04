import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from './navbar';
// import './details.css'

const TravelDetails = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/experience/${id}`)
      .then((res) => {
        setTravel(res.data);
      })
      .catch((error) => {
        console.error('Error fetching travel details:', error);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/experience/${id}`)
      .then((res) => {
        console.log(res);
        window.location.href = '/shared'; 
      })
      .catch((err) => {
        console.error('Error deleting travel:', err);
      });
  };

  return (
    <div>
        <navbar />
      <h1>{travel.title}</h1>
      <img src={travel.image_url} alt={travel.title} />
      <p><strong>Description:</strong> {travel.description}</p>
      <p><strong>Location:</strong> {travel.location}</p>
      <p><strong>Category:</strong> {travel.category}</p>
  
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/updatetravel/${id}`}>Update</Link>
    </div>
  );
};

export default TravelDetails;
