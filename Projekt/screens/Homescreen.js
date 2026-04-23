import {useContext} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import CustomLogin from '../components/customlogin';

import { UserContext } from "../context/UserContext";

export default function Homescreen({navigation}) {

  const {currentUser, isUserSelected} = useContext(UserContext);

  return(
        <View style={styles.container}>
          <Image style={styles.image} source={require('../images/logo.png')}/>
              <Text style={styles.headertext}>Du är inloggad som {currentUser}</Text>
              <CustomLogin
              />
              <Button
              title="Go to Profile"
              onPress={() => navigation.navigate("Profile")}
              disabled={true}
              />
              <TouchableOpacity 
              style={[styles.btnstyle,
                !isUserSelected && styles.btnstyledisabled
              ]}
              disabled={!isUserSelected}
              onPress={() => navigation.navigate("Bokning")}
              >
                <Text style={styles.text}>Boka skåp</Text>
              </TouchableOpacity>

              <TouchableOpacity 
              style={[styles.btnstyle,
                !isUserSelected && styles.btnstyledisabled
              ]}
              disabled={!isUserSelected}
              onPress={() => navigation.navigate("Aktiv Bokning")}
              >
                <Text style={styles.text}>Aktiv bokning</Text>
              </TouchableOpacity>

              <TouchableOpacity 
              style={[styles.btnstyle,
                !isUserSelected && styles.btnstyledisabled
              ]}
              disabled={!isUserSelected}
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
  image: {
    resizeMode: 'contain',
    width: 300,
    height: 300,
    marginTop: -150,
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