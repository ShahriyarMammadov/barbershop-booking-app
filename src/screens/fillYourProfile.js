import React, { useEffect, useState } from "react";
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
  Modal,
} from "react-native";
import BackButton from "../components/BackButton/BackButton";
import * as ImagePicker from "expo-image-picker";
import ModalDropdown from "react-native-modal-dropdown";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { storage } from "../components/firebaseConfig";

export default function FillYourProfile(props) {
  const { navigation } = props;
  const { checked, mail, password } = props?.route?.params;

  console.log("fill: ", checked, mail, password);
  const width = Dimensions.get("window").width;

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();
  const [repeatPassword, setRepeatPassword] = useState("");
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

  // CHANGE PROFILE PHOTO

  const submitData = async () => {
    try {
      const randomFileName = Math.random().toString(36).substring(7);
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
      setLoading(true);

      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      console.log("Uploaded file URL:", downloadURL);

      setLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
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
    setModalVisible(false);

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
    setModalVisible(false);

    if (!result.canceled) {
      setChangeImage(result.assets[0]?.uri);
    }
  };

  return (
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
            setModalVisible(true);
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

      {checked ? (
        <Text>siz admin kimi qeydiyyatdan kecirsiz!!</Text>
      ) : (
        <Text>Siz user kimi qeydiyyatdan kecirsiz!</Text>
      )}

      {/* <TextInput
        style={{
          height: 40,
          backgroundColor: "rgba(128, 128, 128, 0.2)",
          paddingHorizontal: 10,
          height: 60,
          borderRadius: 10,
          fontSize: 16,
          fontWeight: "bold",
        }}
        placeholder="Your Email"
        value={fullName}
        onChangeText={(searchString) => {
          setFullName(searchString);
        }}
      /> */}

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
        // keyboardType="numeric"
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
        placeholder="Ünvanınız"
        // keyboardType="numeric"
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
        // renderRow={(option, index, isSelected) => (
        //   <Text style={{ fontSize: 16 }}>{option}</Text>
        // )}
        // renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => (
        //   <View
        //     key={rowID}
        //     style={{ height: 1, backgroundColor: "lightgray" }}
        //   />
        // )}
        keyboardShouldPersistTaps="always"
        accessible={true}
        defaultValue={"Seçilməyib"}
        dropdownStyle={{
          width: width - 80,
          marginTop: -20,
        }}
      />

      <Modal
        visible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        transparent={true}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
    </ScrollView>
  );
}
