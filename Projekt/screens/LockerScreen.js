import {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

//Firebase, firestore
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp, query, where, getDocs} from "firebase/firestore";

import { UserContext } from "../context/UserContext";

class Reservation {
    constructor(user, locker, startDate, endDate) {
        this.user = user;
        this.locker = locker;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

export default function LockerScreen ({ navigation }) {

    useEffect(() => {
    FetchReservationInfo();
    }, []);
    
    const {currentUser} = useContext(UserContext);

    const userCollection = collection(db, 'Reservations');
    
    const[list, setList] = useState([]);
    const[activeReservations, setActiveReservations] = useState([]);
    
    const FetchReservationInfo = async () => {
        const q = query(userCollection, where('user', '==', currentUser));
    
        const querySnapshot = await getDocs(q);
    
        let newList = [];
    
        if(!querySnapshot.empty)
        {
            querySnapshot.docs.forEach(field => {
                const r = new Reservation(field.data().user, field.data().locker, field.data().startdate.toDate(), field.data().enddate.toDate());
                newList.push(r);
            });
        }
    
        setList(newList);
        setActiveReservations(ActiveReservation(newList));
    } 

    const ActiveReservation = (userReservations) => {

        const now = new Date();

        let newList = [];

        userReservations.forEach(reservation => {
            const existingStartDate = reservation.startDate;
            const existingEndDate = reservation.endDate;

            if(existingStartDate < now && existingEndDate > now)
            {
                newList.push(reservation);
            }
        });

        return newList;
    }

    return(
        <View>
            <Text style={styles.text1}>Du har en nuvarande bokning på detta skåp</Text>

            <FlatList
                data={activeReservations}
                renderItem={({item}) => (
                <Text style={styles.text2}>Skåp {item.locker} {'\n'} 
                Bokningen avslutas {item.endDate.toString()}
                </Text>)}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text1: {
    alignSelf: 'center',
    fontSize: 24,
    margin: 5,
  },
  text2: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 5,
  },
});