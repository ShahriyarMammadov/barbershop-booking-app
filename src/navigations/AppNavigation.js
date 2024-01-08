import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/Home/HomeScreen";
import Footer from "../components/footer";
import ProfileScreen from "../screens/Profile";
import SaloonDetail from "../screens/SaloonDetail";
import WelcomeScreen from "../screens/welcome";
import LoginScreen from "../screens/login";
import SignUpScreen from "../screens/signup";
import MyBookingScreen from "../screens/myBooking";
import EditProfile from "../screens/editProfile";
import NotificationScreen from "../screens/Notification";
import BookNowScreen from "../screens/bookNow";
import ExploreScreen from "../screens/explore";
import PrivacyPolicyScreen from "../screens/privacyPolicy";
import InviteFriendsScreen from "../screens/inviteFriends";
import SecurityScreen from "../screens/security";
import LoginWithEmail from "../screens/loginWithEmail";
import FillYourProfile from "../screens/fillYourProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginLoaderScreen from "../screens/loginLoader";
import OtpScreen from "../screens/otp";
import ForgotPasswordScreen from "../screens/forgotPassword";

const Stack = createStackNavigator();

function WelcomeNavigator({ updateLoginStatus }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="loginEmail">
        {(props) => (
          <LoginWithEmail {...props} updateLoginStatus={updateLoginStatus} />
        )}
      </Stack.Screen>
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="OTP">
        {(props) => (
          <OtpScreen {...props} updateLoginStatus={updateLoginStatus} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Fill Your Profile" component={FillYourProfile} />
      <Stack.Screen name="Şifrə Dəyişimi" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function MainNavigator({ updateLoginStatus }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
        },
      }}
    >
      <Stack.Screen name="Qaychi.az" component={HomeScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Bildirişlər" component={NotificationScreen} />
      <Stack.Screen name="Profile">
        {(props) => (
          <ProfileScreen {...props} updateLoginStatus={updateLoginStatus} />
        )}
      </Stack.Screen>
      <Stack.Screen name="MyBooking" component={MyBookingScreen} />
      <Stack.Screen name="Profil Ayarları" component={EditProfile} />
      <Stack.Screen name="Detail" component={SaloonDetail} />
      <Stack.Screen name="OTP">
        {(props) => (
          <OtpScreen {...props} updateLoginStatus={updateLoginStatus} />
        )}
      </Stack.Screen>
      <Stack.Screen name="BookNow" component={BookNowScreen} />
      <Stack.Screen
        name="Məxfilik Və Siyasət"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen name="Dəvət Et" component={InviteFriendsScreen} />
      <Stack.Screen name="Təhlükəsizlik" component={SecurityScreen} />
      <Stack.Screen name="Şifrə Dəyişimi" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

export default function AppContainer() {
  const [isLoggedIn, setLoggedIn] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("isLoggedIn");
        if (status) {
          setLoggedIn(JSON.parse(status));
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("Error checking login status:", error);
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const updateLoginStatus = async (status) => {
    setLoggedIn(status);
    try {
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(status));
      setLoading(false);
    } catch (error) {
      console.log("Error saving login status:", error);
      setLoading(false);
    }
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <>
          <MainNavigator updateLoginStatus={updateLoginStatus} />
          <Footer />
        </>
      ) : loading ? (
        <LoginLoaderScreen />
      ) : (
        <WelcomeNavigator updateLoginStatus={updateLoginStatus} />
      )}
    </NavigationContainer>
  );
}

console.disableYellowBox = true;
