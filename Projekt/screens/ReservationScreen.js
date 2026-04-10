import React, {useState} from 'react';
import { View, Text, Platform, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//DateTimePicker
//https://www.npmjs.com/package/%40react-native-community/datetimepicker/v/5.1.0?utm_source=chatgpt.com
//https://docs.expo.dev/versions/latest/sdk/date-time-picker/
import DateTimePicker from '@react-native-community/datetimepicker'

export default function ReservationScreen({navigation}) {

    //https://www.npmjs.com/package/%40react-native-community/datetimepicker/v/5.1.0?utm_source=chatgpt.com#getting-started
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const today_date = new Date();
  const tomorrow_date = new Date(new Date().setDate(new Date().getDate() + 1));

    return(
        <View>
        <Text>Välj ett skåp att reservera</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => alert("skåp 1 knapp")}
            
        >
            <Text style={styles.buttontext}>Skåp 1</Text>
        </TouchableOpacity>
        <View>
        </View>

        <DateTimePicker
        style={styles.datetime}
        testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={today_date}
          maximumDate={tomorrow_date}
        />
        <DateTimePicker
        style={styles.datetime}
        testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
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
  //https://stackoverflow.com/questions/44798426/how-to-change-background-color-of-react-native-button
  button: {
    backgroundColor: '#7e9fd6',
    height: 150,
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttontext: {
    textAlign: 'center',
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  datetime: {
    marginTop: 20,
    alignSelf: 'center',
  },
});