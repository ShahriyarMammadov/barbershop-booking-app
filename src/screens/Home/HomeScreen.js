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
  Pressable,
  TextInput,
} from "react-native";
import SaloonCardComponent from "../../components/SallonCard";
import { dataCategories } from "../../data/dataArrays";
import LastVisitedPlaces from "../../components/lastVisitedPlaces";
import TodaysSpecialCarousel from "../../components/specialCarousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import decodeJWT from "../../services/jwtDecode";

export default function HomeScreen(props) {
  // decodeJWT(token);

  const width = Dimensions.get("window").width;
  const { navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tövsiyə Edilənlər");
  const [date, setDate] = useState("");
  const [userData, setUserData] = useState({});
  const [categories, setCategories] = useState({});
  let currentDate = new Date().toString();
  let currentHour = +currentDate.slice(16, 18);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Image
          source={require("../../../assets/icon.png")}
          style={{ width: 40, height: 40, marginLeft: 10 }}
        />
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate("Bildirişlər");
          }}
        >
          <Image
            source={require("../../../assets/icons/notification.png")}
            style={{ width: 25, height: 25, marginRight: 30 }}
          />
        </Pressable>
      ),
    });

    if (6 <= currentHour && currentHour < 12) {
      setDate("Sabahın Xeyir");
    } else if (12 <= currentHour && currentHour <= 17) {
      setDate("Günortan Xeyir");
    } else {
      setDate("Axşamın Xeyir");
    }

    getUserData();
    getCategories();
  }, []);

  const getUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("data");
      setUserData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://qaychi.az/api/Categories/GetAll"
      );

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currentDate);
  console.log(date);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

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
      // onPress={() => {
      //   categoryChange(item.name);
      // }}
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
            source={{ uri: item?.icon }}
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
        // categoryChange(item.name);
        navigation.navigate("Detail", item);
      }}
    >
      <View style={{}}>
        <Image
          source={{ uri: item.photo_url }}
          style={{
            width: 353,
            height: 230,
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
          onPress={() => {
            navigation.navigate("BookNow", item);
          }}
        >
          <Text style={{ color: "black", fontWeight: 700 }}>Rezerv Et</Text>
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
      <Text
        style={{
          fontWeight: 700,
          fontSize: 25,
          paddingTop: 10,
          paddingBottom: 15,
          fontStyle: "italic",
          textShadowColor: "#FB9400",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5,
        }}
      >
        {date}, {userData ? userData?.name : "Isa"}{" "}
        <Image
          source={require("../../../assets/icons/hello.png")}
          style={{ width: 25, height: 25 }}
        />
      </Text>

      {/* SEARCH */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          paddingHorizontal: 20,
          marginBottom: 20,
          backgroundColor: "#FAFAFA",
          borderRadius: 10,
        }}
      >
        <Image
          source={require("../../../assets/icons/search.png")}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
          }}
        />
        <TextInput
          style={{
            flex: 1,
            height: 40,
            paddingLeft: 5,
          }}
          placeholder="Axtarış"
          onChangeText={(searchString) => {
            console.log(searchString);
          }}
        />
        {/* <Image
          source={require("../../../assets/icons/search.png")}
          style={{
            width: 20,
            height: 20,
            marginRight: 5,
            marginLeft: 5,
          }}
        /> */}
      </View>

      <TodaysSpecialCarousel />

      {/* Categories */}
      <View style={{ paddingTop: 15 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategoryItem}
        />
      </View>

      <Text style={{ fontWeight: 700, fontSize: 18 }}>{selectedCategory}</Text>

      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecommendedItem}
          horizontal
        />
      </View>

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
            Sizə Yaxın Məkanlar
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
            Hamısına bax
          </Text>
        </View>

        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderNearbyYourLocation}
            horizontal
          />
        </View>

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
          <Text style={{ fontWeight: 700, fontSize: 18 }}>Məşhur Məkanlar</Text>

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
            Hamısına bax
          </Text>
        </View>

        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderNearbyYourLocation}
            horizontal
          />
        </View>

        {/* Saloon & BrberShop*/}
        <SaloonCardComponent navigation={navigation} />
      </View>

      <LastVisitedPlaces />
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
