// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import React, { useState, useEffect } from "react";
import { Button, Image, View, Text, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const createFormData = (photo: any) => {
  const data = new FormData();

  data.append("file", {
    nae: photo.fileName,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  return data;
};

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");

  const handleUploadPhoto = () => {
    console.log("going toupload");
    fetch("http://localhost:3000/api/image/upload/string", {
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

  const ocrProcess = () => {
    fetch(
      "https://insuliv-backend.onrender.com/ocr?url=" + encodeURI(link)
    ).then((response) => console.log(response));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
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
      <Button title="Pick an image from camera roll" onPress={pickImage} />
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
          <Button onPress={ocrProcess} title="OCR Processs" />
          <Text>{link}</Text>
        </View>
      )}
    </View>
  );
}
