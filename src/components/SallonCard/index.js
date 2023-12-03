import React from "react";
import { dataCategories } from "../../data/dataArrays";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function SaloonCardComponent({ navigation }) {
  return dataCategories.map((e, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={{
          flexDirection: "row",
          gap: 20,
          justifyContent: "space-between",
          marginVertical: 15,
          marginRight: 20,
        }}
        onPress={() => {
          navigation.navigate("Detail", e);
        }}
      >
        <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
          <View>
            <Image
              source={{ uri: e?.photo_url }}
              style={{ width: 80, height: 80, borderRadius: 10 }}
            />
          </View>
          <View>
            <Text style={{ fontWeight: 700, fontSize: 16, paddingBottom: 8 }}>
              {e?.name}
            </Text>
            <Text style={{ color: "grey", paddingBottom: 10 }}>
              {e?.location}
            </Text>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <View style={{ flexDirection: "row", gap: 3 }}>
                <Image
                  source={require("../../../assets/icons/location.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text>{e.locationCount}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/icons/star.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{}}>{e?.starCount}</Text>
              </View>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            console.log("salam");
          }}
        >
          <Image
            source={
              e?.wishlist
                ? require("../../../assets/icons/activeBookmark.png")
                : require("../../../assets/icons/bookmark.png")
            }
            style={{ width: 25, height: 25 }}
          />
        </Pressable>
      </TouchableOpacity>
    );
  });
}
