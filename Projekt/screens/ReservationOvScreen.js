import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';

//Firebase, firestore
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp, query, where, getDocs, onSnapshot } from "firebase/firestore";

import { UserContext } from "../context/UserContext";

class Reservation {
    constructor(user, locker, start_date, end_date) {
        this.user = user;
        this.locker = locker;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}

const userCollection = collection(db, 'Reservations');

export default function ReservationOvScreen({navigation}) {

    const {current_user} = useContext(UserContext);

    const[list, setList] = useState([]);

    const fetchReservationInfo = async () => {
        const q = query(userCollection, where('user', '==', current_user));

        const querySnapshot = await getDocs(q);

        let newlist = [];

        if(!querySnapshot.empty)
        {
            querySnapshot.docs.forEach(field => {
                const r = new Reservation(field.data().user, field.data().locker, field.data().start_date.toDate(), field.data().end_date.toDate());
                newlist.push(r);
            });
        }

        setList(newlist);
    } 

    return(
        <View>
            <Button
            title='fetch'
            onPress={() => fetchReservationInfo()}/>

            <FlatList
            data={list}
            renderItem={({item}) => (<Text>{item.user} - {item.locker} - {item.start_date.toString()} - {item.end_date.toString()}</Text>)}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}