import React from "react";
import {
  Dimensions,
  Image,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Servicestab({ item }) {
  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
      {item?.services?.map((e, i) => {
        return (
          <View
            key={i}
            style={{
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Image
              source={{ uri: e?.imageURL }}
              style={{ width: 100, height: 100, borderRadius: 20 }}
            />
            <View
              style={{
                width: Dimensions.get("window").width - 140,
              }}
            >
              <Text style={{ fontWeight: 700, fontSize: 16, paddingBottom: 5 }}>
                {e.service}
              </Text>
              <Text>{e.text}</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{ fontWeight: 700, color: "#FB9400", fontSize: 16 }}
                >
                  {e?.price} ₼
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FB9400",
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={{ fontWeight: 700 }}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
