import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import GalleryList from '../components/GalleryList'
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function InBodyScreen() {

  // Getting Image Data (array of uri's) then sort by date, create gallery lists.
  // Photo data : {uri: uri, date: date}
  // Sort by date

  const [pickedImagePath, setPickedImagePath] = useState('');
  const [arr, setArr] = useState<Array<Array<String>>>([])


  function parseDate(date: String): String {
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
  
    const result = await ImagePicker.launchImageLibraryAsync({exif: true});
    // exif.DateTimeOriginal -> "2022:01:21 18:48:22"
    console.log(result)
  
    if(!result.cancelled) {
      setPickedImagePath(result.uri);
      setArr([...arr, [result.uri, parseDate(result.exif?.DateTimeOriginal)]])
    }
  }

  function sortDate(arr: Array<Array<String>>) {
    let cur: Array<String> = [] // contain calculated dates
    let images: Array<[String, Array<String>]> = [] // sort of images;
    for(var i=0; i< arr.length ; i++) {
      if(!cur.includes(arr[i][1])) {
        cur.push(arr[i][1]) // push calculated date

        let temp: Array<String> = []
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
        <Text style={{fontSize: 32, fontWeight: 'bold', textAlign: 'center', margin: 20}}>김기영의 인바디 갤러리</Text>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={showImagePicker}>
          <AntDesign name="pluscircle" size={48} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
      {(arr.length === 0) ?
        <View style={styles.container}>
          <Text style={{fontSize:32}}>사진을 추가해 보세요!</Text>
        </View>
        : 
        sortDate(arr).map((img, i) => {
          return <GalleryList key={i} imageData={img[1]} date={img[0]} arr={arr} setArr={setArr} />
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