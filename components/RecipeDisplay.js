import React, { useState, useEffect } from "react";
import {View, Text, TextInput, StyleSheet, Button, Image,
        SafeAreaView, FlatList, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeDisplay = (props) => {
  const [search, setSearch] = useState(props.name);
  const [title, setTitle] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [description, setDescription] = useState("")
  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {getData()}
           ,[])

  const getData = async () => {
       try {
         // the '@profile_info' can be any string
         const jsonValue = await AsyncStorage.getItem('@recipe_list')
         let data = null
         if (jsonValue!=null) {
           data = JSON.parse(jsonValue)
           setRecipeList(data)
           console.log('just set recipe title and description')
         } else {
           console.log('just read a null value from Storage')
           setInfo({})
           setName("")
           setEmail("")
         }


       } catch(e) {
         console.log("error in getData ")
         console.dir(e)
         // error reading value
       }
  }

  const storeData = async (value) => {
       try {
         const jsonValue = JSON.stringify(value)
         await AsyncStorage.setItem('@reicpe_list', jsonValue)
         console.log('just stored '+jsonValue)
       } catch (e) {
         console.log("error in storeData ")
         console.dir(e)
         // saving error
       }
  }

  const clearAll = async () => {
       try {
         console.log('in clearData')
         await AsyncStorage.clear()
       } catch(e) {
         console.log("error in clearData ")
         console.dir(e)
         // clear error
       }
  }

  const renderRecipeItem = ({item}) => {
    return(
      <View style={{border:'thin solid blue'}}>
        <Text>{item.title}</Text>
        <Text>{item.ingredients}</Text>
        <Text>{item.description}</Text>
      </View>
    )
  }


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
        onChangeText={text => {setSearch(text)}}
        defaultValue="Search Recipes"
      />
      <Button
        title='search'
        color='blue'
      />
      <View>
        <TextInput
          style={{height: 20}}
          placeholder="Enter Item"
          onChangeText={text => {
                setTitle(text);
          }}
          value={title}
        />
      </View>
      <View>
        <TextInput
          style={{height: 20}}
          placeholder="Enter Ingredients"
          onChangeText={text => {
                setIngredients(text);
          }}
          value={ingredients}
        />
      </View>
      <View>
        <TextInput
          style={{height: 20}}
          placeholder="Enter Description"
          onChangeText={text => {
                setDescription(text);
          }}
          value={description}
        />
      </View>
      <View>
        <Button
          title={"add"}
          color="red"
          onPress={() => {
            const newRecipeList=
            recipeList.concat(
              {'title': title,
              'ingredients': ingredients,
              'description': description}
            )
            setRecipeList(newRecipeList)
            storeData(newRecipeList)
            setTitle("")
            setIngredients("")
            setDescription("")
          }}
        />
      </View>
      <FlatList
        data={recipeList}
        renderItem={renderRecipeItem}
        keyExtractor={item => item.title}
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
