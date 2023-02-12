import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import SafeArea from "../components/SafeArea";
import Slider from '@react-native-community/slider';
import Navbar from "../components/Navbar";
import { processFontFamily } from "expo-font";

const Calculator = () => {
    const [amnt, setAmnt] = useState(0);
    const [roi, setRoi] = useState();
    const [split, setSplit] = useState();

    //@ts-ignore
    function interest(principle, rate, time) {
        console.log(principle, rate, time)
        let intrst = principle * (rate/100);
        let kisht = intrst/time;
        // let div = rate / time;
        let timei = 12 / time;
        let interesti = 0;
        for (let i = 1; i <= time; i++) {
            interesti += kisht + (12 - (timei * i)) * kisht * 0.005;
        }
        return isNaN(interesti) ? 0 : interesti;
    }


    return (
        <SafeArea>
            <>
                <Navbar title="Bond Intrest Calculator" />
                <TextInput
                    onChangeText={(event) => setAmnt(event)}
                    keyboardType="numeric"
                    placeholder="Enter your principle amount"
                    placeholderTextColor={"#aea0ae"}
                    style={{ borderWidth: 0.8, borderColor: '#aea0ae', padding: 8, borderRadius: 8, marginVertical: 16, color: '#fefefe', fontFamily: 'm' }} />


                <Text style={{ fontFamily: 'm', fontSize: 16, color: '#fefefe' }}>Select your Coupon Rate (per annum)</Text>
                <Slider
                    style={{ height: 40 }}
                    minimumValue={0}
                    maximumValue={10}
                    step={0.1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#FFFFFF"
                    //@ts-ignore
                    onValueChange={
                        (sliderValue) => setRoi(sliderValue)
                    }
                />

                <Text style={{ fontFamily: 'm', fontSize: 16, color: '#fefefe' }}>Select number of splits</Text>
                <Slider
                    style={{ height: 40 }}
                    minimumValue={1}
                    maximumValue={12}
                    step={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#FFFFFF"
                    //@ts-ignore
                    onValueChange={
                        (sliderValue) => setSplit(sliderValue)
                    }
                />

                <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{ fontFamily: 'm', fontSize: 14, color: '#fefefe' }}>Coupon Rate: {roi}%</Text>
                    <Text style={{ fontFamily: 'm', fontSize: 14, color: '#fefefe' }}>Annual Splits: {split}</Text>
                </View>
                
                <Text style={{ fontFamily: 'mb', fontSize: 24, color: '#fefefe' }}>Intrest gained: ₹{interest(amnt, roi, split)}</Text>
                <Text style={{ fontFamily: 'mb', fontSize: 24, color: '#fefefe' }}>Total worth: ₹{interest(amnt, roi, split ) + amnt}</Text>

            </>
        </SafeArea>
    );
};

export default Calculator;

const styles = StyleSheet.create({});
