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
              <TouchableOpacity 
              style={[styles.btnstyle,
                !is_user_selected && styles.btnstyledisabled
              ]}
              disabled={!is_user_selected}
              onPress={() => navigation.navigate("Bokning")}
              >
                <Text style={styles.text}>Boka skåp</Text>
              </TouchableOpacity>

              <TouchableOpacity 
              style={[styles.btnstyle,
                !is_user_selected && styles.btnstyledisabled
              ]}
              disabled={!is_user_selected}
              onPress={() => navigation.navigate("Bokningsöversikt")}
              >
                <Text style={styles.text}>Bokningsöversikt</Text>
              </TouchableOpacity>
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
  },
    btnstyle: {
    backgroundColor: 'rgb(206, 206, 206)',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 80,
    width: 300,
    margin: 5,
  },
    btnstyledisabled: {
    height: 0,
    width: 0,
  },
    text: {
    alignSelf: 'center',
    fontSize: 32,
    margin: 20,
  },
});