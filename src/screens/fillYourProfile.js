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
} from "react-native";
import BackButton from "../components/BackButton/BackButton";
import ModalDropdown from "react-native-modal-dropdown";
import * as ImagePicker from "expo-image-picker";

export default function FillYourProfile(props) {
  const { navigation } = props;
  const width = Dimensions.get("window").width;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();

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
  const [changeImage, setChangeImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU"
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setChangeImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <View style={{ alignItems: "center", marginBottom: 30, marginTop: 40 }}>
        <Pressable onPress={pickImage} style={{}}>
          <Image
            source={{ uri: `${changeImage}` }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 70,
            }}
          />
        </Pressable>
      </View>

      <TextInput
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
        placeholder="Username"
        value={userName}
        onChangeText={(searchString) => {
          setUserName(searchString);
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
        placeholder="Your Email"
        keyboardType="numeric"
        value={birthDate}
        onChangeText={(searchString) => {
          setBirthDate(searchString);
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
        placeholder="Your Phone Number"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(searchString) => {
          setPhoneNumber(searchString);
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
        placeholder="Your Email"
        value={email}
        keyboardType="email-address"
        onChangeText={(searchString) => {
          setEmail(searchString);
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
        placeholder="Your Address"
        value={address}
        keyboardType="email-address"
        onChangeText={(searchString) => {
          setAddress(searchString);
        }}
      />

      <ModalDropdown
        options={["Male", "Female", "No Select"]}
        onSelect={(value) => console.log(value)}
        style={{
          width: width,
          paddingHorizontal: 10,
        }}
        textStyle={{ fontSize: 16, fontWeight: 700 }}
        dropdownTextStyle={{ fontSize: 16, fontWeight: 700 }}
        defaultValue={"Male"}
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
