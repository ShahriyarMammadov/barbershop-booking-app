import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from "react-native";
import * as Contacts from "expo-contacts";

export default function InviteFriendsScreen() {
  const [contacts, setContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchContacts = async () => {
    try {
      const permission = await Contacts.requestPermissionsAsync();

      if (permission.status === "granted") {
        const { data } = await Contacts.getContactsAsync({});
        setContacts(data);
      } else {
        console.log("Contacts permission denied");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const shareToWhatsApp = (phoneNumber) => {
    const message = "https://qaychi.az";
    const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(whatsappLink).catch((err) =>
      console.error("Error opening WhatsApp:", err)
    );
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
    >
      <View>
        <Text style={{ fontWeight: 700 }}>{item?.name}</Text>
        {item?.phoneNumbers && item.phoneNumbers.length > 0 && (
          <Text style={{ fontWeight: 700, color: "grey", paddingTop: 5 }}>
            {item.phoneNumbers[0]?.number?.toString()}
          </Text>
        )}
      </View>

      {item?.phoneNumbers && item.phoneNumbers.length > 0 && (
        <TouchableOpacity
          style={{
            backgroundColor: "#FB9300",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}
          onPress={() => shareToWhatsApp(item?.phoneNumbers[0]?.number)}
        >
          <Text style={{ fontWeight: 600 }}>Dəvət Et</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchContacts();
    setRefreshing(false);
  };

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3F51B5"
            title="Refreshing..."
          />
        }
        data={contacts}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
      />
    </View>
  );
}
