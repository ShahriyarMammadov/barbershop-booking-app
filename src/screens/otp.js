import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import BackButton from "../components/BackButton/BackButton";
import axios from "axios";

export default function OtpScreen({ route, navigation, updateLoginStatus }) {
  const { mail, data } = route.params;

  let otpInput = useRef(null);

  const [otpCode, setOtpCode] = useState(0);
  const [otpResendSendTime, setOtpResendSendTime] = useState(10);
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
      headerTransparent: true,
      title: "",
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOtpResendSendTime((time) => time - 1);
    }, 1000);

    if (otpResendSendTime === 0) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [otpResendSendTime]);

  const handleResendCode = () => {
    clearInterval(intervalId);

    setOtpResendSendTime(10);

    const intervalId = setInterval(() => {
      setOtpResendSendTime((time) => time - 1);
    }, 1000);

    if (otpResendSendTime === 0) {
      clearInterval(intervalId);
    }
  };

  console.log(mail, otpCode);

  const handleVerify = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://qaychi.az/api/Accounts/ConfirmAccount?Email=${mail}&code=${otpCode}`,
        {}
      );

      // if (data) {
      //   updateLoginStatus(true);
      // }
      console.log(data);

      updateLoginStatus(true);

      navigation.navigate("Qaychi.az")

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <OTPTextInput
        ref={(e) => (otpInput = e)}
        handleTextChange={(e) => setOtpCode(e)}
        inputCount={6}
        tintColor={"#F57620"}
        autoFocus={true}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#F57620",
          padding: 10,
          borderRadius: 10,
          marginTop: 35,
          paddingHorizontal: 25,
        }}
        onPress={() => {
          otpCode.length < 6 || otpCode === 0
            ? Alert.alert("Xəta", "6 Rəqəmli Kodu Tam Daxil Edin")
            : handleVerify();
        }}
      >
        <Text style={{ color: "white" }}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            "Təsdiqlə"
          )}
        </Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 40 }}>
        {mail} Mailinizə Göndərdiyimiz 6 Rəqəmli Təsdiqləmə Kodunu Daxil edin.
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15,
          marginTop: 20,
        }}
      >
        {/* <TouchableOpacity
          style={{
            backgroundColor: "#F57620",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white" }}>Daha Sonra Təsdiqlə</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          disabled={otpResendSendTime == 0 ? false : true}
          style={{
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => {
            handleResendCode();
            // Alert.alert("Coming Soon", "Coming Soon");
          }}
        >
          <Text>
            {otpResendSendTime == 0
              ? "Kodu Yenidən Göndər"
              : `${otpResendSendTime} Saniyə Sonra Yenidən Cəhd Edin!`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
