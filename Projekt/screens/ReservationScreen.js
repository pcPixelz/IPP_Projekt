import {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//Firebase, firestore
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp, query, where, getDocs} from "firebase/firestore";

import { UserContext } from "../context/UserContext";


//DateTimePicker
//https://www.npmjs.com/package/%40react-native-community/datetimepicker/v/5.1.0?utm_source=chatgpt.com
//https://docs.expo.dev/versions/latest/sdk/date-time-picker/
import DateTimePicker from '@react-native-community/datetimepicker'

export default function ReservationScreen({navigation}) {

  useEffect(() => {
    SetupFunction();
  }, []);

  const SetupFunction = () => {
    const now = new Date();
    setStartDate(now);
    setStartTime(now);

    setEndDate(now);
    setEndTime(now);
  }

  const {currentUser} = useContext(UserContext);

    const [selectedLocker, setLocker] = useState(1);
    
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const onChangeHandler = (setter) => (event, selectedValue) => {
      if (event.type === "set" && selectedValue) {
        setter(selectedValue);
      }
    }

  const todaysDate = new Date();
  const tomorrowsDate = new Date(new Date().setDate(new Date().getDate() + 1));

  const userCollection = collection(db, 'Reservations');

  const SendReservation = async () => {
    if (await isLockerAvailable(selectedLocker)) {
        try {
        await addDoc(userCollection, {
            user: currentUser,
            locker: selectedLocker,
            startdate: Timestamp.fromDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes())),
            enddate: Timestamp.fromDate(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes())),
            islocked: true,
        });
        alert("Bokningen för skåp " + selectedLocker + " är bekräftad.");
    } catch (err) {
      console.log(err);
      alert("Error sending reservation data");
    }
    }
    else
    {
        alert("Skåpet är uptaget. Välj en annan tid eller skåp");
    }
  }

  const isLockerAvailable = async (locker) => {

    let available = true;

    const q = query(userCollection, where('locker', '==', locker));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty)
    {
        //https://firebase.google.com/docs/reference/node/firebase.firestore.Timestamp#seconds
        querySnapshot.docs.forEach(document => {
            const existingStartDate = document.data().startdate.toDate();
            const existingEndDate = document.data().enddate.toDate();
            const newStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes());
            const newEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes());
            if (newStartDate < existingEndDate && newEndDate > existingStartDate)
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

          <View style={styles.row}>
            <View style={styles.column}>
              <TouchableOpacity
              style={styles.lockerleft}
              onPress={() => setLocker(1)}
              >
              <Text style={styles.buttontext}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={styles.lockerleft}
              onPress={() => setLocker(3)}
              >
              <Text style={styles.buttontext}>3</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.column}>
            <TouchableOpacity
              style={styles.lockerright}
              onPress={() => setLocker(2)}
              >
              <Text style={styles.buttontext}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={styles.lockerright}
              onPress={() => setLocker(4)}
              >
              <Text style={styles.buttontext}>4</Text>
              </TouchableOpacity>
            </View>

          </View>
          <Text style={styles.text}>Du har valt skåp {selectedLocker}</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.datetext}>Välj Starttid</Text>
              <DateTimePicker
                testID="StartDatePicker"
                value={startDate}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeHandler(setStartDate)}
                minimumDate={todaysDate}
                maximumDate={tomorrowsDate}
              />
              <DateTimePicker
                style={styles.datetime}
                testID="StartTimePicker"
                value={startTime}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={onChangeHandler(setStartTime)}
              />

        <Text style={styles.datetext}>{new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes()).toString()}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.datetext}>Välj sluttid</Text>
            <DateTimePicker
        style={styles.datetime}
        testID="EndDatePicker"
          value={endDate}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeHandler(setEndDate)}
          minimumDate={todaysDate}
          maximumDate={tomorrowsDate}
        />
        <DateTimePicker
        style={styles.datetime}
        testID="EndTimePicker"
          value={endTime}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChangeHandler(setEndTime)}
        />

        <Text style={styles.datetext}>{new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes()).toString()}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btnconfirm}
        
        onPress={() => SendReservation()}>
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
    margin: 5,
  },
  datetext: {
    fontSize: 24,
    marginTop: 10,
  },
  //https://stackoverflow.com/questions/44798426/how-to-change-background-color-of-react-native-button
  lockerleft: {
    backgroundColor: 'rgb(156, 194, 218)',
    height: 150,
    width: 150,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderWidth: 5,
  },
  lockerright: {
    backgroundColor: 'rgb(156, 194, 218)',
    height: 150,
    width: 150,
    alignSelf: 'flex-start',
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
    marginTop: 20,
    height: 80,
    width: 300,
  },
  datetime: {
    marginTop: 10,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
});