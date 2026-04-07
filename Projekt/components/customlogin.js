import React, {useState} from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';
import { firestore } from "firebase/firestore";

const CustomLogin = () => {

    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');

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
            <Button
            title="Logga In"
            onPress={() => FirestoreLogin(user_email, user_password)}
            />
        </View>

    );
}

const FirestoreLogin = async (user_email, user_password) => {

    
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