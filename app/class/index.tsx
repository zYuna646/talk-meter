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
import { getClasses } from "@/db/controller/ClassController";
import FloatingButtonModal from "@/components/class/fab";
import ClassRowItems from "@/components/class/ClassRowItems";
import { Stack } from "expo-router";
import { Class } from "@/constants/Interface";

export default function index() {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  const [classList, setClassList] = useState<Class[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({ name: "" });
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
      <Stack.Screen
        options={{
          title: "Class",
        }}
      />
      <FlatList
        data={classList}
        style={{ width: "100%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ClassRowItems fetchData={fetchData} item={{ name: item.name, id: item.id }}  setData={setData} setModalVisible={setModalVisible}/>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <FloatingButtonModal
        fetchData={fetchData}
        setData={setData}
        data={data}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </View>
  );
}
