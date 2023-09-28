import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";
import { RootStackParamList } from "../App";
import { COLORS } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "../components/CustomTextInput/CustomTestInput";
import styles from "../styles/Setup.style";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
const Setup1Screen: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {},
  } = useForm({
    defaultValues: {
      Name: "",
      Age: 18,
      Weight: 40,
      Height: 165,
      Gender: "M",
      Type_of_Diabetes: "Type-1",
    },
  });
  const Gender_types = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
    { label: "Others", value: "O" },
  ];
  const Type_of_Diabetes = [
    { label: "Type-1", value: "1" },
    { label: "Type-2", value: "2" },
  ];
  const [listOpen, setListOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="Name"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <TextInput
              style={styles.textinput}
              placeholder="Enter your full name"
              label="Full Name"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              errorMessage={error?.message}
            />
          );
        }}
      />
      <View style={styles.spacing} />
      <Controller
        control={control}
        name="Age"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 5,
                justifyContent: "center",
                width: "20%",
              }}
            >
              <Pressable
                style={styles.counterButtton}
                onPress={() => setValue("Age", getValues("Age") - 1)}
              >
                <IconM name="minus-thick" size={15} color={COLORS.lightGray} />
              </Pressable>
              <TextInput
                style={styles.textinput}
                label="Age"
                onBlur={onBlur}
                keyboardType="numeric"
                value={value.toString()}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
              <Pressable
                style={styles.counterButtton}
                onPress={() => setValue("Age", getValues("Age") + 1)}
              >
                <IconM name="plus-thick" size={15} color={COLORS.lightGray} />
              </Pressable>
            </View>
          );
        }}
      />
      <View style={styles.spacing} />
      <Controller
        control={control}
        name="Weight"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 5,
                justifyContent: "center",
                width: "20%",
              }}
            >
              <Pressable
                style={styles.counterButtton}
                onPress={() => setValue("Weight", getValues("Weight") - 1)}
              >
                <IconM name="minus-thick" size={15} color={COLORS.lightGray} />
              </Pressable>
              <TextInput
                style={styles.textinput}
                label="Weight (kg)"
                onBlur={onBlur}
                keyboardType="numeric"
                value={value.toString()}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
              <Pressable
                style={styles.counterButtton}
                onPress={() => setValue("Weight", getValues("Weight") + 1)}
              >
                <IconM name="plus-thick" size={15} color={COLORS.lightGray} />
              </Pressable>
            </View>
          );
        }}
      />
      <View style={styles.spacing} />
      <Controller
        control={control}
        name="Height"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 5,
                justifyContent: "center",
                width: "20%",
              }}
            >
              <Pressable
                style={styles.counterButtton}
                onPress={() => setValue("Height", getValues("Height") - 1)}
              >
                <IconM name="minus-thick" size={15} color={COLORS.lightGray} />
              </Pressable>
              <TextInput
                style={styles.textinput}
                label="Height (cm)"
                onBlur={onBlur}
                keyboardType="numeric"
                value={value.toString()}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
              <Pressable
                style={styles.counterButtton}
                onPress={() => setValue("Height", getValues("Height") + 1)}
              >
                <IconM name="plus-thick" size={15} color={COLORS.lightGray} />
              </Pressable>
            </View>
          );
        }}
      />
      <View style={styles.spacing} />
      <Controller
        control={control}
        name="Gender"
        render={({ field: { onChange, value } }) => (
          <DropDownPicker
            arrowIconStyle={{
              padding: 0,
            }}
            showTickIcon={true}
            containerStyle={{}}
            dropDownContainerStyle={{
              backgroundColor: COLORS.lightGray,
              borderWidth: 0,
            }}
            style={{
              backgroundColor: COLORS.lightGray,
              borderColor: COLORS.lightGray,
            }}
            open={listOpen}
            setOpen={() => setListOpen(!listOpen)}
            value={value}
            items={Gender_types}
            setValue={(item) => onChange(item)}
          />
        )}
        rules={{
          required: {
            value: false,
            message: "Please fill out all required fields.",
          },
        }}
      />
      <Pressable
        onPress={() => {
          navigation.push("Setup2");
        }}
        style={{
          backgroundColor: COLORS.secondaryBlueD,
          padding: 15,
          borderRadius: 5,
          marginTop: 50,
        }}
      >
        <Text
          style={{ color: COLORS.lightGray, fontSize: 15, fontWeight: "bold" }}
        >
          Next <Icon name="chevron-right" size={15} color={COLORS.lightGray} />
        </Text>
      </Pressable>
    </View>
  );
};

export default Setup1Screen;
