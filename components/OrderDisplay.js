import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import OrderCalculator from './OrderCalculator'

const OrderDisplay = (props) => {
  const [text, setText] = useState(props.item);

  return(
    <OrderCalculator/>
  )
}

export default OrderDisplay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#eee',
    alignItems: 'left',
    justifyContent: 'left',
    textAlign:'left',
    marginTop:20,
    padding:20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
