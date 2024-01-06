import React, { useEffect } from "react";
import { Image, ScrollView } from "react-native";
import SaloonCardComponent from "../components/SallonCard";
import NoDataComponent from "../components/noData";

export default function MyBookingScreen(props) {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Image
          source={require("../../assets/icon.png")}
          style={{ width: 40, height: 40, marginLeft: 10 }}
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
      <NoDataComponent
        name="Heç Bir Məlumat Yoxdur"
        description="Elə İndi Məkanlara Baxın və İstək Siyahısına Əlavə Edin."
        navigation={navigation}
      />

      {/* <SaloonCardComponent />
      <SaloonCardComponent /> */}
    </ScrollView>
  );
}
