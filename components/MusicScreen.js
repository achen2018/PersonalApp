import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, Button, Image} from 'react-native';

const MusicScreen = ({ navigation, route }) => {
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
