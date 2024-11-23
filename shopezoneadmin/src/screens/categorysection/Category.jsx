import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Api, { server } from '../../utils/api';
import { useAuth } from '../../context/authContext';

export default function ShopScreen() {
    return (
        <div>
            <CategoryManager />
        </div>
    );
}

function CategoryManager() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        file: null,
    });

    // Fetch categories when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            console.log(Api.getCategories)
            try {
                const response = await axios.get(Api.getCategories,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                      },
                });
                
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, file });
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitCategory = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('categoryName', formData.name);
        data.append('categoryImage', formData.file);
    
        try {
            const response = await axios.post(Api.createCategory, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // Include the token here
                },
            });
    
            if (response.status === 200) {
                alert('Category added successfully!');
                setShowForm(false);
                setCategories([...categories, response.data.category]); // Update state with new category
                setImagePreview(''); // Reset image preview after successful upload
            } else {
                alert('Failed to add category');
            }
        } catch (error) {
            console.error('Error submitting form', error);
            alert('Error submitting form');
        }
    };
    

    return (
        <center>
            <div className="category-list">
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {categories.map((category) => (
                        <div
                            key={category._id} // Assuming MongoDB uses _id
                            style={{ margin: 10 }}
                            onClick={() => navigate('/ShopScreenSubcategory/' + category._id)}
                        >
                            <span>
                                {/* Using the correct image URL */}
                                <img
                                    src={`${server}/${category.imageUrl}`}
                                    alt={`${category.name}`}
                                    style={{ objectFit: 'contain' }}
                                    height={100}
                                    width={100}
                                />
                                <div>{category.name}</div>
                            </span>
                        </div>
                    ))}
                </div>
                <button onClick={() => setShowForm(!showForm)}>Add Category</button>
            </div>
            {showForm && (
                <form onSubmit={handleSubmitCategory}>
                    <h1>Add Category</h1>
                    <input type="file" name="categoryImage" onChange={handleImageChange} required />
                    {imagePreview && <img src={imagePreview} alt="Preview" height={100} width={100} />}
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter category name"
                        required
                        onChange={handleInputChange}
                    />
                    <button type="submit">Upload Image</button>
                </form>
            )}
        </center>
    );
}
