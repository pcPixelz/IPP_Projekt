import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function Homescreen({navigation}) {
    return(
        <View style={styles.container}>
              <Text>Du är på "ProfileScreen"</Text>
              <Button
              title="Go to Home"
              onPress={() => navigation.navigate("Home")}
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