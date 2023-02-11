import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import SafeArea from "../../components/SafeArea";
//@ts-ignore
import OTPTextInput from "react-native-otp-textinput";
import CustButton from "../../components/CustButton";
const KycScreen2 = ({ navigation, route }: any) => {
  const [Otp, setOtp] = useState("");
  console.log(route.params);
  return (
    <SafeArea>
      <>
        {/* @ts-ignore  */}
        <OTPTextInput
          handleTextChange={(val: any) => setOtp(val)}
          textInputStyle={{ color: "white" }}
        />
        <CustButton
          text="Next"
          onButtonPress={() => {
            if (Otp.length == 4) {
              navigation.navigate("KycScreen3", { otp: Otp, ...route.params });
            }
          }}
        />
      </>
    </SafeArea>
  );
};

export default KycScreen2;

const styles = StyleSheet.create({});
