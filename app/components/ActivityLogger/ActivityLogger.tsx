import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { COLORS, Icons, FONT, SIZES } from "../../constants";
import { styles } from "./ActivityLogger.style";
import Icon from "react-native-vector-icons/Octicons";
import DropDownPicker from "react-native-dropdown-picker";
const ActivityLogger = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("today");
  const [items, setItems] = useState([
    { label: "today", value: "today" },
    { label: "week", value: "week" },
    { label: "month", value: "month" },
  ]);
  return (
    <View style={{ flex: 1, gap: 10 }}>
      <Text style={{ fontWeight: "bold", color: COLORS.dark }}>
        Activity Log
      </Text>
      <View style={styles.container}>
        <View style={styles.topheader}>
          <DropDownPicker
            arrowIconStyle={{
              marginRight: 10,
              padding: 0,
            }}
            showTickIcon={true}
            containerStyle={{
              backgroundColor: "transparent",
              width: 100,
            }}
            dropDownContainerStyle={{
              backgroundColor: COLORS.backGray,
              borderTopWidth: 0,
              borderColor: COLORS.lightGray,
              borderWidth: 2,

              marginLeft: -5,
            }}
            style={{
              backgroundColor: "transparent",
              borderWidth: 0,
              width: 100,
              padding: 0,
              paddingHorizontal: 0,
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={(value) => {
              console.log("Value changed to ", value);
            }}
          />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 5,
              alignItems: "flex-end",
              borderColor: COLORS.lightGray,
              borderWidth: 2,
              borderRadius: 5,
              padding: 5,
            }}
          >
            <Text>add activity</Text>
            <Icon name="plus-circle" size={15} color={COLORS.IconColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomholder}></View>
      </View>
    </View>
  );
};

export default ActivityLogger;
