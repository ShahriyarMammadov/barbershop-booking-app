import React, { useEffect, useState } from "react";
import { ScrollView, Image, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function EditProfile(props) {
  const { navigation } = props;
  const [fullName, setFullName] = useState("Shahriyar Mammadov");
  const [email, setEmail] = useState("shahriyarmammadov16@gmail.com");
  const [userName, setUserName] = useState("Shahriyar4473");
  const [address, setAddress] = useState("Bine Sovxoz");
  const [birthDate, setBirthDate] = useState("20/05/2002");
  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleSave = () => {
    console.log("Selected Value:", selectedValue);
  };

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
          height: 40,
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
          height: 40,
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
          height: 40,
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

      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>

      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <TextInput
        style={{
          height: 40,
          backgroundColor: "rgba(128, 128, 128, 0.2)",
          paddingHorizontal: 10,
          height: 60,
          borderRadius: 10,
          fontSize: 16,
          fontWeight: "bold",
          marginVertical: 25,
        }}
        placeholder="Your Address"
        value={address}
        keyboardType="email-address"
        onChangeText={(searchString) => {
          setAddress(searchString);
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
