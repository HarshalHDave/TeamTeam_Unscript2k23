import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { Formik } from "formik";
import { useAppContext } from "../lib/Context";

const Login = ({navigation}:any) => {
  const auth = useAppContext();
  return (
    <SafeArea>
      <>
        <Navbar title="Login Page" />
        <Formik
          initialValues={{
            id: "",
            pass: "",
          }}
          onSubmit={(values) => {
            // auth?.signIn(values.id, values.pass);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{ marginTop: 35 }}>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Your ID"}
                    value={values.id}
                    onChangeText={handleChange("id")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Your Password"}
                    value={values.pass}
                    onChangeText={handleChange("pass")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  marginBottom: 25,
                  fontSize: 20,
                }}
              >
                Dont Have and Account ?
              <Text style={{color:'cyan'}} onPress={()=>{navigation.navigate('Signup')}}>{'  '}Sign Up</Text>
              </Text>
              <View style={[styles.container]}>
                {/* <View style={[styles.searchBar]}> */}
                <Button title="Submit" onPress={() => handleSubmit()} />
                {/* </View> */}
              </View>
            </View>
          )}
        </Formik>
      </>
    </SafeArea>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  searchBar: {
    paddingHorizontal: 8,
    flexDirection: "row",
    width: "99%",
    borderWidth: 0.6,
    borderColor: "#aea0ae",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 8,
  },
  input: {
    fontSize: 14,
    marginLeft: 8,
    width: "100%",
    color: "grey",
  },
});
