import { useLocalSearchParams } from 'expo-router';
import React, { useContext, useState } from 'react';
import { View, Text, Alert, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Api from '../../../service/Api';
import CustomButton from "../../../components/CustomButton";
import useSetTitle from '../../../hooks/useSetTitle';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
export default function BrandDocumentUploadScreen() {
    useSetTitle("Get Brand Access");
    const { token } = useContext(AuthContext);
    const { brandId } = useLocalSearchParams();
    const [selectedDocType, setSelectedDocType] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);





    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };


    const handleUpload = async (docType) => {
        setSelectedDocType(docType);
        await pickImage();
    };

    const submitDocument = async () => {
        if (!selectedDocType || !imageUri) {
            Alert.alert('Please select a document type and an image to upload');
            return;
        }

        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append('brandId', brandId);
        formData.append('docType', selectedDocType);

        if (Platform.OS === 'web') {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            formData.append('document', new File([blob], `document_${selectedDocType}.jpg`, { type: 'image/jpeg' }));
        } else {
            formData.append('document', {
                uri: imageUri,
                name: `document_${selectedDocType}.jpg`,
                type: 'image/jpeg',
            });
        }

        try {
            const response = await axios.post(Api.applyForAdminBrandApproval, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                Alert.alert('Document uploaded successfully');
            } else {
                Alert.alert('Failed to upload document');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            Alert.alert('Error uploading document');
        } finally {
            setLoading(false); // Stop loading
        }
    };




    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Brand Invoice"
                        icon="file-invoice"
                        onPress={() => handleUpload('brandInvoice')}
                        textColor="#ffffff"
                        bgColor="#4A90E2"
                    />
                    <CustomButton
                        title="Authorization Letter"
                        icon="file-signature"
                        onPress={() => handleUpload('authorizationLetter')}
                        textColor="#ffffff"
                        bgColor="#50C878"
                    />
                    <CustomButton
                        title="Trade Mark"
                        icon="trademark"
                        onPress={() => handleUpload('trademark')}
                        textColor="#ffffff"
                        bgColor="#FF6B6B"
                    />
                </View>

                {imageUri && (
                    <View style={styles.imagePreviewContainer}>
                        <Text style={styles.imagePreviewText}>Selected Image Preview:</Text>
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.imagePreview}
                        />
                    </View>
                )}

                {imageUri && selectedDocType && (
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Submit Document"
                            icon="upload"
                            onPress={submitDocument}
                            textColor="#ffffff"
                            bgColor="black"
                            style={styles.submitButton}
                            loading={loading} // Pass the loading prop
                        />
                    </View>

                )}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },

    buttonContainer: {
        width: '100%',
        maxWidth: 400,
        gap: 10,
    },
    imagePreviewContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
    imagePreviewText: {
        fontSize: 18,
        marginBottom: 12,
    },
    imagePreview: {
        width: 300,
        height: 250,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    submitButton: {
        marginTop: 32,
        width: '100%',
        maxWidth: 400,
    },
});