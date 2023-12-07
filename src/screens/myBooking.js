import React, { useEffect } from "react";
import { Image, ScrollView } from "react-native";
import SaloonCardComponent from "../components/SallonCard";

export default function MyBookingScreen(props) {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Image
          source={require("../../assets/icon.png")}
          style={{ width: 50, height: 50 }}
        />
      ),
      headerRight: () => (
        <Image
          source={require("../../assets/icons/notification.png")}
          style={{ width: 25, height: 25, marginRight: 30 }}
        />
      ),
      title: "My Bookmark",
    });
  }, []);

  return (
    <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
      <SaloonCardComponent />
      <SaloonCardComponent />
    </ScrollView>
  );
}
