import { useState, useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PTMemoItem from '../components/PTMemoItem';
import { AntDesign, Ionicons  } from '@expo/vector-icons';
import { UserTabScreenProps } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_URL from '../components/BASE_URL';

export default function UserMyPageScreen({navigation}: UserTabScreenProps<'UserTabThree'>) {

  const day = "fri"
  const time = 9
  const remainingPT = 3

  const [userName, setUserName] = useState("")
  const [userSex, setUserSex] = useState("")
  const [userAge, setUserAge] = useState(0)
  const [userContact, setUserContact] = useState("")
  const [userCareer, setUserCareer] = useState("")
  const [userPurpose, setUserPurpose] = useState("")
  const [KoreanDay, setKoreanDay] = useState("")

  const [memoHistory, setMemoHistory] = useState<Array<any>>([])

  const memoData = [
    {id: 1, date:"1월 4일", text:"냠냠"},
    {id: 2, date:"1월 8일", text:"스쿼트"},
    {id: 3, date:"1월 9일", text:"굿"},
    {id: 4, date:"1월 20일", text:"레그레이즈"},
    {id: 5, date:"1월 29일", text:"메롱"},
  ];

  const getIdandUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem('Id')
      if (userId != null) {
        axios.get(`${BASE_URL}/users/${userId}`).then((res) => {
          console.log(res.data.result[0])
          setUserName(res.data.result[0].name)
          setUserSex(res.data.result[0].sex)
          setUserAge(res.data.result[0].age)
          setUserContact(res.data.result[0].contact)
          setUserCareer(res.data.result[0].career)
          setUserPurpose(res.data.result[0].purpose)

          // axios.get(`${BASE_URL}/trainers/${trainerId}/class/teaching`).then((res) => {
          //   console.log(res.data.result)
          //   setTeachingList(
          //     res.data.result.map((item)=>{
          //       return {
          //         classId: item.id,
          //         userId: item.user_id,
          //         userName: item.name,
          //         day: item.day,
          //         time: item.time,
          //         remainingPt: item.remaining_pt
          //       }
          //     })
          //   )
          // })
        }).catch((err) => console.log(err))
      } else {
        console.log("hi")
      }
    } catch (e) {console.log(e);}
  }

  useEffect(() => {
    getIdandUpdate()
  }, [])


  // useEffect(()=>{
  //   axios.get(`${BASE_URL}/users/${userId}`).then((res)=>{
  //     setUserName(res.data.result[0].name)
  //     setUserSex(res.data.result[0].sex)
  //     setUserAge(res.data.result[0].age)
  //     setUserContact(res.data.result[0].contact)
  //     setUserCareer(res.data.result[0].career)
  //     setUserPurpose(res.data.result[0].purpose)

  //   }).catch((err)=>{console.log(err)})

  //   switch (day) {
  //     case ("mon"):
  //       setKoreanDay("월")
  //       break
  //     case ("tue"):
  //       setKoreanDay("화")
  //       break
  //     case ("wed"):
  //       setKoreanDay("수")
  //       break
  //     case ("thur"):
  //       setKoreanDay("목")
  //       break
  //     case ("fri"):
  //       setKoreanDay("금")
  //       break
  //   }
  // }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{userName} 회원님</Text>
        {userSex == 'M'
          ? <Ionicons name="male" size={28} color="skyblue" />
          : <Ionicons name="female" size={28} color="pink" />}
      </View>
      <View style={styles.separator}/>
      <ScrollView>
        <View style={styles.infoContainer}>
          <View style={styles.infoInnerBox}>
            <Text style={styles.infoTxtTitle}>나이</Text>
            <Text style={styles.infoTxtTitle}>연락처</Text>
            <Text style={styles.infoTxtTitle}>운동 경력</Text>
            <Text style={styles.infoTxtTitle}>운동 목적</Text>
          </View>
          <View style={styles.infoInnerBox}>
            <Text style={styles.infoTxt}>{userAge}</Text>
            <Text style={styles.infoTxt}>{userContact}</Text>
            <Text style={styles.infoTxt}>{userCareer}</Text>
            <Text style={styles.infoTxt}>{userPurpose}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.infoTxtTitle}>남은 횟수</Text>
          <Text style={styles.infoTxt}>{remainingPT}회</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.infoTxtTitle}>PT 시간</Text>
          <Text style={styles.infoTxt}>{KoreanDay}요일 {time}시</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.infoTxtTitle}>나의 트레이너</Text>
          <Text style={styles.infoTxt}>{KoreanDay}요일 {time}시</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.infoTxtTitle}>Memo</Text>
        </View>

        <View style={styles.memoList}>
          <FlatList
            keyExtractor={item => String(item.id)}
            data = {memoData}
            horizontal = {true}
            renderItem={({item}) => <PTMemoItem date={item.date} text={item.text}/>}
          />
        </View>
      </ScrollView>
      
      
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5
  },
  separator: {
    marginTop: 5,
    height: 1,
    width: '100%',
    backgroundColor: '#dddddd'
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: '#dddddd',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20
  },
  infoInnerBox: {
    // flex: 1,
    // height: 10
    padding: 20,
  },
  infoTxtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    marginRight: 10
  },
  infoTxt: {
    fontSize: 16,
    marginVertical: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  memoList: {
    flex: 5,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    zIndex: -1
  },
  dateTxt: {
    fontSize: 20,
    fontWeight: '600'
  },
  memoInput: {
    height: 200,
    fontSize: 20,
    width: 300,
    marginVertical: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: '#dddddd',
    borderRadius: 20
  },
  summitTxt: {
    fontSize: 16,
    fontWeight: '600'
  },
  summitBtn: {
    width: 100,
    height: 40,
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
