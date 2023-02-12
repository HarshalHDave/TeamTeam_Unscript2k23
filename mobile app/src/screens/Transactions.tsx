import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../components/SafeArea";
import CalendarStrip from "react-native-calendar-strip";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { baseUrl } from "../lib/BaseUrl";
import { useAppContext } from "../lib/Context";
import navigation from "../navigation";

const Transaction = ({ navigation }: any) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [Data, setData] = useState<any>();
  const [renderData, setrenderData] = useState<any>();
  const [DateFilter, setDateFilter] = useState("");
  const auth = useAppContext();
  useEffect(() => {
    if (searchPhrase != "") {
      const tempData = [];
      Data.forEach((item) => {
        if (JSON.stringify(item).includes(searchPhrase)) {
          tempData.push(item);
        }
      });
      setrenderData(tempData);
    }
    else{
      setrenderData(Data);
    }

    console.log(Data);
  }, [searchPhrase]);
  useEffect(() => {
    axios
      .post(
        baseUrl + "admin/open_order/list",
        {},
        {
          headers: {
            Authorization: "Bearer " + auth?.user.token,
          },
        }
      )
      .then((val) => {
        setData(val.data.data.data);
        setrenderData(val.data.data.data);
      });
  }, []);
  const Item = (thisData: any) => {
    const dateTime = new Date(thisData.createdAt);
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 8,
          borderBottomWidth: 0.8,
          borderColor: "#aea0ae",
        }}
        // onPress={() => navigation.navigate("Bond", { ...thisData })}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "mm", color: "#4090FF", fontSize: 18 }}>
            {thisData.blob}
          </Text>
          <Text style={{ fontFamily: "m", color: "white", fontSize: 10 }}>
            {thisData.isin}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "m", color: "white", fontSize: 14 }}>
            {dateTime.toDateString()}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: "m", color: "white", fontSize: 14 }}>
              QTY: {thisData.qty}
            </Text>
            <Text
              style={{
                fontFamily: "m",
                color: "white",
                fontSize: 14,
                marginLeft: 15,
              }}
            >
              STP: {thisData.strike_price} Rs
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeArea>
      <View>
        <CalendarStrip
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: "#64EAEA",
          }}
          style={{
            height: 80,
            paddingBottom: 4,
            marginBottom: 16,
            borderRadius: 4,
          }}
          calendarHeaderStyle={{
            color: "#beb0be",
            fontWeight: "600",
            fontSize: 14,
          }}
          calendarColor={"#0A2135"}
          calendarHeaderContainerStyle={{
            backgroundColor: "#0A0D30",
            padding: 4,
          }}
          onDateSelected={(date) => {
            //@ts-ignore
            setDateFilter(date);
          }}
          // dayContainerStyle={{borderRadius: 4}}
          dateNumberStyle={{ color: "#cec0ce" }}
          dateNameStyle={{ color: "#cec0ce" }}
          highlightDateNumberStyle={{ color: "#64EAEA" }}
          highlightDateNameStyle={{ color: "#64EAEA" }}
          disabledDateNameStyle={{ color: "grey" }}
          disabledDateNumberStyle={{ color: "grey" }}
          iconContainer={{ flex: 0.1 }}
        />
        <View style={[styles.container]}>
          <View style={[styles.searchBar]}>
            <Ionicons name="search" size={24} color="#8e808e" />
            <TextInput
              style={styles.input}
              placeholder={"Search Something"}
              value={searchPhrase}
              onChangeText={(text) => {
                setSearchPhrase(text);
              }}
              placeholderTextColor={"grey"}
            />
          </View>
        </View>
        <FlatList
          data={renderData}
          //@ts-ignore
          renderItem={(item) => {
            //@ts-ignore
            if (DateFilter) {
              //@ts-ignore
              const impDate = new Date(item.item.createdAt);
              const selectedDate = new Date(DateFilter);
              console.log(impDate, selectedDate);
              //@ts-ignore
              if (
                selectedDate.toLocaleDateString() ==
                impDate.toLocaleDateString()
              ) {
                //@ts-ignore
                return <Item {...item.item} />;
              }
            } else {
              //@ts-ignore
              return <Item {...item.item} />;
            }
          }}
          //@ts-ignore
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeArea>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  searchBar: {
    paddingHorizontal: 8,
    flexDirection: "row",
    width: "99%",
    // backgroundColor: "#0A0D30",
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
