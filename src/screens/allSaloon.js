import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableHighlight,
} from "react-native";
import BackButton from "../components/BackButton/BackButton";
import { dataCategories } from "../data/dataArrays";
import SaloonCardComponent from "../components/SallonCard";
import axios from "axios";
import AnimatedSkeletonComponent from "../components/skeleton";

export default function AllSaloonScreen({ navigation, route }) {
  const { categoryID, categoryName, subCategory } = route?.params;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate("Bildirişlər");
          }}
        >
          <Image
            source={require("../../assets/icons/notification.png")}
            style={{ width: 25, height: 25, marginRight: 30 }}
          />
        </Pressable>
      ),
      headerTransparent: false,
      title: categoryName,
    });

    getData();
  }, []);

  console.log(categoryID, categoryName);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://qaychi.az/api/Stories/Stories?CategoryId=${categoryID}`
      );

      setData(data);

      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(data);

  const onRefresh = () => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  };

  //   RENDER SUBCATEGORY
  const [activeClassId, setActiveClassId] = useState(1);

  const activeClassAdd = (id) => {
    setActiveClassId(id);
  };

  console.log(subCategory);

  const renderNearbyYourLocation = ({ item }) => (
    <TouchableHighlight
      style={{
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: item.id === activeClassId ? "#FDA62B" : "transparent",
        marginRight: 10,
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "#FDA62B",
        borderStyle: "solid",
        borderWidth: 1,
      }}
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

  return loading ? (
    <AnimatedSkeletonComponent isLoading={true} screenName={"allSaloon"} />
  ) : (
    <ScrollView
      style={{ paddingHorizontal: 10 }}
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
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={subCategory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNearbyYourLocation}
      />

      <SaloonCardComponent
        renderData={dataCategories}
        navigation={navigation}
      />

      <SaloonCardComponent
        renderData={dataCategories}
        navigation={navigation}
      />
    </ScrollView>
  );
}
