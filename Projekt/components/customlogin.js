import React, {useContext, useState} from 'react';
import { View, TextInput, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

// Firebase
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { UserContext } from "../context/UserContext";

const CustomLogin = () => {

    const {setCurrentUser, setIsUserSelected} = useContext(UserContext);

    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');

    //https://rnfirebase.io/firestore/usage
const FirestoreLogin = async () => {

    const userCollection = collection(db, 'Users');
    const q = query(userCollection, where('email', '==', user_email));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        if (data.password != user_password)
        {
            alert("felaktigt lösenord");
        }
        else
        {
            setCurrentUser(user_email);
            setIsUserSelected(true);
        }
    }
    else
    {
        alert("Användare hittas inte");
    }

}

    return(
        <View style={styles.view}>
            <Text style={styles.text}>Logga in</Text>
            <LoginTextInput
            placeholder="Mail"
            value={user_email}
            onChangeText={setEmail}
            />
            <LoginTextInput
            placeholder="Lösenord"
            value={user_password}
            onChangeText={setPassword}
            />

            <TouchableOpacity
            style={styles.btnloggain}
            onPress={() => FirestoreLogin(user_email, user_password)}
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
        backgroundColor: 'rgb(156, 194, 218)',
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