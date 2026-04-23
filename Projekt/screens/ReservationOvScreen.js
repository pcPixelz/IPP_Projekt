import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';

//Firebase, firestore
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp, query, where, getDocs, onSnapshot } from "firebase/firestore";

import { UserContext } from "../context/UserContext";

class Reservation {
    constructor(user, locker, startDate, endDate) {
        this.user = user;
        this.locker = locker;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

const userCollection = collection(db, 'Reservations');

export default function ReservationOvScreen({navigation}) {

    const {currentUser} = useContext(UserContext);

    const[list, setList] = useState([]);

    const FetchReservationInfo = async () => {
        const q = query(userCollection, where('user', '==', currentUser));

        const querySnapshot = await getDocs(q);

        let newList = [];

        if(!querySnapshot.empty)
        {
            querySnapshot.docs.forEach(field => {
                const r = new Reservation(field.data().user, field.data().locker, field.data().startDate.toDate(), field.data().endDate.toDate());
                newList.push(r);
            });
        }

        setList(newList);
    } 

    return(
        <View>
            <Button
            title='fetch'
            onPress={() => FetchReservationInfo()}/>

            <FlatList
            data={list}
            renderItem={({item}) => (<Text>{item.user} - {item.locker} - {item.startDate.toString()} - {item.endDate.toString()}</Text>)}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}