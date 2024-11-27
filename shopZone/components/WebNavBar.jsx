import { usePathname, useRouter } from "expo-router";
import { Menu, Search, X } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  Platform,
} from "react-native";

const NavBar = ({}) => {
  const router = useRouter();
  const pathname = usePathname()

  const [isModalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();
  const [isLargeScreen, setIsLargeScreen] = useState(width > 600);

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Cart", path: "/cart" },
    { title: "Orders", path: "/orders" },
    { title: "Profile", path: "/profile" },
  ];

  useEffect(() => {
    setIsLargeScreen(width > 600);
  }, [width]);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleNavigation = (path) => {
    router.push(path);
    if (!isLargeScreen) {
      toggleModal();
    }
  };

  const NavItem = ({ title, path }) => {
    const isActive = pathname === path;
    console.log(router)
    return (
      <TouchableOpacity
        onPress={() => handleNavigation(path)}
        style={[
          styles.navItemContainer,
          isActive && styles.activeNavItemContainer,
        ]}
      >
        <Text style={[styles.navItem, isActive && styles.activeNavItem  ]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, Platform.OS === "web" && styles.webHeader]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>ShopZone</Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.fakeSearchContainerSearch}
            activeOpacity={0.8}
            onPress={() => {
              router.push("/search");
            }}
          >
            <Search size={20} color={"#848484"} />
            <Text style={styles.fakeSearchContainerText}>Search</Text>
          </TouchableOpacity>

          {isLargeScreen ? (
            <View style={styles.navLinks}>
              {navItems.map((item, index) => (
                <NavItem key={index} title={item.title} path={item.path} />
              ))}
            </View>
          ) : (
            <TouchableOpacity onPress={toggleModal} style={styles.menuButton}>
              <Menu color="#f4511e" size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Modal for Navigation Links */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <X color="#000" size={24} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              {navItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalNavItemContainer}
                  onPress={() => handleNavigation(item.path)}
                >
                  <Text style={styles.modalNavItem}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    width: "100%",
    position: "sticky",
    top: 0,
  },
  webHeader: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "#fff0e86d", // Semi-transparent background
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)", // For Safari support
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  navItem: {
    color: "black",
    marginHorizontal: 10,
    fontSize: 16,
  },
  menuButton: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffffd4",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#f4511e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "70%",
    width: "100%",
  },
  fakeSearchContainerSearch: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    flex: 1,
    minWidth: 200,
  },
  navItemContainer: {
    paddingVertical: 4,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeNavItemContainer: {
    backgroundColor: "#f4511e",
  },
  activeNavItem: {
    color: "white",
  },
  fakeSearchContainerText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#969696",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
    marginBottom: 8,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalNavItemContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalNavItem: {
    fontSize: 18,
    textAlign: "center",
    color: "#000",
  },
});

export default NavBar;
