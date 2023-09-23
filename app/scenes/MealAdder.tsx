import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { zodResolver } from "@hookform/resolvers/zod";
import { COLORS, SIZES } from "../constants";
import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Alert,
  Pressable,
  Platform,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "../components/CustomTextInput/CustomTestInput";
import styles from "../styles/AdderForm";
import { SignUpFormSchema, signUpFormSchema } from "../schemas/mealAdderSchema";
import { getReadableValidationErrorMessage } from "../utils/utils";
import { useState } from "react";
const PreListedFood = [
  { label: "SampleFood1", value: "SampleFood1" },
  { label: "SampleFood2", value: "SampleFood2" },
];
const MealAdder: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  const [listOpen, setListOpen] = useState(false);
  const [shouldValidateWithZod, setShouldValidateWithZod] =
    React.useState<boolean>(true);

  const [isCalendarOpenForAndroid, setIsCalendarOpenForAndroid] =
    React.useState<boolean>(false);

  const methods = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      birthDate: new Date(),
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignUpFormSchema> = (data) => {
    console.log(JSON.stringify(data));
  };

  const onError: SubmitErrorHandler<SignUpFormSchema> = (errors, e) => {
    console.log(JSON.stringify(errors));
    Alert.alert("Warning", getReadableValidationErrorMessage(errors));
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <Text style={styles.title}>Add a Meal</Text>
      <View style={styles.root}>
        <FormProvider {...methods}>
          <Controller
            control={methods.control}
            name="preListedFood"
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                zIndex={1000}
                searchable={true}
                arrowIconStyle={{
                  padding: 0,
                }}
                showTickIcon={true}
                containerStyle={{}}
                dropDownContainerStyle={{}}
                style={{}}
                open={listOpen}
                setOpen={() => setListOpen(!listOpen)}
                items={PreListedFood}
                value={value}
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
          <View style={styles.spacing} />
          <Controller
            control={methods.control}
            name="name"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextInput
                  label="Food Name"
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
            control={methods.control}
            name="calories"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 10,
                    alignSelf: "flex-start",
                    width: "30%",
                  }}
                >
                  <Pressable style={styles.counterButtton}>
                    <Icon name="minus-thick" color={COLORS.lightGray} />
                  </Pressable>
                  <TextInput
                    label="Calories"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    errorMessage={error?.message}
                  />
                  <Pressable style={styles.counterButtton}>
                    <Icon name="plus-thick" color={COLORS.lightGray} />
                  </Pressable>
                </View>
              );
            }}
          />
          {/* 
          <Text style={styles.label}>Should validate with zod</Text>

          <Switch
            value={shouldValidateWithZod}
            onChange={(e) => setShouldValidateWithZod(e.nativeEvent.value)}
          /> */}
          <View style={styles.spacing} />

          <Pressable
            onPress={
              shouldValidateWithZod
                ? () => {
                    const currFormValues = methods.getValues();
                    const result = signUpFormSchema.safeParse(currFormValues);

                    if (!result.success) {
                      const formattedError = result.error.format();
                      console.log(JSON.stringify(formattedError));
                      Alert.alert(JSON.stringify(formattedError));
                    } else {
                      Alert.alert("Validation is successful");
                    }
                  }
                : methods.handleSubmit(onSubmit, onError)
            }
            style={styles.button}
          >
            <Text style={{ color: COLORS.lightGray }}>Add Meal</Text>
          </Pressable>
        </FormProvider>
      </View>
    </SafeAreaView>
  );
};

export default MealAdder;
