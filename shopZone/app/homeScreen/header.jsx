import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { BellRing, Mic, Search, MapPin } from "lucide-react-native"; // Added MapPin for location icon
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <View style={{ flexDirection: "row" }}>
          <MapPin size={20} color={"white"} />
          <Text style={styles.locationText}>Mardala, Kadaba, Mangalore</Text>
        </View>

        <View style={styles.iconStyle}>
          <BellRing size={20} color={"white"} />
        </View>
      </View>
      <View style={styles.fakeSearchContainer}>
        <TouchableOpacity
          style={styles.fakeSearchContainerSearch}
          activeOpacity={0.8}
          onPress={() => {
            router.push("/search");
          }}
        >
          <Search size={25} color={"#f4511e"} />
          <Text style={styles.fakeSearchContainerText}>Search</Text>
        </TouchableOpacity>

        <View style={styles.fakeSearchContainerIconStyle}>
          <Mic size={20} color={"white"} />
        </View>
      </View>

      <View style={styles.exploreFoodZone}>
        <Text style={styles.exploreFoodZoneText}>🍔 Explore Food Zone 🍪</Text>
        <TouchableOpacity
          style={styles.exploreButton}
          activeOpacity={0.8}
          onPress={() => {
            console.log("Explore Food Zone pressed");
          }}
        >
          <Text style={styles.exploreButtonText}>Explore Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f4511e",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    paddingBottom: 25,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  locationText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  iconStyle: {
    backgroundColor: "#ffffff56",
    padding: 10,
    borderRadius: 5,
  },
  fakeSearchContainer: {
    width: "100%",
    height: 40,
    marginVertical: 10,
    flexDirection: "row",
  },
  fakeSearchContainerSearch: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    flex: 1,
  },
  fakeSearchContainerText: {
    marginLeft: 10,
    fontSize: 18,
  },
  fakeSearchContainerIconStyle: {
    backgroundColor: "#ffffff56",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  exploreFoodZone: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exploreFoodZoneText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  exploreButton: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  exploreButtonText: {
    color: "#f4511e",
    fontSize: 16,
    fontWeight: "bold",
  },
});
