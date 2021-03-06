import React, { useState, useEffect, useRef } from "react";
import {View, Text, TextInput, StyleSheet, Button, Image,
        SafeAreaView, FlatList, ScrollView, Platform,
        TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';

const RecipeDisplay = ({navigation}) => {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [description, setDescription] = useState("")
  const [recipeList, setRecipeList] = useState([])
  const [image, setImage] = useState(null);
  const video = useRef(null);
  const [status, setStatus] = React.useState({});

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
         await AsyncStorage.setItem('@recipe_list', jsonValue)
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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
    <Video
      ref={video}
      style={styles.video}
      source={{
        uri: 'https://www.youtube.com/watch?v=C6XQuegX-m0',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
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
      <Button
        title="Camera"
        color="brown"
        onPress={() =>
          navigation.navigate('Camera')
        }
      />
      <View>
      <Button title="Pick an image from camera roll" color = "green" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
              'description': description,
              'date': new Date()}
            )
            setRecipeList(newRecipeList)
            storeData(newRecipeList)
            setImage(null)
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
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
});
