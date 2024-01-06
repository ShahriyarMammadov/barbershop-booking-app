import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import BackButton from "../components/BackButton/BackButton";
import * as Facebook from "expo-facebook";
import Checkbox from "expo-checkbox";

// import axios from "axios";

export default function SignUpScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

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
      headerTransparent: true,
      title: "",
    });
  }, []);

  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: "1413939492524506",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        console.log("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }

  const handleSignUp = () => {
    try {
      if (email.length < 10 || password.length < 8) {
        Alert.alert("Xəta", "Düzgün Mail Və Şifrə Daxil Edin!");
      } else {
        navigation.navigate("Fill Your Profile", {
          checked: isChecked,
          mail: email,
          password: password,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 35, fontWeight: 700, marginTop: 130 }}>
        Yeni Hesab Yaradın
      </Text>

      <View style={{ marginTop: 60 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "#FAFAFA",
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../../assets/icons/mail.png")}
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
            }}
          />
          <TextInput
            style={{
              flex: 1,
              height: 40,
              paddingLeft: 10,
            }}
            placeholder="Your Email"
            keyboardType="email-address"
            onChangeText={(value) => {
              setEmail(value);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: "#FAFAFA",
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../../assets/icons/password.png")}
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
            }}
          />
          <TextInput
            style={{
              flex: 1,
              height: 40,
              paddingLeft: 10,
            }}
            secureTextEntry
            placeholder="Password"
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 20,
        }}
      >
        <Checkbox
          style={{ margin: 8 }}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#FDA62B" : undefined}
        />

        <Text
          onPress={() => {
            setChecked(!isChecked);
          }}
        >
          Sahibkar Hesabı İlə Qeydiyyatdan keç
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#FB9400",
          paddingVertical: 20,
          borderRadius: 30,
          marginTop: 30,
        }}
        onPress={() => {
          handleSignUp();
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 16,
            color: "white",
          }}
        >
          Qeydiyyatdan Keç
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          textAlign: "center",
          paddingVertical: 35,
          fontSize: 16,
          color: "grey",
        }}
      >
        Və ya
      </Text>

      <View style={{ flexDirection: "row", gap: 50, justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            padding: 10,
            paddingHorizontal: 25,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "rgba(128, 128, 128, 0.2)",
            borderRadius: 10,
            backgroundColor: "#FAFAFA",
          }}
          onPress={logIn}
        >
          <Image
            source={require("../../assets/icons/facebook.png")}
            style={{ width: 35, height: 35 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            paddingHorizontal: 25,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "rgba(128, 128, 128, 0.2)",
            borderRadius: 10,
            backgroundColor: "#FAFAFA",
          }}
        >
          <Image
            source={require("../../assets/icons/google.png")}
            style={{ width: 35, height: 35 }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
          paddingBottom: 20,
        }}
      >
        <Text>Hesabınız var? {"  "}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "#FB9400", fontSize: 16, fontWeight: 700 }}>
            Daxil Olun
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
