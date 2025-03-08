import React, { useMemo } from "react";
import { TouchableOpacity, StyleSheet, useColorScheme, Text } from "react-native";
import { Colors } from "@/constants/Colors";

export default function DashboardMenu({ icon: Icon, onClick, name }: { icon: any; onClick: any, name:any }) {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        main: {
          backgroundColor: color.tabIconSelected,
          justifyContent: "center",
          alignItems: "center",
          width:68,
          height:68,
          borderRadius:10
        },
      }),
    [color]
  );

  return (
    <TouchableOpacity style={dynamicStyles.main} onPress={onClick}>
      {Icon && <Icon />}
      <Text style={{textAlign:'center', fontSize:10, color:color.tabIconDefault}}>{name}</Text>
    </TouchableOpacity>
  );
}
