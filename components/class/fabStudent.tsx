import React, { useMemo, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FAB, TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import { addStudent } from "@/db/controller/StudentController";
import DropDownPicker from "react-native-dropdown-picker";

const FloatingButtonStudentModal = ({
  fetchData,
  classId,
}: {
  fetchData: () => void;
  classId: number;
}) => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({
    name: "",
    gender: "",
    nisn: "",
    classId: classId,
  });

  const [items, setItems] = useState([
    { label: "Male", value: "L" },
    { label: "Female", value: "P" },
  ]);

  const actionStudent = async () => {
    try {
      console.log("Data sebelum insert:", data);

      if (!data.name || !data.gender || !data.nisn) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "All fields are required",
        });
        return;
      }

      const success = await addStudent(
        data.name,
        data.gender,
        data.nisn,
        data.classId
      );
      if (success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Student added successfully",
        });
        fetchData();
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to add student",
        });
      }
    } catch (error) {
      console.log("Error in actionStudent:", error);
    } finally {
      setModalVisible(false);
      setData({ name: "", gender: "", nisn: "", classId: classId });
    }
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        main: {
          flex: 1,
          backgroundColor: color.tabIconDefault,
        },
        fab: {
          position: "absolute",
          right: 20,
          borderRadius: 50,
          bottom: 20,
          backgroundColor: color.tabIconSelected,
        },
        modalContainer: {
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        modalContent: {
          width: "80%",
          padding: 20,
          borderRadius: 20,
          alignSelf: "center",
          backgroundColor: color.tabIconDefault,
        },
        modalText: {
          color: color.tabIconSelected,
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
        },
        modalInput: {
          borderColor: color.tabIconSelected,
          borderWidth: 1,
          width: "100%",
          height: 40,
          paddingHorizontal: 10,
          marginBottom: 10,
          backgroundColor: color.tabIconDefault,
        },
        dropdown: {
          borderColor: color.tabIconSelected,
          borderRadius: 10,
          marginBottom: 10,
        },
        closeButton: {
          marginTop: 15,
          padding: 10,
          width: 80,
          height: 40,
          alignItems: "center",
          backgroundColor: "red",
          borderRadius: 10,
        },
        addButton: {
          marginTop: 15,
          width: 80,
          height: 40,
          padding: 10,
          alignItems: "center",
          backgroundColor: color.tabIconSelected,
          borderRadius: 10,
        },
        closeText: {
          color: "white",
          fontWeight: "bold",
        },
      }),
    [color]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={dynamicStyles.main}
    >
      <FAB
        style={dynamicStyles.fab}
        icon="plus"
        color="white"
        onPress={() => setModalVisible(true)}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={dynamicStyles.modalContainer}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={dynamicStyles.modalContent}>
                <Text style={dynamicStyles.modalText}>Add Student</Text>

                <TextInput
                  style={dynamicStyles.modalInput}
                  placeholder="Student Name..."
                  value={data.name}
                  onChangeText={(value) => setData({ ...data, name: value })}
                />
                <DropDownPicker
                  open={open}
                  style={dynamicStyles.dropdown}
                  value={data.gender}
                  items={items}
                  setOpen={setOpen}
                  setValue={(callback) =>
                    setData((prev) => ({
                      ...prev,
                      gender: callback(prev.gender),
                    }))
                  }
                  setItems={setItems}
                />

                <TextInput
                  style={dynamicStyles.modalInput}
                  placeholder="NISN..."
                  keyboardType="numeric"
                  value={data.nisn}
                  onChangeText={(value) => setData({ ...data, nisn: value })}
                />

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "70%",
                    alignSelf: "center",
                  }}
                >
                  <TouchableOpacity
                    style={dynamicStyles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={dynamicStyles.closeText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={dynamicStyles.addButton}
                    onPress={() => actionStudent()}
                  >
                    <Text style={dynamicStyles.closeText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default FloatingButtonStudentModal;
