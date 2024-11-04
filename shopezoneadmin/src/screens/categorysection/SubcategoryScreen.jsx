import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Api, { server } from '../../utils/api';
import { useAuth } from '../../context/authContext';

export default function SubcategoryScreen() {
    const {token}  = useAuth()
    const { categoryId } = useParams();
    const [subcategories, setSubcategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        file: null,
    });

    // Fetch subcategories when component mounts
    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get(`${Api.getSubcategoriesByCategory}/${categoryId}`);
                setSubcategories(response.data);
            } catch (error) {
                console.error('Failed to fetch subcategories:', error);
            }
        };
        fetchSubcategories();
    }, [categoryId]);

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

    const handleSubmitSubcategory = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('subcategoryName', formData.name);
        data.append('subcategoryImage', formData.file);
        data.append('categoryId', categoryId); // Pass category ID

        try {
            const response = await axios.post(Api.createSubcategory, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    
                },
            });

            if (response.status === 200) {
                alert('Subcategory added successfully!');
                setShowForm(false);
                setSubcategories([...subcategories, response.data.subcategory]); // Update state with new subcategory
                setImagePreview(''); // Reset image preview after successful upload
            } else {
                alert('Failed to add subcategory');
            }
        } catch (error) {
            console.error('Error submitting form', error);
            alert('Error submitting form');
        }
    };

    return (
        <center>
            <div className="subcategory-list">
                <h1>Subcategories</h1>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {subcategories.map((subcategory) => (
                        <div key={subcategory._id} style={{ margin: 10 }}>
                            <span>
                                <img
                                    src={`${server}/${subcategory.imageUrl}`}
                                    alt={`${subcategory.name}`}
                                    style={{ objectFit: 'contain' }}
                                    height={100}
                                    width={100}
                                />
                                <div>{subcategory.name}</div>
                            </span>
                        </div>
                    ))}
                </div>
                <button onClick={() => setShowForm(!showForm)}>Add Subcategory</button>
            </div>
            {showForm && (
                <form onSubmit={handleSubmitSubcategory}>
                    <h1>Add Subcategory</h1>
                    <input type="file" name="subcategoryImage" onChange={handleImageChange} required />
                    {imagePreview && <img src={imagePreview} alt="Preview" height={100} width={100} />}
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter subcategory name"
                        required
                        onChange={handleInputChange}
                    />
                    <button type="submit">Upload Image</button>
                </form>
            )}
        </center>
    );
}
