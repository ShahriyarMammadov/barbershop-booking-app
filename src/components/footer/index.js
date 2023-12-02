import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  const [currentRoute, setCurrentRoute] = useState("Qaychi.az");

  const navigateToHome = () => {
    navigation.navigate("Qaychi.az");
    setCurrentRoute(navigation?.getCurrentRoute()?.name);
  };

  const navigateToCategories = () => {
    navigation.navigate("Categories");
    setCurrentRoute(navigation?.getCurrentRoute()?.name);
  };

  const navigateToSearch = () => {
    navigation.navigate("Search");
    setCurrentRoute(navigation?.getCurrentRoute()?.name);
  };

  const navigateToMyBooking = () => {
    navigation.navigate("Search");
    setCurrentRoute(navigation?.getCurrentRoute()?.name);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // backgroundColor: "#f0f0f0",
        paddingVertical: 15,
      }}
    >
      <TouchableOpacity
        onPress={navigateToHome}
        style={{ alignItems: "center" }}
      >
        <Image
          source={require("../../../assets/icons/home.png")}
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={
            currentRoute == "Qaychi.az"
              ? {
                  paddingTop: 4,
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#FB9400",
                }
              : { paddingTop: 4, fontWeight: 700, fontSize: 12 }
          }
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={navigateToCategories}
        style={{ alignItems: "center" }}
      >
        <Image
          source={require("../../../assets/icons/explore.png")}
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={
            currentRoute == "Categories"
              ? {
                  paddingTop: 4,
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#FB9400",
                }
              : { paddingTop: 4, fontWeight: 700, fontSize: 12 }
          }
        >
          Explore
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={navigateToMyBooking}
        style={{ alignItems: "center" }}
      >
        <Image
          source={require("../../../assets/icons/booking.png")}
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={
            currentRoute == "Search"
              ? {
                  paddingTop: 4,
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#FB9400",
                }
              : { paddingTop: 4, fontWeight: 700, fontSize: 12 }
          }
        >
          My Booking
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={navigateToSearch}
        style={{ alignItems: "center" }}
      >
        <Image
          source={require("../../../assets/icons/profile.png")}
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={
            currentRoute == "Search"
              ? {
                  paddingTop: 4,
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#FB9400",
                }
              : { paddingTop: 4, fontWeight: 700, fontSize: 12 }
          }
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}
