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
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import BackButton from "../../components/BackButton/BackButton";
import MapView, { Marker } from "react-native-maps";

export default function SaloonDetail(props) {
  const { navigation, route } = props;
  const { width: viewportWidth } = Dimensions.get("window");
  const item = route.params;
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliceCount, setSliceCount] = useState(250);
  const slider1Ref = useRef();

  console.log(route.getCurrentRoute())

  const categories = [
    {
      id: 1,
      name: "Haqqımızda",
    },
    {
      id: 2,
      name: "Xidmətlər",
    },
    {
      id: 3,
      name: "Paketlər",
    },
    {
      id: 4,
      name: "Qalereya",
    },
    {
      id: 5,
      name: "Rəylər",
    },
  ];

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

  const renderSpecialist = ({ item }) => (
    <TouchableOpacity
      style={{ paddingHorizontal: 12, marginVertical: 15 }}
      onPress={() => {}}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: item.profilePhoto }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
          }}
        />
        <Text style={{ fontWeight: 700, paddingTop: 5 }}>{item.name}</Text>
        <Text style={{ color: "grey" }}>{item.job}</Text>
      </View>
    </TouchableOpacity>
  );

  // CATEGORY
  const [activeClassId, setActiveClassId] = useState(1);

  const activeClassAdd = (id) => {
    setActiveClassId(id);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableHighlight
      style={
        item.id === activeClassId
          ? {
              paddingVertical: 8,
              paddingHorizontal: 15,
              backgroundColor: "#FDA62B",
              borderRadius: 16,
              marginVertical: 10,
              borderColor: "#FDA62B",
              borderStyle: "solid",
              borderWidth: 1,
              marginHorizontal: 10,
            }
          : {
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 16,
              marginVertical: 10,
              borderColor: "#FDA62B",
              borderStyle: "solid",
              borderWidth: 1,
              marginHorizontal: 10,
            }
      }
      onPress={() => {
        activeClassAdd(item.id);
      }}
    >
      <Text
        style={
          item.id === activeClassId
            ? {
                fontWeight: 700,
                color: "white",
              }
            : {
                color: "#FDA62B",
                fontWeight: 700,
              }
        }
      >
        {item.name}
      </Text>
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
        // onSnapToItem={(index) => setActiveSlide(index)}
      />
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
          }}
        >
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 10, paddingVertical: 8 }}
      >
        {item.socialMediaURL.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
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
                        onPress={() =>
                          Linking.openURL(
                            `google.navigation:q=${item?.location}`
                          )
                        }
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

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={item?.specialist}
        renderItem={renderSpecialist}
        keyExtractor={(item) => item.id}
      />

      <FlatList
        data={categories}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategoryItem}
        horizontal
      />

      {/* TAB */}
      {activeClassId === 1 ? (
        <View style={{ paddingVertical: 10 }}>
          <Text
            style={{
              textAlign: "justify",
              paddingHorizontal: 10,
            }}
          >
            {item?.about?.slice(0, sliceCount)}
            {item?.about?.length > sliceCount && (
              <Text
                style={{ color: "#FB9400", fontWeight: 700 }}
                onPress={() => {
                  setSliceCount((prev) => prev + 1000);
                }}
              >
                . Read more...
              </Text>
            )}
          </Text>
          {/* Working Hours */}
          <Text
            style={{
              paddingVertical: 20,
              fontWeight: 700,
              fontSize: 18,
              paddingHorizontal: 10,
            }}
          >
            İş Saatları
          </Text>

          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={{
                color: "grey",
              }}
            >
              Həftə İçi {"        "}:{"     "}
              <Text style={{ fontWeight: 700 }}>
                {item?.workingHours?.hefteIci}
              </Text>
            </Text>
            <Text style={{ color: "grey" }}>
              Həftə Sonu {"   "}:{"     "}
              <Text style={{ fontWeight: 700 }}>
                {item?.workingHours?.SenbeBazar}
              </Text>
            </Text>
          </View>

          {/* Contact US */}
          <Text
            style={{
              paddingVertical: 20,
              fontWeight: 700,
              fontSize: 18,
              paddingHorizontal: 10,
            }}
          >
            Əlaqə
          </Text>

          <Text
            onPress={() => {
              Linking.openURL(`tel:${item?.phoneNumber}`);
            }}
            style={{
              color: "#FB9400",
              width: 200,
              fontWeight: 700,
              fontSize: 18,
              paddingHorizontal: 10,
            }}
          >
            {item?.phoneNumber?.toString()}
          </Text>

          {/* OUR ADDRESS */}
          <Text
            style={{
              paddingVertical: 20,
              fontWeight: 700,
              fontSize: 18,
              paddingHorizontal: 10,
            }}
          >
            Ünvan
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
            }}
          >
            <Image
              source={require("../../../assets/icons/location.png")}
              style={{ width: 25, height: 25 }}
            />
            <Text
              style={{ color: "grey" }}
              onPress={() =>
                Linking.openURL(`google.navigation:q=${item?.location}`)
              }
            >
              {item?.location}
            </Text>
          </View>

          <View style={{ paddingTop: 20 }}>
            <MapView
              style={{ width: "100%", height: 350 }}
              initialRegion={{
                latitude: item?.lat,
                longitude: item?.lon,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              mapType="satellite"
            >
              <Marker
                coordinate={{ latitude: item?.lat, longitude: item?.lon }}
                title={item?.name}
              />
            </MapView>
          </View>
        </View>
      ) : activeClassId === 2 ? (
        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {item?.services?.map((e, i) => {
            return (
              <View>
                <Image
                  source={{ uri: e?.imageURL }}
                  style={{ width: 40, height: 40 }}
                />
                <Text>{e.service}</Text>
              </View>
            );
          })}
        </View>
      ) : activeClassId === 3 ? (
        <Text>{activeClassId}</Text>
      ) : activeClassId === 4 ? (
        <Text>{activeClassId}</Text>
      ) : activeClassId === 5 ? (
        <Text>{activeClassId}</Text>
      ) : (
        <Text>{activeClassId}</Text>
      )}
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

{
  /* <Pagination
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
      /> */
}
