//<reference path="../navigation/types.d.ts"/>
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";
import { RootTabScreenProps } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE_URL from '../components/BASE_URL';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker';
// import FormData from 'formdata'
// import ImagePicker from 'react-native-image-crop-picker'

export default function TrainerMyPageScreen({navigation, route}: RootTabScreenProps<'TabThree'>) {

  const ImageData : Array<String> = Array(10).fill('https://reactnative.dev/img/tiny_logo.png');

  const [name, setName] = useState('')
  const [sex, setSex] = useState('남')
  const [age, setAge] = useState(25)
  const [city, setCity] = useState('')
  const [company, setCompany] = useState('')
  const [instagram, setInst] = useState('')
  const [career, setCareer] = useState('')
  const [intro, setIntro] = useState('')

  const [pickedImagePath, setPickedImagePath] = useState('');

  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if(permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({base64: true});
  
    if(!result.cancelled) {
      setPickedImagePath(result.base64!);
      // let file = {
      //         uri: result.uri,
      //         type: 'multipart/form-data',
      //         name: 'image.jpg',
      // }
      // const data = new FormData()
      // data.append("thumbnail", file);
      axios.put(`${BASE_URL}/trainers/18/thumbnail`, {'thumbnail': result.base64})
      .then((res) => console.log(res)).catch((err) => console.log(err)) 
    }
  }

  // const showImagePicker = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true
  //   }).then(image => {
  //     console.log(image);
  //     const imageFormData = new FormData();
  //     let file = {
  //       uri: image.path,
  //       type: 'multipart/form-data',
  //       name: 'image.png'
  //     }
  //     imageFormData.append('thumbnail', JSON.stringify(file))
      
  //     axios.put(`${BASE_URL}/trainers/18/thumbnail`, imageFormData, {headers: {'content-type' : 'multipart/form-data'}}).then((res) => console.log(res))
  //   })
  // }



  useEffect(() => {
    getIdandUpdate()
  }, [])

  const getIdandUpdate = async () => {
    try {
      const value = await AsyncStorage.getItem('Id')
      if(value != null) {
        axios.get(`${BASE_URL}/trainers/${value}`).then((res) => {
          console.log(res);
          setName(res.data.result[0].name)
          setSex(res.data.result[0].sex)
          setAge(res.data.result[0].age)
          setCareer(res.data.result[0].career)
          setIntro(res.data.result[0].intro)
          setInst(res.data.result[0].instagram)
          axios.get(`${BASE_URL}/gyms/${res.data.result[0].gym_id}`).then((res) => {
            setCity(res.data.result[0].city)
            setCompany(res.data.result[0].name)
            axios.get(`${BASE_URL}/trainers/18/thumbnail`).then((res) => {
              console.log(res);
              setPickedImagePath(res.data[0].thumbnail)
            })
          })
        })
      }
    } catch (e) {console.log(e);}
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.box}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>{name} 트레이너님</Text>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={showImagePicker}>
            <AntDesign name="pluscircle" size={48} color="black" />
          </TouchableOpacity>
          <View style={styles.container}>
            <Image style={styles.tinyLogo} source={{uri: `data:image/png;base64,${pickedImagePath}`}}/>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>이름</Text>
            <Text style={styles.users}>{name}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>지역</Text>
            <Text style={styles.users}>{city}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>소속</Text>
            <Text style={styles.users}>{company}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>성별</Text>
            <Text style={styles.users}>{(sex === 'M' ? '남성': '여성')}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>나이</Text>
            <Text style={styles.users}>{age} 세</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>한줄소개</Text>
            <Text style={styles.users}>{intro}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>경력</Text>
            <Text style={styles.users}>{career}</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>Instagram</Text>
            <TouchableOpacity onPress={() => 
              WebBrowser.openBrowserAsync('https://instagram.com/ddungiii?utm_medium=copy_link')}>
              <Text style={{color:'blue', fontSize: 25}}>@{instagram}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.users}>기영's 눈바디</Text>
          <ScrollView horizontal={true}>
            {ImageData.map((item, index) => {
               return (
                 <TouchableOpacity key={index}>
                  <Image style={styles.tinyLogo} source={{uri: `${item}`}} />
                 </TouchableOpacity>
               )
            })} 
          </ScrollView>
        </View>
          <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.users}>로그아웃</Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    margin: 20
  },
  logo: {
    width: 66,
    height: 58,
  },
  input: {
    flexDirection: 'row',
    margin: 10,
    padding: 5,
    alignItems: 'center'
  },
  text: {
    textDecorationLine: 'underline',
    fontSize: 25,
    margin: 5
  },
  users: {
    fontSize: 25,
    margin: 5 
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  touch: {
    width: '40%',
    alignItems: 'center',
    padding: 8,
    backgroundColor:'#dddddd',
    margin: 1
  },
  });
  