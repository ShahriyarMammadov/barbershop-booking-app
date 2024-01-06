import React from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

export default function NoDataComponent(props) {
  const height = Dimensions.get("window").height;

  const { name, description, navigation } = props;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: height - 120,
      }}
    >
      <Text style={{ textAlign: "center" }}>{name}</Text>
      <Text style={{ marginTop: 20, textAlign: "center" }}>{description}</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#F57620",
          padding: 10,
          paddingHorizontal: 20,
          marginTop: 20,
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate("Qaychi.az");
        }}
      >
        <Text style={{ color: "white" }}>Məkanları Göstər</Text>
      </TouchableOpacity>
    </View>
  );
}
