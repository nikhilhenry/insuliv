// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import React, { useState } from "react";
import { Button, Image, View, Text, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants";
// const createFormData = (photo: any) => {
//   const data = new FormData();

//   data.append("file", {
//     nae: photo.fileName,
//     type: photo.type,
//     uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
//   });

//   return data;
// };

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");

  const handleUploadPhoto = () => {
    console.log("going toupload");
    fetch("https://apollo-web-th7i.onrender.com/api/image/upload/string", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: image.base64,
      }),
    })
      .then((response) => response.json())
      .then((val) => {
        console.log(val);
        setLink(val.img_url);
      });
  };

  const handlePills = (pills: any) => {
    console.log("pills", pills);
    fetch("https://apollo-web-th7i.onrender.com/api/pill/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pills: pills,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err))
      .then((val) => {
        console.log(val);
      });
  };

  const ocrProcess = () => {
    console.log("handling ocr");
    fetch("https://insuliv-backend.onrender.com/ocr?url=" + link)
      .then((response) => response.json())
      .catch((err) => console.log(err))
      .then((res) => {
        res = JSON.parse(res);
        console.log(res);
        const pills = [
          { name: res.medication_name1 },
          { name: res.medication_name2 },
        ];
        handlePills(pills);
      })
      .catch((err) => console.log(err));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable
        onPress={pickImage}
        style={{ backgroundColor: COLORS.dark, padding: 10, borderRadius: 8 }}
      >
        <Text style={{ color: COLORS.backGray }}>
          Pick an image from camera roll
        </Text>
      </Pressable>
      {image && (
        <View>
          <Image
            source={{ uri: image.uri }}
            style={{ width: 200, height: 200 }}
          />
          <Button onPress={handleUploadPhoto} title="Upload" />
        </View>
      )}
      {link && (
        <View>
          <Pressable
            onPress={ocrProcess}
            style={{
              backgroundColor: COLORS.dark,
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: COLORS.backGray }}>OCR Process</Text>
          </Pressable>
          <Text style={{ color: COLORS.dark }}>{link}</Text>
        </View>
      )}
    </View>
  );
}
