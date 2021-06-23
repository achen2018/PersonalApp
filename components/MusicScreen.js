import React, { useState, useEffect } from "react";
import {View, Text, TextInput, StyleSheet, Button, Image,
        SafeAreaView, FlatList, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MusicScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [musicList, setMusicList] = useState([])

  useEffect(() => {getData()}
            ,[])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@todo_list')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setMusicList(data)
            console.log('just set Info, Name and Email')
          } else {
            console.log('just read a null value from Storage')
            setInfo({})
            setTitle("")
            setLink("")
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
          await AsyncStorage.setItem('@todo_list', jsonValue)
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

  return(
    <View>
      <Text>Music</Text>
      <Image
        source={{uri:"http://www.wallpapermania.eu/images/lthumbs/2012-12/4003_Piano-keys-in-spiral-shape-HD-wallpaper.jpg"}}
        style={{width:250, height: 200}}
      />
      <View style = {styles.rowContainer}>
        <TextInput/>
        <Button
          title="Share"
          color="Red"/>
      </View>
    </View>
  )
}

export default MusicScreen;

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
