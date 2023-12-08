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
      id: 1,
      dataHeader: "Payment Successfully",
      text: "You have made a salon payment",
    },
    {
      date: "06.12.2023",
      dataHeader: "Account Setup Successfull",
      id: 2,
      text: "You have made a salon payment",
    },
    {
      date: "01.12.2023",
      dataHeader: "New Services Available",
      id: 3,
      text: "You have made a salon payment",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      underlayColor="rgba(73,182,77,0.9)"
      //   onPress={() => onPressCategory(item)}
      //   style={{ marginTop: 15 }}
    >
      <View>
        <View style={{ marginVertical: 20 }}>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 20,
              paddingVertical: 10,
            }}
          >
            {item.date}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Image
            source={
              item.dataHeader === "Payment Successfully"
                ? require("../../../assets/icons/paymentNotification.png")
                : item.dataHeader === "New Services Available"
                ? require("../../../assets/icons/update.png")
                : item.dataHeader === "Account Setup Successfull"
                ? require("../../../assets/icons/accountCreate.png")
                : require("../../../assets/icons/paymentNotification.png")
            }
            style={{
              width: 70,
              height: 70,
            }}
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
    <View style={{ paddingHorizontal: 10 }}>
      <FlatList
        data={notificationArr}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
