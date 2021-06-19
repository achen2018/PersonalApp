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

  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  return(
    <View style={styles.container}>
      <Text style={styles.header}>
       Your Order
      </Text>
      <TextInput/>
      <Button
          color='red' title='Calculate Total'
          onPress = {() =>
               setTotalPrice(quantity*price)          }
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
