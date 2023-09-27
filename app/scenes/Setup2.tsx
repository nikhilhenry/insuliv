import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";
import { RootStackParamList } from "../App";
import { COLORS } from "../constants";
import styles from "../styles/Setup.style";
import Icon from "react-native-vector-icons/FontAwesome5";
const Setup2Screen: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginTop: -100 }}>
        Select the type of diabetes
      </Text>
      <Pressable
        onPress={() => {
          navigation.push("Home");
        }}
        style={{
          backgroundColor: COLORS.secondaryBlueD,
          padding: 15,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: COLORS.backGray, fontSize: 20 }}>
          Type-1 <Icon name="chevron-right" size={18} color={COLORS.backGray} />
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.push("Home");
        }}
        style={{
          backgroundColor: COLORS.secondaryRedD,
          padding: 15,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: COLORS.backGray, fontSize: 20 }}>
          Type-2 <Icon name="chevron-right" size={18} color={COLORS.backGray} />
        </Text>
      </Pressable>
    </View>
  );
};

export default Setup2Screen;
