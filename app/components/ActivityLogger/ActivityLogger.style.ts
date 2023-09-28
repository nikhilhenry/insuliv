import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT } from "../../constants";
export const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    borderRadius: 7,
    marginTop: -80,
  },
  topheader: {
    width: "100%",
    height: 50,
    borderBottomWidth: 2,
    borderColor: COLORS.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bottomholder: {
    height: 290,
  },
});
