import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import { Colors } from "@/constants/Colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

export default function StudentRowItems({
  item,
}: {
  item: { name: string; id: number; gender: string; nisn: string };
}) {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  const meniItemsSize = 60;

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        main: {
          flex: 1,
          borderWidth: 1,
          borderColor: color.tabIconSelected,
          backgroundColor: color.tabIconDefault,
          borderRadius: 10,
          flexDirection: "row",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 5,
        },
      }),
    [color]
  );
  return (
    <View
    //   href={`/class/${item.id}`}
      style={{
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        alignSelf: "center",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={dynamicStyles.main}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome
            name="user"
            size={meniItemsSize}
            color={color.tabIconSelected}
          />
        </View>
        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              color: color.tabIconSelected,
              fontSize: 18,
            }}
          >
            {item.name}
          </Text>
          {/* <Text>{item.gender == "P" ? "Female" : "Male"}</Text> */}
          <Text>NISN : {item.nisn}</Text>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="menu" size={30} color={color.tabIconSelected} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
