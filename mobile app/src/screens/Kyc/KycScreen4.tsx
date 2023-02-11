import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import SafeArea from "../../components/SafeArea";
import { Formik } from "formik";
import CustButton from "../../components/CustButton";
import navigation from "../../navigation";

const KycScreen4 = ({ navigation, route }: any) => {
  console.log(route.params);
  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            addrLine1: "",
            addrline2: "",
            state: "",
            pinCode: "",
            city: "",
          }}
          onSubmit={(val) => {
            navigation.navigate("KycScreen5", { ...val, ...route.params });
            // console.log(val);
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
                Address Line 1:
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    value={values.addrLine1}
                    placeholder={"Address Line 1"}
                    onChangeText={handleChange("addrLine1")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              {errors.addrLine1 && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.addrLine1}
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
                Address Line 2:
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    value={values.addrline2}
                    placeholder={"Address Line 2"}
                    onChangeText={handleChange("addrline2")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              {errors.addrline2 && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.addrline2}
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
                Pincode :
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={values.pinCode}
                    placeholder={"400077"}
                    onChangeText={handleChange("pinCode")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              {errors.pinCode && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.pinCode}
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
                Your city :
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    value={values.city}
                    // keyboardType='city-address'
                    placeholder={"Mumbai"}
                    onChangeText={handleChange("city")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              {errors.city && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.city}
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
                Your State:
              </Text>
              <View style={[styles.container]}>
                <View
                  style={[
                    styles.searchBar,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <TextInput
                    style={[styles.input]}
                    value={values.state}
                    placeholder={"Maharashtra"}
                    onChangeText={handleChange("state")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              {errors.state && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {errors.state}
                </Text>
              )}
              <CustButton text="Next" onButtonPress={handleSubmit} />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeArea>
  );
};

export default KycScreen4;

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
