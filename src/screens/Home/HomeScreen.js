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
import { recipes, dataCategories } from "../../data/dataArrays";
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
    {
      id: 1,
      name: "Hamısı",
      src: require("../../../assets/icons/massage.png"),
    },
    {
      id: 2,
      name: "Keratin",
      src: require("../../../assets/icons/makeup.png"),
    },
    {
      id: 3,
      name: "Masaj",
      src: require("../../../assets/icons/haircut.png"),
    },
    {
      id: 4,
      name: "Populyar",
      src: require("../../../assets/icons/manicure.png"),
    },
    {
      id: 5,
      name: "Bezek",
      src: require("../../../assets/icons/massage.png"),
    },
    {
      id: 6,
      name: "Make Up",
      src: require("../../../assets/icons/massage.png"),
    },
    {
      id: 7,
      name: "Manicure",
      src: require("../../../assets/icons/massage.png"),
    },
    {
      id: 8,
      name: "Dırnaq",
      src: require("../../../assets/icons/massage.png"),
    },
  ];

  const categoryChange = (categoryName) => {
    console.log(categoryName);
    setSelectedCategory(categoryName);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        padding: 5,
        borderRadius: 5,
      }}
      onPress={() => {
        categoryChange(item.name);
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            padding: 18,
            backgroundColor: "#FEF2E0",
            borderRadius: 50,
          }}
        >
          <Image
            source={item.src}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
        <Text
          style={{
            color: "black",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {item.name}
        </Text>
      </View>
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

  // NEARBY YOUR CATEGORY
  const [activeClassId, setActiveClassId] = useState(1);

  const activeClassAdd = (id) => {
    setActiveClassId(id);
  };

  const renderNearbyYourLocation = ({ item }) => (
    <TouchableHighlight
      style={
        item.id === activeClassId
          ? {
              paddingVertical: 8,
              paddingHorizontal: 15,
              backgroundColor: "#FDA62B",
              marginRight: 10,
              borderRadius: 16,
              marginTop: 10,
              marginBottom: 10,
              borderColor: "#FDA62B",
              borderStyle: "solid",
              borderWidth: 1,
            }
          : {
              paddingVertical: 8,
              paddingHorizontal: 15,
              marginRight: 10,
              borderRadius: 16,
              marginTop: 10,
              marginBottom: 10,
              borderColor: "#FDA62B",
              borderStyle: "solid",
              borderWidth: 1,
            }
      }
      onPress={() => {
        activeClassAdd(item.id);
      }}
    >
      <Text
        style={
          item.id === activeClassId
            ? {
                fontWeight: 700,
                color: "white",
              }
            : {
                color: "#FDA62B",
                fontWeight: 700,
              }
        }
      >
        {item.name}
      </Text>
    </TouchableHighlight>
  );

  console.log(dataCategories);

  return (
    <ScrollView
      style={{ width: width, paddingRight: 10, paddingLeft: 10 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#3F51B5"
          title="Refreshing..."
        />
      }
    >
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

      <Text style={{ fontWeight: 700, fontSize: 18 }}>{selectedCategory}</Text>

      <ScrollView horizontal>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecommendedItem}
          horizontal
        />
      </ScrollView>

      {/* HR */}
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          marginTop: 20,
        }}
      />
      {/* HR */}

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <Text style={{ fontWeight: 700, fontSize: 18 }}>
            Nearby Your Location
          </Text>

          <Text
            style={{
              color: "#FB9400",
              fontWeight: 700,
              fontSize: 18,
            }}
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            See All
          </Text>
        </View>

        <ScrollView horizontal>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderNearbyYourLocation}
            horizontal
          />
        </ScrollView>

        {/* Saloon & BrberShop*/}
        {dataCategories.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{
                flexDirection: "row",
                gap: 20,
                justifyContent: "space-between",
                marginVertical: 15,
                marginRight: 20,
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
              >
                <View>
                  <Image
                    source={{ uri: e?.photo_url }}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />
                </View>
                <View>
                  <Text
                    style={{ fontWeight: 700, fontSize: 16, paddingBottom: 8 }}
                  >
                    {e?.name}
                  </Text>
                  <Text style={{ color: "grey", paddingBottom: 10 }}>
                    {e?.location}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 15 }}>
                    <View style={{ flexDirection: "row", gap: 3 }}>
                      <Image
                        source={require("../../../assets/icons/location.png")}
                        style={{ width: 20, height: 20 }}
                      />
                      <Text>{e.locationCount}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../../../assets/icons/star.png")}
                        style={{ width: 20, height: 20 }}
                      />
                      <Text style={{}}>{e?.starCount}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <Image
                  source={require("../../../assets/icons/bookmark.png")}
                  style={{ width: 25, height: 25 }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
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
    </ScrollView>
  );
}
