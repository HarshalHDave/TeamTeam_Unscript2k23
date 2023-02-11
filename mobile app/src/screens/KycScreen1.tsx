import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { Formik } from "formik";
import CustButton from "../components/CustButton";
import * as yup from "yup";

const KycScreen1 = ({navigation}:any) => {
  const phoneValidationSchema = yup.object().shape({
    phone: yup
      .string()
      .min(10, "Please check phone number")
      .max(10, "Please check phone number")
      .required(),
    // otp: yup.string().required('OTP is required'),
  });
  return (
    <SafeArea>
      <>
        <Formik
          validationSchema={phoneValidationSchema}
          initialValues={{
            phone: "",
          }}
          onSubmit={(val) => {
            navigation.navigate('KycScreen2',val)
            console.log(val);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 5,
                  marginTop: 20,
                }}
              >
                Your Phone Number :
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <Text style={{ color: "grey" }}>+91</Text>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    value={values.phone}
                    placeholder={"99999 88888"}
                    onChangeText={handleChange("phone")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              {errors.phone && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.phone}
                </Text>
              )}
              <CustButton text="Next" onButtonPress={handleSubmit} />
            </>
          )}
        </Formik>
        {
          // phone , otp verification
          // first , allast , middle ,dob ,  , email
          // address line 1 , lin2 , pincode , state , twon
          //profession , experience , income
          // documents
        }
      </>
    </SafeArea>
  );
};

export default KycScreen1;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 7,
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
