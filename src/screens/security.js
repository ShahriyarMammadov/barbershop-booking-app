import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function SecurityScreen() {
  useEffect(() => {
    checkDeviceForHardware();
    checkForBiometrics();
  }, []);

  const checkDeviceForHardware = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      console.log("Cihaz barmaq izini desteklemir.");
    }
  };

  const checkForBiometrics = async () => {
    const biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if (!biometricRecords) {
      console.log("yaddasda barmaq izi tapilmadi.");
    }
  };

  const authenticate = async () => {
    try {
      const isAuthenticated = await LocalAuthentication.authenticateAsync({
        promptMessage: "Barmaq Izinizi Oxudun",
      });

      if (isAuthenticated.success) {
        console.log("Giriş Ugurlu!");
      } else {
        console.log("Ugursuz Giris");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 20 }}>Security</Text>
      <TouchableOpacity
        onPress={authenticate}
        style={{
          padding: 10,
          backgroundColor: "#007AFF",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Barmak İzi ile Giriş</Text>
      </TouchableOpacity>
    </View>
  );
}
