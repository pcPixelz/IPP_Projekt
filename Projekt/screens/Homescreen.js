import React, {useContext, useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import CustomLogin from '../components/customlogin';

import { UserContext } from "../context/UserContext";

export default function Homescreen({navigation}) {

  const {current_user, is_user_selected, setCurrentUser, setIsUserSelected} = useContext(UserContext);

  return(
        <View style={styles.container}>
              <Text style={styles.headertext}>Du är inloggad som {current_user}</Text>
              <CustomLogin
              />
              <Button
              title="Go to Profile"
              onPress={() => navigation.navigate("Profile")}
              disabled={false}
              />
              <Button
              title="Bokning"
              disabled={!is_user_selected}
              onPress={() => navigation.navigate("Bokning")}
              />
              <Button
              title='Bokningsöversikt'
              disabled={!is_user_selected}
              onPress={() => navigation.navigate("Boknings Översikt")}/>
              <StatusBar style="auto" />
            </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertext: {
    fontSize: 24,
    marginBottom: 50,
  }
});