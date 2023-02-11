import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import SafeArea from '../components/SafeArea'

const SeeAll = ({ navigation }: any) => {
    return (
        <SafeArea>
            <View
                style={{
                    borderColor: '#aea0ae',
                    borderWidth: 1,
                    borderRadius: 8,
                    marginVertical: 8
                }}>
                <TextInput
                    editable
                    maxLength={40}
                    // onChangeText={text => onChangeText(text)}
                    // value={value}
                    style={{ padding: 8, color: '#fefefe' }}
                    placeholder="Search your bonds..."
                    placeholderTextColor={'#aea0ae'}
                />
            </View>

            <TouchableOpacity style={{ width: '100%', height: 160, padding: 8, borderBottomWidth: 0.8, borderColor: '#aea0ae' }}>
                <Text style={{ fontFamily: 'mm', color: '#4090FF', fontSize: 18 }}>8.75% Tax Free Tr I S IIB</Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 4
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
                            NHAI N6
                        </Text>
                        <Text
                            style={{
                                color: "#fefefe",
                                fontSize: 18,
                                fontWeight: "600",
                                fontFamily: "m",
                            }}
                        >
                            05-Feb-2029
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
                            ₹456
                        </Text>
                        <Text
                            style={{
                                color: "#ff1a28",
                                fontSize: 18,
                                fontWeight: "600",
                                fontFamily: "m",
                            }}
                        >
                            -0.5%
                        </Text>
                        {/* #12ca1f */}
                    </View>
                </View>
                <Text
                    style={{
                        color: "#fefefe",
                        fontSize: 16,
                        // fontWeight: "600",
                        marginVertical: 12,
                        fontFamily: "m",
                    }}
                >
                    CRISIL AAA STABLE / CARE AAA / BWR AAA STABLE
                </Text>
            </TouchableOpacity>

        </SafeArea>
    )
}

export default SeeAll

const styles = StyleSheet.create({})