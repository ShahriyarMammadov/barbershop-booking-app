import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import BackButton from "../components/BackButton/BackButton";

export default function LoginScreen(props) {
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
      title: "",
      headerShown: true,
    });
  }, []);

  return (
    <View>
      <Text> "sas"</Text>
    </View>
  );
}
