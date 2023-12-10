import React, { useState } from "react";
import { Image, Linking, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function AboutTab({ item }) {
  const [sliceCount, setSliceCount] = useState(250);

  return (
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
  );
}
