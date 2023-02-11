import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import SeeAll from "../../screens/SeeAll";
import Bond from "../../screens/Bond";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SeeAll" component={SeeAll} />
      <Stack.Screen name="Bond" component={Bond} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
