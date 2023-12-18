import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { userData } from "../data/dataArrays";

export default function BookNowScreen(props) {
  const [selected, setSelected] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [success, setSuccess] = useState(false);
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
        style={{
          padding: 10,
          paddingHorizontal: 20,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#FB9400",
          marginHorizontal: 10,
          borderRadius: 20,
          backgroundColor: item === selectedHours ? "#FB9400" : "transparent",
        }}
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
        style={{
          padding: 15,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#FB9400",
          marginHorizontal: 10,
          borderColor:
            item?.name === selectedSpecialist ? "#FB9400" : "transparent",
          borderRadius: 20,
          marginBottom: 10,
        }}
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

  // SPECIAL PACKAGE
  const [selectedService, setSelectedService] = useState([]);

  console.log(selectedService);

  const renderSpecialPrice = ({ item }) => {
    const isSelectedServices = selectedService.includes(item?.name);

    return (
      <TouchableOpacity
        key={item?.name.toString()}
        style={{
          flexDirection: "row",
          padding: isSelectedServices ? 10 : 0,
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 15,
          borderStyle: "solid",
          borderColor: isSelectedServices ? "#FB9400" : "transparent",
          borderWidth: 1,
          borderRadius: 15,
        }}
        onPress={() => {
          if (isSelectedServices) {
            setSelectedService(selectedService.filter((e) => e !== item?.name));
          } else {
            setSelectedService([...selectedService, item?.name]);
          }
        }}
      >
        <Text style={{ fontWeight: 700 }}>{item?.name}</Text>
        <Text style={{ color: "grey" }}>{item?.price} ₼</Text>
      </TouchableOpacity>
    );
  };

  // SERVİCES
  const [sliceServices, setSliceServices] = useState(10);

  const renderServices = ({ item }) => {
    const isSelectedServices = selectedService.includes(item?.service);

    return (
      <TouchableOpacity
        key={item?.service?.toString()}
        style={{
          flexDirection: "row",
          padding: isSelectedServices ? 10 : 0,
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 15,
          borderStyle: "solid",
          borderColor: isSelectedServices ? "#FB9400" : "transparent",
          borderWidth: 1,
          borderRadius: 15,
        }}
        onPress={() => {
          if (isSelectedServices) {
            setSelectedService(
              selectedService.filter((e) => e !== item?.service)
            );
          } else {
            setSelectedService([...selectedService, item?.service]);
          }
        }}
      >
        <Text style={{ fontWeight: 700 }}>{item?.service}</Text>
        <Text style={{ color: "grey" }}>{item?.price} ₼</Text>
      </TouchableOpacity>
    );
  };

  // MODAL
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
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

      <Text style={{ fontWeight: 700, fontSize: 20, paddingVertical: 20 }}>
        Xidmət Seçin
      </Text>

      <Text
        style={{
          fontWeight: 600,
          fontSize: 16,
          paddingBottom: 15,
          color: "#FB9400",
          textAlign: "center",
        }}
      >
        Xüsusi Təkliflər
      </Text>

      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={item?.package}
        renderItem={renderSpecialPrice}
        keyExtractor={(item, index) => index}
      />

      <Text
        style={{
          fontWeight: 600,
          fontSize: 16,
          paddingVertical: 15,
          color: "#FB9400",
          textAlign: "center",
        }}
      >
        Digər Təkliflər
      </Text>

      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={item?.services?.slice(0, sliceServices)}
        renderItem={renderServices}
        keyExtractor={(item, index) => index.toString()}
      />

      {item?.services.length > sliceServices ? (
        <TouchableOpacity
          onPress={() => {
            setSliceServices((prev) => prev + 10);
          }}
        >
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              paddingVertical: 10,
              paddingBottom: 30,
              color: "#FB9400",
            }}
          >
            Daha Çox
          </Text>
        </TouchableOpacity>
      ) : (
        ""
      )}

      <TouchableOpacity
        style={{
          backgroundColor: "#FB9400",
          paddingVertical: 15,
          borderRadius: 50,
          marginBottom: 15,
        }}
        onPress={() => {
          if (selectedSpecialist.length === 0 || selectedService.length === 0) {
            Alert.alert("Xəta", "Zəhmət olmasa Xanaları Düzgün seçin", [
              {
                text: "OK",
                onPress: () => {
                  console.log("cancel");
                },
                style: "cancel",
              },
            ]);
          } else {
            setModalVisible(true);
          }
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 18,
            color: "white",
          }}
        >
          Rezerv Et
        </Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection="down"
        onSwipeComplete={closeModal}
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {success ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Image
              source={require("../../assets/icons/success.png")}
              style={{ width: 200, height: 200 }}
            />
            <Text
              style={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
                color: "#FB9400",
                paddingVertical: 20,
              }}
            >
              Uğurla Rezerv Edildi
            </Text>
            <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
              Xahiş olunur rezerv etdiyiniz tarixdə rezerv olunan məkandə
              olasınız.
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Detail", item);
              }}
              style={{ paddingVertical: 20 }}
            >
              <Text
                style={{
                  backgroundColor: "#FB9400",
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  fontSize: 18,
                  fontWeight: 700,
                  marginVertical: 30,
                }}
              >
                Bağla
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableWithoutFeedback>
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 15,
                  paddingVertical: 80,
                }}
              >
                <View>
                  <Text style={{ paddingVertical: 20, color: "grey" }}>
                    Bərbərxana / Salon:{" "}
                  </Text>
                  <Text style={{ color: "grey" }}>Ünvan: </Text>
                  <Text style={{ paddingVertical: 20, color: "grey" }}>
                    Adınız:{" "}
                  </Text>
                  <Text style={{ color: "grey" }}>Əlaqə Nömrəniz: </Text>
                  <Text style={{ paddingVertical: 20, color: "grey" }}>
                    Tarix:{" "}
                  </Text>
                  <Text style={{ color: "grey" }}>Rezerv ediləcək Saat: </Text>
                  <Text style={{ paddingVertical: 20, color: "grey" }}>
                    Mütəxəssis:{" "}
                  </Text>
                </View>
                <View>
                  <Text style={{ paddingVertical: 20, fontWeight: 700 }}>
                    {item?.name}
                  </Text>
                  <Text style={{ fontWeight: 700 }}>{item?.location}</Text>
                  <Text style={{ paddingVertical: 20, fontWeight: 700 }}>
                    {userData?.fullName}
                  </Text>
                  <Text style={{ fontWeight: 700 }}>
                    +{userData?.phoneNumber}
                  </Text>
                  <Text style={{ paddingVertical: 20, fontWeight: 700 }}>
                    {selected ? selected : ""}
                  </Text>
                  <Text style={{ fontWeight: 700 }}>
                    {selectedHours ? selectedHours : ""}
                  </Text>
                  <Text style={{ paddingVertical: 20, fontWeight: 700 }}>
                    {selectedSpecialist ? selectedSpecialist : ""}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  padding: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity onPress={closeModal}>
                  <Text
                    style={{
                      paddingVertical: 15,
                      paddingHorizontal: 30,
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    Imtina et
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSuccess(true);
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: "#FB9400",
                      paddingVertical: 15,
                      paddingHorizontal: 30,
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    Təsdiqlə
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          </TouchableWithoutFeedback>
        )}
      </Modal>
    </ScrollView>
  );
}
// onPress={closeModal}
