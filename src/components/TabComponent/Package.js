import React from "react";
import { Text, View } from "react-native";

export default function PackageTab({ item }) {
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
      {item?.map((e, i) => {
        return (
          <View
            key={i}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontWeight: 700 }}>{e?.name}</Text>
            <Text style={{ color: "grey" }}>{e?.price} ₼</Text>
          </View>
        );
      })}
    </View>
  );
}
