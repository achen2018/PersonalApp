/*
  Here is a custom component
*/
import React from 'react';
import { StyleSheet, Image, Text, View, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements'

const LoginScreen = () => {
  return(
    <View>
      <View style = {styles.rowContainer}>
        <Text> Username </Text>
        <TextInput/>
      </View>
      <View style = {styles.rowContainer}>
        <Text> Password </Text>
        <TextInput/>
      </View>
      <Button title = 'Login'/>
    </View>
  );
}

export default LoginScreen;

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
