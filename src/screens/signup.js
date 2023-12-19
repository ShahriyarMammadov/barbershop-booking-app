import React, { useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
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
          marginTop: 50,
        }}
        onPress={() => {
          navigation.navigate("Fill Your Profile");
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
          paddingVertical: 50,
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
