import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, Button, FlatList} from 'react-native';

const Catalog = [
  {
    item: 'A dozen cookies',
    price: '4.00'
  },
  {
    item: 'Chocolate Cake',
    price: '10.00'
  }
];

const Item = ({ item, price }) => {

}

const ItemList = () => {
  const renderItem = ({ item }) => (
    <View>
      <Item item={item.item} price={item.price}/>
    </View>
  );
  return (
    <FlatList
      data={Catalog}
      renderItem={renderItem}
      keyExtractor={item => item.price}
    />
  )
}

const OrderCalculator = (props) => {
  const [numCake, setNumCake] = useState("");
  const [numCookie, setNumCookie] = useState("");
  const [numPie, setNumPie] = useState("")
  const [totalPrice, setTotalPrice] = useState(0);

  return(
    <View style={styles.container}>
      <Text style={styles.header}>
       Your Order
      </Text>
      <View style={styles.rowContainer}>
        <TextInput
          style={{height: 40}}
          placeholder="Number of Cakes"
          onChangeText={text => {
               setNumCake(text);
             }}
          defaultValue={"number of cakes"}
          value = {numCake}
        />
        <Text>{numCake} @ $10.00 each</Text>
      </View>
      <View style={styles.rowContainer}>
        <TextInput
          style={{height: 40}}
          placeholder="Number of Cookies"
          onChangeText={text => {
               setNumCookie(text);
             }}
          defaultValue={"number of cookies"}
          value = {numCookie}
        />
        <Text>{numCookie} @ $4.00 per dozen</Text>
      </View>
      <View style={styles.rowContainer}>
        <TextInput
          style={{height: 40}}
          placeholder="Number of Pies"
          onChangeText={text => {
               setNumPie(text);
             }}
          defaultValue={"number of pies"}
          value = {numPie}
        />
        <Text>{numPie} @ $7.00 each</Text>
      </View>
      <Button
          color='red' title='Calculate Total'
          onPress = {() =>
               setTotalPrice(parseFloat(10*numCake+4*numCookie+7*numPie))          }
      />
      <Text> Your total is {totalPrice} </Text>
    </View>
  );
}

export default OrderCalculator

const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textinput:{
      margin:20,
      fontSize:20
    },
    header: {
      fontSize:40,
      color:'blue'
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
