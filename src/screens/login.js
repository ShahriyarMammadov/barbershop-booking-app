import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton/BackButton";
import axios from "axios";

export default function LoginScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      title: "",
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  const login = async () => {
    try {
      const data = await axios.post("https://qaychi.az/api/Accounts/Login", {
        email: email,
        password: password,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <View style={{ alignItems: "center", marginBottom: 50, marginTop: 90 }}>
        <Image
          source={require("../../assets/loginHero.png")}
          style={{ width: 250, height: 250 }}
        />
      </View>

      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          fontWeight: 700,
        }}
      >
        Daxil Olun
      </Text>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            gap: 10,
            paddingVertical: 20,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "rgba(0,0,0,0.1)",
            backgroundColor: "#FAFAFA",
          }}
        >
          <Image
            source={require("../../assets/icons/facebook.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontWeight: 700, fontSize: 16 }}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            gap: 10,
            paddingVertical: 20,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "rgba(0,0,0,0.1)",
            marginTop: 15,
            backgroundColor: "#FAFAFA",
          }}
        >
          <Image
            source={require("../../assets/icons/google.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ fontWeight: 700, fontSize: 16 }}>
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>

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

      <TouchableOpacity
        style={{
          backgroundColor: "#FB9400",
          textAlign: "center",
          paddingVertical: 20,
          borderRadius: 20,
        }}
        onPress={() => {
          navigation.navigate("loginEmail");
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Email İlə Daxil Ol
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          marginVertical: 30,
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 15, color: "grey" }}>
          Hesabınız Yoxdur? {"  "}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("signup");
          }}
        >
          <Text style={{ fontSize: 15, color: "#FB9400", fontWeight: 700 }}>
            Qeydiyyatdan Keçin
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
