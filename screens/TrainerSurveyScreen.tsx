import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from "react-native";
import { useState } from 'react'
import { RadioButton } from "react-native-paper";
import { RootStackScreenProps } from "../types";
import NumericInput from "react-native-numeric-input";
import axios from "axios";

export default function TrainerSurveyScreen({route, navigation}: RootStackScreenProps<'TrainerSurvey'>) {

  const {trainerId, trainerPw} = route.params
  const [name, setName] = useState('')
  const [sex, setSex] = useState('남')
  const [age, setAge] = useState(25)
  const [city, setCity] = useState('')
  const [company, setCompany] = useState('')
  const [instagram, setInst] = useState('')
  const [career, setCareer] = useState('')
  const [intro, setIntro] = useState('')

  const onComplete = () => {
    let json = {"login_id": trainerId, "login_pw": trainerPw, "name": name, "sex": sex, 
                "age": age, "gym_city": city, "gym_name": company, "instagram": instagram,
                "career": career, "intro": intro}
    axios.post('http://192.249.18.145:443/trainers/register', json).then((res) => {
        console.log(res);
        navigation.navigate('Root')
    }).catch((err) => console.log(err))
  }

  return(
   <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text style={{fontSize: 20, fontWeight: 'bold'}}>회원님들이 볼 수 있도록 정보를 작성해주세요</Text>
    <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 3, margin: 10, padding: 10, }}>
        <View style={styles.input}>
            <Text style={styles.text}>이름</Text>
            <TextInput style={styles.tinput} placeholder='name' value={name} onChangeText={setName} />
        </View>
        <View style={styles.input}>
        <Text style={{textDecorationLine: 'underline', fontSize: 15, marginRight: 30}}>나이</Text>
          <NumericInput value={age} onChange={setAge} totalWidth={150} totalHeight={40}/>
        </View>
        <View style={styles.input}>
            <Text style={styles.text}>지역</Text>
            <TextInput style={styles.tinput} placeholder='location' value={city} onChangeText={setCity} />
        </View>
        <View style={styles.input}>
            <Text style={styles.text}>소속</Text>
            <TextInput style={styles.tinput} placeholder='company' value={company} onChangeText={setCompany} />
        </View>
        <View style={styles.input}>
            <Text style={styles.text}>SNS</Text>
            <TextInput style={styles.tinput} placeholder='instagram' value={instagram} onChangeText={setInst} />
        </View>
        <View style={styles.input}>
            <Text style={styles.text}>성별</Text>
            <RadioButton.Group onValueChange={newValue => setSex(newValue)} value={sex}>
            <View style={{flexDirection: 'row'}}>
                <RadioButton.Item style={styles.radio} label="남성" value="M" color={'black'}/>
                <RadioButton.Item style={styles.radio} label="여성" value="F" color={'black'}/>
            </View>
            </RadioButton.Group>
        </View>
        <View style={styles.input}>
            <Text style={styles.text}>경력</Text>
            <TextInput style={styles.multiinput} placeholder=' ex) 수상경력, 근무이력 등' multiline={true} value={career} onChangeText={setCareer} />
        </View>
        <View style={styles.input}>
            <Text style={styles.text}>한줄소개</Text>
            <TextInput style={styles.multiinput} placeholder=' 자유롭게 자신을 소개해주세요' multiline={true} value={intro} onChangeText={setIntro} />
        </View>
        <Text>회원가입 후 마이페이지에서 SNS 연동 및 사진을 업로드할 수 있습니다!</Text>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signin')}> 
            <Text>뒤로가기</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onComplete}>
            <Text>작성 완료!</Text>    
            </TouchableOpacity> 
        </View>
    </View> 
   </SafeAreaView> 
  )
};

const styles = StyleSheet.create({
  button: {
    fontSize: 30,
    backgroundColor: '#f0c0c0',
    padding: 20,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 20
  },
  input: {
    flexDirection: 'row',
    margin: 0,
    padding: 5,
    alignItems: 'center'
  },
  text: {
    textDecorationLine: 'underline',
    fontSize: 15,
    margin: 5
  },
  tinput: {
    width: 200,
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    margin: 5,
    borderRadius: 10
  },
  radio: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,

  },
  multiinput: {
    height: 80,
    width: 250,
    borderWidth: 1,
    fontSize: 15,
    margin: 5,
    borderRadius: 10
  }
})