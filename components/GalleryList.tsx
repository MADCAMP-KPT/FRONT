import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from "react-native"
import { Dispatch, SetStateAction } from "react"
import BASE_URL from "./BASE_URL"
import axios from 'axios'


export default function GalleryList({imageData, date, arr, setArr}:
   {imageData: Array<string>, date: string, arr: string[][], setArr: Dispatch<SetStateAction<string[][]>>}) {

  return (
    <View style={styles.container}>
      <Text>{date}</Text>
      <View style={styles.separator}/> 
      <ScrollView horizontal={true}>
        {imageData.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => {Alert.alert('알림', '사진을 삭제하시겠습니까?', [{text: '아니오', style: 'cancel'},
          {text: '네', onPress: () => {
            for(var k = 0; k < arr.length ; k++) {
              if(arr[k][0] === item && arr[k][1] === date) {
                axios.delete(`${BASE_URL}/images/user`, {data: {'image': item}}).then((res) => {
                  console.log(res);
                }).catch((err) => console.log(err))
                return setArr(arr => arr.filter((item, i) => i != k))
              }
            }
            return }}])}}>
              <Image style={styles.tinyLogo} source={{uri: `data:image/png;base64,${item}`}} />
            </TouchableOpacity>
          )
        })} 
      </ScrollView>
    </View>      
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 20
    },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '100%',
    backgroundColor: '#dddddd'
    },
})