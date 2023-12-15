import React, { useEffect, useState } from "react";
import { Button, Text, View, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function ExploreScreen(props) {
  const navigation = props;

  const [location, setLocation] = useState(null);

  const locations = [
    {
      id: 1,
      title: "Yer 1",
      coordinates: { latitude: 40.4144301, longitude: 50.11 },
    },
    {
      id: 2,
      title: "Yer 2",
      coordinates: { latitude: 40.4144301, longitude: 50.117 },
    },
  ];

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Alert Title", "My Alert Msg", [
          {
            text: "Ask me later",
            onPress: () => console.log("Ask me later pressed"),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View>
      <View>
        {location ? (
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            mapType="hybrid"
            showsUserLocation={true}
          >
            {locations.map((location) => (
              <Marker
                key={location.id}
                coordinate={location.coordinates}
                title={location.title}
              />
            ))}
          </MapView>
        ) : (
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Loading...
          </Text>
        )}
      </View>
    </View>
  );
}

{/* <Marker
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
</Marker>; */}
