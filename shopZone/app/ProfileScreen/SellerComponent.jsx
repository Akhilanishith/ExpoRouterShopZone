
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, ActivityIndicator, Platform, Image } from 'react-native';
import { AuthContext } from '../../context/AuthContext.js';
import FoodShopForm from './FoodShopform.jsx';
import RetailShopForm from './RetailShopform.jsx';
import { useRouter, useFocusEffect } from 'expo-router';
import axios from 'axios';
import Api from '../../service/Api.js';
import { FolderDot, RectangleEllipsis } from 'lucide-react-native';
import retailImg from "../../assets/images/retail14.jpeg"



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
            //console.log()(`Managing Food Seller account`);
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
            <View style={styles.grid}>
                <TouchableOpacity style={styles.card} onPress={() => handleFoodButtonPress(foodSellerStatus)} disabled={foodSellerStatus === 'pending'}>
                    <Image source={retailImg} style={styles.img} />
                    <Text style={styles.cardTitle}>Food Seller</Text>
                    <Text style={styles.cardSubtitle}>{getButtonText(foodSellerStatus)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => handleRetailButtonPress(retailSellerStatus)}
                    disabled={retailSellerStatus === 'pending'}>
                    <Image source={retailImg} style={styles.img} />
                    <Text style={styles.cardTitle}>Retail Seller</Text>
                    <Text style={styles.cardSubtitle}>{getButtonText(retailSellerStatus)}</Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
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


    grid: {
        width:"100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        ...Platform.OS === "web" && {

            flexWrap: 'nowrap',
        }
    },
    card: {
        width: '46%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        margin: '1%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        ...Platform.OS === "web" && {
         
        }
    },
    icon: {
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    img:{
        height: 54,
        width: 54,
        marginBottom: 12,
        resizeMode: 'contain',
        backgroundColor:"red"
    }
});
