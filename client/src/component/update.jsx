import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateExperienceForm = () => {
  const { eID } = useParams();
  const [experience, setExperience] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image_url: '',
    category: '', 
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/experience/${eID}`)
      .then((res) => {
        const experienceData = res.data;
        setExperience(experienceData);

        setFormData({
          title: experienceData.title,
          description: experienceData.description,
          location: experienceData.location,
          image_url: experienceData.image_url,
          category: experienceData.category, 
        });
      })
      .catch((error) => {
        console.error('Error fetching experience details:', error);
      });
  }, [eID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uploadImageToCloudinary = async (picture) => {
    const formData = new FormData();
    formData.append('file', picture);
    formData.append('upload_preset', 'oumaao');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/ds0icz20z/image/upload',
        formData
      );
      const imageUrl = response.data.secure_url;
      setFormData({ ...formData, image_url: imageUrl });
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/experience/${eID}`, formData)
      .then((res) => {
        console.log('Experience updated:', res);
        window.location.href = `/experience/${eID}`;
      })
      .catch((error) => {
        console.error('Error updating experience:', error);
      });
  };

  return (
    <div>
      <h1>Update Experience {eID}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={(e) => {
              uploadImageToCloudinary(e.target.files[0]);
              setImageFile(e.target.files[0]);
            }}
          />
        </div>
        {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" />}
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateExperienceForm;
