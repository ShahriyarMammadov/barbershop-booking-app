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
import * as ImagePicker from "expo-image-picker";
import ModalDropdown from "react-native-modal-dropdown";

export default function FillYourProfile(props) {
  const { navigation } = props;
  const { checked, mail, password } = props?.route?.params;

  console.log("fill: ", checked, mail, password);
  const width = Dimensions.get("window").width;

  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();
  const [repeatPassword, setRepeatPassword] = useState("");
  const [gender, setGender] = useState("");

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
