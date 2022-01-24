import { Text, TouchableOpacity, View, StyleSheet, TextInput, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { useState } from 'react'
import { RootStackScreenProps } from '../types'
import { RadioButton } from 'react-native-paper'
import axios from 'axios'
import { storeId } from '../components/AsyncStorageFunc'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { setStatusBarBackgroundColor } from 'expo-status-bar'

export default function LoginScreen({navigation}: RootStackScreenProps<'Login'>) {

  const [checked, setChecked] = useState('User');
  const [id, setId] = useState('aa1');
  const [pw, setPw] = useState('test');

  // (checked === 'User') ? navigation.navigate('UserRoot') : navigation.navigate('Root')
  const onLogin = () => {
    let json = {"login_id": id, "login_pw": pw}
    if(checked === 'User') {
      axios.post('http://192.249.18.145:443/users/login', json).then((res) => {
        if(res.data.result.length == 0) {
          Alert.alert('알림', '존재하지 않는 회원입니다.', [{text: '확인', style: 'cancel'}])
        } else {
          storeId(res.data.result[0].id)
          navigation.navigate('UserRoot')
        }
      })
    } else {
      axios.post('http://192.249.18.145:443/trainers/login', json).then((res) => {
        console.log(res.data);
        if(res.data.result.length == 0) {
          Alert.alert('알림', '존재하지 않는 회원입니다.', [{text: '확인', style: 'cancel'}])
        } else {
          console.log(res.data.result[0].insertId);
          storeId(res.data.result[0].id)
          navigation.navigate('Root')
        }
      })
    }
  }
  // 전체를 둥글게 감싸는 뷰 하나 추가해보기
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior='padding' style={styles.view}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>김 PT</Text>
          <MaterialCommunityIcons name="arm-flex" size={90} color="black" style={{transform: [{scaleX : -1}]}} />
        </View>
        <View style={{alignItems: 'center', width: '70%', marginBottom: 16 }}>
          <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
            <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center', width: '75%'}}>
              <RadioButton.Item style={styles.radio} label="회원    " value="User" color={'black'}/>
              <RadioButton.Item style={styles.radio} label="트레이너" value="Trainer" color={'black'}/>
            </View>
          </RadioButton.Group>
        </View>
        <TextInput style={styles.input} placeholder='id' value={id} onChangeText={setId} autoCapitalize='none'/>
        <TextInput style={styles.input} placeholder='password' secureTextEntry={true} value={pw} onChangeText={setPw} autoCapitalize='none' />
        <TouchableOpacity style={styles.touch} onPress={onLogin}>
          <Text style={styles.text}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', marginVertical: 20, alignItems: 'center'}}
          onPress={() => navigation.navigate('Signin')}
        >
          <Text>김 PT가 처음이신가요?</Text>
          <Text style={{color:'skyblue', textDecorationLine: 'underline', marginLeft: 10}}>
            회원가입
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent:'center',
    alignSelf: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {fontSize: 16},
  title: {fontSize: 90, fontWeight: 'bold'},
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
  radio: {
    // width: '45%',
    backgroundColor: "#dddddd",
    margin: 3,
    borderRadius: 20,
    fontSize: 16,
  },
})