import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import BackButton from "../../components/BackButton/BackButton";

export default function SaloonDetail(props) {
  const { navigation, route } = props;
  const { width: viewportWidth } = Dimensions.get("window");
  const item = route.params;

  const [activeSlide, setActiveSlide] = useState(0);
  const slider1Ref = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        <Image
          source={require("../../../assets/icons/bookmark.png")}
          style={{ width: 25, height: 25, marginRight: 30 }}
        />
      ),
      title: item?.name,
      // headerStatusBarOptions: {
      //   backgroundColor: "red",
      // },
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View
        style={{
          justifyContent: "center",
          width: viewportWidth,
          height: 400,
          backgroundColor: "grey",
        }}
      >
        <Image source={{ uri: item }} style={{ width: "100%", height: 400 }} />
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={{ minHeight: 250 }}>
      <Carousel
        ref={slider1Ref}
        data={item.photosArray}
        renderItem={renderImage}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        firstItem={0}
        loop={true}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={3000}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={item.photosArray.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          flex: 1,
          position: "absolute",
          alignSelf: "center",
          paddingVertical: 8,
          marginTop: 365,
        }}
        dotColor="red"
        dotStyle={{ width: 8, height: 8, borderRadius: 4, marginHorizontal: 0 }}
        inactiveDotColor="white"
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={slider1Ref.current}
        tappableDots={!!slider1Ref.current}
      />
      <Text>{item.name}</Text>
      <Text>{item.location}</Text>
    </View>
  );
}
