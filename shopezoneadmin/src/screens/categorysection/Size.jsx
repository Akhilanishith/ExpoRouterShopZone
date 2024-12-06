import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Api from '../../utils/api';
import { useAuth } from '../../context/authContext';

export default function SizeScreen() {
    const { token } = useAuth();
    const { subTypesId } = useParams();
    const [sizes, setSizes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        sizeName: '',
        sizeValue: '',
    });


    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const response = await axios.get(`${Api.getSizesBySubType}/${subTypesId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSizes(response.data);
            } catch (error) {
                console.error('Failed to fetch sizes:', error);
            }
        };
        fetchSizes();
    }, [subTypesId, token]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitSize = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                Api.createSize,
                {
                    sizeName: formData.sizeName,
                    sizeValue: formData.sizeValue,
                    subTypesId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert('Size added successfully!');
                setSizes([...sizes, response.data.size]);
                setFormData({ sizeName: '', sizeValue: '' });
                setShowForm(false);
            } else {
                alert('Failed to add size');
            }
        } catch (error) {
            console.error('Error submitting size:', error);
            alert('Error submitting size');
        }
    };

    return (
        <center>
            <div className="size-list">
                <h1>Sizes</h1>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {sizes.map((size) => (
                        <div key={size._id} style={{ margin: 10 }}>
                            <div>
                                <strong>{size.sizeName}</strong>: {size.sizeValue}
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => setShowForm(!showForm)}>Add Size</button>
            </div>
            {showForm && (
                <form onSubmit={handleSubmitSize}>
                    <h1>Add Size</h1>
                    <input
                        type="text"
                        name="sizeName"
                        placeholder="Enter size name"
                        required
                        value={formData.sizeName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="sizeValue"
                        placeholder="Enter size value"
                        required
                        value={formData.sizeValue}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Add Size</button>
                </form>
            )}
        </center>
    );
}
