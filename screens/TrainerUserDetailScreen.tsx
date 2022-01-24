import { useState, useEffect } from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import PTMemoItem from '../components/PTMemoItem';
import { AntDesign, Ionicons  } from '@expo/vector-icons';
import Modal from 'react-native-simple-modal';
import { Calendar } from 'react-native-calendars';
import { RootStackScreenProps } from '../types';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import BASE_URL from '../components/BASE_URL';

// import { Text, View } from '../components/Themed';

export default function TabTwoScreen({route}: RootStackScreenProps<'UserDetail'>) {

  const classId = route.params.classId  // MyUserListItem에서 navigate될 때 파라미터로 받은 클래스 id
  const userId = route.params.userId
  const day = route.params.day
  const time = route.params.time
  const remainingPT = route.params.remainingPT

  const [userName, setUserName] = useState("")
  const [userSex, setUserSex] = useState("")
  const [userAge, setUserAge] = useState(0)
  const [userContact, setUserContact] = useState("")
  const [userCareer, setUserCareer] = useState("")
  const [userPurpose, setUserPurpose] = useState("")
  const [KoreanDay, setKoreanDay] = useState("")
  
  const [modalOpen, setModalOpen] = useState(false)
  const [dateModalOpen, setDateModalOpen] = useState(false)
  
  let timeNow = new Date();
  let date = String(timeNow.getFullYear())+"-"+String(timeNow.getMonth()+1)+"-"+String(timeNow.getDate());

  const [memo, setMemo] = useState("")
  const [memoHistory, setMemoHistory] = useState<Array<any>>([])
  const [selectedDay, setSelectedDay] = useState(date)

 
  // setSelectedDay()

  const memoData = [
    {id: 1, date:"1월 4일", text:"냠냠"},
    {id: 2, date:"1월 8일", text:"스쿼트"},
    {id: 3, date:"1월 9일", text:"굿"},
    {id: 4, date:"1월 20일", text:"레그레이즈"},
    {id: 5, date:"1월 29일", text:"메롱"},
  ];

  const parseDate = (date: String)=>{
    // date : "2022-9-25"
    var splitted = date.split("-")
    return splitted[0]+"년 "+splitted[1]+"월 "+splitted[2]+"일"
  }

  const postMemo = () => {
    axios.post(`${BASE_URL}/memo`, {
      "user_id": userId,
      "date": "2022-01-24", 
      "content": "잘했어용"
    })
  }

  useEffect(()=>{
    axios.get(`${BASE_URL}/users/${userId}`).then((res)=>{
      console.log(res.data.result[0])
      setUserName(res.data.result[0].name)
      setUserSex(res.data.result[0].sex)
      setUserAge(res.data.result[0].age)
      setUserContact(res.data.result[0].contact)
      setUserCareer(res.data.result[0].career)
      setUserPurpose(res.data.result[0].purpose)

    }).catch((err)=>{console.log(err)})

    // axios.get(`${BASE_URL}/memo/${classId}`).then((res)=>{
    //   console.log(res.data.result)
    // })

    switch (day) {
      case ("mon"):
        setKoreanDay("월")
        break
      case ("tue"):
        setKoreanDay("화")
        break
      case ("wed"):
        setKoreanDay("수")
        break
      case ("thur"):
        setKoreanDay("목")
        break
      case ("fri"):
        setKoreanDay("금")
        break
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{userName} 회원님</Text>
        {userSex == 'M'
          ? <Ionicons name="male" size={28} color="skyblue" />
          : <Ionicons name="female" size={28} color="pink" />}
      </View>
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
        <Text style={styles.infoTxtTitle}>운동 기록</Text>
        <TouchableOpacity style={styles.plusButton}
          onPress={()=>setModalOpen(true)}>
          <AntDesign name="pluscircle" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        open={modalOpen}
        modalDidOpen={() => console.log('modal did open')}
        modalDidClose={() => setModalOpen(false)}
        modalStyle={styles.modal}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalInnerBox}>
            <TouchableOpacity
              onPress={()=> setDateModalOpen(true)}>
              <Text style={styles.dateTxt}>{parseDate(selectedDay)}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.memoInput}
              placeholder="메모를 입력하세요."
              onChangeText={(text)=>setMemo(text)}
              multiline={true}/>
            <TouchableOpacity
              onPress={()=>setModalOpen(false)}
              style={styles.summitBtn}>
              <Text style={styles.summitTxt}>저장하기</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        
      </Modal>

      <Modal
        open={dateModalOpen}>
        <View>
          <Calendar
            onDayPress={day => { setSelectedDay(day.dateString); setDateModalOpen(false)}}
            markedDates={{[selectedDay] : {selected: true}}}
          />
        </View>
      </Modal>

      <View style={styles.memoList}>
        <FlatList
          keyExtractor={item => String(item.id)}
          data = {memoData}
          horizontal = {true}
          renderItem={({item}) => <PTMemoItem date={item.date} text={item.text}/>}
        />
      </View>
      
      {/* <View style={styles.separator}/> */}
    </SafeAreaView>
  );
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
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: '#dddddd',
    marginVertical: 20,
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
    flex: 1,
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
  plusButton: {
    width: 28,
    height: 28,
    // backgroundColor: 'yellow'
  },
  modal: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    borderRadius: 20,
    paddingHorizontal: 20
  },
  modalInnerBox: {
    alignItems: 'center',
    paddingVertical: 10
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
