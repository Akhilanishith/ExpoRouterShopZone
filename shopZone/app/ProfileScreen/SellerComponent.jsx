import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../context/AuthContext';
import FoodShopForm from './FoodShopform.jsx';
import RetailShopForm from './RetailShopform.jsx';
import { useRouter, useFocusEffect } from 'expo-router';
import Api from '../../service/Api.js';

const SellerComponent = () => {
    const router = useRouter();
    const { token } = useContext(AuthContext);
    const [foodSellerStatus, setFoodSellerStatus] = useState("none");
    const [retailSellerStatus, setRetailSellerStatus] = useState("none");
    const [loading, setLoading] = useState(false);

    // State to control modal visibility and seller type
    const [modalVisible, setModalVisible] = useState(false);
    const [currentSellerType, setCurrentSellerType] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            const fetchVerificationStatus = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(Api.checkRetailAndFoodVerificationStatus, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setRetailSellerStatus(response.data.retailSellerStatus);
                    setFoodSellerStatus(response.data.foodSellerStatus);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchVerificationStatus();
        }, [token, modalVisible])
    );

    // Helper functions to determine button text and behavior
    const getButtonText = (status) => {
        switch (status) {
            case 'none':
                return 'Become a Seller';
            case 'pending':
                return 'Application Pending';
            case 'verified':
                return 'Manage Seller Account';
            case 'rejected':
                return 'Reapply as Seller';
            default:
                return 'Become a Seller';
        }
    };

    const handleRetailButtonPress = (status) => {
        if (status === 'none') {
            setCurrentSellerType('Retail Seller');
            setModalVisible(true);
        } else if (status === 'rejected') {
            Alert.alert(`Reapplying for Retail Seller`);
        } else if (status === 'verified') {
            router.push('../SellerScreen/SellerDashboard/SellerDashboard');
        }
    };

    const handleFoodButtonPress = (status) => {
        if (status === 'none') {
            setCurrentSellerType('Food Seller');
            setModalVisible(true);
        } else if (status === 'rejected') {
            Alert.alert(`Reapplying for Food Seller`);
        } else if (status === 'verified') {
            console.log(`Managing Food Seller account`);
        }
    };

    // Modal content can be customized later
    const renderModalContent = () => (
        <View style={styles.modalContent}>
            {currentSellerType === 'Food Seller' && <FoodShopForm modelCloseBtn={() => setModalVisible(false)} />}
            {currentSellerType === 'Retail Seller' && <RetailShopForm modelCloseBtn={() => setModalVisible(false)} />}
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleFoodButtonPress(foodSellerStatus)}
                        disabled={foodSellerStatus === 'pending'}
                    >
                        <Text style={styles.buttonText}>{getButtonText(foodSellerStatus)}</Text>
                        <Text style={styles.buttonText}>(Food Seller)</Text>
                    </TouchableOpacity>

                    {/* Retail Seller Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleRetailButtonPress(retailSellerStatus)}
                        disabled={retailSellerStatus === 'pending'}
                    >
                        <Text style={styles.buttonText}>{getButtonText(retailSellerStatus)}</Text>
                        <Text style={styles.buttonText}>(Retail Seller)</Text>
                    </TouchableOpacity>
                </>
            )}

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>{renderModalContent()}</View>
            </Modal>
        </View>
    );
};

export default SellerComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        margin: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        width: 150,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        height: 400,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
});