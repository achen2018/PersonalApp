/*
  Here is a custom component
*/
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

export default function AndrewProfile({route,navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Andrew Chen's Profile </Text>
      <Text>I am a rising senior at Brandeis University double majoring in music composition and computer science.
      </Text>
      <Icon raised name = "home" type = "fontisto" color = "#57A892" onPress={() => navigation.navigate('Home')} />
      <Image
        style= {{ width: 305, height: 300}}
        source=  {require('../assets/profile_photo.jpg')}
        alt = "andrew"
      />
      <Button title="Go Home"
          onPress={() => navigation.navigate('Home')} />
      <Button title="See Default Profile"
          onPress={() =>
            navigation.navigate('Profile',{name:"Andrew Chen"})} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin:'25%',
    marginTop:20,
    padding:20,
  },
  headerText: {
    fontSize: 40,
    color: 'blue'
  },

});
