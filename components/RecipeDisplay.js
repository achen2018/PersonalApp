import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, Button, Image} from 'react-native';

const RecipeDisplay = (props) => {
  const [text, setText] = useState(props.name);

  return (
    <View>
      <Image
        source={{uri:"https://champagnelifegifts.com/wp-content/uploads/2017/11/00001-Deluxe-Wine-Cheese-Basket-Copy_preview.png"}}
        style={{width:300, height:350}}
      />
      <Text>What recipes are you looking for?</Text>
      <TextInput
        style={{
          height: 36,
          borderColor: 'black',
          borderWidth: 1
        }}
        onChangeText={text => {setText(text)}}
        defaultValue="Search Recipes"
      />
      <Button
        title='search'
        color='blue'
      />
    </View>

  )
}

export default RecipeDisplay

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
