import { useState, useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert, TextInput } from 'react-native';
import PTMemoItem from '../components/PTMemoItem';
import { AntDesign, Ionicons  } from '@expo/vector-icons';
import { UserTabScreenProps } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../components/BASE_URL';
import Navigation from '../navigation';

export default function UserMyPageScreen({navigation}: UserTabScreenProps<'UserTabThree'>) {

  const [userName, setUserName] = useState("")
  const [userSex, setUserSex] = useState("")
  const [userAge, setUserAge] = useState(0)
  const [userContact, setUserContact] = useState("")
  const [userCareer, setUserCareer] = useState("")
  const [userPurpose, setUserPurpose] = useState("")
  const [id, setId] = useState("")

  const [remainingPT, setRemainingPT] = useState(0)
  const [day, setDay] = useState("")
  const [time, setTime] = useState(0)
  const [KoreanDay, setKoreanDay] = useState("")

  const [trainingStatus, setTrainingStatus] = useState("")
  const [trainerId, setTrainerId] = useState(0)
  const [trainerName, setTrainerName] = useState("")
  const [trainerSex, setTrainerSex] = useState("")
  const [trainerAge, setTrainerAge] = useState(0)
  const [trainerInsta, setTrainerInsta] = useState("")
  const [trainerImage, setTrainerImage] = useState("https://www.ibossedu.co.kr/template/DESIGN_shared/program/theme/01/THUMBNAIL_60_60_icon_rep_box.gif")

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
        setId(userId)
        axios.get(`${BASE_URL}/users/${userId}`).then((res) => {
          console.log(res.data.result[0])
          setUserName(res.data.result[0].name)
          setUserSex(res.data.result[0].sex)
          setUserAge(res.data.result[0].age)
          setUserContact(res.data.result[0].contact)
          setUserCareer(res.data.result[0].career)
          setUserPurpose(res.data.result[0].purpose)

          axios.get(`${BASE_URL}/users/${userId}/class`).then((res) => {
            console.log(res.data.result[0])
            if (res.data.result[0]!=null){
              if (res.data.result[0].status == "teaching"){
                setRemainingPT(res.data.result[0].remaining_pt)
                setDay(res.data.result[0].day)
                setTime(res.data.result[0].time)
                setTrainerId(res.data.result[0].trainer_id)
                setTrainingStatus("teaching")
                console.log("hi welcome")
              } else if (res.data.result[0].status == "pending"){
                console.log("pending")
                setDay(res.data.result[0].day)
                setTime(res.data.result[0].time)
                setTrainerId(res.data.result[0].trainer_id)
                setTrainingStatus("pending")
              }
            } else {
              console.log("sorry")
              setTrainingStatus("none")
            }
          })
        }).catch((err) => console.log(err))
      } else {
        console.log("hi")
      }
    } catch (e) {console.log(e);}
  }

  useEffect(() => {
    getIdandUpdate()
  }, [trainerId])


  useEffect(()=>{
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
  }, [day])

  useEffect(()=>{
    axios.get(`${BASE_URL}/trainers/${trainerId}/thumbnail`).then((res)=>{
      setTrainerImage(res.data[0].thumbnail)
    }).catch((err)=>{console.log(err)})
    
    axios.get(`${BASE_URL}/trainers/${trainerId}`).then((res)=>{
      console.log(res.data.result[0])
      setTrainerName(res.data.result[0].name)
      setTrainerAge(res.data.result[0].age)
      setTrainerSex(res.data.result[0].sex)
      setTrainerInsta(res.data.result[0].instagram)
    }).catch((err)=>{console.log(err)})

  }, [trainerId])

  const [edit, setEdit] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{userName} 회원님</Text>
        {userSex == 'M'
          ? <Ionicons name="male" size={28} color="skyblue" />
          : <Ionicons name="female" size={28} color="pink" />}
        {edit? 
        <TouchableOpacity style={{justifyContent: 'flex-end', backgroundColor: 'skyblue', borderRadius: 10, padding: 10}} onPress={() => {
          axios.put(`${BASE_URL}/users/${id}`, {"contact": userContact, "career": userCareer, "purpose": userPurpose})
              .then((res) => console.log(res))
          setEdit(false)
        }}>
          <Text>수정 완료</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={{justifyContent: 'flex-end'}} onPress={() => {
          setEdit(true)
          }}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
        }
      </View>
      <View style={styles.separator}/>
      <ScrollView style={{width: '100%'}}>
        {edit?
        <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.infoTxtTitle}>연락처</Text>
          <TextInput style={styles.infoTxt1} placeholder='연락처' value={userContact} onChangeText={setUserContact} />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.infoTxtTitle}>운동 경력</Text>
          <TextInput style={styles.infoTxt1} placeholder='운동 경력' value={userCareer} onChangeText={setUserCareer} />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.infoTxtTitle}>운동 목적</Text>
          <TextInput style={styles.infoTxt1} placeholder='운동 목적' value={userPurpose} onChangeText={setUserPurpose} />
        </View>
        </View>
        :
        <View style={styles.infoContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.infoTxtTitle}>나이</Text>
            <Text style={styles.infoTxt}>{userAge}세</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.infoTxtTitle}>연락처</Text>
            <Text style={styles.infoTxt}>{userContact}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.infoTxtTitle}>운동 경력</Text>
            <Text style={styles.infoTxt}>{userCareer}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.infoTxtTitle}>운동 목적</Text>
            <Text style={styles.infoTxt}>{userPurpose}</Text>
          </View>
        </View>
        }
        
        {trainingStatus == "teaching" ?
          <>
          <View style={styles.rowContainer}>
            <Text style={styles.infoTxtTitle}>나의 트레이너</Text>
          </View>
          <TouchableOpacity style={styles.trainerContainer}
            onPress={()=>navigation.navigate('UserCommunityDetail', {trainerId: trainerId})}>
            <Image
              style={styles.trainerImg}
              source={{uri: `data:image/png;base64,${trainerImage}`}}
            />
            <View style={styles.trainerInfoTxtBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.trainerTxtTitle}>{trainerName} 트레이너</Text>
                {trainerSex == 'M'
                ? <Ionicons name="male" size={24} color="skyblue" />
                : <Ionicons name="female" size={24} color="pink" />}
              </View>
              
              <Text style={styles.infoTxt}>{trainerAge}살</Text>
              <Text style={styles.infoTxt}>@{trainerInsta}</Text>
            </View>  
          </TouchableOpacity>
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
          </View>

          <View style={styles.memoList}>
            <FlatList
              keyExtractor={item => String(item.id)}
              data = {memoData}
              horizontal = {true}
              renderItem={({item}) => <PTMemoItem date={item.date} text={item.text}/>}
            />
          </View>

          </>
        : trainingStatus == "pending" ?
          <>
          <View style={styles.rowContainer}>
            <Text style={styles.infoTxtTitle}>나의 트레이너</Text>
            <View style={styles.btn}>
              <Text>수락 대기중</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.trainerContainer}
            onPress={()=>navigation.navigate('UserCommunityDetail', {trainerId: trainerId})}>
            <Image
              style={styles.trainerImg}
              source={{uri: `data:image/png;base64,${trainerImage}`}}
            />
            <View style={styles.trainerInfoTxtBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.trainerTxtTitle}>{trainerName} 트레이너</Text>
                {trainerSex == 'M'
                ? <Ionicons name="male" size={24} color="skyblue" />
                : <Ionicons name="female" size={24} color="pink" />}
              </View>
              
              <Text style={styles.infoTxt}>{trainerAge}살</Text>
              <Text style={styles.infoTxt}>@{trainerInsta}</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.reqTxt}>신청한 PT 시간</Text>
                <Text style={styles.infoTxt}>{KoreanDay}요일 {time}시</Text>
              </View>
            </View>  
          </TouchableOpacity>
          </>
        : 
          <>
          <View style={styles.rowContainer}>
            <Text style={styles.infoTxtTitle}>나의 트레이너</Text>
          </View>
          <TouchableOpacity style={[styles.trainerContainer,  {
            flexDirection: 'column',
            paddingLeft: 10,
            justifyContent: 'center'
          }]}
            onPress={()=>navigation.navigate('UserTabOne')}>
            <Text style={styles.infoTxt}>김PT에서 자신에게 맞는 트레이너를 찾아보세요!</Text>
            <Text style={styles.infoTxt}>--커뮤니티 둘러보기--</Text> 
          </TouchableOpacity>
          </>
        }
        

        

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingBottom: 0,
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
    flexDirection: 'column',
    alignSelf: 'stretch',
    padding: 16,
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
    marginRight: 15
  },
  infoTxt: {
    fontSize: 16,
    marginVertical: 5,
  },
  infoTxt1: {
    fontSize: 16,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 20
  },
  reqTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    marginRight: 10
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
    marginBottom: 10,
  },
  dateTxt: {
    fontSize: 20,
    fontWeight: '600'
  },
  trainerContainer: {
    height: 150,
    flex: 3,
    flexDirection: 'row',
    backgroundColor: '#dddddd',
    padding: 10,
    paddingLeft: 25,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  trainerImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 30
  },
  trainerInfoTxtBox:{
    flexDirection: 'column'
  },
  trainerTxtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    marginRight: 5
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
  },
  btn: {
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 20,
    paddingHorizontal: 10
  },
  users: {
    fontSize: 25,
    margin: 5 
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
    margin: 10,
    padding: 10,
    backgroundColor: 'lightblue'
  },
});
