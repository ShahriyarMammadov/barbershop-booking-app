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

  const [fullName, setFullName] = useState("Shahriyar Mammadov");
  const [email, setEmail] = useState("shahriyarmammadov16@gmail.com");
  const [userName, setUserName] = useState("Shahriyar4473");
  const [address, setAddress] = useState("Bine Sovxoz");
  const [birthDate, setBirthDate] = useState("20/05/2002");
  const [phoneNumber, setPhoneNumber] = useState(994503134473);

  return (
    <ScrollView style={{ paddingVertical: 30, paddingHorizontal: 10 }}>
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
        value={phoneNumber.toString()}
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
          width: windowWidth,
          paddingHorizontal: 10,
        }}
        textStyle={{ fontSize: 16, fontWeight: 700 }}
        dropdownTextStyle={{ fontSize: 16, fontWeight: 700 }}
        defaultValue={"Male"}
        dropdownStyle={{
          width: windowWidth - 80,
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
          Yenilə
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
