import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Class, RowItemsProps, Student } from "@/constants/Interface";
import { getStudentsByClassId } from "@/db/controller/StudentController";
import { deleteClass } from "@/db/controller/ClassController";
import Toast from "react-native-toast-message";

const ClassRowItems: React.FC<RowItemsProps> = ({
  fetchData: getData,
  item,
  setData,
  setModalVisible,
}) => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  const menuItemsSize = 60;
  const [studentList, setStudentList] = useState<Student[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (item.id && !isLoading) {
      fetchData();
    }
  }, [item.id]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const student: Student[] | null = await getStudentsByClassId(
        Number(item.id)
      );
      setStudentList(student);
    } catch (error) {
      console.error("Error fetching class:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: Class) => {
    setData({ name: item.name });
    setMenuVisible(false);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    const res = await deleteClass(item.id);
    if (res) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Class delete successfully",
      });
    }

    getData();
    setMenuVisible(false);
  };

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
          position: "relative", // Menjaga sub-menu tetap dalam container utama
        },
        menuContainer: {
          position: "absolute",
          top: 50,
          right: 10,
          backgroundColor: "white",
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 10, // Memberikan zIndex lebih tinggi agar tidak tertimpa elemen lain
          paddingVertical: 5,
          width: 120,
          zIndex: 999, // Pastikan selalu berada di atas elemen lain
        },
        menuItem: {
          paddingVertical: 10,
          paddingHorizontal: 15,
        },
      }),
    [color]
  );

  return (
    <View style={{ position: "relative", width: "100%" }}>
      {/* Bungkus dalam View agar menu tidak tergeser oleh Link */}
      <Link
        href={`/class/${item.id}`}
        style={{
          flex: 1,
          paddingVertical: 5,
          paddingHorizontal: 10,
          alignSelf: "center",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={dynamicStyles.main}>
          {isLoading ? (
            <ActivityIndicator size="large" color={color.tabIconSelected} />
          ) : (
            <>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="supervisor-account"
                  size={menuItemsSize}
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
                <Text>{studentList?.length} Student</Text>
              </View>

              {/* Tombol Menu */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setMenuVisible(!menuVisible)}
              >
                <MaterialIcons
                  name="menu"
                  size={30}
                  color={color.tabIconSelected}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </Link>

      {/* Sub-Menu dipindahkan ke luar Link */}
      {menuVisible && (
        <View style={dynamicStyles.menuContainer}>
          <TouchableOpacity
            style={{ ...dynamicStyles.menuItem }}
            onPress={() => handleEdit({ name: item.name, id: item.id })}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...dynamicStyles.menuItem }}
            onPress={handleDelete}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ClassRowItems;
