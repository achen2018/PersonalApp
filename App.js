import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';

import AndrewProfile from './components/AndrewProfile'

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
          options={{ title: 'Welcome to Andrews Site' }}
        />
        <Stack.Screen name="Recipes" component={RecipeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="AndrewProfile" component={AndrewProfile}
            options={{title: 'Andrew Chen'}}/>
        <Stack.Screen name="Order" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
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
        onPress={() =>
          navigation.navigate('Order')
        }
      />
      <Button
        title="About Andrew"
        onPress={() =>
          navigation.navigate('AndrewProfile')
        }
      />
    </View>
  );
};

const AboutScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>This was created by Andrew Chen</Text>
      <Text>Copyright 2021 All Rights Reserved</Text>
    </View>
  );
};

const RecipeScreen = ({ navigation, route }) => {
  return(
    <View>
      <Text>Here are our recipes</Text>
      <RecipeDisplay/>
    </View>
  )
}

const OrderScreen = ({ navigation, route}) => {
  return(
    <View>
      <OrderDisplay/>
    </View>
  )
}

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
    </View>

  )
}

const OrderDisplay = (props) => {
  const [text, setText] = useState(props.item);

  return(
    <View>
      <Text>What do you want to order?</Text>
      <TextInput
        style={{
          height: 36,
          borderColor: 'black',
          borderWidth: 1
        }}
        onChangeText={text => {setText(text)}}
        defaultValue="Place your order here"
      />
    </View>
  )
}

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
