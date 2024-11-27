
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, ActivityIndicator, Platform } from 'react-native';
import { AuthContext } from '../../context/AuthContext.js';
import FoodShopForm from './FoodShopform.jsx';
import RetailShopForm from './RetailShopform.jsx';
import { useRouter, useFocusEffect } from 'expo-router';
import axios from 'axios';
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
            router.push('../SellerScreen');
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
            <View style={styles.cardContainer}>
                {/* Left Section */}
                <View style={styles.leftContainer}>
                    <Text style={styles.heading}>Seller Portal</Text>
                    <Text style={styles.subheading}>
                        Manage your Seller accounts and applications with ease.
                    </Text>
                </View>

                {/* Right Section with Buttons */}
                <View style={styles.rightContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#f4511e" />
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
                </View>
            </View>

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
    },
    cardContainer: {
        borderRadius: 10,
        marginVertical: 5,
        display: "flex",
        backgroundColor: "white",
        flexDirection: 'row',
        flexWrap: "wrap",
        height: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },
    leftContainer: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 300,
        borderRadius: 10,
        backgroundColor: '#f4511e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,

    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    subheading: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 10,
    },
    rightContainer: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 300,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: Platform.OS === "web" ? 'column' : 'row',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        width: Platform.OS === "web" ? '100%' : '50%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
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
