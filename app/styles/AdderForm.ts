import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";
const styles = StyleSheet.create({
  textinput: {
    width: "100%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    padding: 10,
  },
  counterButtton: {
    width: 45,
    height: 45,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: COLORS.dark,
    justifyContent: "center",
    marginBottom: 5,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 2,
    backgroundColor: COLORS.dark,
  },
  root: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    color: COLORS.dark,
    marginBottom: 6,
    fontSize: 18,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    textAlign: "center",
  },
  dateWrapper: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  dateTimePicker: {
    alignSelf: "flex-start",
  },
  errorMessageText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  genderOptionText: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  spacing: {
    marginBottom: 24,
  },
});

export default styles;
