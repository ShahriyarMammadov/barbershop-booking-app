import React, { useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

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
          <Text style={styles.greenText}>Qaychi.az</Text>
          {"   "}
          <Image
            source={require("../../assets/icons/helloColored.png")}
            style={{ width: 50, height: 50 }}
          />{" "}
          {"\n"}
          Tətbiqinə xoş Gəlmişsiniz.
        </Text>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              backgroundColor: "#FB9400",
              borderRadius: 30,
              paddingHorizontal: 30,
              paddingVertical: 15,
              fontSize: 20,
              color: "white",
              marginBottom: 40,
            }}
          >
            Indi Başla
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            paddingBottom: 20,
            fontSize: 16,
            color: "#D0D4CA",
          }}
        >
          Sizin gözəl görünüşünüz və gözəlliyiniz {"\n"}üçün bu əsrdə ən yaxşı
          bərbər və salon proqramı.
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
    paddingHorizontal: 10,
  },
  text: {
    paddingVertical: 40,
    paddingBottom: 80,
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
  greenText: {
    color: "#FB9400",
    fontSize: 35,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default WelcomeScreen;
