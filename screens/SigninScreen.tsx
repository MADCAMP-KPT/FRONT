import { Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
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
    if(id === '' || pw === '') {
      return Alert.alert('알림', '아이디/비밀번호를 입력해주세요.', [{text: '확인', style: 'cancel'}])
    }
    else if(pw !== chkpw) {
      return Alert.alert('알림', '아이디/비밀번호를 입력해주세요.', [{text: '확인', style: 'cancel'}])
    }

    if(checked === 'User') {
     axios.get(`http://192.249.18.145:443/users/check/${id}`).then((res) => {
       console.log(res.status);
       console.log(res.data.result[0].isValidUserId);
       if(res.data.result[0].isValidUserId) {
        navigation.navigate('UserSurvey', {userId: id, userPw: pw})
       } else {
         Alert.alert('알림', '중복된 아이디입니다.', [{text: '확인', style: 'cancel'}])
       }
      //  
     }).catch((err) => console.log(err)) 
    } else {
      axios.get(`http://192.249.18.145:443/trainers/check/${id}`).then((res) => {
        console.log(res.data.result[0].isValidTrainerId);
        if(res.data.result[0].isValidTrainerId) {
          navigation.navigate('TrainerSurvey', {trainerId: id, trainerPw: pw})
        } else {
          Alert.alert('알림', '중복된 아이디입니다.', [{text: '확인', style: 'cancel'}])
        }
      }).catch((err) => console.log(err))
    }
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <KeyboardAvoidingView behavior='padding' style={{width: '100%', alignItems:'center'}}>
          <TextInput style={styles.input} placeholder='아이디' value={id} onChangeText={setId} autoCapitalize='none' />
          <TextInput style={styles.input} placeholder='비밀번호' secureTextEntry={true} value={pw} onChangeText={setPw} autoCapitalize='none'/>
          <TextInput style={styles.input} placeholder='비밀번호 확인' secureTextEntry={true} value={chkpw} onChangeText={setChkPw} autoCapitalize='none' />
          <TouchableOpacity style={styles.touch} onPress={onSign}>
            <Text style={styles.text}>가입하기</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        
      </View>
    </TouchableWithoutFeedback>
    
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', justifyContent:'center'},
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 50
  },
  touch: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor:'skyblue',
    margin: 10,
    borderRadius: 30,
    width: 110,
    height: 50,
  },
  input: {
    height: 50,
    width: '70%',
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#dddddd'
  },
  radio: {backgroundColor: "#dddddd", margin: 10, borderRadius: 20},
})