import {
  View,
  Text,
  useColorScheme,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useEffect, useMemo, useState } from "react";
import { getClassById } from "@/db/controller/ClassController";
import { Class, Student } from "@/constants/Interface";
import { getStudentsByClassId } from "@/db/controller/StudentController";
import FloatingButtonStudentModal from "@/components/class/fabStudent";
import StudentRowItems from "@/components/class/StudentRowItems";

const DetailPage = () => {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const [classItem, setClassItem] = useState<Class | null>(null);
  const [studentList, setStudentList] = useState<Student[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (id && !isLoading) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res: Class | null = await getClassById(Number(id));
      const student: Student[] | null = await getStudentsByClassId(Number(id));
      console.log(student);

      setStudentList(student);
      setClassItem(res);
    } catch (error) {
      console.error("Error fetching class:", error);
    } finally {
      setIsLoading(false);
    }
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
          title: classItem?.name ?? "Loading...",
        }}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color={color.tabIconSelected} />
      ) : classItem ? (
        <FlatList
          data={studentList}
          style={{ width: "100%" }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <StudentRowItems
              item={{ name: item.name, id: item.id, gender: item.gender ,nisn: item.nisn}}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={{ color: color.text }}>Class not found</Text>
      )}
      <FloatingButtonStudentModal fetchData={fetchData} classId={Number(id)} />
    </View>
  );
};

export default DetailPage;
