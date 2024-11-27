import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { UserCircle, History, Split, Download, MoreHorizontal, HomeIcon, AwardIcon, LucideHome, NotebookPenIcon } from 'lucide-react-native';
import useSetTitle from '../../hooks/useSetTitle';
import { useRouter } from 'expo-router';

const sellerDashboardItems = [
    { id: 1, icon: AwardIcon, label: 'Go to Brandpage', route: '../SellerScreen/brands' },
    { id: 2, icon: LucideHome, label: 'Product List', route: '../SellerScreen/products' },
    { id: 3, icon: NotebookPenIcon, label: 'Check Orders', route: '../SellerScreen/orders' },
    { id: 4, icon: UserCircle, label: 'see your graph', route: '../SellerScreen/analytics' },
    { id: 5, icon: History, label: 'Balance & History' },
    { id: 6, icon: Split, label: 'Split Bills' },
    { id: 7, icon: Download, label: 'Receive Money' },
    { id: 8, icon: MoreHorizontal, label: 'All UPI Services' },
];

export default function SellerDashBoard() {
    const router = useRouter()
    useSetTitle("Dashboard");
    return (
        <ScrollView>
            {/* Promotional Banner */}
            <View style={{ padding: 16 }}>
                <View
                    style={{
                        backgroundColor: '#002970',
                        borderRadius: 12,
                        padding: 20,
                        height: 200,
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 28,
                            fontWeight: 'bold',
                            marginBottom: 8,
                        }}
                    >
                        Get a lifetime free credit card*
                    </Text>
                    <Text style={{ color: '#fff', marginBottom: 16 }}>
                        ₹50,000 in deals and vouchers*
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#FFD700',
                            paddingVertical: 12,
                            paddingHorizontal: 24,
                            borderRadius: 24,
                            alignSelf: 'flex-start',
                        }}
                    >
                        <Text style={{ color: '#000', fontWeight: 'bold' }}>
                            Apply Now →
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Money Transfer Section */}
            <View style={{ padding: 16 }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 16,
                    }}
                >
                    MONEY TRANSFER
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        gap: 16,
                    }}
                >
                    {sellerDashboardItems.map((option) => (
                        <TouchableOpacity 
                        onPress={() => router.push(option.route)}
                            key={option.id}
                            style={styles.itemsStyle}
                        >
                            <View
                                style={{
                                    backgroundColor: '#f4511e',
                                    padding: 12,
                                    borderRadius: 8,
                                }}
                            >
                                <option.icon size={24} color="white" />
                            </View>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 12,
                                }}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    itemsStyle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 60,
        borderRadius: 8,
        shadowColor: "#000",

        ...Platform.OS === "web" && {
            flexDirection: "row",
            width: 150,
            gap: 3,

            backgroundColor: "#ff88643c",
        }

    }
});