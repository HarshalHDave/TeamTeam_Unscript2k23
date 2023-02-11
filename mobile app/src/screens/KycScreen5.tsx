import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import SafeArea from "../components/SafeArea";
import SignatureScreen from "react-native-signature-canvas";
import CustButton from "../components/CustButton";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

import {
  getDownloadURL,
  uploadBytes,
  ref,
  uploadString,
} from "firebase/storage";
import { storage } from "../lib/Firebase";
const KycScreen5 = ({ navigation, route }: any) => {
  const signRef = useRef();
  const [signature, setSignature] = useState("");
  const [hasToSign, setHasToSign] = useState(false);
  const [image, setImage] = useState(null);
  const [AdharFileName, setAdharFileName] = useState("");
  const [aadharFile, setaadharFile] = useState("");
  const [signFile, setsignFile] = useState("");
  const [dematFile, setdematFile] = useState("");
  const [DematFileName, setDematFileName] = useState("");
  const uploadUriFirebase = async (uri: string) => {
    const response = await fetch(uri);
    const fileUrl = uri.split("/");
    const fileName = fileUrl[fileUrl.length - 1];
    const imageBuff = await response.blob();
    // console.log(imageBuff)
    var imageRef = ref(storage, "files/" + fileName);
    const upload = await uploadBytes(imageRef, imageBuff);
    const url = await getDownloadURL(imageRef);
    return url;
  };
  function makeid(length: any) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  // const uploadStringFirebase = async (bob: any) => {
  //   // const response = await fetch(uri);
  //   // const fileUrl = uri.split("/");
  //   // const fileName = fileUrl[fileUrl.length - 1];
  //   // const imageBuff = await response.blob();
  //   // console.log(imageBuff)
  //   bob.replace("data:image/png;base64,", "");
  //   console.log(bob);
  //   var imageRef = ref(storage, "files/" + makeid(10) + ".png");
  //   const upload = await uploadBytes(imageRef, bob);
  //   const url = await getDownloadURL(imageRef);
  //   return url;
  // };
  const pickDocument = async (val: string) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    // alert(result.type);
    if (val === "a") {
      setAdharFileName(result.name);
      setaadharFile(result.uri);
    }
    if (val === "d") {
      setDematFileName(result.name);
      setdematFile(result.uri);
    }
  };
  const handleOK = (signature) => {
    setSignature(signature);
    const path = FileSystem.cacheDirectory + makeid(10) +"sign.png";
    FileSystem.writeAsStringAsync(
      path,
      signature.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    )
      .then(() => FileSystem.getInfoAsync(path))
      .then((val)=>setsignFile(val.uri))
      .catch(console.error);
    // onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    signRef.current.readSignature();
  };

  // Called after signRef.current.getData()
  const handleData = (data) => {
    console.log(data);
    setHasToSign(false);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  console.log(route.params);

  const uploadAll = async () => {
    uploadUriFirebase(aadharFile);
    uploadUriFirebase(dematFile);
    //@ts-ignore
    uploadUriFirebase(image);
    uploadUriFirebase(signFile);
    // console.log(image, aadharFile, dematFile, signature);
  };

  return (
    <SafeArea>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Your Photo :
          </Text>
          <CustButton text="Upload" onButtonPress={pickImage} />
        </View>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Your Aadhar :
          </Text>
          <CustButton text="Upload" onButtonPress={() => pickDocument("a")} />
        </View>
        {AdharFileName && (
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            {AdharFileName}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Your DEMAT :
          </Text>
          <CustButton text="Upload" onButtonPress={() => pickDocument("d")} />
        </View>
        {DematFileName && (
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            {DematFileName}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Add Sign :
          </Text>
          <CustButton
            text="cust"
            onButtonPress={() => {
              setHasToSign(true);
            }}
          />
        </View>
        {!hasToSign && signature ? (
          <View style={{ backgroundColor: "white", alignSelf: "center" }}>
            <Image
              resizeMode={"contain"}
              style={{ width: 335, height: 114 }}
              source={{ uri: signature }}
            />
          </View>
        ) : null}
        {hasToSign && (
          <View
            style={{
              height: 970,
              position: "absolute",
              top: "20%",
              alignSelf: "center",
              width: "100%",
              zIndex: 10,
            }}
          >
            <SignatureScreen
              ref={signRef}
              onEnd={handleEnd}
              onOK={handleOK}
              onEmpty={handleEmpty}
              onClear={handleClear}
              onGetData={handleData}
              //   autoClear={true}
              descriptionText={"text"}
            />
          </View>
        )}
        <CustButton
          text="Upload"
          container_style={{ alignSelf: "center", marginTop: 10 }}
          onButtonPress={uploadAll}
        />
      </ScrollView>
    </SafeArea>
  );
};

export default KycScreen5;

const styles = StyleSheet.create({});
