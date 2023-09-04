import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

function Desert() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/experience/desert-landscape")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="post-container">
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
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
        <p>nothing!</p>
      )}
      <Link to="/add" className="add-button">
        Add Post
      </Link>
    </div>
  );
}

export default Desert;
