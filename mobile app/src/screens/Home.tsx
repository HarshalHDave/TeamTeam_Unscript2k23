import { StyleSheet, Text, View, Image, ScrollView, FlatList } from "react-native";
import React from "react";
import SafeArea from "../components/SafeArea";

const Home = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '5869471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-b6-145571e29d72',
      title: 'Third Item',
    },
  ];


  const Item = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0.8, borderColor: '#3e4045', padding: 8, marginTop: 8, marginHorizontal: 8, borderRadius: 8 }}>
        <View>
          <Text style={{ color: '#fefefe', fontSize: 18, fontWeight: '600', marginBottom: 8, fontFamily: 'm', marginRight: 16 }}>NHAI</Text>
          <Text style={{ color: '#fefefe', fontSize: 18, fontWeight: '600', fontFamily: 'm' }}>₹456</Text>
        </View>

        <View>
          <Text style={{ color: '#fefefe', fontSize: 18, fontWeight: '600', marginBottom: 8, fontFamily: 'm' }}>N6</Text>
          <Text style={{ color: '#ff1a28', fontSize: 18, fontWeight: '600', fontFamily: 'm' }}>-0.5%</Text>
          {/* #12ca1f */}
        </View>
      </View>
    )
  }
  return (
    <SafeArea>
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_aX6P9cmyNKvrfzR6KKymLcHq8pfwDri2p25QeTQ&s' }}
              style={{ width: 48, height: 48, borderRadius: 56, marginRight: 8 }} />
            <View>
              <Text style={{ color: '#fefefe', fontSize: 16 }}>Hello User</Text>
              <Text style={{ color: '#fefefe', fontSize: 18, fontWeight: '600' }}>Hello User</Text>
            </View>
          </View>
          <Text style={{ fontFamily: 'mb', color: '#fefefe', fontSize: 24 }}>Hello User</Text>
        </View>

        <Image source={require('../../assets/homebg.png')}
          style={{ width: 360, height: 128, alignSelf: 'center', marginTop: 16 }} />
        <View style={{ position: 'absolute', top: 144, left: 36 }}>
          <Text style={{ color: '#fefefe', fontSize: 32, fontWeight: '400', fontFamily: 'mm', letterSpacing: 2.4 }}>₹1000</Text>
        </View>

        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 16, marginTop: 24, alignItems: 'center', paddingHorizontal: 10 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '600', fontFamily: 'mm', letterSpacing: 1.2 }}>11th  Feburary'23</Text>
            <Text style={{ color: '#4090ff', fontSize: 14, fontWeight: '600', fontFamily: 'mm' }}>See All</Text>
          </View>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({ item }) => <Item />}
            keyExtractor={item => item.id}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 16, marginTop: 24, alignItems: 'center', paddingHorizontal: 10 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '600', fontFamily: 'mm', letterSpacing: 1.2 }}>Top Gainers</Text>
            <Text style={{ color: '#4090ff', fontSize: 14, fontWeight: '600', fontFamily: 'mm' }}>See All</Text>
          </View>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({ item }) => <Item />}
            keyExtractor={item => item.id}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 16, marginTop: 24, alignItems: 'center', paddingHorizontal: 10 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '600', fontFamily: 'mm', letterSpacing: 1.2 }}>Top Fallers</Text>
            <Text style={{ color: '#4090ff', fontSize: 14, fontWeight: '600', fontFamily: 'mm' }}>See All</Text>
          </View>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({ item }) => <Item />}
            keyExtractor={item => item.id}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 16, marginTop: 24, alignItems: 'center', paddingHorizontal: 10 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '600', fontFamily: 'mm', letterSpacing: 1.2 }}>Most Secure</Text>
            <Text style={{ color: '#4090ff', fontSize: 14, fontWeight: '600', fontFamily: 'mm' }}>See All</Text>
          </View>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({ item }) => <Item />}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </>
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({});
