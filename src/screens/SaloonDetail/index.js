import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import BackButton from "../../components/BackButton/BackButton";
import { Link } from "@react-navigation/native";

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
      headerTransparent: true,
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

  useEffect(() => {
    console.log("salam");
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View
        style={{
          justifyContent: "center",
          width: viewportWidth,
          height: 500,
          backgroundColor: "grey",
        }}
      >
        <Image source={{ uri: item }} style={{ width: "100%", height: 500 }} />
      </View>
    </TouchableHighlight>
  );

  return (
    <ScrollView style={{ minHeight: 250 }} showsVerticalScrollIndicator={false}>
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
          marginTop: 450,
        }}
        dotColor="red"
        dotStyle={{ width: 8, height: 8, borderRadius: 4, marginHorizontal: 0 }}
        inactiveDotColor="white"
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={slider1Ref.current}
        tappableDots={!!slider1Ref.current}
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: 700, fontSize: 35, paddingVertical: 15 }}>
          {item.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={require("../../../assets/icons/location.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{item?.location}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingVertical: 10,
          }}
        >
          <Image
            source={require("../../../assets/icons/star.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{item?.starCount}</Text>
          <Text>({item?.reviews} reviews)</Text>
        </View>
      </View>
      {/* {item?.socialMediaURL.map((e) => {
        console.log(Object.keys(e));
        return (
          <Link href={e?.}>
            <Text>{e?.instagram}</Text>
          </Link>
        );
      })} */}
    </ScrollView>
  );
}

// refreshControl={
//   <RefreshControl
//     refreshing={refreshing}
//     onRefresh={onRefresh}
//     tintColor="#3F51B5"
//     title="Refreshing..."
//   />
// }
