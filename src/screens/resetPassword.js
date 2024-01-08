import React, { useState } from "react";
import axios from "axios";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ResetPasswordScreen({ navigation, route }) {
  const { userID } = route.params;
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    try {
      setLoading(true);

      const data = await axios.post(
        `https://qaychi.az/api/Accounts/ResetPassword`,
        { id: userID, password: password }
      );

      if (data && data?.data) {
        if (data?.data === "Changed") {
          setLoading(false);
          navigation.navigate("loginEmail", {
            message: "Şifrəniz Uğurla Dəyişdirildi.",
          });
        } else {
          console.log(data?.data);
          setLoading(false);
        }
      } else {
        console.log(
          "Response body not found or does not have 'response' property."
        );
        setLoading(false);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>Reset Password</Text>

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
        <MaterialIcons
          name="lock-outline"
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
          secureTextEntry
          placeholder="Yeni Şifrənizi Daxil Edin..."
          value={password}
          onChangeText={(passwordValue) => {
            setPassword(passwordValue);
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
        <MaterialIcons
          name="lock-outline"
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
          secureTextEntry
          placeholder="Şifrəni Təkrar Daxil Edin..."
          value={repeatPassword}
          onChangeText={(repeatPasswordValue) => {
            setRepeatPassword(repeatPasswordValue);
          }}
        />
      </View>

      {/* <ActivityIndicator size="small" color="#0000ff" /> */}
    </View>
  );
}
