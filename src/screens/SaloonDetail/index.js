import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Linking,
  Share,
  Pressable,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import BackButton from "../../components/BackButton/BackButton";
import { Link } from "@react-navigation/native";
import SpecialistCardComponent from "../../components/SpecialistCard";

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

  // SHARE
  const handleShare = async () => {
    try {
      const shareOptions = {
        message: `Check out ${item.name} on our app! ${item.socialMediaURL[0]?.instagram}`,
      };

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Success: ${result.activityType}`);
        } else {
          console.log("Error");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Cancel");
      }
    } catch (error) {
      console.error("Share Error:", error.message);
    }
  };

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
        // onSnapToItem={(index) => setActiveSlide(index)}
      />
      {/* <Pagination
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
      /> */}
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: 700, fontSize: 35, paddingVertical: 15 }}>
          {item.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              source={require("../../../assets/icons/location.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text>{item?.location}</Text>
          </View>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#FB9400",
              borderRadius: 10,
              fontSize: 14,
            }}
          >
            <Text>Book Now</Text>
          </Pressable>
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 10, paddingVertical: 8 }}
      >
        {item.socialMediaURL.map((e, i) => {
          return (
            <TouchableOpacity
              style={{
                marginBottom: 20,
                padding: 5,
                borderRadius: 5,
              }}
              onPress={() => Linking.openURL(Object.values(e)[0])}
            >
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    padding: 18,
                    backgroundColor: "#FEF2E0",
                    borderRadius: 50,
                  }}
                >
                  {Object.keys(e).map((element) => {
                    return element === "Instagram" ? (
                      <Image
                        source={require("../../../assets/icons/instagram.png")}
                        style={{
                          width: 30,
                          height: 30,
                        }}
                      />
                    ) : element === "Website" ? (
                      <Image
                        source={require("../../../assets/icons/website.png")}
                        style={{
                          width: 30,
                          height: 30,
                        }}
                      />
                    ) : element === "Call" ? (
                      <Image
                        source={require("../../../assets/icons/call.png")}
                        style={{
                          width: 30,
                          height: 30,
                        }}
                      />
                    ) : element === "Location" ? (
                      <Image
                        source={require("../../../assets/icons/locationdot.png")}
                        style={{
                          width: 30,
                          height: 30,
                        }}
                      />
                    ) : (
                      <Image
                        source={require("../../../assets/icons/call.png")}
                        style={{
                          width: 35,
                          height: 35,
                        }}
                      />
                    );
                  })}
                </View>
                <Text
                  style={{
                    color: "black",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {Object.keys(e).map((e) => {
                    return e;
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={{
            marginBottom: 20,
            padding: 5,
            borderRadius: 5,
            marginRight: 20,
          }}
          onPress={handleShare}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                padding: 18,
                backgroundColor: "#FEF2E0",
                borderRadius: 50,
              }}
            >
              <Image
                source={require("../../../assets/icons/share.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            <Text
              style={{
                color: "black",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Share
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* OUR SPECIALIST */}
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: 700, fontSize: 18 }}>Our Specialist</Text>
        <Text
          style={{
            color: "#FB9400",
            fontWeight: 700,
            fontSize: 18,
          }}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          See All
        </Text>
      </View>

      <SpecialistCardComponent data={item} />
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
