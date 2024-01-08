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
  const { mail, data, userID } = route.params;

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

  console.log(userID);

  const confirmAccount = async () => {
    try {
      setLoading(true);
      const data = await axios.post(
        `https://qaychi.az/api/Accounts/ConfirmAccount?Email=${mail}&code=${otpCode}`,
        {}
      );

      console.log(data);

      updateLoginStatus(userID);

      navigation.navigate("Qaychi.az");

      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error?.response?.data);
        if (error?.response?.data === "OTP is wrong") {
          Alert.alert("XƏTA", "Daxil Etdiyiniz OTP Kodu Yanlışdır.");
        }
      }
      setLoading(false);
    }
  };

  const forgotPasswordVerify = async () => {
    try {
      const data = await axios.post(
        `https://qaychi.az/api/Accounts/ConfirmForgot?Email=${mail}&code=${otpCode}`
      );

      if (data && data?.data) {
        if (data?.data === "OTP sent") {
          navigation.navigate("Yeni Şifrə", {
            userID: data?.data,
          });
        } else {
          console.log("else keys:", data?.data);
        }
      } else {
        console.log(
          "Response body not found or does not have 'response' property."
        );
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = () => {
    if (data === "forgotPassword") {
      forgotPasswordVerify();
    } else {
      confirmAccount();
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
            <ActivityIndicator size="small" color="#0000ff" />
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
        <TouchableOpacity
          disabled={otpResendSendTime == 0 ? false : true}
          style={{
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => {
            handleResendCode();
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
