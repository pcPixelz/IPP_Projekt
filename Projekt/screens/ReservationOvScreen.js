import {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

//Firebase, firestore
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs} from "firebase/firestore";

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

    useEffect(() => {
    FetchReservationInfo();
    }, []);

    const {currentUser} = useContext(UserContext);

    const[list, setList] = useState([]);

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
    } 

    return(
        <View>
            <Text style={styles.text1}>Dina Bokningar</Text>

            <FlatList
            data={list}
            renderItem={({item}) => (
            <Text style={styles.text2}>Skåp {item.locker} {'\n'} 
            Från: {item.startDate.toString()} {'\n'}
            Till {item.endDate.toString()}
            </Text>)}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text1: {
    alignSelf: 'center',
    fontSize: 32,
    margin: 5,
  },
  text2: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 5,
  },
});