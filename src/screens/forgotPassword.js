import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../components/BackButton/BackButton";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

export default function ForgotPasswordScreen({ navigation }) {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
      headerTransparent: false,
    });
  }, []);

  const forgot = async () => {
    try {
      const data = await axios.post(
        `https://qaychi.az/api/Accounts/Forgot?Email=${email}`
      );

      if (data && data?.data) {
        if (data?.data === "OTP sent") {
          navigation.navigate("OTP", { mail: email, data: "forgotPassword" });
        }
      } else {
        console.log(
          "Response body not found or does not have 'response' property."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <View style={{ alignItems: "center", paddingTop: 20 }}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/qaychi-az.appspot.com/o/qaychiimages%2Fforgot-password.png?alt=media&token=5538535b-53f3-4e45-bea2-8bfc354c2bd7",
          }}
          style={{
            width: width,
            height: height / 3 + 50,
            objectFit: "contain",
          }}
        />
      </View>

      <Text style={{ paddingTop: 10, fontWeight: 700 }}>
        Şifrəsini Dəyişmək İstədəyiniz Hesabınıza Bağlı Olan Email Adresinizi
        Daxil Edin:
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          paddingHorizontal: 20,
          marginBottom: 20,
          marginTop: 15,
          backgroundColor: "#FAFAFA",
          borderRadius: 10,
        }}
      >
        <Feather
          name="mail"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={{
            flex: 1,
            height: 40,
            paddingLeft: 5,
          }}
          placeholder="Email Adresinizi Daxil Edin..."
          keyboardType="email-address"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          textAlign: "center",
          backgroundColor: "#F57620",
          paddingVertical: 15,
          borderRadius: 50,
        }}
        onPress={() => {
          email.length < 10
            ? Alert.alert("XƏTA", "Düzgün Email Adresi Daxil Edin!!")
            : forgot();
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
              color: "white",
            }}
          >
            Növbəti
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
