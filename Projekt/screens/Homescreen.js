import React, {useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import CustomLogin from '../components/customlogin';

export default function Homescreen({navigation}) {

  const [currentuser, setCurrentUser] = useState('(ej inloggad)');
  const [user_selected, setUserSelected] = useState(false);

  return(
        <View style={styles.container}>
              <Text style={styles.headertext}>Du är inloggad som {currentuser}</Text>
              <CustomLogin
              CurrentUser = {setCurrentUser}
              UserSelected = {setUserSelected}
              />
              <Button
              title="Go to Profile"
              onPress={() => navigation.navigate("Profile")}
              disabled={false}
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertext: {
    fontSize: 24,
    marginBottom: 50,
  }
});