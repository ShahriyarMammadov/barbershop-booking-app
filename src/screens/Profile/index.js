import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import { getLocales } from "expo-localization";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen(props) {
  const { navigation, updateLoginStatus } = props;
  const width = Dimensions.get("window").width;
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState({});
  const [changeImage, setChangeImage] = useState(
    userData?.profileImg ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
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
          style={{ width: 25, height: 25, marginRight: 30 }}
        />
      ),
    });

    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("data");
      const parseData = JSON.parse(data);
      await setUserData(parseData);
      setChangeImage(parseData?.profileImg);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userData.profileImg);

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
      name: "Security",
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

  const categoryChange = (routeName) => {
    if (routeName === "Logout") {
      updateLoginStatus(false);
      navigation.navigate("Welcome");
    } else {
      navigation.navigate(routeName);
    }
  };

  // CHANGE PROFILE PHOTO

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setChangeImage(result.assets[0].uri);
    }
  };

  console.log("change Image", changeImage);

  return (
    <ScrollView
      style={{ width: width }}
      showsVerticalScrollIndicator={false}
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
        <Pressable
          onPress={pickImage}
          style={{
            marginTop: 40,
          }}
        >
          <Image
            source={{ uri: `${changeImage}` }}
            style={{
              width: 130,
              height: 130,
              borderRadius: 70,
            }}
          />
        </Pressable>
        <Text style={{ paddingTop: 20, fontWeight: 700, fontSize: 20 }}>
          {userData?.name} {userData?.surname}
        </Text>
        <Text style={{ paddingTop: 10, fontSize: 14 }}>{userData?.email}</Text>
      </View>

      <View style={{ marginVertical: 20, paddingHorizontal: 15 }}>
        {settings?.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
              onPress={() => {
                categoryChange(item.name);
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                <Image
                  source={item.iconURL}
                  style={styles.iconImage}
                  onPress={pickImage}
                />
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
                <Image
                  source={item?.rightIcon}
                  style={{ width: 15, height: 15 }}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {item?.value}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
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
