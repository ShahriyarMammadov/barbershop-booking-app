import React, { useEffect } from "react";
import { Text, View } from "react-native";
import BackButton from "../components/BackButton/BackButton";

export default function ForgotPasswordScreen({ navigation }) {
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
  return (
    <View>
      <Text>ForgotPassword</Text>
    </View>
  );
}
