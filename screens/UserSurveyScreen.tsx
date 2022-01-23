import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import { useState } from 'react'
import { RadioButton } from "react-native-paper";
import { RootStackScreenProps } from "../types";
import NumericInput from "react-native-numeric-input";
import axios from "axios";
import { storeId } from "../components/AsyncStorageFunc";

export default function UserSurveyScreen({route, navigation}: RootStackScreenProps<'UserSurvey'>) {

  const {userId, userPw} = route.params;
  const [name, setName] = useState('')
  const [sex, setSex] = useState('M')
  const [age, setAge] = useState(25)
  const [contact, setContact] = useState('')
  const [career, setCareer] = useState('')
  const [purpose, setPurpose] = useState('')

  const onComplete = () => {
    let json = {"login_id": userId, "login_pw": userPw, "name": name, "sex": sex, "age": age,
                "contact": contact, "career": career, "purpose": purpose}
    axios.post('http://192.249.18.145:443/users/register', json).then((res) => {
      console.log(res);
      storeId(res.data.result.insertId)
      navigation.navigate('UserRoot')
    }).catch((err) => console.log(err))
  }

  return(
     <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>트레이너들이 볼 수 있도록 정보를 작성해주세요</Text>
      <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 3, margin: 10, padding: 10, }}>
        <View style={styles.input}>
          <Text style={styles.text}>이름</Text>
          <TextInput style={styles.tinput} placeholder='name' value={name} onChangeText={setName} />
        </View>
        <View style={styles.input}>
          <Text style={styles.text}>연락처</Text>
          <TextInput style={styles.tinput} placeholder='tel)' value={contact} onChangeText={setContact} />
        </View>
        <View style={styles.input}>
          <Text style={{textDecorationLine: 'underline', fontSize: 15, marginRight: 30}}>나이</Text>
          <NumericInput value={age} onChange={setAge} totalWidth={150} totalHeight={40}/>
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
          <Text style={styles.text}>운동 경력</Text>
          <TextInput style={styles.multiinput} placeholder=' 운동 경력을 적어주세요' multiline={true} value={career} onChangeText={setCareer} />
        </View>
        <View style={styles.input}>
          <Text style={styles.text}>운동 목적</Text>
          <TextInput style={styles.multiinput} placeholder=' 트레이너에게 하고싶은 말' multiline={true} value={purpose} onChangeText={setPurpose} />
        </View>
        <Text>작성해주신 정보를 토대로 알맞는 트레이너를 추천해 드립니다!</Text>
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