import React, { useEffect } from "react";
import { View, ImageBackground, Text, Image, StyleSheet } from "react-native";

const WelcomeScreen = (props) => {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: "",
    });
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/welcomeHero.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>
          <Text style={styles.greenText}>Qaychi.az</Text> Tətbiqinə xoş
          Gəlmişsiniz.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    padding: 40,
    paddingBottom: 200,
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
  greenText: {
    color: "green",
    fontSize: 35,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default WelcomeScreen;
