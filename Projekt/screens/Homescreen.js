import {useContext} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import CustomLogin from '../components/customlogin';

import { UserContext } from "../context/UserContext";

export default function Homescreen({navigation}) {

  const {current_user, is_user_selected} = useContext(UserContext);

  return(
        <View style={styles.container}>
              <Text style={styles.headertext}>Du är inloggad som {current_user}</Text>
              <CustomLogin
              />
              <Button
              title="Go to Profile"
              onPress={() => navigation.navigate("Profile")}
              disabled={true}
              />
              <Button
              title="Bokning"
              disabled={!is_user_selected}
              onPress={() => navigation.navigate("Bokning")}
              />
              <Button
              title='Boknings Översikt'
              disabled={!is_user_selected}
              onPress={() => navigation.navigate("ReservationOv")}/>
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