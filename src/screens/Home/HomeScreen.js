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
import SaloonCardComponent from "../../components/SallonCard";
import { dataCategories } from "../../data/dataArrays";

export default function HomeScreen(props) {
  const width = Dimensions.get("window").width;
  const { navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Image
          source={require("../../../assets/icon.png")}
          style={{ width: 50, height: 50 }}
        />
      ),
      headerRight: () => (
        <Image
          source={require("../../../assets/icons/notification.png")}
          style={{ width: 25, height: 25, marginRight: 30 }}
        />
      ),
    });
  }, []);

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
  const [data, setData] = useState(dataCategories);

  const renderRecommendedItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginTop: 10,
        marginRight: 10,
        backgroundColor: "grey",
        width: width - 40,
        borderRadius: 10,
        overflow: "hidden",
      }}
      onPress={() => {
        categoryChange(item.name);
        navigation.navigate("Detail", item);
      }}
    >
      <View style={{}}>
        <Image
          source={{ uri: item.photo_url }}
          style={{
            width: 353,
            height: 170,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </View>
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
          source={{ uri: item.photo_url }}
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

  return (
    <ScrollView
      style={{ width: width, paddingRight: 10, paddingLeft: 10 }}
      showsVerticalScrollIndicator={false}
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategoryItem}
          horizontal
        />
      </ScrollView>

      <Text style={{ fontWeight: 700, fontSize: 18 }}>{selectedCategory}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          showsVerticalScrollIndicator={false}
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderNearbyYourLocation}
            horizontal
          />
        </ScrollView>

        {/* Saloon & BrberShop*/}
        <SaloonCardComponent navigation={navigation} />
      </View>

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
          <Text style={{ fontWeight: 700, fontSize: 18 }}>Most Popular</Text>

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

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderNearbyYourLocation}
            horizontal
          />
        </ScrollView>

        {/* Saloon & BrberShop*/}
        <SaloonCardComponent navigation={navigation} />
      </View>
    </ScrollView>
  );
}

{
  /* <FlatList
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
/> */
}
