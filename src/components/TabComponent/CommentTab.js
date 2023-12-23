import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function CommentTab({ item, starCount }) {
  const [comment, setComment] = useState("");

  const commentsRender = ({ item }) => {
    return (
      <View style={{ paddingVertical: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Image
              source={{ uri: item?.image_URL }}
              style={{ width: 50, height: 50, borderRadius: 70 }}
            />
            <Text style={{ fontWeight: 700, fontSize: 16 }}>{item?.name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderStyle: "solid",
              borderRadius: 20,
              borderColor: "#FB9400",
              borderWidth: 1,
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}
          >
            <Image
              source={require("../../../assets/icons/star.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text
              style={{
                color: "#FB9400",
              }}
            >
              {item?.starCount}
            </Text>
          </View>
        </View>
        {/* COMMENT */}
        <Text style={{ color: "grey", paddingTop: 10 }}>{item?.comment}</Text>

        {/* STAR DETAILS */}
        <View style={{ flexDirection: "row", gap: 50, paddingTop: 10 }}>
          <TouchableOpacity style={{ flexDirection: "row", gap: 8 }}>
            <Image
              source={require("../../../assets/icons/heart.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text>{item?.likeCount}</Text>
          </TouchableOpacity>
          <Text>{item?.date}</Text>
        </View>
      </View>
    );
  };

  const [rating, setRating] = useState(0);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Text style={{ fontSize: 25 }}>{i <= rating ? "★" : "☆"}</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          paddingVertical: 15,
        }}
      >
        <Image
          source={require("../../../assets/icons/star.png")}
          style={{ width: 25, height: 25 }}
        />
        <Text>{starCount}</Text>
        <Text>({item?.length} reviews)</Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: 700 }}>Rəy Bildirin</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          paddingHorizontal: 20,
          marginBottom: 10,
          marginTop: 20,
          backgroundColor: "#FAFAFA",
          borderRadius: 10,
        }}
      >
        <Image
          source={require("../../../assets/icons/comment.png")}
          style={{
            width: 30,
            height: 30,
            marginRight: 10,
          }}
        />
        <TextInput
          style={{
            flex: 1,
            height: 40,
            paddingLeft: 5,
          }}
          placeholder="Rəyiniz"
          onChangeText={(value) => {
            setComment(value);
          }}
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <View style={{ flexDirection: "row" }}>{renderStars()}</View>
        <Text>Rating: {rating}</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#FB9400",
          padding: 10,
          alignSelf: "baseline",
          marginBottom: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: 700, fontSize: 16 }}>Əlavə Et</Text>
      </TouchableOpacity>

      <FlatList
        data={item}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={commentsRender}
        vertical
      />
    </View>
  );
}
