import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import Api from '../../service/Api';

const AddNewDeliveryAddressScreen = () => {
  const { token } = useContext(AuthContext);
  const { productId } = useLocalSearchParams();
  const router = useRouter();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    mobile: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    addressType: '',
  });

  // Fetch all addresses
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(Api.getDeliveryAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setAddresses(response.data.addresses || []);
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  // Add or Update Address
  const handleAddOrUpdate = async () => {
    try {
      if (editingAddressId) {
        const response = await axios.put(
          `${Api.updateAddress}/${editingAddressId}`,
          formState,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          fetchAddresses();
          resetForm();
        }
      } else {
        const response = await axios.post(Api.addDeliveryAddress, formState, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          fetchAddresses();
          resetForm();
        }
      }
    } catch (error) {
      console.error('Failed to add/update address:', error);
    }
  };

  // Reset Form
  const resetForm = () => {
    setShowForm(false);
    setEditingAddressId(null);
    setFormState({
      name: '',
      mobile: '',
      pincode: '',
      address: '',
      city: '',
      state: '',
      landmark: '',
      addressType: '',
    });
  };

  // Delete Address
  const handleDelete = async (id) => {
    const confirmDelete = Platform.OS === 'web'
      ? window.confirm('Are you sure you want to delete this address?')
      : true;

    if (confirmDelete) {
      try {
        const response = await axios.delete(`${Api.deleteAddress}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          Alert.alert('Success', 'Address deleted successfully.');
          fetchAddresses();
        } else {
          Alert.alert('Error', response.data.message || 'Failed to delete address.');
        }
      } catch (error) {
        console.error('Error while deleting address:', error);
        Alert.alert('Error', 'Failed to delete address. Please try again.');
      }
    }
  };

  // Handle "Deliver to this Address"
  const handleSelectAddress = (address) => {
    router.push({
      pathname: '../PlaceOrderScreen/',
      params: { productId: productId, selectedAddress: JSON.stringify(address) },
    });
  };

  // Handle Edit Address
  const handleEdit = (address) => {
    setFormState({
      name: address.name,
      mobile: address.mobile,
      pincode: address.pincode,
      address: address.address,
      city: address.city,
      state: address.state,
      landmark: address.landmark,
      addressType: address.addressType,
    });
    setEditingAddressId(address._id);
    setShowForm(true);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Delivery Addresses</Text>
      {showForm ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formState.name}
            onChangeText={(text) => setFormState({ ...formState, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            value={formState.mobile}
            onChangeText={(text) => setFormState({ ...formState, mobile: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Pincode"
            value={formState.pincode}
            onChangeText={(text) => setFormState({ ...formState, pincode: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formState.address}
            onChangeText={(text) => setFormState({ ...formState, address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={formState.city}
            onChangeText={(text) => setFormState({ ...formState, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={formState.state}
            onChangeText={(text) => setFormState({ ...formState, state: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Landmark"
            value={formState.landmark}
            onChangeText={(text) => setFormState({ ...formState, landmark: text })}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleAddOrUpdate}>
            <Text style={styles.buttonText}>{editingAddressId ? 'Update Address' : 'Add Address'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <FlatList
            data={addresses}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.addressItem}>
                <Text style={styles.addressText}>{item.name}</Text>
                <Text style={styles.addressText}>{item.address}</Text>
                <Text style={styles.addressText}>{`${item.city}, ${item.state} - ${item.pincode}`}</Text>
                <Text style={styles.addressText}>{`Mobile: ${item.mobile}`}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item._id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => handleSelectAddress(item)}
                >
                  <Text style={styles.buttonText}>Deliver to this Address</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
            <Text style={styles.buttonText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  input: { padding: 12, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 16 },
  saveButton: { backgroundColor: '#1976D2', padding: 12, borderRadius: 4, alignItems: 'center', marginBottom: 8 },
  cancelButton: { backgroundColor: '#FF5252', padding: 12, borderRadius: 4, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 14 },
  addressItem: { padding: 16, backgroundColor: '#fff', marginBottom: 8, borderRadius: 4, borderWidth: 1, borderColor: '#ddd' },
  addressText: { fontSize: 14, marginBottom: 4 },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  editText: { color: '#1976D2', fontSize: 14 },
  deleteText: { color: '#FF5252', fontSize: 14 },
  selectButton: { backgroundColor: '#1976D2', padding: 12, borderRadius: 4, alignItems: 'center', marginTop: 8 },
  addButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 4, alignItems: 'center' },
});

export default AddNewDeliveryAddressScreen;