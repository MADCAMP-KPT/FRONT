import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert, TextInput } from "react-native";
import { RootTabScreenProps } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE_URL from '../components/BASE_URL';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';
import DropdownMenu from 'react-native-dropdown-menu'

export default function TrainerMyPageScreen({navigation, route}: RootTabScreenProps<'TabThree'>) {

  const [imgList, setImgList] = useState<String[]>([])
  const [name, setName] = useState('')
  const [sex, setSex] = useState('남')
  const [age, setAge] = useState(25)
  const [city, setCity] = useState('')
  const [company, setCompany] = useState('')
  const [instagram, setInst] = useState('')
  const [career, setCareer] = useState('')
  const [intro, setIntro] = useState('')
  const [id, setId] = useState('')
  const [pickedImagePath, setPickedImagePath] = useState('');

  //Edit profile state
  const [edit, setEdit] = useState(false)
  const [cityList, setCityList] = useState<string[]>([])
  const [companyList, setCompList] = useState<string[][]>([[""]])

  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if(permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({base64: true, quality: 0});
  
    if(!result.cancelled) {
      setPickedImagePath(result.base64!);
      console.log(result.base64);
      axios.put(`${BASE_URL}/trainers/${id}/thumbnail`, {'thumbnail': result.base64})
      .then((res) => console.log(res)).catch((err) => console.log(err)) 
    }
  }

  const showImagePicker2 = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if(permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({base64: true, quality: 0});
  
    if(!result.cancelled) {
      setImgList([...imgList, result.base64!])
      axios.post(`${BASE_URL}/images/trainer/${id}`, {'image': result.base64})
      .then((res) => console.log(res)).catch((err) => console.log(err)) 
    }
  } 

  useEffect(() => {
    getIdandUpdate()
  }, [])

  useEffect(() => {
    axios.get(`${BASE_URL}/gyms/cities`).then((res) => {
      let arr: string[] = []
      res.data.result.map((item) => {
          arr.push(item.city)
      })
      setCityList([...arr])
  })
  }, [])

  useEffect(() => {
    axios.get(`${BASE_URL}/gyms/${city}/all`).then((res) => {
        let gyms: string[][] = [[]]
        res.data.result.map((item) => {
            gyms[0].push(item.name)
        })
        setCompList([...gyms])
    })
  }, [city])

  const getIdandUpdate = async () => {
    try {
      const value = await AsyncStorage.getItem('Id')
      if(value != null) {
        axios.get(`${BASE_URL}/trainers/${value}`).then((res) => {
          setId(value)
          setName(res.data.result[0].name)
          setSex(res.data.result[0].sex)
          setAge(res.data.result[0].age)
          setCareer(res.data.result[0].career)
          setIntro(res.data.result[0].intro)
          setInst(res.data.result[0].instagram)
          axios.get(`${BASE_URL}/gyms/${res.data.result[0].gym_id}`).then((res) => {
            setCity(res.data.result[0].city)
            setCompany(res.data.result[0].name)
            axios.get(`${BASE_URL}/trainers/${value}/thumbnail`).then((res) => {
              setPickedImagePath(res.data[0].thumbnail)
              // require: GET trainer's noonbody method
              axios.get(`${BASE_URL}/images/trainer/${value}`).then((res) => {
                let temp: string[] = []
                res.data.result.map((item) => {
                  temp.push(item.image)
                })
                setImgList([...temp])
              })
            }).catch((err) => console.log(err))
          })
        })
      }
    } catch (e) {console.log(e);}
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {edit? 
        <View style={styles.box}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>{name} 트레이너님</Text>
            <TouchableOpacity style={{alignSelf: 'center', marginLeft: 10}} onPress={showImagePicker}>
              <AntDesign name="pluscircle" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Image style={styles.tinyLogo} source={{uri: `data:image/png;base64,${pickedImagePath}`}}/>
          </View>
          <View style={styles.editbox}>
            <Text style={styles.text}>Edit Profile</Text>
            <View style={styles.inputWithoutIndex}>
              <Text style={styles.text}>지역</Text>
              <ScrollView horizontal={true} >
              <RadioButton.Group onValueChange={newValue => setCity(newValue)} value={city}>
              <View style={{flexDirection: 'row'}}>
                  {cityList.map((item, i) => {
                      return <RadioButton.Item key={i} style={styles.cities} label={item} value={item} color={'black'} />
                  })}
              </View>
              </RadioButton.Group>
              </ScrollView>
            </View>
            <View style={styles.inputWithoutIndex}>
              <Text style={styles.text}>소속</Text>
              <DropdownMenu
                style={{flex: 1}}
                bgColor={'white'}
                activityTintColor={'skyblue'}
                optionTextStyle={{color: 'green', fontSize: 15}}
                titleStyle={{color: 'green', fontSize: 20, fontWeight: 'bold'}} 
                data={companyList}
                
                // maxHeight={100}
                handler={(selection, row) => setCompany((companyList)[selection][row])}>
            </DropdownMenu>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>한줄 소개 </Text>
              <TextInput style={styles.multiinput} placeholder=' 자유롭게 자신을 소개해주세요' multiline={true} value={intro} onChangeText={setIntro} />
            </View>
            <View style={styles.input2}>
              <Text style={styles.text}>경력     </Text> 
              <TextInput style={styles.multiinput} placeholder=' ex) 수상경력, 근무이력 등' multiline={true} value={career} onChangeText={setCareer} />
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>Instagram</Text>
              <TextInput style={styles.tinput} placeholder='instagram' value={instagram} onChangeText={setInst} />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.button} onPress={() => setEdit(false)}>
            <Text style={{fontSize: 15, color: 'black'}}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              axios.put(`${BASE_URL}/trainers/${id}`, {"instagram": instagram, "career": career, "intro": intro, "gym_city": city, "gym_name": company})
              .then((res) => console.log(res))
              setEdit(false)
              }}>
            <Text style={{fontSize: 15, color: 'black'}}>적용</Text>
            </TouchableOpacity>
          </View>
        </View>

        :

        <View style={styles.box}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>{name} 트레이너님</Text>
            <TouchableOpacity style={{alignSelf: 'center', marginLeft: 10}} onPress={showImagePicker}>
              <AntDesign name="pluscircle" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Image style={styles.tinyLogo} source={{uri: `data:image/png;base64,${pickedImagePath}`}}/>
          </View>
          <View>
          <View style={styles.input}>
            <Text style={styles.text}>이름</Text>
            <Text style={styles.users}>{name}</Text>
          </View>
          <View style={styles.inputWithoutIndex}>
            <Text style={styles.text}>지역</Text>
            <Text style={styles.users}>{city}</Text>
          </View>
          <View style={styles.inputWithoutIndex}>
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
              WebBrowser.openBrowserAsync(`https://instagram.com/${instagram}`)}>
              <Text style={{color:'blue', fontSize: 20}}>@{instagram}</Text>
            </TouchableOpacity>
          </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => setEdit(true)}>
            <Text style={{fontSize: 15, color: 'black'}}>프로필 수정</Text>
          </TouchableOpacity>
        </View>
        }
        <View style={styles.box}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.users}>눈바디</Text>
            <TouchableOpacity style={{alignSelf: 'center', marginLeft: 10}} onPress={showImagePicker2}>
              <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true}>
            {(imgList.length === 0) ? 
              <View style={styles.container}>
                <Text style={{fontSize:32}}>사진을 추가해 보세요!</Text>
              </View>
              :
              imgList.map((img, i) => {
                return (
                  <TouchableOpacity key={i} onPress={() => {Alert.alert('알림', '사진을 삭제하시겠습니까?', [{text: '아니오', style: 'cancel'},
                  {text: '네', onPress: () => {
                    for(var k = 0; k < imgList.length ; k ++ ) {
                      if(imgList[k] === img) {
                        axios.delete(`${BASE_URL}/images/trainer`, {data: {'image': img}}).then((res) => {
                        }).catch((err) => console.log(err))
                        return setImgList(arr => arr.filter((img, i) => i != k))
                      }
                    }
                    return
                    }}])}}>
                    <Image style={styles.noonBody} source={{uri: `data:image/png;base64,${img}`}} />
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
          <TouchableOpacity style={styles.box} onPress={() => Alert.alert('알림', '로그아웃 하시겠습니까?', 
          [{text: '아니오', style: 'cancel'}, {text: '네', onPress: () => navigation.navigate('Login')}])}>
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
  noonBody: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 20
  },
  logo: {
    width: 66,
    height: 58,
  },
  input: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    alignItems: 'center',
    zIndex: -5
  },
  input2: {
    flexDirection: 'row',
    margin: 5,
    marginLeft: 25,
    padding: 5,
    alignItems: 'center',
    zIndex: -5
  },
  inputWithoutIndex: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    alignItems: 'center'
  },
  text: {
    textDecorationLine: 'underline',
    fontSize: 20,
    margin: 5
  },
  users: {
    fontSize: 20,
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
  editbox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 340,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: '#dddddd'
  },
  touch: {
    width: '40%',
    alignItems: 'center',
    padding: 8,
    backgroundColor:'#dddddd',
    margin: 1
  },
  button: {
    fontSize: 30,
    backgroundColor: 'skyblue',
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 20
  },
  multiinput: {
    height: 50,
    width: 200,
    backgroundColor: 'white',
    fontSize: 15,
    margin: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 5
  },
  tinput: {
    width: 200,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 15,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1
  },
  cities: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  });
  