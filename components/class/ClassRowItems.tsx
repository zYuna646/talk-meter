import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function ClassRowItems({ item }: {item: {name: string, id: string}}) {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  const meniItemsSize = 60;

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        main: {
          flex: 1,
          backgroundColor: color.tabIconDefault,
          borderWidth: 1,
          borderColor: color.tabIconSelected,
          margin: 10,
          height: 70,
          borderRadius: 10,
          padding: 10,
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
    <TouchableOpacity style={dynamicStyles.main}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialIcons
          name="supervisor-account"
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
          {item.name} {item.id}
        </Text>
        <Text>0 Students</Text>
      </View>
      <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MaterialIcons name="menu" size={30} color={color.tabIconSelected} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
