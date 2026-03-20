import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Test text</Text>
      <StatusBar style="auto" />
      <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </View>
    
  );
}

const Stack = createNativeStackNavigator();

function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
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
