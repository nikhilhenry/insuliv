import { View, Text, ActivityIndicator } from "react-native";
import { COLORS, SIZES } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/Fontisto";
import Icon6 from "react-native-vector-icons/FontAwesome5";
import { styles } from "./InfoCardContainer.style";
import InfoCard from "../InfoCard/InfoCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const InfoCardContainer = () => {
  const query = useQuery({
    queryKey: ["meta-summary"],
    queryFn: getMetaSummary,
  });

  return (
    <View style={styles.Infocontainer}>
      {query.isSuccess ? (
        <>
          <InfoCard
            title="Blood Sugar"
            icon={
              <IconF name="blood-drop" size={36} color={COLORS.primaryGreenD} />
            }
            value={query.data.bloodSugar}
            unit="mg/dL"
            mainColor={COLORS.primaryGreenD}
            secondaryColor={COLORS.primaryGreenL}
          />
          <InfoCard
            title="Heart Rate"
            icon={<Icon name="heart" size={36} color={COLORS.secondaryRedD} />}
            value={query.data.heartRate}
            unit="pul/min"
            mainColor={COLORS.secondaryRedD}
            secondaryColor={COLORS.primaryRedL}
          />
          <InfoCard
            title="Step Count"
            icon={
              <Icon6 name="walking" size={36} color={COLORS.secondaryBlueD} />
            }
            value={query.data.steps}
            unit="steps"
            mainColor={COLORS.secondaryBlueD}
            secondaryColor={COLORS.primaryBlueL}
          />
          <InfoCard
            title="Pills"
            icon={
              <Icon6 name="pills" size={36} color={COLORS.secondaryYellowD} />
            }
            value={query.data.pills}
            unit="taken"
            mainColor={COLORS.secondaryYellowD}
            secondaryColor={COLORS.primaryYellowL}
          />
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const getMetaSummary = async () => {
  try {
    const result = await fetch(
      "https://apollo-web-th7i.onrender.com/api/meta/summary"
    );

    const data = (await result.json()) as {
      heartRate: number;
      steps: number;
      bloodSugar: 122;
      pills: 2;
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default InfoCardContainer;
