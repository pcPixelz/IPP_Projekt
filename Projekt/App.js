import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ReservationScreen from "./screens/ReservationScreen";
import ReservationOvScreen from "./screens/ReservationOvScreen";

//för att köra allt i terminalen npx expo start --web

export default function App() {
  return (
      <NavigationContainer>
      <MyStack />
      <StatusBar style="auto" />
    </NavigationContainer>
    
  );
}

const Stack = createNativeStackNavigator();

function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name='Bokning' component={ReservationScreen} />
      <Stack.Screen name='Boknings Översikt' component={ReservationOvScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
