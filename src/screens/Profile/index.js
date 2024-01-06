import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Animated,
  Image,
  Modal,
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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../components/firebaseConfig";

export default function ProfileScreen(props) {
  const { navigation, updateLoginStatus } = props;
  const width = Dimensions.get("window").width;
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changedImage, setChangedImage] = useState(false);

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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const settings = [
    {
      id: 1,
      name: "Profil Ayarları",
      iconURL: require("../../../assets/icons/profile.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 2,
      name: "Bildirişlər",
      iconURL: require("../../../assets/icons/notification.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 3,
      name: "Ödəniş",
      iconURL: require("../../../assets/icons/payment.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 4,
      name: "Təhlükəsizlik",
      iconURL: require("../../../assets/icons/security.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 5,
      name: "Tətbiq Dili",
      value: deviceLanguage,
      iconURL: require("../../../assets/icons/language.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 6,
      name: "Məxfilik Və Siyasət",
      iconURL: require("../../../assets/icons/privacypolicy.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 7,
      name: "Dəvət Et",
      iconURL: require("../../../assets/icons/invitefriends.png"),
      rightIcon: require("../../../assets/icons/righticon.png"),
    },
    {
      id: 8,
      name: "Çıxış",
      iconURL: require("../../../assets/icons/logout.png"),
    },
  ];

  const categoryChange = async (routeName) => {
    if (routeName === "Çıxış") {
      await updateLoginStatus(false);
      navigation.navigate("Welcome");
    } else {
      navigation.navigate(routeName);
    }
  };

  // Delete and Upload Image

  const generateRandomFileName = () => {
    let randomFileName = "";
    while (randomFileName.length < 20) {
      randomFileName += Math.random().toString(36).substring(2);
    }
    randomFileName = randomFileName.substring(0, 20);

    return randomFileName;
  };

  const submitData = async () => {
    try {
      const randomFileName = generateRandomFileName();
      const storageRef = ref(storage, `images/${randomFileName}`);

      if (changeImage) {
        const deleteImageName = userData?.profileImg?.slice(77, 97);
        console.log(deleteImageName);
        const deleteImageRef = ref(storage, `images/${deleteImageName}`);
        await deleteObject(deleteImageRef);
        console.log("Old image deleted successfully");
        setChangedImage(false);
      }

      const response = await fetch(changeImage);
      const blob = await response.blob();

      const fileSizeInMB = blob.size / (1024 * 1024);

      console.log(fileSizeInMB);
      if (fileSizeInMB > 3) {
        Alert.alert(
          "XƏTA",
          `Zəhmət Olmasa Həcmi 3MB-dan Aşağı Olan Şəkil Seçin, Seçilən Faylın Həcmi: ${fileSizeInMB?.toFixed(
            2
          )}MB`,
          [{ text: "OK" }]
        );
        return;
      }
      setLoading(true);

      // deleteObject(deleteImageRef)
      //   .then(() => {
      //     console.log("Sekil Ugurla silindi");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      console.log("download URL:", downloadURL);

      // const { data } = await axios.post(
      //   `https://qaychi.az/api/Accounts/Register`,
      //   {
      //     name: name,
      //     surname: surname,
      //     fatherName: fatherName,
      //     email: mail,
      //     address: address,
      //     gender: gender === 0 ? "Kişi" : "Qadın",
      //     phone: phone,
      //     password: password,
      //     repeatPassword: repeatPassword,
      //     profileImage: downloadURL,
      //     userType: checked ? "Sahibkar" : "İstifadəçi",
      //   }
      // );

      // if (data) {
      //   await AsyncStorage.setItem("data", JSON.stringify(data));
      //   navigation.navigate("OTP", { mail: mail, data: data });
      // }

      // console.log("data", data);

      setChangedImage(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setChangedImage(false);
    }
  };

  // CHANGE PROFILE PHOTO

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    setModalVisible(false);

    if (!result.canceled) {
      const asset = result.assets[0];
      setChangeImage(asset.uri);
      setChangedImage(true);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    setModalVisible(false);

    if (!result.canceled) {
      setChangeImage(result.assets[0]?.uri);
      setChangedImage(true);
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
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            marginTop: 20,
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

        {changedImage ? (
          <Text
            onPress={submitData}
            style={{
              fontWeight: 600,
              fontSize: 16,
              marginTop: 5,
              padding: 10,
            }}
          >
            {loading ? "Yüklənir..." : "Dəyişiklikləri Saxla"}
          </Text>
        ) : (
          ""
        )}

        <Text style={{ paddingTop: 20, fontWeight: 700, fontSize: 20 }}>
          {userData?.name} {""}
          {userData?.surname}
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
                    item.name === "Çıxış"
                      ? { fontWeight: 700, fontSize: 16, color: "#EF4040" }
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

      <Modal
        visible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: 300,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                padding: 10,
                backgroundColor: "grey",
                textAlign: "center",
                position: "absolute",
                borderRadius: 10,
                top: 0,
                right: 0,
                width: 40,
                color: "white",
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              X
            </Text>

            <TouchableOpacity onPress={pickImage}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Qalereyadan Seç
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={takePhoto}>
              <Text style={{ fontSize: 18 }}>Kameradan Çək</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconImage: {
    width: 25,
    height: 25,
  },
});
