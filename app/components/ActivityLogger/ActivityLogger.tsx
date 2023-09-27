import React, { useState } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import { COLORS, Icons, FONT, SIZES } from "../../constants";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles } from "./ActivityLogger.style";
import type { RootStackParamList } from "../../App";
import Icon from "react-native-vector-icons/Octicons";
import DropDownPicker from "react-native-dropdown-picker";
import ActivityList from "../ActivityList";
const ActivityLogger = ({ navigation }: { navigation: any }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("today");
  const [items, setItems] = useState([
    { label: "today", value: "today" },
    { label: "week", value: "week" },
    { label: "month", value: "month" },
  ]);
  const [openActivity, setOpenActivity] = useState(false);
  const [activityvalue, setActivityvalue] = useState("");
  const [itemsActivity, setItemsActivity] = useState([
    {
      label: "Exercise",
      value: "Exercise",
      icon: () => (
        <Icon name="plus-circle" size={15} color={COLORS.IconColor} />
      ),
    },
    {
      label: "Meal",
      value: "Meal",
      icon: () => (
        <Icon name="plus-circle" size={15} color={COLORS.IconColor} />
      ),
    },
    {
      label: "Pill",
      value: "Pill",
      icon: () => (
        <Icon name="plus-circle" size={15} color={COLORS.IconColor} />
      ),
    },
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
              marginRight: 35,
              padding: 0,
            }}
            showTickIcon={true}
            containerStyle={{
              backgroundColor: "transparent",
              width: 105,
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
              width: 105,
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
          <DropDownPicker
            ArrowUpIconComponent={({ style }) => (
              <Icon name="plus-circle" size={15} color={COLORS.IconColor} />
            )}
            ArrowDownIconComponent={({ style }) => (
              <Icon name="plus-circle" size={15} color={COLORS.IconColor} />
            )}
            showArrowIcon={true}
            placeholder="Add Activity"
            showTickIcon={false}
            containerStyle={{
              backgroundColor: "transparent",
              width: 125,
            }}
            dropDownContainerStyle={{
              backgroundColor: COLORS.backGray,
              borderTopWidth: 0,
              borderColor: COLORS.lightGray,
              borderWidth: 2,
            }}
            style={{
              backgroundColor: "transparent",
              borderWidth: 0,
              width: 125,
            }}
            open={openActivity}
            value={activityvalue}
            items={itemsActivity}
            setOpen={setOpenActivity}
            setValue={() => setActivityvalue("")}
            onSelectItem={(item) => {
              console.log("change page");
              navigation.navigate(`${item.label}Adder`);
            }}
            setItems={setItemsActivity}
          />
        </View>
        <View style={styles.bottomholder}>
          <ActivityList />
        </View>
      </View>
    </View>
  );
};

export default ActivityLogger;
