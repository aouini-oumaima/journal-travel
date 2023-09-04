import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from './navbar'; 

function nature() {
  const [beachPosts, setBeachPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("mountains and nature");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/sharedexperiences`)
      .then((response) => {
      
        const filteredPosts = response.data.filter((post) => post.category === category);
        setBeachPosts(filteredPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [category]);

  return (
    <div>
      <Navbar /> {/* Navbar placed at the top */}
      <div className="post-container">  
        {loading ? (
          <p>Loading...</p>
        ) : beachPosts.length > 0 ? (
          beachPosts.map((post) => (
            <div className="post" key={post.ID_post}>
              <div className="post-image">
                <Link to={`/post/${post.ID_post}`}>
                  <img src={post.image_url} alt={post.title} />
                </Link>
                <div className="post-details">
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nothing found in the "{category}" category.</p>
        )}
        <Link to="/add" className="add-button">
          Add Post
        </Link>
      </div>
    </div>
  );
}

export default nature;
