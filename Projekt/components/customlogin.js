import React, {useState} from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';

// Firebase
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const CustomLogin = () => {

    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');
    const [text, setText] = useState('******');

    return(
        <View>
            <Text>Logga in ANGE INTE ETT RIKTIGT LÖSENORD</Text>
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
            <Text>{text}</Text>
            <Button
            title="Logga In"
            onPress={() => FirestoreLogin(user_email, user_password)}
            />
        </View>

    );
}

//https://rnfirebase.io/firestore/usage
const FirestoreLogin = async (user_email, user_password) => {

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

        }
    }
    else
    {
        alert("Användare hittas inte");
    }

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
  logintextinput: {
    height: 60,
    width: 300,
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
  },
});

export default CustomLogin;