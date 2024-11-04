import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link, useRouter } from 'expo-router';

// Dummy data for brands
const brands = [
  { id: 1, name: 'Nike' },
  { id: 2, name: 'Adidas' },
  { id: 3, name: 'Puma' },
  { id: 4, name: 'Reebok' },
  { id: 5, name: 'Under Armour' },
];

export default function BrandSelectScreen() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState({
    invoice: false,
    trademark: false,
    authorizationLetter: false,
  });

  const router = useRouter(); // Use router from Expo Router

  const handleBrandSelect = (brandName) => {
    setSelectedBrand(brandName);
    setShowPopup(true);
  };

  const handleUpload = (documentType) => {
    setUploadedDocuments((prev) => ({ ...prev, [documentType]: true }));
  };

  const handleApplyForApproval = () => {
    alert('Application submitted for approval!');
  };

  const allDocumentsUploaded = Object.values(uploadedDocuments).every(
    (value) => value
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Your Brand</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBrand}
          onValueChange={handleBrandSelect}
          style={styles.picker}
        >
          <Picker.Item label="Select a brand" value="" />
          {brands.map((brand) => (
            <Picker.Item key={brand.id} label={brand.name} value={brand.name} />
          ))}
        </Picker>
      </View>

      <Modal visible={showPopup} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Required Documents</Text>
            <Text style={styles.modalText}>
              Please upload the following documents:
            </Text>
            <View style={styles.documentList}>
              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  uploadedDocuments.invoice && styles.uploadedButton,
                ]}
                onPress={() => handleUpload('invoice')}
              >
                <Text style={styles.uploadButtonText}>
                  {uploadedDocuments.invoice ? 'Invoice ✓' : 'Upload Invoice'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  uploadedDocuments.trademark && styles.uploadedButton,
                ]}
                onPress={() => handleUpload('trademark')}
              >
                <Text style={styles.uploadButtonText}>
                  {uploadedDocuments.trademark
                    ? 'Trademark ✓'
                    : 'Upload Trademark'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  uploadedDocuments.authorizationLetter &&
                    styles.uploadedButton,
                ]}
                onPress={() => handleUpload('authorizationLetter')}
              >
                <Text style={styles.uploadButtonText}>
                  {uploadedDocuments.authorizationLetter
                    ? 'Authorization Letter ✓'
                    : 'Upload Authorization Letter'}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.applyButton,
                !allDocumentsUploaded && styles.disabledButton,
              ]}
              onPress={handleApplyForApproval}
              disabled={!allDocumentsUploaded}
            >
              <Text style={styles.applyButtonText}>Apply for Approval</Text>
            </TouchableOpacity>

            {/* Use Link component to navigate */}
            <Link href="/adminBrandSelect" style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Go to Admin Brand Select</Text>
            </Link>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image
        source={{ uri: '/placeholder.svg?height=200&width=200' }}
        style={styles.brandImage}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  documentList: {
    width: '100%',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  uploadedButton: {
    backgroundColor: '#4CD964',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#FF9500',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  brandImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
});
