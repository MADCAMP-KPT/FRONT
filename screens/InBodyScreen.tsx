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
  const [testData, setTestData] = useState<String[]>([])
  const [date, setDate] = useState<String[]>([])
  // Date : String[] object 만들기
  function parseDate(date: string): string {
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
      setTestData([...testData, result.uri])
      setDate([...date, parseDate(result.exif?.DateTimeOriginal)])
      console.log(result.uri);
      console.log(testData);
    }
  }

  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 40, textAlign: 'center', margin: 20}}>김기영의 인바디 갤러리</Text>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={showImagePicker}>
          <AntDesign name="pluscircle" size={48} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {date.map((dates, i) => {
          return <GalleryList key={i} imageData={[pickedImagePath]} date={dates} />    
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
    borderWidth: 3,
    margin: 10,
    padding: 10,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 20
    },
})