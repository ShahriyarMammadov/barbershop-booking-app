import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { dataCategories } from "../data/dataArrays";

export default function BookNowScreen(props) {
  const [selected, setSelected] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { navigation, route } = props;
  const item = route.params;

  console.log(item);

  useEffect(() => {
    navigation.setOptions({
      title: "Book Appointment",
    });
  }, []);

  LocaleConfig.locales["az"] = {
    monthNames: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avqust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ],
    monthNames: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avqust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ],
    monthNamesShort: [
      "Yanv.",
      "Févr.",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avqus.",
      "Sent.",
      "Okt.",
      "Noy.",
      "Dek.",
    ],
    dayNames: [
      "Bazar Ertəsi",
      "Çərşəmbə Axşamı",
      "Çərşəmbə",
      "Cümə Axşamı",
      "Cümə",
      "Şənbə",
      "Bazar",
    ],
    dayNamesShort: ["B.E.", "Ç.A.", "Ç.", "C.A.", "C.", "Ş.", "B."],
    today: "Aujourd'hui",
  };

  LocaleConfig.defaultLocale = "az";

  console.log(selected);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderOpenHours = ({ item }) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={{ paddingVertical: 10, paddingHorizontal: 10 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#3F51B5"
          title="Refreshing..."
        />
      }
    >
      <Text style={{ fontWeight: 700, fontSize: 20, paddingVertical: 20 }}>
        Tarix Seçin
      </Text>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
      />

      <Text style={{ fontWeight: 700, fontSize: 20, paddingVertical: 20 }}>
        Saat Seçin
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={item?.openHours}
        renderItem={renderOpenHours}
        keyExtractor={(item, index) => index}
      />
    </ScrollView>
  );
}
