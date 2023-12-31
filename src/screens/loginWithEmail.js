import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import BackButton from "../components/BackButton/BackButton";
import axios from "axios";
import JWT from "expo-jwt";

export default function LoginWithEmail(props) {
  const { navigation, updateLoginStatus } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      var { data } = await axios.post("https://qaychi.az/api/Accounts/Login", {
        email: email,
        password: password,
      });

      const key = "HS256";
      const token = data;

      JWT.decode(token, key);
      console.log(Boolean(data));
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
      if (data) {
        updateLoginStatus(true);
        setLoading(false);
      } else {
        Alert.alert("Xəta", " sifre ve mail yanlisdir!");
        setLoading(false);
      }
    }
  };

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
    <View style={{ marginTop: 160, paddingHorizontal: 10 }}>
      <Text style={{ fontWeight: 700, fontSize: 40 }}>
        Hesabınıza Daxil Olun
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          paddingHorizontal: 20,
          marginBottom: 20,
          marginTop: 60,
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
            paddingLeft: 5,
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
          marginBottom: 20,
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
            paddingLeft: 5,
          }}
          secureTextEntry
          placeholder="Password"
          onChangeText={(password) => {
            setPassword(password);
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#FB9400",
          paddingVertical: 18,
          borderRadius: 25,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          login();
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Daxil Ol
          </Text>
        )}
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
    </View>
  );
}
