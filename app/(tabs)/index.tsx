import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useMemo } from "react";
import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import DashboardMenu from "@/components/dashboard/dashboardMenu";
import { router } from "expo-router";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  const meniItemsSize = 30;

  const menuItems = [
    {
      name: "Performance",
      icon: () => (
        <FontAwesome6
          name="chart-simple"
          size={meniItemsSize}
          color={color.tabIconDefault}
        />
      ),
      onclick: () =>
        router.navigate("../performance", { relativeToDirectory: true }),
    },
    {
      name: "Class",
      icon: () => (
        <MaterialIcons
          name="supervisor-account"
          size={meniItemsSize}
          color={color.tabIconDefault}
        />
      ),
      onclick: () => router.navigate("../class", { relativeToDirectory: true }),
    },
    {
      name: "History",
      icon: () => (
        <FontAwesome5
          name="history"
          size={meniItemsSize}
          color={color.tabIconDefault}
        />
      ),
      onclick: () =>
        router.navigate("../history", { relativeToDirectory: true }),
    },
  ];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        main: {
          flex: 1,
          backgroundColor: color.tabIconDefault,
        },
        top: {
          flex: 2,
          backgroundColor: color.tabIconSelected,
          borderBottomStartRadius: 50,
          borderBottomEndRadius: 50,
          justifyContent: "center",
        },
        bottom: { flex: 3, backgroundColor: color.tabIconDefault },
        bottom_top: {
          justifyContent: "center",
          flex: 1,
          alignSelf: "center",
          alignItems: "center",
        },
        bottom_bot: {
          flex: 1,
          marginRight: "15%",
          marginLeft: "15%",
          flexDirection: "row",
          justifyContent: "space-between",
        },
        record: {
          backgroundColor: color.tabIconSelected,
          width: 100,
          height: 100,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 5,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [color]
  );
  return (
    <View style={dynamicStyles.main}>
      <View style={dynamicStyles.top}>
        <Image
          source={require("../../assets/icon/home.png")}
          style={{
            width: 150,
            height: 150,
            alignSelf: "center",
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={dynamicStyles.bottom}>
        <View style={dynamicStyles.bottom_top}>
          <TouchableOpacity
            style={dynamicStyles.record}
            onPress={() =>
              router.navigate("../record", { relativeToDirectory: true })
            }
          >
            <Ionicons
              name="mic-outline"
              size={50}
              color={color.tabIconDefault}
            />
            <Text style={{ color: color.tabIconDefault, fontWeight: "bold" }}>
              Record
            </Text>
          </TouchableOpacity>
        </View>
        <View style={dynamicStyles.bottom_bot}>
          {menuItems.map((item, index) => (
            <DashboardMenu
              key={item.name}
              icon={item.icon}
              name={item.name}
              onClick={item.onclick}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
