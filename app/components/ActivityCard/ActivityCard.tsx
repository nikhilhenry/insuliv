import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconF from "react-native-vector-icons/FontAwesome5";

interface ActivityCardProps {
  activity: {
    category: string;
    data: string;
    id: string;
    recordedAt: Date;
  };
}
const dict = { sports: "basketball", food: "food-apple", pill: "pill" };
const units = { sports: "cal", food: "cal", pill: "taken" };
const dictColor = {
  sports: "primaryOrangeD",
  food: "secondaryRedD",
  pill: "secondaryBlueD",
};
const updown = { sports: "caret-down", food: "caret-up", pill: "" };
const updownColor = {
  sports: "secondaryRedD",
  food: "primaryGreenD",
  pill: "primaryGreenD",
};

const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: COLORS.backGray,
        borderColor: COLORS.lightGray,
        borderBottomWidth: 2,
        padding: 15,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon
            name={dict[activity.category]}
            size={30}
            color={COLORS[dictColor[activity.category]]}
          />
          <IconF
            name={updown[activity.category]}
            size={20}
            color={COLORS[updownColor[activity.category]]}
          />
          <Text
            style={{ fontWeight: "500", fontSize: 15, color: COLORS.darkL }}
          >
            {activity.data}
          </Text>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 12,
              color: COLORS.darkL,
              alignSelf: "flex-end",
              marginBottom: 5,
              marginLeft: -5,
            }}
          >
            {units[activity.category]}
          </Text>
        </View>
        <Text style={{ fontWeight: "800", fontSize: 10, color: COLORS.darkL }}>
          {new Date(activity.recordedAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default ActivityCard;
