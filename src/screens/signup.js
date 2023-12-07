import React, { useEffect } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../components/BackButton/BackButton";

export default function SignUpScreen(props) {
  const { navigation } = props;

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

  return (
    <View style={{ marginTop: 150, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 35, fontWeight: 700 }}>Yeni Hesab Yaradın</Text>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
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
            onChangeText={(searchString) => {
              console.log(searchString);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
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
            onChangeText={(searchString) => {
              console.log(searchString);
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#FB9400",
          paddingVertical: 20,
          borderRadius: 30,
          marginTop: 30,
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
          paddingVertical: 30,
          fontSize: 16,
          color: "grey",
        }}
      >
        Və ya
      </Text>

      <View style={{ flexDirection: "row", gap: 50, justifyContent: "center" }}>
        <Pressable>
          <Image
            source={require("../../assets/icons/facebook.png")}
            style={{ width: 35, height: 35 }}
          />
        </Pressable>
        <Pressable>
          <Image
            source={require("../../assets/icons/google.png")}
            style={{ width: 35, height: 35 }}
          />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
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
    </View>
  );
}
