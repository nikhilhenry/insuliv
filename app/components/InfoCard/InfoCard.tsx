import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { COLORS, Icons, FONT, SIZES } from "../../constants";
import { styles } from "./InfoCard.style";
import Icon from "react-native-vector-icons/Ionicons";
interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  unit: string;
  mainColor: string;
  secondaryColor: string;
}
const InfoCard = ({
  title,
  icon,
  value,
  unit,
  mainColor,
  secondaryColor,
}: InfoCardProps) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: secondaryColor }}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 10, flexGrow: 1 }}>
        <View style={{ justifyContent: "center" }}>{icon}</View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: mainColor, fontWeight: "bold" }}>{title}</Text>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              gap: 3,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: SIZES.xxLarge,
                marginBottom: -5,
              }}
            >
              {value}
            </Text>
            <Text>{unit}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InfoCard;
