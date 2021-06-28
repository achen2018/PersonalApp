import React, { useState, useEffect } from "react";
import {View, Text, TextInput, StyleSheet, Button, Image,
        SafeAreaView, FlatList, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const MusicScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [musicList, setMusicList] = useState([])
  const [recording, setRecording] = React.useState();

  useEffect(() => {getData()}
            ,[])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@music_list')
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
          await AsyncStorage.setItem('@music_list', jsonValue)
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

  const renderMusicItem = ({item}) => {
    return(
      <View style={{border:'thin solid blue'}}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    )
  }

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  }



  return(
    <View style={styles.container}>
      <Text>Music</Text>
      <Image
        source={{uri:"http://www.wallpapermania.eu/images/lthumbs/2012-12/4003_Piano-keys-in-spiral-shape-HD-wallpaper.jpg"}}
        style={{width:250, height: 200}}
      />
      <TextInput
        style={{height:20}}
        placeholder="Enter title"
        onChangeText={text => {
          setTitle(text);
        }}
      />
      <TextInput
        style={{height:20}}
        placeholder="Enter link"
        onChangeText={text => {
          setLink(text);
        }}
      />
      <Button
        title="Share"
        color='red'
        onPress = {() => {
          const newMusicList= musicList.concat(
            {
              'title':title,
              'link': link
            })
          setMusicList(newMusicList)
          storeData(newMusicList)
          setTitle("")
          setLink("")
        }}
        />
      <FlatList
        data={musicList}
        renderItem={renderMusicItem}
        keyExtractor={item => item.title}
      />
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
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
