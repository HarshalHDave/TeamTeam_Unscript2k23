// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../components/SafeArea";
import nseJson from "../../assets/nseBonds.json";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from "../lib/Context";
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
function getTopAndLast5(data: any, attribute: any) {
  let result = {
    top5: [],
    last5: [],
  };
  let len = data.length;

  data.sort((a, b) => b[attribute] - a[attribute]);

  if (len >= 5) {
    result.top5 = data.slice(0, 5);
    result.last5 = data.slice(len - 5, len);
  } else {
    result.top5 = data.data;
    result.last5 = data.data;
  }

  return result;
}

const Home = ({ navigation }: any) => {
  const auth = useAppContext();
  const [DATA, setData] = useState<JData>();
  const [TodayBond, setTodayBond] = useState<JData>();
  const [Topgain, setTopgain] = useState<JData>();
  const [Fallers, setFallers] = useState<JData>();
  const [MostSecure, setMostSecure] = useState<JData>();
  useEffect(() => {
    // fetch("../../assets/nseBonds.json")
    //   .then((val) => {
    //     // setData(val)
    //     console.log(val)
    //   });
    setTimeout(() => {
      //@ts-ignore
      setData(nseJson.data);
      const shuffled = nseJson.data.sort(() => 0.5 - Math.random());
      setTodayBond(shuffled.slice(0, 5));
      const results = getTopAndLast5(nseJson.data, "per");
      setTopgain(results.top5);
      setFallers(results.last5.reverse());
      const shuffled2 = nseJson.data.sort(() => 0.5 - Math.random());
      setMostSecure(shuffled2.slice(0, 5));
      // console.log(results);
    }, 3000);
  }, []);

  const Item = (Data: JData) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "#3e4045",
          padding: 8,
          marginTop: 8,
          marginHorizontal: 8,
          borderRadius: 8,
        }}
        onPress={()=>navigation.navigate('Bond',{...Data})}
      >
        <View>
          <Text
            style={{
              color: "#fefefe",
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 8,
              fontFamily: "m",
              marginRight: 16,
            }}
          >
            {Data.symbol}
          </Text>
          <Text
            style={{
              color: "#fefefe",
              fontSize: 18,
              fontWeight: "600",
              fontFamily: "m",
            }}
          >
            ₹{Data.ltP}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              color: "#fefefe",
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 8,
              fontFamily: "m",
            }}
          >
            {Data.series}
          </Text>
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
      </TouchableOpacity>
    );
  };
  return (
    <SafeArea>
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_aX6P9cmyNKvrfzR6KKymLcHq8pfwDri2p25QeTQ&s",
              }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 56,
                marginRight: 8,
              }}
            />
            <View>
              <Text style={{ color: "#fefefe", fontSize: 16 }}>{auth?.user.username}</Text>
              <Text
                style={{ color: "#fefefe", fontSize: 18, fontWeight: "600" }}
                onPress={()=>{ auth?.signOut()}}
              >
                Hello User
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Calculator')}
              style={{ width: 32, height: 32, borderRadius: 32 }}>
              <Ionicons name="calculator" size={24} color="#fefefe" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Compare')}
              style={{ width: 32, height: 32, borderRadius: 32 }}>
              <MaterialCommunityIcons name="file-compare" size={25} color="#fefefe" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{ width: 32, height: 32, borderRadius: 32 }}>
                <Ionicons name="person" size={25} color="#fefefe" />
              {/* <MaterialCommunityIcons name="calendar-clock" size={25} color="#fefefe" /> */}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={()=> navigation.navigate('SeeAll')}>
          <Image
            source={require("../../assets/homesrch.png")}
            style={{
              width: 360,
              height: 56,
              borderRadius: 100,
              alignSelf: "center",
              marginTop: 16,
            }}
          />
        </TouchableOpacity>

        <Image
          source={require("../../assets/homebg.png")}
          style={{
            width: 360,
            height: 128,
            alignSelf: "center",
            marginTop: 16,
          }}
        />
        <View style={{ position: "absolute", top: 216, left: 36 }}>
          <Text
            style={{
              color: "#fefefe",
              fontSize: 32,
              fontWeight: "400",
              fontFamily: "mm",
              letterSpacing: 2.4,
            }}
          >
            ₹{auth?.portFolioAmt}
          </Text>
        </View>

        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 16,
              marginTop: 24,
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "600",
                fontFamily: "mm",
                letterSpacing: 1.2,
              }}
            >
              11th Feburary'23
            </Text>
            <Text
              style={{
                color: "#4090ff",
                fontSize: 14,
                fontWeight: "600",
                fontFamily: "mm",
              }}
              onPress={() => navigation.navigate('SeeAll')}
            >
              See All
            </Text>
          </View>
          <FlatList
            horizontal
            data={TodayBond}
            renderItem={(item) => {
              return <Item {...item.item} />;
            }}
            keyExtractor={(item) => item.index}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 16,
              marginTop: 24,
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "600",
                fontFamily: "mm",
                letterSpacing: 1.2,
              }}
            >
              Top Gainers
            </Text>
            <Text
              style={{
                color: "#4090ff",
                fontSize: 14,
                fontWeight: "600",
                fontFamily: "mm",
              }}
              onPress={() => navigation.navigate('SeeAll')}
            >
              See All
            </Text>
          </View>
          <FlatList
            horizontal
            data={Topgain}
            renderItem={(item) => {
              return <Item {...item.item} />;
            }}
            keyExtractor={(item) => item.index}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 16,
              marginTop: 24,
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "600",
                fontFamily: "mm",
                letterSpacing: 1.2,
              }}
            >
              Top Fallers
            </Text>
            <Text
              style={{
                color: "#4090ff",
                fontSize: 14,
                fontWeight: "600",
                fontFamily: "mm",
              }}
              onPress={() => navigation.navigate('SeeAll')}
            >
              See All
            </Text>
          </View>
          <FlatList
            horizontal
            data={Fallers}
            renderItem={(item) => {
              return <Item {...item.item} />;
            }}
            keyExtractor={(item) => item.index}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 16,
              marginTop: 24,
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "600",
                fontFamily: "mm",
                letterSpacing: 1.2,
              }}
            >
              Most Secure
            </Text>
            <Text
              style={{
                color: "#4090ff",
                fontSize: 14,
                fontWeight: "600",
                fontFamily: "mm",
              }}
              onPress={() => navigation.navigate('SeeAll')}
            >
              See All
            </Text>
          </View>
          <FlatList
            horizontal
            data={MostSecure}
            renderItem={(item) => {
              // console.log(item)
              return <Item {...item.item} />;
            }}
            keyExtractor={(item) => item.index}
          />
        </ScrollView>
      </>
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({});
