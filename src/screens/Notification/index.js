import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function NotificationScreen() {
  const notificationArr = [
    {
      date: "08.12.2023",
      dataHeader: "Payment Succesfully",
      text: "You have made a salon payment",
    },
    {
      date: "06.12.2023",
      dataHeader: "Payment Succesfully",
      text: "You have made a salon payment",
    },
    {
      date: "01.12.2023",
      dataHeader: "New Service Available",
      text: "You have made a salon payment",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      underlayColor="rgba(73,182,77,0.9)"
      //   onPress={() => onPressCategory(item)}
    >
      <View style={{}}>
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontWeight: 700, fontSize: 20 }}>{item.date}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
          <Image
            source={require("../../../assets/icons/paymentNotification.png")}
            style={{ width: 60, height: 60 }}
          />
          <View>
            <Text style={{ fontWeight: 700, fontSize: 16 }}>
              {item.dataHeader}
            </Text>
            <Text style={{ color: "grey", paddingTop: 10 }}>{item.text}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <FlatList
        data={notificationArr}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </ScrollView>
  );
}
