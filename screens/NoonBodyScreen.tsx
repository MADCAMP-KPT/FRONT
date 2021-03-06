import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import GalleryList from "../components/GalleryList";
import * as ImagePicker from 'expo-image-picker'
import BASE_URL from "../components/BASE_URL";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";

export default function NoonBodyScreen() {
  
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [arr, setArr] = useState<Array<Array<string>>>([])
  const [id, setId] = useState('')
  const [userName, setUserName] = useState("")

  useEffect( () => {
    getIdandUpdate()
  }, [])

  const getIdandUpdate = async () => {
    try {
      const value = await AsyncStorage.getItem('Id')
      if(value != null) {
        setId(value)
        axios.get(`${BASE_URL}/images/user/${value}/noonbody`).then((res) => {
          console.log(res);
          let temp: string[][] = []
          res.data.result.map((item) => {
            if(item.type === 'noonbody') {
              temp.push([item.image, item.date])
            }
          })
          setArr([...temp])
        })

        axios.get(`${BASE_URL}/users/${value}`).then((res)=>{
          setUserName(res.data.result[0].name)
        }).catch((err)=>console.log(err))
      }
    } catch(e) {
      console.log(e);
    }
  }

  function parseDate(date: string): string {
      if(date === undefined) { return '0000.00.00' }    
      let arr = date.split(' ')[0].split(':') 
      return `${arr[0]}.${arr[1]}.${arr[2]}`
  }

  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if(permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({exif: true, base64: true, quality: 0});
    // exif.DateTimeOriginal -> "2022:01:21 18:48:22"
    console.log(result)
  
    if(!result.cancelled) {
      setPickedImagePath(result.base64!);
      setArr([...arr, [result.base64!, parseDate(result.exif?.DateTimeOriginal)]])
      axios.post(`${BASE_URL}/images/user/${id}/noonbody`, {'image': result.base64, 'date': parseDate(result.exif?.DateTimeOriginal)}).then((res) => {
        console.log(res);
      })
    }
  }

  function sortDate(arr: Array<Array<string>>) {
    let cur: Array<string> = [] // contain calculated dates
    let images: Array<[string, Array<string>]> = [] // sort of images;
    for(var i=0; i< arr.length ; i++) {
      if(!cur.includes(arr[i][1])) {
        cur.push(arr[i][1]) // push calculated date

        let temp: Array<string> = []
        for(var j=0; j<arr.length ; j++) {
          if(arr[j][1] === arr[i][1]) {
            temp.push(arr[j][0])
          } else continue
        }
        images.push([arr[i][1], temp])
      }
      else continue
    }
    // sort by recent date
    images.sort((one, two) => (Number)(two[0].replaceAll('.', '')) - (Number)(one[0].replaceAll('.', '')))
    return images

  }

  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 24, fontWeight: '600', textAlign: 'center', margin: 16}}>{userName} ???????????? ????????? ?????????</Text>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={showImagePicker}>
          <AntDesign name="pluscircle" size={32} color="skyblue" />
        </TouchableOpacity>
      </View>
      <ScrollView>
      {(arr.length === 0) ?
        <View style={styles.container}>
          <Text style={{fontSize:32}}>????????? ????????? ?????????!</Text>
        </View>
        : 
        sortDate(arr).map((img, i) => {
          return <GalleryList key={i} imageData={img[1]} date={img[0]} arr={arr} setArr={setArr}/>
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
})