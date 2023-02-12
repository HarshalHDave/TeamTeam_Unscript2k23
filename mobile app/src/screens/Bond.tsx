//@ts-nocheck
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import SafeArea from "../components/SafeArea";
import CustButton from "../components/CustButton";
import { useAppContext } from "../lib/Context";
import axios from "axios";
import { baseUrl } from "../lib/BaseUrl";
var combine = function (a, min) {
  var fn = function (n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  var all = [];
  for (var i = min; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
};
const Bond = ({ route }: any) => {
  const data = route.params;
  const auth = useAppContext();
  // console.log(auth?.user.token)
  const [modalVisible, setModalVisible] = useState(false);
  const [LtpPrice, setLtpPrice] = useState(data.ltP);
  const [Quantity, setQuantity] = useState("100");
  const [isSell, setIsSell] = useState(false);

  const SellingProcedure = () => {
    var sellId;
    axios
      .post(
        baseUrl + "admin/open_order/create",
        {
          isOpen: true,
          qty: Number(Quantity),
          strike_price: LtpPrice,
          isSell: isSell,
          isCancelled: false,
          isin: data.isin,
          isCo_own: false,
          userType: 2,
          blob: data.symbol + " " + data.series,
        },
        {
          headers: {
            Authorization: "Bearer " + auth?.user.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((val) => {
        if (val.data.status == "SUCCESS") {
          sellId = val.data.data.id;
          axios
            .post(
              baseUrl + "admin/open_order/list",
              {
                query: {},
                options: {
                  where: {
                    isin: data.isin,
                    isOpen: true,
                    isSell: false,
                  },
                },
              },
              {
                headers: {
                  Authorization: "Bearer " + auth?.user.token,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )
            .then((val) => {
              const arr = combine(val.data.data.data, 1);
              var res;
              arr.forEach((val) => {
                var sum = 0;
                val.forEach((element) => {
                  // console.log(element.qty)
                  sum += element.qty;
                });
                if (sum == Quantity) {
                  res = val;
                }
              });
              console.log(res);
              if (res) {
                axios
                  .put(
                    baseUrl + "admin/open_order/partial-update/" + sellId,
                    {
                      isOpen: false,
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + auth?.user.token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((val) => {
                    if (val.data.status == "SUCCESS") {
                      res.forEach(async (element) => {
                        await axios.put(
                          baseUrl +
                          "admin/open_order/partial-update/" +
                          element.id,
                          {
                            isOpen: false,
                          },
                          {
                            headers: {
                              Authorization: "Bearer " + auth?.user.token,
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                          }
                        );
                      });
                      console.log("completeeee Selling");

                      clearInterval(i);
                      setModalVisible(false);
                    }
                  });
              } else {
                var num = 0;
                var i = setInterval(() => {
                  if (num > 30) {
                    axios
                      .put(
                        baseUrl + "admin/open_order/partial-update/" + sellId,
                        {
                          isOpen: false,
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + auth?.user.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((val) => {
                        console.log(val.data);
                      });
                    setModalVisible(false);
                    clearInterval(i);
                  } else {
                    num += 5;
                    axios
                      .post(
                        baseUrl + "admin/open_order/list",
                        {
                          query: {},
                          options: {
                            where: {
                              isin: data.isin,
                              isOpen: true,
                              isSell: false,
                            },
                          },
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + auth?.user.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((val) => {
                        const arr = combine(val.data.data.data, 1);
                        var res;
                        arr.forEach((val) => {
                          var sum = 0;
                          val.forEach((element) => {
                            // console.log(element.qty)
                            sum += element.qty;
                          });
                          if (sum == Quantity) {
                            res = val;
                          }
                        });
                        console.log(res);
                        if (res) {
                          axios
                            .put(
                              baseUrl +
                              "admin/open_order/partial-update/" +
                              sellId,
                              {
                                isOpen: false,
                              },
                              {
                                headers: {
                                  Authorization: "Bearer " + auth?.user.token,
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                              }
                            )
                            .then((val) => {
                              if (val.data.status == "SUCCESS") {
                                res.forEach(async (element) => {
                                  await axios.put(
                                    baseUrl +
                                    "admin/open_order/partial-update/" +
                                    element.id,
                                    {
                                      isOpen: false,
                                    },
                                    {
                                      headers: {
                                        Authorization:
                                          "Bearer " + auth?.user.token,
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                      },
                                    }
                                  );
                                });
                                console.log("completeeee buying");

                                clearInterval(i);
                                setModalVisible(false);
                              }
                            });

                        }
                      });
                  }
                }, 5000);
              }
            });
        }
      });
  };
  const BuyingProcedure = () => {
    var buyId;
    axios
      .post(
        baseUrl + "admin/open_order/create",
        {
          isOpen: true,
          qty: Number(Quantity),
          strike_price: LtpPrice,
          isSell: isSell,
          isCancelled: false,
          isin: data.isin,
          isCo_own: false,
          userType: 2,
          blob: data.symbol + " " + data.series,
        },
        {
          headers: {
            Authorization: "Bearer " + auth?.user.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((val) => {
        if (val.data.status == "SUCCESS") {
          buyId = val.data.data.id;
          axios
            .post(
              baseUrl + "admin/open_order/list",
              {
                query: {},
                options: {
                  where: {
                    isin: data.isin,
                    isOpen: true,
                    isSell: true,
                  },
                },
              },
              {
                headers: {
                  Authorization: "Bearer " + auth?.user.token,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )
            .then((val) => {
              const arr = combine(val.data.data.data, 1);
              var res;
              arr.forEach((val) => {
                var sum = 0;
                val.forEach((element) => {
                  // console.log(element.qty)
                  sum += element.qty;
                });
                if (sum == Quantity) {
                  res = val;
                }
              });
              console.log(res);
              if (res) {
                axios
                  .put(
                    baseUrl + "admin/open_order/partial-update/" + buyId,
                    {
                      isOpen: false,
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + auth?.user.token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((val) => {
                    if (val.data.status == "SUCCESS") {
                      res.forEach(async (element) => {
                        await axios.put(
                          baseUrl +
                          "admin/open_order/partial-update/" +
                          element.id,
                          {
                            isOpen: false,
                          },
                          {
                            headers: {
                              Authorization: "Bearer " + auth?.user.token,
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                          }
                        );
                      });
                      console.log("completeeee buying");

                      clearInterval(i);
                      setModalVisible(false);
                    }
                  });
              } else {
                var num = 0;
                var i = setInterval(() => {
                  if (num > 30) {
                    axios
                      .put(
                        baseUrl + "admin/open_order/partial-update/" + buyId,
                        {
                          isOpen: false,
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + auth?.user.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((val) => {
                        console.log(val.data);
                      });
                    setModalVisible(false);
                    clearInterval(i);
                  } else {
                    num += 5;
                    axios
                      .post(
                        baseUrl + "admin/open_order/list",
                        {
                          query: {},
                          options: {
                            where: {
                              isin: data.isin,
                              isOpen: true,
                              isSell: true,
                            },
                          },
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + auth?.user.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((val) => {
                        const arr = combine(val.data.data.data, 1);
                        var res;
                        arr.forEach((val) => {
                          var sum = 0;
                          val.forEach((element) => {
                            // console.log(element.qty)
                            sum += element.qty;
                          });
                          if (sum == Quantity) {
                            res = val;
                          }
                        });
                        console.log(res);
                        if (res) {
                          axios
                            .put(
                              baseUrl +
                              "admin/open_order/partial-update/" +
                              buyId,
                              {
                                isOpen: false,
                              },
                              {
                                headers: {
                                  Authorization: "Bearer " + auth?.user.token,
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                              }
                            )
                            .then((val) => {
                              if (val.data.status == "SUCCESS") {
                                res.forEach(async (element) => {
                                  await axios.put(
                                    baseUrl +
                                    "admin/open_order/partial-update/" +
                                    element.id,
                                    {
                                      isOpen: false,
                                    },
                                    {
                                      headers: {
                                        Authorization:
                                          "Bearer " + auth?.user.token,
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                      },
                                    }
                                  );
                                });
                              }
                            });
                          setModalVisible(false);
                          clearInterval(i);
                          return;
                        }
                      });
                  }
                }, 5000);
              }
            });
        }
      });
  };
  return (
    <SafeArea>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: "#e8e8e8", fontFamily: 'm', fontSize: 20, marginBottom: 2 }}>{data.meta.companyName}</Text>
          <Text style={{ color: '#eee', fontFamily: 'mm', fontSize: 24, marginBottom: 0 }}>{data.symbol} {data.series}</Text>
          <Text style={{ color: '#999', fontFamily: 'm', fontSize: 16, marginBottom: 8 }}>{data.bond_type}</Text>
          <Text style={{ color: '#ddd', fontFamily: 'm', fontSize: 16, marginBottom: 8 }}>Coupon Rate :{data.coupr}%</Text>
          <Text style={{ color: "#1cff1c", fontFamily: 'm', fontSize: 16, marginBottom: 8, textAlign: 'center' }}>{data.credit_rating}</Text>
          <Text style={{ color: 'white', fontFamily: 'm', fontSize: 18, marginBottom: 8, }}>Maturity Date: {data.maturity_date}</Text>
          <Text style={{ color: "white", fontFamily: 'm', fontSize: 16, marginBottom: 8 }}>Face Value : {data.face_value}</Text>

          <Text style={{ color: 'white', fontFamily: 'm', fontSize: 18, marginBottom: 4, }}>Other Debt Series</Text>
          {// @ts-ignore
            data.meta.debtSeries.map((item) => {
              return (
                <View key={item}>
                  <Text style={{ fontFamily: 'm', fontSize: 14, color: "#fefefe" }}>
                    {item}
                  </Text>
                </View>
              )
            })}

          <Text style={{ color: 'white', fontFamily: 'm', fontSize: 18, marginBottom: 4, marginTop: 16 }}>Suspended Debt Series</Text>
          {// @ts-ignore
            data.meta.tempSuspendedSeries.map((item) => {
              return (
                <View key={item}>
                  <Text style={{ fontFamily: 'm', fontSize: 14, color: "#fefefe" }}>
                    {item}
                  </Text>
                </View>
              )
            })}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 15,
          position: 'absolute',
          bottom: 0,
          paddingBottom: 16,
          paddingTop: 16,
          marginBottom: -4,
          width: '100%',
          backgroundColor: '#121213',
        }}
      >
        <CustButton
          onButtonPress={() => {
            setModalVisible(true);
            setIsSell(false);
          }}
          text="Buy"
          text_style={{}}
          container_style={{ borderRadius: 8, width: '42%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121213', borderWidth: 2, borderColor: '#1cff1c' }}
          text_style={{ fontFamily: 'mm', color: '#fefefe', fontSize: 16 }}
        />
        <CustButton
          onButtonPress={() => {
            setModalVisible(true);
            setIsSell(true);
          }}
          text="Sell"
          container_style={{ borderRadius: 8, width: '42%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121213', borderWidth: 2, borderColor: '#ff1c1c' }}
          text_style={{ fontFamily: 'm', color: '#fefefe', fontSize: 16 }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setLtpPrice(data.ltP);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Number of Bonds to Buy</Text>
            <Text style={{ alignSelf: "flex-start" }}>Lot Size</Text>
            <View style={[styles.searchBar]}>
              <TextInput
                style={styles.input}
                placeholder={"Quantity"}
                value={Quantity}
                onChangeText={setQuantity}
                keyboardType={"number-pad"}
                placeholderTextColor={"grey"}
              />
            </View>
            <View style={[styles.searchBar, { marginTop: 20 }]}>
              <TextInput
                style={styles.input}
                placeholder={"Price"}
                value={LtpPrice}
                onChangeText={setLtpPrice}
                keyboardType={"number-pad"}
                placeholderTextColor={"grey"}
              />
            </View>
            <CustButton
              text="Submit"
              container_style={{ alignSelf: "center", marginTop: 15 }}
              onButtonPress={() => {
                if (isSell) SellingProcedure();
                else BuyingProcedure();
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeArea>
  );
};

export default Bond;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  searchBar: {
    paddingHorizontal: 8,
    flexDirection: "row",

    borderWidth: 1,
    borderColor: "#aea0ae",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 8,
  },
  input: {
    fontSize: 16,
    marginLeft: 8,
    width: "75%",
    color: "grey",
    fontFamily: "m",
  },
});
