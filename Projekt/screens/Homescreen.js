import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import CustomLogin from '../components/customlogin';

export default function Homescreen({navigation}) {

  const [currentuser, setCurrentUser] = useState('EJ INLOGGAD');
  const [user_selected, setUserSelected] = useState(false);

  return(
        <View style={styles.container}>
              <Text>Du är inloggad som {currentuser}</Text>
              <CustomLogin
              CurrentUser = {setCurrentUser}
              UserSelected = {setUserSelected}
              />
              <Button
              title="Go to Profile"
              onPress={() => navigation.navigate("Profile")}
              disabled={true}
              />
              <Button
              title="Bokning"
              disabled={!user_selected}
              onPress={() => navigation.navigate("Bokning", {current_user: currentuser})}
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