import React, { useState } from 'react';
import axios from 'axios';
import "./add.css"


function AddExperience() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  // const [date, setDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [category , setCategory] = useState("")
  const [loading, setLoading] = useState(false);

  const uploadImageToCloudinary = (picture) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', picture);
    formData.append('upload_preset', 'tawelti');
  
    axios
      .post('https://api.cloudinary.com/v1_1/dnzfcueon/image/upload', formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        console.log('Image uploaded to Cloudinary:', imageUrl); 
        setImageFile(imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        setLoading(false);
      });
  };
  
  const handleUpload = () => {
    setLoading(true);

    const currentDate = new Date();
    // const created_at = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    const experienceData = {
      title,
      description,
      location,
      image_url: imageFile, 
      // date : date ,
      category : category,
    };

    axios
      .post('http://localhost:5000/experience', experienceData)
      .then((response) => {
        setLoading(false);
      
        window.location.href = '/shared';
       
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error adding experience:', error);
       
      });
  };

  return (

   
    
    <div className="add-experience-form">

      <h2>Add New Experience</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
     
      
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      {/* <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div> */}
      <div className="form-group">
        <label htmlFor="category">category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          onChange={(e) => uploadImageToCloudinary(e.target.files[0])}
        />
      </div>
      {loading ? (
        <div className="loader">Uploading...</div>
      ) : (
        <button onClick={handleUpload}>Upload</button>
      )}
    </div>
  );
}

export default AddExperience;
