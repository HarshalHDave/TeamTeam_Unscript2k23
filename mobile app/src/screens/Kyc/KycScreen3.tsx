import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import SafeArea from "../../components/SafeArea";
import { Formik } from "formik";
import CustButton from "../../components/CustButton";
import DateTimePicker from "@react-native-community/datetimepicker";

const KycScreen3 = ({ navigation, route }: any) => {
  const [ShowDatePicker, setShowDatePicker] = useState(false);
  console.log(route.params);
  return (
    <SafeArea>
      <>
        <Formik
          initialValues={{
            fname: "",
            middle: "",
            lname: "",
            dob: "",
            email: "",
          }}
          onSubmit={(val) => {
            navigation.navigate("KycScreen4", {...val,...route.params});
            // console.log({...val,...route.params});
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
                Your First Name :
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    value={values.fname}
                    placeholder={"John"}
                    onChangeText={handleChange("fname")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              {errors.fname && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.fname}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 5,
                  marginTop: 20,
                }}
              >
                Your Middle Name :
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    value={values.middle}
                    placeholder={"J"}
                    onChangeText={handleChange("middle")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              {errors.middle && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.middle}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 5,
                  marginTop: 20,
                }}
              >
                Your Last Name :
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    value={values.lname}
                    placeholder={"Smith"}
                    onChangeText={handleChange("lname")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              {errors.lname && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.lname}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 5,
                  marginTop: 20,
                }}
              >
                Your Email :
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    value={values.email}
                    keyboardType='email-address'
                    placeholder={"john.smith@gmail.com"}
                    onChangeText={handleChange("email")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              {errors.email && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.email}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 5,
                  marginTop: 20,
                }}
              >
                Your Date Of Birth:
              </Text>
              <View style={[styles.container]}>
                <View
                  style={[
                    styles.searchBar,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <TextInput
                    editable={false}
                    style={[styles.input, { width: "auto" }]}
                    value={values.dob}
                    placeholder={"01-01-1923"}
                    // onChangeText={handleChange("dob")}
                    placeholderTextColor={"grey"}
                  />
                  {ShowDatePicker && (
                    <DateTimePicker
                      maximumDate={new Date(2005, 0, 1)}
                      mode="date"
                      value={new Date()}
                      onChange={(change, date) => {
                        if (change.type === "set") {
                        //   console.log(date?.toISOString());
                          //@ts-ignore
                            handleChange("dob")(date?.toISOString());
                        }
                        setShowDatePicker(false);
                      }}
                    />
                  )}
                  <CustButton
                    text="select"
                    onButtonPress={() => {
                      setShowDatePicker(true);
                    }}
                  ></CustButton>
                </View>
              </View>
              {errors.dob && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.dob}
                </Text>
              )}
              <CustButton text="Next" onButtonPress={handleSubmit} />
            </>
          )}
        </Formik>
      </>
    </SafeArea>
  );
};

export default KycScreen3;

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
