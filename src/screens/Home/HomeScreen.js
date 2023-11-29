import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  RefreshControl,
  Pressable,
} from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
// import { getCategoryName } from "../../data/MockDataAPI";
import { TextInput } from "react-native-gesture-handler";
import {
  getCategoryName,
  getRecipesByRecipeName,
  getRecipesByCategoryName,
  getRecipesByIngredientName,
} from "../../data/MockDataAPI";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
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

  // SEARCH
  const handleSearch = (text) => {
    setValue(text);
    var recipeArray1 = getRecipesByRecipeName(text);
    var recipeArray2 = getRecipesByCategoryName(text);
    var recipeArray3 = getRecipesByIngredientName(text);
    var aux = recipeArray1.concat(recipeArray2);
    var recipeArray = [...new Set(aux)];

    if (text == "") {
      setData([]);
    } else {
      setData(recipeArray);
    }
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require("../../../assets/icons/search.png")}
        />
        <TextInput
          style={styles.searchInput}
          onChangeText={handleSearch}
          value={value}
        />
        <Pressable onPress={() => handleSearch("")}>
          <Image
            style={styles.searchIcon}
            source={require("../../../assets/icons/close.png")}
          />
        </Pressable>
      </View>
      <FlatList
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
      />
    </View>
  );
}
