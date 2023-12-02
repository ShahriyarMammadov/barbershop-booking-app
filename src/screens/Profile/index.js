import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import { userData } from "../../data/dataArrays";
import { getLocales } from "expo-localization";

export default function ProfileScreen(props) {
  const { navigation } = props;
  const width = Dimensions.get("window").width;
  const [refreshing, setRefreshing] = useState(false);
  const deviceLanguage = getLocales()[0].languageCode;

  useEffect(() => {
    navigation.setOptions({
      //   headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        <Image
          source={require("../../../assets/icons/notification.png")}
          style={{ width: 30, height: 30, marginRight: 30 }}
        />
      ),
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const settings = [
    {
      id: 1,
      name: "Edit Profile",
      iconURL: require("../../../assets/icons/profile.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 2,
      name: "Notification",
      iconURL: require("../../../assets/icons/notification.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 3,
      name: "Payment",
      iconURL: require("../../../assets/icons/payment.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 4,
      name: "Security ",
      iconURL: require("../../../assets/icons/security.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 5,
      name: "Language",
      value: deviceLanguage,
      iconURL: require("../../../assets/icons/language.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 6,
      name: "Privacy Policy",
      iconURL: require("../../../assets/icons/privacypolicy.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 7,
      name: "Invite Friends",
      iconURL: require("../../../assets/icons/invitefriends.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 8,
      name: "Logout",
      iconURL: require("../../../assets/icons/logout.png"),
    },
  ];

  const renderSettingsItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
      }}
      // onPress={() => {
      //   categoryChange(item.name);
      // }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <Image source={item.iconURL} style={styles.iconImage} />
        <Text
          style={
            item.name === "Logout"
              ? { fontWeight: 700, fontSize: 16, color: "red" }
              : { fontWeight: 700, fontSize: 16 }
          }
        >
          {item?.name}
        </Text>
      </View>
      {!item?.value ? (
        <Image source={item?.rightIcon} style={{ width: 15, height: 15 }} />
      ) : (
        <Text
          style={{ fontSize: 16, fontWeight: 700, textTransform: "uppercase" }}
        >
          {item?.value}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{ width: width }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#3F51B5"
          title="Refreshing..."
        />
      }
    >
      <View style={{ width: width, alignItems: "center" }}>
        <Image
          source={{ uri: userData.profileImageURL }}
          style={{
            width: 130,
            height: 130,
            borderRadius: 70,
            marginTop: 40,
          }}
        />
        <Text style={{ paddingTop: 20, fontWeight: 700, fontSize: 20 }}>
          {userData?.fullName}
        </Text>
        <Text style={{ paddingTop: 10, fontSize: 14 }}>{userData?.email}</Text>
      </View>

      <View style={{ marginVertical: 20, paddingHorizontal: 15 }}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={settings}
          renderItem={renderSettingsItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconImage: {
    width: 25,
    height: 25,
  },
});
