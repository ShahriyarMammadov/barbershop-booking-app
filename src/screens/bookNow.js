import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function BookNowScreen(props) {
  const [selected, setSelected] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { navigation, route } = props;
  const item = route.params;

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

  // ACTIVE CLASS ADD
  const [selectedHours, setSelectedHours] = useState(1);

  const activeClassAdd = (date) => {
    setSelectedHours(date);
  };

  const renderOpenHours = ({ item }) => {
    return (
      <TouchableOpacity
        style={
          item === selectedHours
            ? {
                padding: 10,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#FB9400",
                marginHorizontal: 10,
                borderRadius: 20,
                backgroundColor: "#FB9400",
              }
            : {
                padding: 10,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#FB9400",
                marginHorizontal: 10,
                borderRadius: 20,
              }
        }
        onPress={() => {
          activeClassAdd(item);
        }}
      >
        <Text
          style={
            item === selectedHours ? { color: "white" } : { color: "#FB9400" }
          }
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  // RENDER SPECIALIST
  const [selectedSpecialist, setSelectedSpecialist] = useState(1);

  const renderSpecialist = ({ item }) => {
    return (
      <TouchableOpacity
        style={
          item?.name === selectedSpecialist
            ? {
                padding: 15,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#FB9400",
                marginHorizontal: 10,
                borderRadius: 20,
                marginBottom: 40,
              }
            : {
                padding: 15,
                marginHorizontal: 10,
                borderRadius: 20,
              }
        }
        onPress={() => {
          setSelectedSpecialist(item?.name);
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: item.profilePhoto }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
        </View>

        <Text
          style={
            item?.name === selectedSpecialist
              ? {
                  color: "#FB9400",
                  fontWeight: 700,
                  fontSize: 16,
                  textAlign: "center",
                  paddingVertical: 8,
                }
              : {
                  color: "black",
                  fontWeight: 700,
                  fontSize: 16,
                  textAlign: "center",
                  paddingVertical: 8,
                }
          }
        >
          {item.name}
        </Text>

        <Text
          style={{
            color: "grey",
            fontWeight: 700,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {item.job}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={{ marginVertical: 10, paddingHorizontal: 10 }}
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

      <Text style={{ fontWeight: 700, fontSize: 20, paddingVertical: 20 }}>
        Mütəxəssis Seçin
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={item?.specialist}
        renderItem={renderSpecialist}
        keyExtractor={(item, index) => index}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#FB9400",
          paddingVertical: 18,
          borderRadius: 50,
          marginBottom: 15,
        }}
        onPress={() => {}}
      >
        <Text style={{ textAlign: "center", fontWeight: 700, fontSize: 18 }}>
          Rezerv Et
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
