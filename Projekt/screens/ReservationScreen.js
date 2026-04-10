import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

//Firebase, firestore
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";


//DateTimePicker
//https://www.npmjs.com/package/%40react-native-community/datetimepicker/v/5.1.0?utm_source=chatgpt.com
//https://docs.expo.dev/versions/latest/sdk/date-time-picker/
import DateTimePicker from '@react-native-community/datetimepicker'

export default function ReservationScreen({navigation, route}) {

    const {current_user} = route.params;

    const [selected_locker, setLocker] = useState(0);
    
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);
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
            startdate: Timestamp.fromDate(new Date()),
            enddate: Timestamp.fromDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes())),
        });
        alert("Boknings bekräftad");
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

    const q = query(userCollection, where('locker', '==', locker));

    const querySnapshot = await getDocs(q);

    return querySnapshot.empty;
}

    return(
        <View>
        <Text style={styles.text}>Välj ett skåp att reservera</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => alert(setLocker(3))}
            
        >
            <Text style={styles.buttontext}>Skåp 1</Text>
        </TouchableOpacity>
        <View>
        </View>

        <DateTimePicker
        style={styles.datetime}
        testID="datePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          minimumDate={today_date}
          maximumDate={tomorrow_date}
        />
        <DateTimePicker
        style={styles.datetime}
        testID="TimePicker"
          value={time}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
        <Text style={styles.text}>{new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()).toString()}</Text>

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