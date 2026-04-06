import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

//Firebase
import { db } from "../firebaseConfig";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export default function Homescreen({navigation}) {

    const sendTestData1 = async () => {
    try {
      await setDoc(doc(db, "test", "demo1"), {
        led: 1
      });
      alert("Data sent!");
    } catch (err) {
      console.log(err);
      alert("Error sending data");
    }
  };

  const sendTestData0 = async () => {
    try {
      await setDoc(doc(db, "test", "demo1"), {
        led: 0
      });
      alert("Data sent!");
    } catch (err) {
      console.log(err);
      alert("Error sending data");
    }
  };

    return(
        <View style={styles.container}>
              <Text>Du är på "ProfileScreen"</Text>
              <Button
              title="Go to Home"
              onPress={() => navigation.navigate("Home")}
              />
              <Button
              title="Skicka 1 till firebase"
              onPress={sendTestData1}
              />

              <Button
              title="Skicka 0 till firebase"
              onPress={sendTestData0}
              />
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