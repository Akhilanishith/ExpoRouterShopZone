import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FoodZoneExplorer  = () => {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  exploreFoodZone: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4511e',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exploreFoodZoneText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 20,
  },
  exploreButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FoodZoneExplorer;

