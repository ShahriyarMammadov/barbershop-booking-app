import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ImageBackground, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import axios from "axios";

export default function TodaysSpecialCarousel() {
  const [reclams, setReclams] = useState({});

  const width = Dimensions.get("window").width;
  const carouselRef = useRef(null);

  useEffect(() => {
    const getReclams = async () => {
      try {
        const { data } = await axios.get(
          "https://qaychi.az/api/Reclams/GetAll"
        );

        setReclams(data);
      } catch (error) {
        console.log(error);
      }
    };

    getReclams();
  }, []);

  const renderImage = ({ item }) => {
    return (
      <ImageBackground
        source={{
          uri: item?.backgrooundImage,
        }}
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
              {item?.discountPercent ? (
                <Text style={{ paddingVertical: 10, color: "white" }}>
                  {item?.discountPercent} % OFF
                </Text>
              ) : null}
              <Text style={{ fontWeight: 700, fontSize: 25, color: "white" }}>
                {item?.title2}
              </Text>
            </View>
            {item?.discountPercent ? (
              <Text style={{ fontWeight: 700, fontSize: 45, color: "white" }}>
                {item?.discountPercent}%
              </Text>
            ) : null}
          </View>

          <Text style={{ fontSize: 14, paddingTop: 10, color: "white" }}>
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
        data={reclams}
        renderItem={renderImage}
        sliderWidth={width - 20}
        itemWidth={width}
        keyExtractor={(item) => item.id}
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
