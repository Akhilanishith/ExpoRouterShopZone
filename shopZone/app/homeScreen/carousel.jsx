import * as React from "react";
import { Dimensions, Image, View, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const imageData = [
  {
    id: 1,
    uri: "https://mobirise.com/extensions/commercem4/assets/images/galleries-1-1200x800.png",
  },
  {
    id: 2,
    uri: "https://png.pngtree.com/thumb_back/fw800/background/20221218/pngtree-technology-and-multimedia-online-shopping-concept-sale-tv-buy-photo-image_43548278.jpg",
  },
  {
    id: 3,
    uri: "https://cdn.prod.website-files.com/605826c62e8de87de744596e/62b5a9572dab880f81c5d178_ajVzMkY7zNN-cU8hLJlTXR93WXkC09AI_0Dm-VBCfWe-kbHdRAAATBpSlNajuRsW7e0jHYCOVjdcHY1Sf-3X4tAI22KAFbbu31rgYGEmgCSV_WUrLFWhWl09ddXm7EhIITjKG0OggdxALfJeGQ.jpeg",
  },
  {
    id: 4,
    uri: "https://cdn.prod.website-files.com/605826c62e8de87de744596e/62b5a9578546b75e241a96ec_DsjnCi_UAsvz3qgtq5Q51LjJCzPEO7efYjpxgRD2IZa2ZGudiJQ7Wo3opz192OlHY4-S2ud9hgi72E6Z89Kzi_lQR-nYHH0M9hUuEsvZsoH1Va4L3EWRBzqwHN0IhsVcXTxGrra6Enm8h9_A6g.jpeg",
  },
  {
    id: 5,
    uri: "https://helloyubo.com/wp-content/uploads/2022/10/creative_fashion-2-1024x372.jpg",
  },
];

function CarouselComponent() {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width / 1.7}
        autoPlay={true}
        data={imageData}
        scrollAnimationDuration={2000}
        renderItem={({ index }) => (
          <View style={styles.carouselItem}>
            <Image
              source={{ uri: imageData[index].uri }}
              style={styles.carouselImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
});

export default CarouselComponent;
