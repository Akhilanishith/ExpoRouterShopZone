import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions, Platform } from "react-native";

const WebCarouselComponent = () => {
  const sliderImages = [
    {
      id: 1,
      image: "https://mobirise.com/extensions/commercem4/assets/images/galleries-1-1200x800.png",
      title: "Special Offer Up to 40%",
    },
    {
      id: 2,
      image: "https://png.pngtree.com/thumb_back/fw800/background/20221218/pngtree-technology-and-multimedia-online-shopping-concept-sale-tv-buy-photo-image_43548278.jpg",
      title: "Limited Time Deals",
    },
    {
      id: 3,
      image: "https://cdn.prod.website-files.com/605826c62e8de87de744596e/62b5a9572dab880f81c5d178_ajVzMkY7zNN-cU8hLJlTXR93WXkC09AI_0Dm-VBCfWe-kbHdRAAATBpSlNajuRsW7e0jHYCOVjdcHY1Sf-3X4tAI22KAFbbu31rgYGEmgCSV_WUrLFWhWl09ddXm7EhIITjKG0OggdxALfJeGQ.jpeg",
      title: "Flash Sale Starts Now!",
    },
    {
      id: 4,
      image: "https://cdn.prod.website-files.com/605826c62e8de87de744596e/62b5a9578546b75e241a96ec_DsjnCi_UAsvz3qgtq5Q51LjJCzPEO7efYjpxgRD2IZa2ZGudiJQ7Wo3opz192OlHY4-S2ud9hgi72E6Z89Kzi_lQR-nYHH0M9hUuEsvZsoH1Va4L3EWRBzqwHN0IhsVcXTxGrra6Enm8h9_A6g.jpeg",
      title: "Exclusive Discounts Available",
    },
    {
      id: 5,
      image: "https://helloyubo.com/wp-content/uploads/2022/10/creative_fashion-2-1024x372.jpg",
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
          console.log("onScroll Index:", currentIndex);
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
  carouselContainer: { position: "relative", marginTop: 20, marginBottom:20,},
  carouselItem: { position: "relative" },
  carouselImage: { height: 200, width: "100%", resizeMode: "cover", borderRadius: 20 },
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
