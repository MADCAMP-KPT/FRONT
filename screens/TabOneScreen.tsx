import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeTable from '../components/TimeTable'
import axios from 'axios';
import BASE_URL from '../components/BASE_URL';



export default function TabOneScreen() {
  const [name, setName] = useState('')
  const [teach, setTeach] = useState<{day: string, hour: number, userId: string}[]>([])

  useEffect(() => {
    getIdandUpdate()
  }, [])

  const getIdandUpdate = async () => {
    try {
      const value = await AsyncStorage.getItem('Id')
      if(value != null) {
        axios.get(`${BASE_URL}/trainers/${value}`).then((res) => {
          setName(res.data.result[0].name)
          axios.get(`${BASE_URL}/trainers/${value}/class/teaching`).then((res) => {
            let sch: {day: string, hour: number, userId: string}[]  = []
            for(var i = 0; i < res.data.result.length ; i ++) { 
              sch.push({"day": res.data.result[i].day, "hour": res.data.result[i].time, "userId": res.data.result[i].name})
            }
            setTeach(sch)
            console.log(sch);
          })
        }).catch((err) => console.log(err))
      }
    } catch (e) {console.log(e);}
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name} 트레이너님 주간 일정표</Text>
      <View style={styles.separator} />
      <ScrollView>
        <TimeTable teach={teach}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 6
    
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});
