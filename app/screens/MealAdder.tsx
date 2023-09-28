import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { COLORS, SIZES } from "../constants";
import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { TextInput } from "../components/CustomTextInput/CustomTestInput";
import styles from "../styles/AdderForm";
import { useState, useEffect } from "react";
import FoodData from "../food_nutrition_db.json";
const Serving_types = [
  { label: "Cup", value: "Cup" },
  { label: "Piece", value: "Piece" },
  { label: "Slice", value: "Slice" },
  { label: "Bowl", value: "Bowl" },
  { label: "Serving", value: "Serving" },
];

const handlefood = (food: any) => {
  fetch("https://apollo-web-th7i.onrender.com/api/food/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(food),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err))
    .then((val) => {
      console.log(val);
    });
};
const MealAdder: React.FC<NativeStackScreenProps<RootStackParamList>> = ({
  navigation,
}) => {
  useEffect(() => {
    let foodlist: {
      label: string;
      value: string;
    }[] = [];
    for (var i = 0; i < FoodData.length; i++) {
      foodlist.push({ label: FoodData[i].Name, value: FoodData[i].Name });
    }
    setPreListedFood(() => foodlist);
  }, []);

  const [listOpen, setListOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [PreListedFood, setPreListedFood] = useState([
    { label: "SampleFood1", value: "SampleFood1" },
  ]);
  const onSubmit = () => {
    let foodname = getValues("foodName");
    let calories = getValues("calories");
    let carbs = getValues("carbs");
    let fats = getValues("fats");
    let protein = getValues("protein");
    let fiber = getValues("fiber");
    let serving_g = getValues("serving_g");
    let serving_quant = getValues("serving_quant");
    let serving_string = getValues("serving_string");
    if (foodname && calories && carbs && fats && protein && fiber) {
      let food = {
        Name: foodname,
        Calories: calories,
        Carbs: carbs,
        Fats: fats,
        Protein: protein,
        Fiber: fiber,
        Serving_g: serving_g,
        Serving_quant: serving_quant,
        Serving_string: serving_string,
        Category: "fun",
      };
      handlefood(food);
    }
    navigation.navigate("Home");
  };
  const fillform = (foodname: string | undefined) => {
    if (foodname) {
      for (var i = 0; i < FoodData.length; i++) {
        if (FoodData[i].Name == foodname) {
          setValue("foodName", FoodData[i].Name);
          setValue("calories", String(FoodData[i].Calories));
          setValue("carbs", String(FoodData[i].Carbs));
          setValue("fats", String(FoodData[i].Fats));
          setValue("protein", String(FoodData[i].Protein));
          setValue("fiber", String(FoodData[i].Fiber));
          setValue("serving_g", String(FoodData[i].Serving_g));
          setValue("serving_quant", String(FoodData[i].Serving_quant));
          setValue("serving_string", String(FoodData[i].Serving_string));
        }
      }
    }
  };
  const onError = () => {
    Alert.alert("Warning");
  };
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {},
  } = useForm({
    defaultValues: {
      preListedFood: "",
      foodName: "",
      calories: "0",
      carbs: "0",
      fats: "0",
      protein: "0",
      fiber: "0",
      serving_g: "0",
      serving_quant: "0",
      serving_string: "",
    },
  });

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.root}>
        <Controller
          control={control}
          name="preListedFood"
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              listMode="SCROLLVIEW"
              placeholder="Select from a food database"
              zIndex={3000}
              searchable={true}
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
              onSelectItem={(item) => fillform(item.value)}
              open={listOpen}
              setOpen={() => setListOpen(!listOpen)}
              items={PreListedFood}
              value={value}
              setItems={setPreListedFood}
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
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 70,
            rowGap: 10,
            justifyContent: "space-around",
            marginHorizontal: 22,
            alignItems: "center",
          }}
        >
          <Controller
            control={control}
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
                    gap: 5,
                    justifyContent: "center",
                    width: "20%",
                  }}
                >
                  <Pressable
                    style={styles.counterButtton}
                    onPress={() =>
                      setValue(
                        "calories",
                        String(parseInt(getValues("calories")) - 1)
                      )
                    }
                  >
                    <Icon name="minus-thick" color={COLORS.lightGray} />
                  </Pressable>
                  <TextInput
                    style={styles.textinput}
                    label="Calories"
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={error?.message}
                  />
                  <Pressable
                    style={styles.counterButtton}
                    onPress={() =>
                      setValue(
                        "calories",
                        String(parseInt(getValues("calories")) + 1)
                      )
                    }
                  >
                    <Icon name="plus-thick" color={COLORS.lightGray} />
                  </Pressable>
                </View>
              );
            }}
          />
          <Controller
            control={control}
            name="carbs"
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
                    onPress={() =>
                      setValue(
                        "carbs",
                        String(parseInt(getValues("carbs")) - 1)
                      )
                    }
                  >
                    <Icon name="minus-thick" color={COLORS.lightGray} />
                  </Pressable>
                  <TextInput
                    style={styles.textinput}
                    label="Carbs"
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={error?.message}
                  />
                  <Pressable
                    style={styles.counterButtton}
                    onPress={() =>
                      setValue(
                        "carbs",
                        String(parseInt(getValues("carbs")) + 1)
                      )
                    }
                  >
                    <Icon name="plus-thick" color={COLORS.lightGray} />
                  </Pressable>
                </View>
              );
            }}
          />
          <Controller
            control={control}
            name="fats"
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
                    onPress={() =>
                      setValue("fats", String(parseInt(getValues("fats")) - 1))
                    }
                  >
                    <Icon name="minus-thick" color={COLORS.lightGray} />
                  </Pressable>
                  <TextInput
                    style={styles.textinput}
                    label="Fats"
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={error?.message}
                  />
                  <Pressable
                    style={styles.counterButtton}
                    onPress={() =>
                      setValue("fats", String(parseInt(getValues("fats")) + 1))
                    }
                  >
                    <Icon name="plus-thick" color={COLORS.lightGray} />
                  </Pressable>
                </View>
              );
            }}
          />
          <Controller
            control={control}
            name="protein"
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
                    onPress={() =>
                      setValue(
                        "protein",
                        String(parseInt(getValues("protein")) - 1)
                      )
                    }
                  >
                    <Icon name="minus-thick" color={COLORS.lightGray} />
                  </Pressable>
                  <TextInput
                    style={styles.textinput}
                    label="Protein"
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={error?.message}
                  />
                  <Pressable
                    style={styles.counterButtton}
                    onPress={() =>
                      setValue(
                        "protein",
                        String(parseInt(getValues("protein")) + 1)
                      )
                    }
                  >
                    <Icon name="plus-thick" color={COLORS.lightGray} />
                  </Pressable>
                </View>
              );
            }}
          />
          <Controller
            control={control}
            name="fiber"
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
                    onPress={() =>
                      setValue(
                        "fiber",
                        String(parseInt(getValues("fiber")) - 1)
                      )
                    }
                  >
                    <Icon name="minus-thick" color={COLORS.lightGray} />
                  </Pressable>
                  <TextInput
                    style={styles.textinput}
                    label="Fiber"
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={error?.message}
                  />
                  <Pressable
                    style={styles.counterButtton}
                    onPress={() =>
                      setValue(
                        "fiber",
                        String(parseInt(getValues("fiber")) + 1)
                      )
                    }
                  >
                    <Icon name="plus-thick" color={COLORS.lightGray} />
                  </Pressable>
                </View>
              );
            }}
          />
          <Controller
            control={control}
            name="serving_g"
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
                    onPress={() =>
                      setValue(
                        "serving_g",
                        String(parseInt(getValues("serving_g")) - 1)
                      )
                    }
                  >
                    <Icon name="minus-thick" color={COLORS.lightGray} />
                  </Pressable>
                  <TextInput
                    style={styles.textinput}
                    label="Serving (g)"
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={error?.message}
                  />
                  <Pressable
                    style={styles.counterButtton}
                    onPress={() =>
                      setValue(
                        "serving_g",
                        String(parseInt(getValues("serving_g")) + 1)
                      )
                    }
                  >
                    <Icon name="plus-thick" color={COLORS.lightGray} />
                  </Pressable>
                </View>
              );
            }}
          />
          <Controller
            control={control}
            name="serving_string"
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                listMode="SCROLLVIEW"
                placeholder="Select a serving type"
                zIndex={1000}
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
                open={typeOpen}
                setOpen={() => setTypeOpen(!typeOpen)}
                items={Serving_types}
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
          <Controller
            control={control}
            name="serving_quant"
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
                    width: "25%",
                  }}
                >
                  <Pressable
                    style={styles.counterButtton}
                    onPress={() =>
                      setValue(
                        "serving_quant",
                        String(parseInt(getValues("serving_quant")) - 1)
                      )
                    }
                  >
                    <Icon name="minus-thick" color={COLORS.lightGray} />
                  </Pressable>
                  <TextInput
                    style={styles.textinput}
                    label="Serving Quantity"
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={error?.message}
                  />
                  <Pressable
                    style={styles.counterButtton}
                    onPress={() =>
                      setValue(
                        "serving_quant",
                        String(parseInt(getValues("serving_quant")) + 1)
                      )
                    }
                  >
                    <Icon name="plus-thick" color={COLORS.lightGray} />
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.spacing} />
        <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
          <Text
            style={{
              color: COLORS.lightGray,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Add Meal
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default MealAdder;
