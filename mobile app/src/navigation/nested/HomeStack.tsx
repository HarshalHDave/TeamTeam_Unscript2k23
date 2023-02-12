import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import SeeAll from "../../screens/SeeAll";
import Bond from "../../screens/Bond";
import Calculator from "../../screens/Calculator";
import Compare from "../../screens/Compare";
import Transaction from "../../screens/Transactions";
import Profile from "../../screens/Profile";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SeeAll" component={SeeAll} />
      <Stack.Screen name="Bond" component={Bond} />
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="Compare" component={Compare} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Transaction" component={Transaction} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
