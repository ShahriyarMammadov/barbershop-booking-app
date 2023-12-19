import React from "react";
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

// const MyModule = NativeModules.MyModule;

// const eventEmitter = new NativeEventEmitter(MyModule);

const Stack = createStackNavigator();

isLoggedIn = true;

function WelcomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="loginEmail" component={LoginWithEmail} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="Fill Your Profile" component={FillYourProfile} />
    </Stack.Navigator>
  );
}

function MainNavigator() {
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
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyBooking" component={MyBookingScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Detail" component={SaloonDetail} />
      <Stack.Screen name="BookNow" component={BookNowScreen} />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Invite Friends" component={InviteFriendsScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
    </Stack.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <>
          <MainNavigator />
          <Footer />
        </>
      ) : (
        <WelcomeNavigator />
      )}
    </NavigationContainer>
  );
}

console.disableYellowBox = true;
