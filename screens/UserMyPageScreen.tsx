import * as WebBrowser from 'expo-web-browser';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";
import { UserTabScreenProps } from '../types';

export default function UserMyPageScreen({navigation}: UserTabScreenProps<'UserTabThree'>) {

  const ImageData : Array<String> = Array(10).fill('https://reactnative.dev/img/tiny_logo.png');

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.box}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>기영이 회원의 프로필 보기</Text>
          <View style={styles.container}>
            <Image style={styles.tinyLogo} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>이름</Text>
            <Text style={styles.users}>김기영</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>연락처</Text>
            <Text style={styles.users}>대전광역시 유성구</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>나이</Text>
            <Text style={styles.users}>minizzang헬스장</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>성별</Text>
            <Text style={styles.users}>남자김기영</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>운동 경력</Text>
            <Text style={styles.users}>김기영 25살</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>운동 목적</Text>
            <Text style={styles.users}>김기영입니다.</Text>
          </View>
        </View>
          <TouchableOpacity style={styles.redbox} onPress={() => navigation.navigate('Login')}>
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
  redbox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: '#e94b48'
  }
  });
  