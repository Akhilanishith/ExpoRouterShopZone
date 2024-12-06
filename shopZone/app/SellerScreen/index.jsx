import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { AwardIcon, NotebookPenIcon, ScrollTextIcon, ChartNoAxesCombinedIcon, ShoppingCartIcon, UsersIcon, ShieldCheckIcon, MessageCircle, FileTextIcon, CarTaxiFrontIcon, TagIcon, GlobeIcon } from 'lucide-react-native';
import useSetTitle from '../../hooks/useSetTitle';
import { useRouter } from 'expo-router';

const sellerDashboardItems = [
    { id: 1, icon: AwardIcon, label: 'Go to Brandpage', route: '../SellerScreen/brands' },
    { id: 2, icon: ScrollTextIcon, label: 'Product List', route: '../SellerScreen/products' },
    { id: 3, icon: NotebookPenIcon, label: 'Check Orders', route: '../SellerScreen/orders' },
    { id: 4, icon: ChartNoAxesCombinedIcon, label: 'see your graph', route: '../SellerScreen/analytics' },

    // { id: 5, icon: History, label: 'Balance & History' },
    // { id: 6, icon: Split, label: 'Split Bills' },
    // { id: 7, icon: Download, label: 'Receive Money' },
    // { id: 8, icon: MoreHorizontal, label: 'All UPI Services' },
];

const menuItems = [
    {
        icon: AwardIcon,
        title: 'Manage Brand',
        subtitle: 'Track your brand performance',
        route: '../SellerScreen/brands',
    },
    {
        icon: ScrollTextIcon,
        title: 'Product List',
        subtitle: 'Add or edit your products',
        route: '../SellerScreen/products',
    },
    {
        icon: NotebookPenIcon,
        title: 'Check Orders',
        subtitle: 'View and process orders',
        route: '../SellerScreen/orders',
    },
    {
        icon: ChartNoAxesCombinedIcon,
        title: 'Analytics',
        subtitle: 'Monitor sales and trends',
        route: '../SellerScreen/analytics',
    },
    {
        icon: ShoppingCartIcon,
        title: 'Inventory Management',
        subtitle: 'Track stock and restock alerts',
    },
    // {
    //     icon: PaymentIcon,
    //     title: 'Payments & Payouts',
    //     subtitle: 'View transactions and payouts',
    // },
    {
        icon: UsersIcon,
        title: 'Customer Service',
        subtitle: 'Manage customer support tickets',
    },
    {
        icon: ShieldCheckIcon,
        title: 'Security Settings',
        subtitle: 'Secure your account and data',
    },
    // {
    //     icon: ReceiptRefundIcon,
    //     title: 'Returns & Refunds',
    //     subtitle: 'Handle returns and customer refunds',
    // },
    // {
    //     icon: DiscountIcon,
    //     title: 'Promotions & Discounts',
    //     subtitle: 'Create sales and special offers',
    // },
    // {
    //     icon: DeliveryTruckIcon,
    //     title: 'Shipping & Fulfillment',
    //     subtitle: 'Manage shipping options and orders',
    // },
    // {
    //     icon: EmailIcon,
    //     title: 'Email Marketing',
    //     subtitle: 'Create and send promotional emails',
    // },
    {
        icon: MessageCircle,
        title: 'Live Chat',
        subtitle: 'Communicate with customers instantly',
    },
    {
        icon: FileTextIcon,
        title: 'Reports & Insights',
        subtitle: 'Download detailed sales reports',
    },
    {
        icon: CarTaxiFrontIcon,
        title: 'Abandoned Carts',
        subtitle: 'Review and recover abandoned carts',
    },
    {
        icon: TagIcon,
        title: 'Product Categories',
        subtitle: 'Organize your products by category',
    },
    {
        icon: GlobeIcon,
        title: 'Marketplaces',
        subtitle: 'Manage multi-channel listings',
    },

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
                        DO You Want TO Promote your product*
                    </Text>
                    <Text style={{ color: '#fff', marginBottom: 16 }}>
                         deals with Us*
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
            <View style={styles.grid}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.card} onPress={()=> router.push(item.route)}>
                        <item.icon size={24} color="#000" style={styles.icon} />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    </TouchableOpacity>
                ))}
            </View>


        </ScrollView>
    );
}


const styles = StyleSheet.create({

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 180,
            maxWidth: 250,
            

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
});