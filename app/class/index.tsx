import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Class, getClasses } from "@/db/controller/ClassController";
import FloatingButtonModal from "@/components/class/fab";
import ClassRowItems from "@/components/class/ClassRowItems";

export default function index() {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  const [classList, setClassList] = useState<Class[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getClasses();
    console.log(data);
    setClassList(data);
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        main: {
          flex: 1,
          backgroundColor: color.tabIconDefault,
        },
      }),
    [color]
  );

  return (
    <View style={dynamicStyles.main}>
      <FlatList
        data={classList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ClassRowItems item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <FloatingButtonModal fetchData={fetchData} />
    </View>
  );
}
