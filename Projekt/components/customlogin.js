import React, {useContext, useState} from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Firebase
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { UserContext } from "../context/UserContext";

//https://rnfirebase.io/firestore/usage
const FirestoreLogin = async (userEmail, userPassword) => {

    const userCollection = collection(db, 'Users');
    const q = query(userCollection, where('email', '==', userEmail));

    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty) {
        return {isUserSelected: false, error: "Användare med den mailadressen hittas inte."};
    }
    else {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        if (data.password != userPassword) {
            return {isUserSelected: false, error: "Lösenordet stämmer inte."};
        }
        else {
            return {isUserSelected: true}
        }
    }

}

const CustomLogin = () => {

    const {setCurrentUser, setIsUserSelected} = useContext(UserContext);

    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');

    const HandleLogin = async () => {
        const function_return = await FirestoreLogin(userEmail, userPassword);

        if(!function_return.isUserSelected) {
            alert(function_return.error);
        }
        else {
            setCurrentUser(userEmail);
            setIsUserSelected(true);
        }
    }

    return(
        <View style={styles.view}>
            <Text style={styles.text}>Logga in på Skåpshjälten</Text>
            <LoginTextInput
            placeholder="Mail"
            value={userEmail}
            onChangeText={setEmail}
            />
            <LoginTextInput
            placeholder="Lösenord"
            value={userPassword}
            onChangeText={setPassword}
            />

            <TouchableOpacity
            style={styles.btnloggain}
            onPress={() => HandleLogin()}
            >   

            <Text style={styles.btnloggaintext}>Logga in</Text>
            </TouchableOpacity>
        </View>

    );
}

const LoginTextInput = ({placeholder, value, onChangeText}) => {

    return(
        <View>
            <TextInput
            style={styles.logintextinput}
            placeholder={placeholder}
            value = {value}
            onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'rgb(206, 206, 206)',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
    },
  logintextinput: {
    height: 60,
    width: 300,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnloggain: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    height: 40,
    width: 120,
  },
  btnloggaintext: {
    alignSelf: 'center',
    fontSize: 24,
  },
});

export default CustomLogin;