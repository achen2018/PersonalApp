import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';

import AndrewProfile from './components/AndrewProfile'
import SignUpScreen from './components/SignUpScreen'
import LoginScreen from './components/LoginScreen'
import OrderDisplay from './components/OrderDisplay'
import MusicScreen from './components/MusicScreen'
import RecipeDisplay from './components/RecipeDisplay'
import Camera from './components/Camera'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Header = (props) => {
  return(
    <View>
      <Text style={styles.welcomeText}>
      {props.text}
      </Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome to Musipeas' }}
        />
        <Stack.Screen name="Recipes" component={RecipeDisplay} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="AndrewProfile" component={AndrewProfile}
            options={{title: 'Andrew Chen'}}/>
        <Stack.Screen name="Sign up" component={SignUpScreen}
            options={{title: 'Sign up'}}/>
        <Stack.Screen name="Login" component={LoginScreen}
            options={{title: 'Login'}}/>
        <Stack.Screen name="Order" component={OrderDisplay} />
        <Stack.Screen name="MusicScreen" component={MusicScreen}/>
        <Stack.Screen name="Camera" component={Camera}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.rowContainer}>
        <Button
          title="Recipes"
          color="green"
          onPress={() =>
            navigation.navigate('Recipes')
          }
        />
        <Button
          title="About"
          color="red"
          onPress={() =>
            navigation.navigate('About')
          }
        />
        <Button
          title="Order"
          color="blue"
          onPress={() =>
            navigation.navigate('Order')
          }
        />
        <Button
          title="Music"
          color="green"
          onPress={() =>
            navigation.navigate('MusicScreen')
          }
        />
        <Button
          title="Create Account"
          color="red"
          onPress={() =>
            navigation.navigate('Sign up')
          }
        />
        <Button
          title="Login"
          color="blue"
          onPress={() =>
            navigation.navigate('Login')
          }
        />
      </View>
      <Image
        source={{uri:"https://s3-us-west-2.amazonaws.com/ghost-blog-prod/2014/11/music-meal.png"}}
        style={{width:500, height:250}}
      />
    </View>
  );
};

const AboutScreen = ({ navigation, route }) => {
  return (
    <View>
      <AndrewProfile/>
      <Text>This was created by Andrew Chen</Text>
      <Text>Copyright 2021 All Rights Reserved</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection:'row',
  },
  welcomeText: {
    fontSize: 36,
  }
});
