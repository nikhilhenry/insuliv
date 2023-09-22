import { View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/Fontisto";
import Icon6 from "react-native-vector-icons/FontAwesome5";
import { styles } from "./InfoCardContainer.style";
import InfoCard from "../InfoCard/InfoCard";

const InfoCardContainer = ({}: {}) => {
  return (
    <View style={styles.Infocontainer}>
      <InfoCard
        title="Blood Sugar"
        icon={
          <IconF name="blood-drop" size={36} color={COLORS.primaryGreenD} />
        }
        value={122}
        unit="mg/dL"
        mainColor={COLORS.primaryGreenD}
        secondaryColor={COLORS.primaryGreenL}
      />
      <InfoCard
        title="Heart Rate"
        icon={<Icon name="heart" size={36} color={COLORS.secondaryRedD} />}
        value={69}
        unit="pulse/min"
        mainColor={COLORS.secondaryRedD}
        secondaryColor={COLORS.primaryRedL}
      />
      <InfoCard
        title="Step Count"
        icon={<Icon6 name="walking" size={36} color={COLORS.secondaryBlueD} />}
        value={6920}
        unit="steps"
        mainColor={COLORS.secondaryBlueD}
        secondaryColor={COLORS.primaryBlueL}
      />
      <InfoCard
        title="Pills"
        icon={<Icon6 name="pills" size={36} color={COLORS.secondaryYellowD} />}
        value={1}
        unit="taken"
        mainColor={COLORS.secondaryYellowD}
        secondaryColor={COLORS.primaryYellowL}
      />
    </View>
  );
};

export default InfoCardContainer;
