import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import { TabView, SceneMap } from "react-native-tab-view";
import { Link } from "@react-navigation/native";

export default function HomeScreen(props) {
  const width = Dimensions.get("window").width;
  const { navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // CATEGORIES
  const categories = [
    { id: 1, name: "Saç Kəsimi" },
    { id: 2, name: "Keratin" },
    { id: 3, name: "Masaj Salonları" },
    { id: 4, name: "Populyar Məkanlar" },
    { id: 5, name: "Tövsiyə Edilənlər" },
    { id: 6, name: "Ulduzlu Məkan" },
  ];

  const categoryChange = (categoryName) => {
    console.log(categoryName);
    setSelectedCategory(categoryName);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginTop: 10,
        marginRight: 10,
        marginBottom: 20,
        padding: 10,
        backgroundColor: "black",
        borderRadius: 5,
      }}
      onPress={() => {
        categoryChange(item.name);
      }}
    >
      <Text style={{ color: "white" }}>{item.name}</Text>
    </TouchableOpacity>
  );

  // recommended barbershop
  const [data, setData] = useState([
    {
      id: 1,
      imageURL:
        "https://armariumbackend-production.up.railway.app/images/coverImage-1700315043099-9817746.jpg",
      name: "The Gentleman",
      logoURL: "https://armarium.az/assets/about2-876501f2.jpg",
      isSaatlari: [
        { 1: "10:00 - 22:00" },
        { 2: "10:00 - 22:00" },
        { 3: "10:00 - 22:00" },
        { 4: "10:00 - 22:00" },
        { 5: "10:00 - 22:00" },
        { 6: "12:00 - 18:00" },
        { 6: "Baglidir" },
      ],
    },
    {
      id: 2,
      imageURL:
        "https://armariumbackend-production.up.railway.app/images/coverImage-1700315043099-9817746.jpg",
      name: "The Gentleman",
      logoURL: "https://armarium.az/assets/about2-876501f2.jpg",
      isSaatlari: [
        { 1: "10:00 - 22:00" },
        { 2: "10:00 - 22:00" },
        { 3: "10:00 - 22:00" },
        { 4: "10:00 - 22:00" },
        { 5: "10:00 - 22:00" },
        { 6: "12:00 - 18:00" },
        { 6: "Baglidir" },
      ],
    },
    {
      id: 3,
      imageURL:
        "https://armariumbackend-production.up.railway.app/images/coverImage-1700315043099-9817746.jpg",
      name: "The Gentleman",
      logoURL: "https://armarium.az/assets/about2-876501f2.jpg",
      isSaatlari: [
        "10:00 - 22:00",
        "10:00 - 22:00",
        "10:00 - 22:00",
        "10:00 - 22:00",
        "10:00 - 22:00",
        "12:00 - 18:00",
        "Baglidir",
      ],
    },
  ]);

  const renderRecommendedItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginTop: 10,
        marginRight: 10,
        // padding: 40,
        backgroundColor: "grey",
        borderRadius: 10,
      }}
      onPress={() => {
        categoryChange(item.name);
      }}
    >
      <Image
        source={{ uri: item.imageURL }}
        style={{
          width: width - 90,
          height: 170,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View
        style={{
          padding: 10,
          // paddingBottom: 80,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: item.logoURL }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 15,
            backgroundColor: "black",
          }}
        />
        <Text
          style={{
            color: "white",
            flex: 1,
            flexDirection: "column",
          }}
        >
          {item.name}
          {"\n"}
          <Text style={{ color: "white" }}>10:00 - 20:00</Text>
        </Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 20,
            elevation: 3,
            backgroundColor: "white",
          }}
          // onPress={onPress}
        >
          <Text style={{ color: "black", fontWeight: 700 }}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ width: width, paddingRight: 10, paddingLeft: 10 }}>
      {/* Categories */}
      <Text
        style={{
          fontWeight: 700,
          fontSize: 35,
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        Morning, Shahriyar{" "}
        <Image
          source={require("../../../assets/icons/hello.png")}
          style={{ width: 40, height: 40 }}
        />
      </Text>
      <ScrollView horizontal>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategoryItem}
          horizontal
        />
      </ScrollView>
      <Text>{selectedCategory}</Text>
      <ScrollView horizontal>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecommendedItem}
          horizontal
        />
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <Text>Nearby Your Location </Text>
        <Text
          style={{
            color: "green",
          }}
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          See All
        </Text>
      </View>

      {/* <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3F51B5"
            title="Refreshing..."
          />
        }
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      /> */}
    </View>
  );
}
