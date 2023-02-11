import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KycScreen1 from "../screens/KycScreen1";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import KycScreen2 from "../screens/KycScreen2";

const KycStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.background_main}>
      <>
      <Navbar title="KYC Process" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="KycScreen1" component={KycScreen1}></Stack.Screen>
          <Stack.Screen name="KycScreen2" component={KycScreen2}></Stack.Screen>
          <Stack.Screen name="KycScreen3" component={KycScreen1}></Stack.Screen>
        </Stack.Navigator>
      </>
    </SafeAreaView>
  );
};

export default KycStack;

const styles = StyleSheet.create({
  background_main: {
    flex: 1,
    backgroundColor: "#181A20",
    paddingHorizontal: 10,
  },
});