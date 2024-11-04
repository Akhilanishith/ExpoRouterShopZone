import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Api,{server} from '../../utils/api'; // Adjust this according to your actual API configuration
import { useAuth } from '../../context/authContext';


const AdminBrandUpload = () => {
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [logo, setLogo] = useState(null); // For file upload
  const [description, setDescription] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [brands, setBrands] = useState([]); // To hold the list of admin brands
  const [loading, setLoading] = useState(false); // Loader for form submit

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]); // Get the selected file
  };

  // Move fetchAdminBrands function outside of useEffect
  const fetchAdminBrands = async () => {
    try {
      const response = await axios.get(Api.getAdminBrands, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBrands(response.data.brands);
    } catch (error) {
      console.error('Error fetching admin brands:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('logo', logo); // Append the file to the formData object
    formData.append('seoTags[title]', seoTitle);
    formData.append('seoTags[description]', seoDescription);
    formData.append('seoTags[keywords]', seoKeywords);

    try {
      // Send form data to backend using axios
      const response = await axios.post(Api.brandCreatedByAdmin, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Corrected Authorization header
        },
      });

      console.log('Brand uploaded successfully:', response.data);
      setLoading(false);
      fetchAdminBrands(); // Fetch the updated list after the upload
    } catch (error) {
      console.error('Error uploading brand:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminBrands(); // Fetch admin brands when the component is loaded
  }, [token]);

  return (
    <div>
      <h2>Upload New Brand (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Brand Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Brand Slug:</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Brand Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Brand Logo:</label>
          <input type="file" onChange={handleLogoChange} required />
        </div>

        <div>
          <h3>SEO Tags</h3>
          <label>SEO Title:</label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
          />

          <label>SEO Description:</label>
          <textarea
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
          />

          <label>SEO Keywords (comma separated):</label>
          <input
            type="text"
            value={seoKeywords}
            onChange={(e) => setSeoKeywords(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Brand'}
        </button>
      </form>

      <h2>Admin Brand List</h2>
      {brands.length ? (
        <ul>
          {brands.map((brand) => (
            <li key={brand._id}>
              <strong>{brand.name}</strong>
              <p>{brand.description}</p>
              <img src={`${server}${brand.logo}`} alt={brand.name} width="100" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No brands created by the admin yet.</p>
      )}
    </div>
  );
};

export default AdminBrandUpload;
