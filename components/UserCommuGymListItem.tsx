import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios';
import BASE_URL from './BASE_URL';

export default function UserCommuGymListItem({gymId, gymName}:{
  gymId : number,
  gymName : String,
}) {

  const navigation = useNavigation()
  const [trainerNum, setTrainerNum] = useState(0);

  useEffect(()=>{
    axios.get(`${BASE_URL}/gyms/${gymId}/trainers`).then((res)=>{
      console.log(res.data.result.length)
      setTrainerNum(res.data.result.length)
    }).catch((err)=>console.log(err))
  }, [])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={()=>navigation.navigate('UserCommunityTrainer', {gymId: gymId})}>
      <Text style={styles.gymName}>{gymName}</Text>
      <Text style={styles.userName}>트레이너 수 : {trainerNum}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 5
  },
  gymName: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'center',
  },
  btnContainer: {
    flexDirection: 'row'
  },
  btnAccept: {
    width: 60,
    height: 40,
    backgroundColor: '#3AA7D6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 10
  },
  btnReject: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff'
  }
});