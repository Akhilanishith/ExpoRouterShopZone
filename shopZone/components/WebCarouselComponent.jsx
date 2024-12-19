import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions, Platform } from "react-native";

const WebCarouselComponent = () => {
  const sliderImages = [
    {
      id: 1,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/1316eb53d6f52c71.jpg",
      title: "Special Offer Up to 40%",
    },
    {
      id: 2,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/d09a5eb3fc5c940e.jpeg",
      title: "Limited Time Deals",
    },
    {
      id: 3,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/e6dc4b4c88912592.jpg",
      title: "Flash Sale Starts Now!",
    },
    {
      id: 4,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/4478f6325d434be9.jpeg",
      title: "Exclusive Discounts Available",
    },
    {
      id: 5,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/e6dc4b4c88912592.jpg",
      title: "Shop the Latest Trends",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;

  // Auto-slide logic for the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % sliderImages.length;
        const offset = nextIndex * windowWidth;

        flatListRef.current?.scrollToOffset({ offset, animated: true });

        return nextIndex;
      });
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeIndex, sliderImages.length]); // Add activeIndex to dependencies

  const onScrollToIndexFailed = (error) => {
    console.warn("Scroll to index failed: ", error);
    if (error.highestMeasuredFrameIndex >= 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: Math.min(error.highestMeasuredFrameIndex, error.index),
        animated: true,
      });
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  });

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={sliderImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.carouselItem, { width: windowWidth }]}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} />
            <Text style={styles.carouselText}>{item.title}</Text>
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        onScrollToIndexFailed={onScrollToIndexFailed}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const offset = event.nativeEvent.contentOffset.x;
          const currentIndex = Math.round(offset / windowWidth);
          setActiveIndex(currentIndex);
          //console.log()("onScroll Index:", currentIndex);
        }}
      />
      <View style={styles.pagination}>
        {sliderImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: { position: "relative", marginBottom: 20, },
  carouselItem: { position: "relative" },
  carouselImage: { height: 200, width: "100%", resizeMode: "cover", backgroundColor: "red" },
  carouselText: {
    position: "absolute",
    bottom: 16,
    left: 16,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 5,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: { backgroundColor: "#fff" },
});

export default WebCarouselComponent;
