import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import BackButton from "../components/BackButton/BackButton";
import * as ImagePicker from "expo-image-picker";
import ModalDropdown from "react-native-modal-dropdown";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../components/firebaseConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modalize } from "react-native-modalize";

export default function FillYourProfile(props) {
  const { navigation } = props;
  const { checked, mail, password } = props?.route?.params;

  const width = Dimensions.get("window").width;

  const [loading, setLoading] = useState(false);

  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [changeImage, setChangeImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerShown: true,
      title: "Hesabınızı Tamamlayın",
    });
  }, []);

  console.log(mail);

  // MODAL
  const modalData = [
    { id: 1, title: "Qalereyadan Seç" },
    { id: 2, title: "Kamera İlə Çək" },
  ];

  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={{ padding: 10, marginTop: 10 }}
        onPress={() => {
          item?.id === 1 ? pickImage() : takePhoto();
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: 700, fontSize: 16 }}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // CHANGE PROFILE PHOTO

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
      if (
        name.length < 2 ||
        surname.length < 2 ||
        repeatPassword.length < 2 ||
        phone.length < 2
      ) {
        Alert.alert("XƏTA", "Xanaları Tam Doldurun!!!");
      } else {
        setLoading(true);

        // FIREBASE IMAGE DOWNLOAD AND GET URL
        const randomFileName = generateRandomFileName();
        const storageRef = ref(storage, `images/${randomFileName}`);

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
          setLoading(false);
          return;
        }

        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);

        const { data } = await axios.post(
          `https://qaychi.az/api/Accounts/Register`,
          {
            name: name,
            surname: surname,
            fatherName: fatherName,
            email: mail,
            address: address,
            gender:
              gender === 0 ? "Kişi" : gender === 1 ? "Qadın" : "Seçilməyib",
            phone: phone,
            password: password,
            repeatPassword: repeatPassword,
            profileImage: downloadURL,
            userType: checked ? "Sahibkar" : "İstifadəçi",
          }
        );

        if (data) {
          // await AsyncStorage.setItem("userID", data?.id);
          navigation.navigate("OTP", {
            mail: mail,
            data: data,
            userID: data?.id,
          });
        }

        console.log("data", data?.id);
      }

      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error?.response?.data);
        if (error?.response?.data === "This user is exist") {
          Alert.alert(
            "XƏTA",
            "Daxil Etdiyiniz Email Hesabına Bağlı Olan Başqa Bir Hesab Mövcuddur!!!"
          );
        } else if (error?.response?.data === "PassowordError") {
          Alert.alert("XƏTA", "Daxil Etdiyiniz Şifrələr Eyni Deyil!!!");
        }
      }
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setChangeImage(asset.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setChangeImage(result.assets[0]?.uri);
    }
  };

  return (
    <>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <View
          style={{
            alignItems: "center",
            marginBottom: 30,
            marginTop: 40,
          }}
        >
          <Pressable
            onPress={() => {
              onOpen();
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 70,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Image
                source={{ uri: `${changeImage}` }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 70,
                }}
              />
            )}
          </Pressable>
        </View>

        {loading ? (
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            Hesabınız Yaradılır...
          </Text>
        ) : (
          <>
            {checked ? (
              <Text>Siz Sahibkar Kimi Qeydiyyatdan Keçirsiz.</Text>
            ) : (
              <Text>Siz İstifadəçi Kimi Qeydiyyatdan Kecirsiz!</Text>
            )}

            <TextInput
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.2)",
                paddingHorizontal: 10,
                height: 60,
                borderRadius: 10,
                fontSize: 16,
                fontWeight: "bold",
                marginVertical: 25,
              }}
              placeholder="Adınız"
              value={name}
              onChangeText={(value) => {
                setName(value);
              }}
            />

            <TextInput
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.2)",
                paddingHorizontal: 10,
                height: 60,
                borderRadius: 10,
                fontSize: 16,
                fontWeight: "bold",
              }}
              placeholder="Soyadınız"
              value={surname}
              onChangeText={(value) => {
                setSurname(value);
              }}
            />

            <TextInput
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.2)",
                paddingHorizontal: 10,
                height: 60,
                borderRadius: 10,
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 25,
              }}
              placeholder="Ata Adınız"
              value={fatherName}
              onChangeText={(value) => {
                setFatherName(value);
              }}
            />

            <TextInput
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.2)",
                paddingHorizontal: 10,
                height: 60,
                borderRadius: 10,
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 25,
              }}
              placeholder="Ünvanınız"
              value={address}
              onChangeText={(value) => {
                setAddress(value);
              }}
            />

            <TextInput
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.2)",
                paddingHorizontal: 10,
                height: 60,
                borderRadius: 10,
                fontSize: 16,
                fontWeight: "bold",
                marginVertical: 25,
              }}
              placeholder="Əlaqə Vasitəsi"
              value={phone}
              keyboardType="numeric"
              onChangeText={(value) => {
                setPhone(value);
              }}
            />

            <TextInput
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.2)",
                paddingHorizontal: 10,
                height: 60,
                borderRadius: 10,
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 25,
              }}
              placeholder="Təkrar Şifrə"
              value={repeatPassword}
              secureTextEntry
              onChangeText={(value) => {
                setRepeatPassword(value);
              }}
            />

            <ModalDropdown
              options={["Kişi", "Qadın", "Seçilməyib"]}
              onSelect={(value) => setGender(value)}
              style={{
                width: width,
                paddingHorizontal: 10,
              }}
              textStyle={{ fontSize: 16, fontWeight: 700 }}
              dropdownTextStyle={{ fontSize: 16, fontWeight: 700 }}
              defaultValue={"Gender"}
              dropdownStyle={{
                width: width - 80,
                marginTop: -20,
              }}
            />

            <TouchableOpacity
              style={{
                backgroundColor: "#FB9400",
                paddingVertical: 20,
                borderRadius: 30,
                marginVertical: 20,
              }}
              onPress={() => {
                submitData();
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: 17,
                  color: "white",
                }}
              >
                Yadda Saxla
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <Modalize
        ref={modalizeRef}
        snapPoint={170}
        modalStyle={{
          padding: 10,
        }}
        modalHeight={150}
        flatListProps={{
          data: modalData,
          renderItem: renderItem,
          keyExtractor: (item) => item.id,
        }}
      />
    </>
  );
}
