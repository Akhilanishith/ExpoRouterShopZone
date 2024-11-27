import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { useLocalSearchParams } from 'expo-router';
import useFetchCustomHook from '../../../hooks/useFetchCustomHook';
import { ActivityIndicator } from 'react-native';

const BrandItem = () => {
    const { token } = useContext(AuthContext);
    const { brandId } = useLocalSearchParams();
    const { data, loading, error } = useFetchCustomHook()

    const product = [{
        
    }]

    if (loading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <View><Text>{error}</Text></View>
    }
    return (
        <View>
            <Text>BrandItem</Text>
        </View>
    )
}

export default BrandItem

//../SellerAddProduct/${brandId}