import React from "react";
import {
  ImageBackground,
  Text,
  View,
} from "react-native";
import { userData } from "../data/dataArrays";

export default function LastVisitedPlaces() {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontWeight: "700", fontSize: 18, paddingVertical: 15 }}>
        Sonuncu Ziyarət Etdiyiniz Məkanlar
      </Text>
      {userData?.lastVisitedPlaces?.map((visit) =>
        Object.entries(visit)?.map(([date, places]) => (
          <React.Fragment key={date}>
            <Text style={{ fontWeight: "700", marginVertical: 10 }}>
              {date}
            </Text>
            {places.map((e) => (
              <ImageBackground
                key={e?.name}
                source={{ uri: e?.photo_url }}
                resizeMode="cover"
                style={{ marginBottom: 15 }}
              >
                <View
                  style={{
                    backgroundColor: "#000000c0",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      lineHeight: 70,
                      fontWeight: "bold",
                    }}
                  >
                    {e.name}
                  </Text>
                  <Text style={{ color: "white" }}>{e?.location}</Text>

                  <Text
                    style={{ color: "white", color: "#FB9400", paddingTop: 8 }}
                  >
                    Rəyiniz:{" "}
                    {e?.yourComment ? e?.yourComment : "Rəy Bildirməmişsiniz."}
                  </Text>
                </View>
              </ImageBackground>
            ))}
          </React.Fragment>
        ))
      )}
    </View>
  );
}
