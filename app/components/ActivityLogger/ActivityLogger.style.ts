import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT } from "../../constants";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 200,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    borderRadius: 7,
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
  bottomholder: {},
});
