import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import "./inspiration.css"

const Inspirations = () => {
  const [experiences, setExperiences] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:5000/sharedexperiences')
      .then((res) => {
        setExperiences(res.data);
      })
      .catch((error) => {
        console.error('Error fetching shared experiences:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container" >
        <div className="row">
          {experiences.map((experience) => (
            <div className="col-md-4" key={experience.eID}>
              <div className="card mb-4">
                <img
                  src={experience.image_url}
                  className="card-img-top"
                  alt={experience.title}
                  // style={{
                  //   cursor: 'pointer',
                  //   width: '550px',
                  //   position: 'static',
                  // }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.animation =
                      'shake 0.5s, up 0.5s';
                    e.currentTarget.style.animationIterationCount =
                      'infinite';
                    e.currentTarget.style.filter = 'brightness(70%)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.animation = 'none';
                    e.currentTarget.style.filter = 'none';
                    e.currentTarget.style.transform = 'none';
                  }}
                />
                
               
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/experience/${experience.eID}`}>
                      {experience.title}
                    </Link>
                  </h5>
                  <p className="card-text">
                    <strong>Description:</strong> {experience.description}
                    <br />
                    <strong>Location:</strong> {experience.location}
                    <br />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inspirations;
