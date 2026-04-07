import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import CustomLogin from '../components/customlogin';

export default function Homescreen({navigation}) {

  const [text, setText] = useState('');
  const [usertext, setUserText] = useState('Logga in för att gå vidare');

  return(
        <View style={styles.container}>
              <Text>{usertext}</Text>
              <Text>Du är på "Homescreen"</Text>
              <CustomLogin/>
              <Button
              title="Go to Profile"
              onPress={() => navigation.navigate("Profile")}
              />
              <StatusBar style="auto" />
            </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});