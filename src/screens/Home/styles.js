import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  categoryName: {
    color: "green",
  },
});

export default styles;
