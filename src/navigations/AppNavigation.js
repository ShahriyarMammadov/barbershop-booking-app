import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home/HomeScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import RecipeScreen from "../screens/Recipe/RecipeScreen";
import RecipesListScreen from "../screens/RecipesList/RecipesListScreen";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import IngredientScreen from "../screens/Ingredient/IngredientScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import IngredientsDetailsScreen from "../screens/IngredientsDetails/IngredientsDetailsScreen";
import Footer from "../components/footer";
import ProfileScreen from "../screens/Profile";
import SaloonDetail from "../screens/SaloonDetail";
import WelcomeScreen from "../screens/welcome";
import LoginScreen from "../screens/login";

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
const isLoggedIn = false;

function WelcomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
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
      {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
      <Stack.Screen name="Qaychi.az" component={HomeScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="RecipesList" component={RecipesListScreen} />
      <Stack.Screen name="Ingredient" component={IngredientScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="IngredientsDetails"
        component={IngredientsDetailsScreen}
      />
      <Stack.Screen name="Detail" component={SaloonDetail} />
    </Stack.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      {/* <DrawerStack /> */}
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
