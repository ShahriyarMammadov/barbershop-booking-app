import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

export default function EditProfile(props) {
  const { navigation } = props;
  const { width: windowWidth } = Dimensions.get("window");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("data");
        const parseData = JSON.parse(data);
        setName(parseData?.name);
        setSurname(parseData?.surname);
        setFatherName(parseData?.fatherName);
        setLocation(parseData?.address);
        setEmail(parseData?.email);
        setUsername(parseData?.userName);
        setPhoneNumber(parseData?.phoneNumber);
        setGender(parseData?.gender);
        setUserId(parseData?.id);
        setUserType(parseData?.userType);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");

  const updateProfile = async () => {
    try {
      console.log(userId);
      const { data } = await axios.post(
        `https://qaychi.az/api/Accounts/EditProfile?AppUserId=${userId}`,
        {
          name: name,
          surname: surname,
          fatherName: fatherName,
          address: location,
          gender: gender,
          phone: phoneNumber,
          userName: username,
          UserType: userType,
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ paddingVertical: 30, paddingHorizontal: 10 }}>
      <Text style={{ fontWeight: 700, marginBottom: 10 }}>Adınız:</Text>
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
        placeholder="Adınız"
        value={name}
        onChangeText={(value) => {
          setName(value);
        }}
      />

      <Text style={{ fontWeight: 700, marginBottom: 10, marginTop: 25 }}>
        Soyadınız:
      </Text>
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

      <Text style={{ fontWeight: 700, marginBottom: 10, marginTop: 25 }}>
        Ata Adınız:
      </Text>
      <TextInput
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.2)",
          paddingHorizontal: 10,
          height: 60,
          borderRadius: 10,
          fontSize: 16,
          fontWeight: "bold",
        }}
        placeholder="Ata Adınız"
        value={fatherName}
        onChangeText={(value) => {
          setFatherName(value);
        }}
      />

      <Text style={{ fontWeight: 700, marginBottom: 10, marginTop: 25 }}>
        İstifadəçi Adınız:
      </Text>
      <TextInput
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.2)",
          paddingHorizontal: 10,
          height: 60,
          borderRadius: 10,
          fontSize: 16,
          fontWeight: "bold",
        }}
        placeholder="Istifadəçi Adınız"
        value={username}
        onChangeText={(value) => {
          setUsername(value);
        }}
      />

      <Text style={{ fontWeight: 700, marginBottom: 10, marginTop: 25 }}>
        Ünvan Məlumatı:
      </Text>
      <TextInput
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.2)",
          paddingHorizontal: 10,
          height: 60,
          borderRadius: 10,
          fontSize: 16,
          fontWeight: "bold",
        }}
        placeholder="Ünvan Məlumatları"
        value={location}
        onChangeText={(value) => {
          setLocation(value);
        }}
      />

      <Text style={{ fontWeight: 700, marginBottom: 10, marginTop: 25 }}>
        Mail Ünvanınız:
      </Text>
      <TextInput
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.2)",
          paddingHorizontal: 10,
          height: 60,
          borderRadius: 10,
          fontSize: 16,
          fontWeight: "bold",
        }}
        placeholder="Email Adresiniz"
        value={email}
        keyboardType="email-address"
        onChangeText={(value) => {
          setEmail(value);
        }}
      />

      <Text style={{ fontWeight: 700, marginBottom: 10, marginTop: 25 }}>
        Əlaqə Nömrəsi:
      </Text>
      <TextInput
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.2)",
          paddingHorizontal: 10,
          height: 60,
          borderRadius: 10,
          fontSize: 16,
          fontWeight: "bold",
        }}
        placeholder="Əlaqə Nömrəniz"
        value={phoneNumber}
        keyboardType="numeric"
        onChangeText={(value) => {
          setPhoneNumber(value);
        }}
      />

      <Text style={{ fontWeight: 700, marginBottom: 10, marginTop: 25 }}>
        Cinsiyyət:
      </Text>
      <ModalDropdown
        options={["Kişi", "Qadın", "Bildirmək İstəmirəm"]}
        onSelect={(value) => setGender(value)}
        style={{
          width: windowWidth,
          paddingHorizontal: 10,
        }}
        textStyle={{ fontSize: 16, fontWeight: 700 }}
        dropdownTextStyle={{ fontSize: 16, fontWeight: 700 }}
        defaultValue={gender}
        dropdownStyle={{
          width: windowWidth - 80,
          marginTop: -20,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#FB9400",
          paddingVertical: 15,
          borderRadius: 30,
          marginTop: 25,
          marginBottom: 50,
        }}
        onPress={updateProfile}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 17,
            color: "white",
          }}
        >
          Yenilə
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
