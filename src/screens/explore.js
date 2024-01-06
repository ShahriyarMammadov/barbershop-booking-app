import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  Linking,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import LinearGradient from "react-native-linear-gradient";
import { Modalize } from "react-native-modalize";

export default function ExploreScreen(props) {
  const navigation = props;

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [location, setLocation] = useState({
    coords: {
      latitude: 40.4144301,
      longitude: 50.11,
    },
  });

  const locations = [
    {
      id: 1,
      title: "Şəhriyar BarberShop",
      coordinates: { latitude: 40.4144301, longitude: 50.11 },
    },
    {
      id: 2,
      title: "Ramil BeautySaloon",
      coordinates: { latitude: 40.4144301, longitude: 50.117 },
    },
  ];

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Ərazi Məlumatları",
          "Zəhmət olmasa tətbiqin cihazın konum bilgilərinə daxil olmasına icazə verin",
          [
            {
              text: "Cancel",
              onPress: () => {
                console.log("cancel");
              },
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, [location]);

  console.log(location);

  const [isModalVisible, setModalVisible] = React.useState(false);
  const modalizeRef = useRef(null);

  const onOpen = () => {
    setModalVisible(true);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const getData = () => [
    { id: "1", heading: "Item 1" },
    { id: "2", heading: "Item 2" },
    { id: "3", heading: "Item 3" },
  ];

  const onMapPress = () => {
    modalizeRef.current?.open();
  };

  const renderItem = ({ item }) => (
    <View
      style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
    >
      <Text>{item.heading}</Text>
    </View>
  );

  return (
    <View>
      {locations ? (
        <>
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            mapType="satellite"
            showsUserLocation={true}
          >
            {locations.map((location) => (
              <Marker
                key={location?.id}
                coordinate={location?.coordinates}
                title={location?.title}
                // onPress={() => handleMarkerPress(location)}
                onPress={onMapPress}
              >
                <View style={{ padding: 5, alignItems: "center" }}>
                  <Image
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxY01pBUoDkZSG250Kvs6OvUfAnnv3m5lDlw&usqp=CAU",
                    }}
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                  />
                  <Text
                    style={{
                      fontWeight: 700,
                      textAlign: "center",
                      backgroundColor: "grey",
                      color: "white",
                      padding: 5,
                      paddingHorizontal: 10,
                      fontSize: 12,
                    }}
                  >
                    {location?.title}
                  </Text>
                </View>
              </Marker>
            ))}
          </MapView>

          <Modalize
            ref={modalizeRef}
            // modalHeight={height / 2}
            snapPoint={height / 2} // Snapping'in gerçekleşeceği yükseklik
            modalHeight={height - 200}
            flatListProps={{
              data: getData(),
              renderItem: renderItem,
              keyExtractor: (item) => item.heading,
              showsVerticalScrollIndicator: false,
            }}
          />
        </>
      ) : (
        <Text style={{ textAlign: "center" }}>Xəritə Yüklənir...</Text>
      )}
    </View>
  );
}

{
  /* <Marker
  key={location.id}
  coordinate={location.coordinates}
  title={location.title}
>
  <View style={{ backgroundColor: "#FB9400", padding: 5 }}>
    <Image
      source={{
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxY01pBUoDkZSG250Kvs6OvUfAnnv3m5lDlw&usqp=CAU",
      }}
      style={{ width: 30, height: 30 }}
    />
    <Callout>
      <View>
        <Text>{location.title}</Text>
      </View>
    </Callout>
  </View>
</Marker>; */
}
