import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserStack from "./UserStack";
import { useAppContext } from "../lib/Context";
import AuthStack from "./AuthStack";
import KycStack from "./KycStack";

const index = () => {
  const auth = useAppContext();
  return(
    <UserStack />
  )
  // return auth?.user ? (
  //   <>
  //   {auth.user.isVerified ? <UserStack /> : <KycStack />}
  //   </>
  // ) : (
  //   <AuthStack />
  // );
};

export default index;

const styles = StyleSheet.create({});
