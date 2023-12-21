import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { specialOffers } from "../data/dataArrays";

export default function TodaysSpecialCarousel() {
  const width = Dimensions.get("window").width;
  const carouselRef = useRef(null);

  const renderImage = ({ item }) => {
    return (
      <ImageBackground
        source={{ uri: item?.backGroundImage }}
        style={{
          width: width - 20,
          height: 180,
        }}
        imageStyle={{ borderRadius: 20 }}
        resizeMode="cover"
      >
        <View
          style={{
            backgroundColor: "#000000a1",
            padding: 25,
            borderRadius: 20,
            height: 180,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              {item?.discountPercentage ? (
                <Text style={{ paddingVertical: 10, color: "white" }}>
                  {item?.discountPercentage} % OFF
                </Text>
              ) : null}
              <Text style={{ fontWeight: 700, fontSize: 25, color: "white" }}>
                {item?.name}
              </Text>
            </View>
            {item?.discountPercentage ? (
              <Text style={{ fontWeight: 700, fontSize: 45, color: "white" }}>
                {item?.discountPercentage}%
              </Text>
            ) : null}
          </View>

          <Text style={{ fontSize: 16, paddingTop: 10, color: "white" }}>
            {item?.description}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    <View style={{ height: 180 }}>
      <Carousel
        ref={carouselRef}
        data={specialOffers}
        renderItem={renderImage}
        sliderWidth={width - 20}
        itemWidth={width}
        sliderHeight={180}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        firstItem={0}
        // loop={true}
        autoplay={false}
        // autoplayDelay={500}
        // autoplayInterval={3000}
        // onSnapToItem={(index) => setActiveSlide(index)}
      />
    </View>
  );
}
