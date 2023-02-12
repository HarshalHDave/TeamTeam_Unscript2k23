// @ts-ignore
//@ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import SafeArea from "../components/SafeArea";
import { FontAwesome } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import NseData from "../../assets/nseBonds.json";
interface JData {
  symbol: "NHAI";
  series: "N6";
  bond_type: "Regular";
  open: "1248";
  high: "1251.5";
  low: "1238";
  ltP: "1242";
  close: "1242.13";
  per: "-0.01";
  qty: "31977";
  trdVal: "39634532.19";
  coupr: "   8.75";
  credit_rating: "CRISIL AAA STABLE / CARE AAA / BWR AAA STABLE ";
  rating_agency: "CRISIL,CARE,BWR,";
  face_value: "1000";
  nxtip_date: "-";
  maturity_date: "05-Feb-2029";
  bYield: "6.270560034906604";
  isin: "INE906B07DF8";
  meta: {
    symbol: "NHAI";
    companyName: "National Highways Authority of India";
    activeSeries: [];
    debtSeries: [
      "N2",
      "N3",
      "N4",
      "N5",
      "N6",
      "N7",
      "N8",
      "N9",
      "NA",
      "NB",
      "NC",
      "ND",
      "NE"
    ];
    tempSuspendedSeries: ["EQ", "N1", "U1", "U2"];
    isFNOSec: false;
    isCASec: false;
    isSLBSec: false;
    isDebtSec: true;
    isSuspended: false;
    isETFSec: false;
    isDelisted: false;
    isin: "INE906B07CB9";
  };
}
const SeeAll = ({ navigation }: any) => {
  const [DATA, setData] = useState(NseData.data);
  const [renderData, setrenderData] = useState(NseData.data);
  
  const TouchableOpacityComponent = (Data: any) => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 8,
          borderBottomWidth: 0.8,
          borderColor: "#aea0ae",
        }}
        onPress={() => navigation.navigate("Bond", { ...Data })}
      >
        <Text style={{ fontFamily: "mm", color: "#4090FF", fontSize: 18 }}>
          {Data.meta.companyName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ color: "white" }}>
            {Data.symbol} {Data.series}
          </Text>
          <Text style={{ color: "white" }}>₹ {Data.ltP}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ color: "white" }}>
            Maturity Date : {Data.maturity_date}
          </Text>
          <View style={{ alignItems: "flex-end" }}>
            {(Data.per.length == 1 && Data.per == "-") || Data.per == "0" ? (
              <Text
                style={{
                  color: "yellow",
                  fontSize: 18,
                  fontWeight: "600",
                  fontFamily: "m",
                  marginLeft: 15,
                }}
              >
                unch
              </Text>
            ) : Number(Data.per) < 0 ? (
              <Text
                style={{
                  color: "#ff1a28",
                  fontSize: 18,
                  fontWeight: "600",
                  fontFamily: "m",
                }}
              >
                {Data.per} %
              </Text>
            ) : (
              <Text
                style={{
                  color: "#12ca1f",
                  fontSize: 18,
                  fontWeight: "600",
                  fontFamily: "m",
                }}
              >
                {Data.per} %
              </Text>
            )}
            {/* #12ca1f */}
          </View>
        </View>
        <Text style={{ color: "white", marginTop: 15 }}>
          Credit Rating: {Data.credit_rating}
        </Text>

        {/* <Text style={{ fontFamily: "mm", color: "#4090FF", fontSize: 18 }}>
          8.75% Tax Free Tr I S IIB
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <View>
            <Text
              style={{
                color: "#fefefe",
                fontSize: 18,
                fontWeight: "600",
                fontFamily: "mm",
                marginRight: 16,
              }}
            >
              {Data.ltP}
            </Text>
            <Text
              style={{
                color: "#fefefe",
                fontSize: 18,
                fontWeight: "600",
                fontFamily: "m",
              }}
            >
              {Data.maturity_date}
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: "#fefefe",
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 8,
                fontFamily: "m",
              }}
            >
              ₹{Data.ltP}
            </Text>
            <Text
              style={{
                color: "#ff1a28",
                fontSize: 18,
                fontWeight: "600",
                fontFamily: "m",
              }}
            >
              {Data.per}%
            </Text>
            {/* #12ca1f */}
        {/* </View>
        </View> */}
        {/* <Text
          style={{
            color: "#fefefe",
            fontSize: 16,
            // fontWeight: "600",
            marginVertical: 12,
            fontFamily: "m",
          }}
        >
          {Data.credit_rating}
        </Text> */}
      </TouchableOpacity>
    );
  };
  return (
    <SafeArea>
      <View
        style={{
          borderColor: "#aea0ae",
          borderWidth: 1,
          borderRadius: 8,
          marginVertical: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome
          style={{ marginLeft: 15 }}
          name="search"
          size={20}
          color="#aea0ae"
        />
        <TextInput
          editable
          maxLength={40}
          onChangeText={(text) => {
            if (text == "") {
              setrenderData(DATA);
            } else {
              var tempData = [];
              DATA.forEach((item) => {
                if (JSON.stringify(item).includes(text)) {
                  tempData.push(item);
                }
              });
              setrenderData(tempData);
            }
          }}
          // onChangeText={text => onChangeText(text)}
          // value={value}
          style={{ padding: 8, color: "#fefefe" }}
          placeholder="Search your bonds..."
          placeholderTextColor={"#aea0ae"}
        />
      </View>
      <FlatList
        data={renderData}
        renderItem={(item) => <TouchableOpacityComponent {...item.item} />}
      />
    </SafeArea>
  );
};

export default SeeAll;

const styles = StyleSheet.create({});
