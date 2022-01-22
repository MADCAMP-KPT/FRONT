import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { RootStackScreenProps } from "../types";
import { RadioButton } from "react-native-paper";
import { useState } from 'react'
import axios from "axios";

export default function SigninScreen({navigation}: RootStackScreenProps<'Signin'>) {

  const [checked, setChecked] = useState('User');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [chkpw, setChkPw] = useState('');
  // (checked === 'User') ? navigation.navigate('UserSurvey') : navigation.navigate('TrainerSurvey')
  const onSign = () => {
    if(id === '') {
      return alert('아이디를 입력해주세요.')
    }
    else if(pw !== chkpw) {
      return alert('비밀번호를 확인해 주세요')
    }

    if(checked === 'User') {
     axios.get(`http://192.249.18.145:443/users/check/${id}`).then((res) => {
       console.log(res.status);
       console.log(res.data.result[0].isValidUserId);
       if(res.data.result[0].isValidUserId) {
        navigation.navigate('UserSurvey', {userId: id, userPw: pw})
       } else {
         alert('중복된 아이디입니다.')
       }
      //  
     }).catch((err) => console.log(err)) 
    } else {
      axios.get(`http://192.249.18.145:443/trainers/check/${id}`).then((res) => {
        console.log(res.data.result[0].isValidTrainerId);
        if(res.data.result[0].isValidTrainerId) {
          navigation.navigate('TrainerSurvey', {trainerId: id, trainerPw: pw})
        } else {
          alert('중복된 아이디입니다.')
        }
      }).catch((err) => console.log(err))
    }
  }

  return(
    <View style={styles.view}>
      <Text style={styles.title}>김 PT 회원가입</Text>
      <View>
        <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
          <View style={{flexDirection: 'row'}}>
            <RadioButton.Item style={styles.radio} label="회원 전용" value="User" color={'black'}/>
            <RadioButton.Item style={styles.radio} label="트레이너 전용" value="Trainer" color={'black'}/>
          </View>
        </RadioButton.Group>
      </View>
      <TextInput style={styles.input} placeholder='아이디' value={id} onChangeText={setId} autoCapitalize='none' />
      <TextInput style={styles.input} placeholder='비밀번호' secureTextEntry={true} value={pw} onChangeText={setPw} autoCapitalize='none'/>
      <TextInput style={styles.input} placeholder='비밀번호 확인' secureTextEntry={true} value={chkpw} onChangeText={setChkPw} autoCapitalize='none' />
      <TouchableOpacity style={styles.touch} onPress={onSign}>
        <Text style={styles.text}>가입하기!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', justifyContent:'center'},
  text: {fontSize: 20},
  title: {fontSize: 60, fontWeight: 'bold', marginBottom: 50},
  touch: {alignItems: 'center',
    padding: 10,
    backgroundColor:'#dddddd',
    margin: 10
  },
  input: {
    height: 40,
    width: 200,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    },
  radio: {backgroundColor: "#dddddd", margin: 10, borderRadius: 20},
})