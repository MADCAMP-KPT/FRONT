import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../types';
import { useNavigation, NavigatorScreenParams } from '@react-navigation/native';
import TimeTablePublic from '../components/TimeTablePublic'
import Modal from 'react-native-simple-modal';
import axios from 'axios';
import BASE_URL from '../components/BASE_URL';



export default function UserApplyScreen({route, navigation}: RootStackScreenProps<'UserApply'>) {

  const trainerId = route.params.trainerId

  const [userId, setUserId] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [trainerName, setTrainerName] = useState('')
  const [gymName, setGymName] = useState('')
  const [gymCity, setGymCity] = useState('')
  const [teach, setTeach] = useState<{day: string, hour: number, userName: string, 
                                      classId: number, remainingPT: number, userId: number}[]>([])
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);

  const [KoreanDay, setKoreanDay] = useState("");
  const [EngDay, setEngDay] = useState("");
  const [btn1, setBtn1] = useState("white");
  const [btn2, setBtn2] = useState("white");
  const [btn3, setBtn3] = useState("white");
  const [btn4, setBtn4] = useState("white");
  const [numPT, setNumPT] = useState(0);
  
  const getId = async () => {
    try {
      const userId = await AsyncStorage.getItem('Id')
      if (userId != null) {
        setUserId(Number(userId))
      }
    } catch (e) {console.log(e);}
  }

  useEffect(() => {
    getId()
    axios.get(`${BASE_URL}/trainers/${trainerId}`).then((res) => {
      setTrainerName(res.data.result[0].name)
      const gymId = res.data.result[0].gym_id
      axios.get(`${BASE_URL}/gyms/${gymId}`).then((res)=>{
        setGymName(res.data.result[0].name)
        setGymCity(res.data.result[0].city)
      }).catch((err)=>console.log(err))

      axios.get(`${BASE_URL}/trainers/${trainerId}/class/teaching`).then((res) => {
        console.log(res.data.result);
        let sch: {day: string, hour: number, userName: string, classId: number, remainingPT: number, userId: number}[]  = []
        for(var i = 0; i < res.data.result.length ; i ++) { 
          sch.push({"day": res.data.result[i].day, "hour": res.data.result[i].time, "userName": res.data.result[i].name,
                    "classId": res.data.result[i].id, "remainingPT": res.data.result[i].remaining_pt, "userId": res.data.result[i].user_id})
        }
        setTeach(sch)
        console.log(sch);
      })
    }).catch((err) => console.log(err))
  }, [])

  useEffect(()=>{
    switch (selectedCol) {
      case (0):
        setKoreanDay("월")
        setEngDay("mon")
        break
      case (1):
        setKoreanDay("화")
        setEngDay("tue")
        break
      case (2):
        setKoreanDay("수")
        setEngDay("wed")
        break
      case (3):
        setKoreanDay("목")
        setEngDay("thur")
        break
      case (4):
        setKoreanDay("금")
        setEngDay("fri")
        break
    }
  }, [selectedCol])

  const applyPT= () => {
    axios.post(`${BASE_URL}/class/apply`, {
      "trainer_id": trainerId,
      "user_id": userId,
      "day": EngDay,
      "time": selectedRow+6,
      "num_pt": numPT
    })
  }

  useEffect(()=>{
    switch (numPT) {
      case 10:
        setBtn1('skyblue')
        setBtn2('white')
        setBtn3('white')
        setBtn4('white')
        break;
      case 20:
        setBtn1('white')
        setBtn2('skyblue')
        setBtn3('white')
        setBtn4('white')
        break;
      case 30:
        setBtn1('white')
        setBtn2('white')
        setBtn3('skyblue')
        setBtn4('white')
        break;
      case 100:
        setBtn1('white')
        setBtn2('white')
        setBtn3('white')
        setBtn4('skyblue')
        break;
    }
  }, [numPT])


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PT 신청하기</Text>
      <View style={styles.separator} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.subTitle}>{trainerName} 트레이너님의 시간표</Text>
        <View style={styles.rowContainer}>
          <View style={styles.invalidBox}></View>
          <Text style={{marginRight: 20}}> : 신청 불가능한 시간</Text>
          <View style={styles.validBox}></View>
          <Text> : 신청 가능한 시간</Text>
        </View>
        <Text style={{alignSelf: 'center', marginBottom: 10}}>아래 표를 클릭해 시간을 선택하세요.</Text>
        <TimeTablePublic teach={teach} selectedCol={selectedCol} setSelectedCol={setSelectedCol} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
        
        <Text style={[styles.subTitle, {marginTop: 20}]}>PT 횟수</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={[styles.numberBtn, {backgroundColor: btn1}]}
            onPress={()=>setNumPT(10)}>
            <Text style={styles.numberTxt}>10회</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.numberBtn, {backgroundColor: btn2}]}
            onPress={()=>setNumPT(20)}>
            <Text style={styles.numberTxt}>20회</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.numberBtn, {backgroundColor: btn3}]}
            onPress={()=>setNumPT(30)}>
            <Text style={styles.numberTxt}>30회</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.numberBtn, {backgroundColor: btn4}]}
            onPress={()=>setNumPT(100)}>
            <Text style={styles.numberTxt}>100회</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.summitBtn}
          onPress={()=>setModalOpen(true)}>
          <Text style={styles.summitTxt}>신청하기</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        open={modalOpen}
        modalDidClose={()=>setModalOpen(false)}
        modalStyle={styles.modal}
      >
        <View style={{alignItems: 'center'}}>
          <Text style={styles.modalTxt}>{gymCity} {gymName}의</Text>
          <Text style={styles.modalTxt}>{trainerName} 트레이너에게</Text>
          <Text style={styles.modalTxt}>{KoreanDay}요일 {selectedRow+6}시~{selectedRow+7}시 PT를</Text>
          <Text style={styles.modalTxt}>{numPT}회 신청하시겠습니까?</Text>
        </View>
        <TouchableOpacity 
          style={[styles.summitBtn, {marginBottom: 0}]}
          onPress={()=>{
            setModalOpen(false)
            applyPT()
            navigation.navigate('UserRoot', {screen :'UserTabThree'})
          }
        }>
          <Text style={styles.summitTxt}>확인</Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingBottom: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'flex-start',
    margin: 6
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'flex-start',
    margin: 6,
    marginTop: 10
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginVertical: 10,
    width: '90%'
  },
  invalidBox: {
    width: 60,
    height: 30,
    backgroundColor: 'pink',
    borderColor: '#dddddd',
    borderWidth: 2
  },
  validBox: {
    width: 60,
    height: 30,
    backgroundColor: 'white',
    borderColor: '#dddddd',
    borderWidth: 2
  },
  separator: {
    marginTop: 5,
    height: 1,
    width: '95%',
    backgroundColor: '#dddddd'
  },
  summitBtn: {
    width: 100,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20
  },
  summitTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  },
  modal: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    borderRadius: 20,
    padding: 20,
  },
  modalTxt: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  numberBtn: {
    width: '20%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberTxt: {
    fontSize: 16,
    fontWeight: '500',
  },
});
