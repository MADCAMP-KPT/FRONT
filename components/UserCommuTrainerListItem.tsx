import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { Buffer } from 'buffer';
import axios from "axios";
import BASE_URL from "../components/BASE_URL";

export default function UserCommuTrainerListItem({trainerId, trainerName, gymName}:{
  trainerId : number,
  trainerName : String,
  gymName : String,
}) {

  const navigation = useNavigation()

  const [rating, setRating] = useState(0);
  const [sex, setSex] = useState("");
  const [trainerImg, setTrainerImg] = useState("https://www.ibossedu.co.kr/template/DESIGN_shared/program/theme/01/THUMBNAIL_60_60_icon_rep_box.gif");

  useEffect(()=>{
    axios.get(`${BASE_URL}/trainers/${trainerId}`).then((res)=>{
      setRating(res.data.result[0].rating)
      setSex(res.data.result[0].sex)
    }).catch((err)=>console.log(err))

    axios.get(`${BASE_URL}/trainers/${trainerId}/thumbnail`).then((res)=>{
      setTrainerImg(res.data[0].thumbnail)
    }).catch((err)=>console.log(err))
  }, [])
  

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={()=>navigation.navigate('UserCommunityDetail', {trainerId: trainerId})}>
      <Image
        style={styles.image}
        source={{uri: `data:image/png;base64,${trainerImg}`}}
        resizeMode='cover'
      />
      <View style={styles.rowContainer}>
        <Text style={styles.trainerName}>{trainerName}</Text>
        {sex == 'M'
            ? <Ionicons name="male" size={24} color="skyblue" />
            : <Ionicons name="female" size={24} color="pink" />}
      </View>
      <Text style={styles.ratingTxt}>평점 : {String(rating).substr(0,4)}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 5
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  trainerName: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
  },
  ratingTxt: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
});