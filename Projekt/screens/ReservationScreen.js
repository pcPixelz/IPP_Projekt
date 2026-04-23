import React, {useContext, useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

//Firebase, firestore
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp, query, where, getDocs, onSnapshot } from "firebase/firestore";

import { UserContext } from "../context/UserContext";


//DateTimePicker
//https://www.npmjs.com/package/%40react-native-community/datetimepicker/v/5.1.0?utm_source=chatgpt.com
//https://docs.expo.dev/versions/latest/sdk/date-time-picker/
import DateTimePicker from '@react-native-community/datetimepicker'

export default function ReservationScreen({navigation}) {

  const {current_user} = useContext(UserContext);

    const [selected_locker, setLocker] = useState(0);
    
    const [start_date, setStartDate] = useState(new Date());
    const [start_time, setStartTime] = useState(new Date());

    const [end_date, setEndDate] = useState(new Date());
    const [end_time, setEndTime] = useState(new Date());

    const onChangeStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setStartDate(currentDate);
    };

    const onChangeStartTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setStartTime(currentTime);
    };

        const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setEndDate(currentDate);
    };

    const onChangeEndTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setEndTime(currentTime);
    };

  const today_date = new Date();
  const tomorrow_date = new Date(new Date().setDate(new Date().getDate() + 1));

  const userCollection = collection(db, 'Reservations');

  const sendReservation = async () => {
    if (await isAvailable(selected_locker)) {
        try {
        await addDoc(userCollection, {
            user: current_user,
            locker: selected_locker,
            startdate: Timestamp.fromDate(new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate(), start_time.getHours(), start_time.getMinutes())),
            enddate: Timestamp.fromDate(new Date(end_date.getFullYear(), end_date.getMonth(), end_date.getDate(), end_time.getHours(), end_time.getMinutes())),
        });
        alert("Bokning bekräftad");
    } catch (err) {
      console.log(err);
      alert("Error sending reservation data");
    }
    }
    else
    {
        alert("Skåp uptaget");
    }
  }

  const isAvailable = async (locker) => {

    let available = true;

    const q = query(userCollection, where('locker', '==', locker));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty)
    {
        //https://firebase.google.com/docs/reference/node/firebase.firestore.Timestamp#seconds
        querySnapshot.docs.forEach(document => {
            const existing_start_date = document.data().startdate.toDate();
            const existing_end_date = document.data().enddate.toDate();
            const new_start_date = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate(), start_time.getHours(), start_time.getMinutes());
            const new_end_date = new Date(end_date.getFullYear(), end_date.getMonth(), end_date.getDate(), end_time.getHours(), end_time.getMinutes());
            if ((new_start_date > existing_start_date && new_end_date < existing_end_date) || (new_start_date < existing_start_date && new_end_date > existing_start_date) || (new_start_date < existing_end_date && new_end_date > existing_end_date))
            {
                available = false;
            }
        });
    }

    return available;
}

    return(
        <View>
        <Text style={styles.text}>Välj ett skåp att reservera</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => setLocker(0)}
            
        >
            <Text style={styles.buttontext}>Skåp 1</Text>
        </TouchableOpacity>
        <View>
        </View>

        <DateTimePicker
        style={styles.datetime}
        testID="StartDatePicker"
          value={start_date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeStartDate}
          minimumDate={today_date}
          maximumDate={tomorrow_date}
        />
        <DateTimePicker
        style={styles.datetime}
        testID="StartTimePicker"
          value={start_time}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChangeStartTime}
        />

        <DateTimePicker
        style={styles.datetime}
        testID="EndDatePicker"
          value={end_date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeEndDate}
          minimumDate={today_date}
          maximumDate={tomorrow_date}
        />
        <DateTimePicker
        style={styles.datetime}
        testID="EndTimePicker"
          value={end_time}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChangeEndTime}
        />
        <Text style={styles.text}>{new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate(), start_time.getHours(), start_time.getMinutes()).toString()}</Text>

        <Text style={styles.text}>{new Date(end_date.getFullYear(), end_date.getMonth(), end_date.getDate(), end_time.getHours(), end_time.getMinutes()).toString()}</Text>

        <TouchableOpacity style={styles.btnconfirm}
        
        onPress={() => sendReservation()}>
            <Text style={styles.text}>Bekräfta bokning</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 32,
    margin: 20,
  },
  //https://stackoverflow.com/questions/44798426/how-to-change-background-color-of-react-native-button
  button: {
    backgroundColor: 'rgb(156, 194, 218)',
    height: 150,
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 5,
  },
  buttontext: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  btnconfirm: {
    backgroundColor: '#a0a0a0',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 80,
    width: 300,
  },
  datetime: {
    marginTop: 20,
    alignSelf: 'center',
  },
});