import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Api, { server } from '../../utils/api';
import { useAuth } from '../../context/authContext';

export default function SubTypesScreen() {
    const { token } = useAuth()
    const { subcategoryId } = useParams();
    const [subTypes, setSubTypes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        file: null,
    });

    // Fetch subcategories when component mounts
    useEffect(() => {
        const fetchSubTypes = async () => {
            try {
                const response = await axios.get(`${Api.getSubTypesBySubcategories}/${subcategoryId}`,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Include the token here
                    },
                }

                );
                console.log(response.data);  // Log the response to inspect the data structure
                setSubTypes(response.data);
            } catch (error) {
                console.error('Failed to fetch subcategories:', error);
            }
        };
        fetchSubTypes();
    }, [subcategoryId]);


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

    const handleSubmitSubTypes = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('subTypesName', formData.name);
        data.append('subTypesImage', formData.file);
        data.append('subcategoryId', subcategoryId); // Pass category ID
    
        try {
            const response = await axios.post(Api.createSubTypes, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                alert('Subcategory added successfully!');
                setShowForm(false);
                setSubTypes([...subTypes, response.data.subTypes]); // Use response.data.subTypes to match backend
                setImagePreview(''); // Reset image preview after successful upload
                setFormData({ name: '', file: null }); // Clear form data
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
                    {subTypes.map((subType) => (
                        <div key={subType._id} style={{ margin: 10 }}>
                            <span>
                                <img
                                    src={subType.imageUrl ? `${server}/${subType.imageUrl}` : 'default-image.png'} // Fallback image if imageUrl is undefined
                                    alt={subType.name}
                                    style={{ objectFit: 'contain' }}
                                    height={100}
                                    width={100}
                                />

                                <div>{subType.name}</div>
                            </span>
                        </div>
                    ))}

                </div>
                <button onClick={() => setShowForm(!showForm)}>Add typesSubcategory</button>
            </div>
            {showForm && (
                <form onSubmit={handleSubmitSubTypes}>
                    <h1>Add Subtypes</h1>
                    <input type="file" name="subTypesImage" onChange={handleImageChange} required />
                    {imagePreview && <img src={imagePreview} alt="Preview" height={100} width={100} />}
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter subcategorytypes name"
                        required
                        onChange={handleInputChange}
                    />
                    <button type="submit">Upload Image</button>
                </form>
            )}
        </center>
    );
}
