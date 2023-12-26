import React, { useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <Text style={{ color: "#FB9400", fontSize: 65, fontWeight: 700 }}>
            Qaychi.az
          </Text>
          <Image
            source={require("../../assets/icons/helloColored.png")}
            style={{ width: 60, height: 60 }}
          />
        </View>

        <Text
          style={{
            fontSize: 30,
            fontWeight: 700,
            paddingVertical: 20,
            marginBottom: 40,
            color: "white",
          }}
        >
          Tətbiqinə Xoş Gəlmişsiniz.
        </Text>

        <TouchableHighlight
          underlayColor={"#D0D4CA"}
          style={{
            alignItems: "center",
            backgroundColor: "#FB9400",
            borderRadius: 30,
            marginBottom: 40,
            paddingVertical: 15,
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
            }}
          >
            Indi Başla
          </Text>
        </TouchableHighlight>

        <Text
          style={{
            paddingBottom: 35,
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 10,
  },
});

export default WelcomeScreen;
