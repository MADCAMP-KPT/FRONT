import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import UserReqListItem from '../components/UserReqListItem';
import MyUserListItem from '../components/MyUserListItem';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_URL from '../components/BASE_URL';

export default function TrainerMyUserScreen() {

  // const userRequestList = [
  //   {userId: 1, userName:"김기영"}, // todo: pt 날짜 정보도 보여주기?
  //   {userId: 2, userName:"박승민"},
  //   {userId: 3, userName:"김민희"},
  //   {userId: 4, userName:"강준서"},
  // ];

  // const myUserList = [
  //   {userId: 1, userName:"짱구"},
  //   {userId: 2, userName:"스누피"},
  //   {userId: 3, userName:"영구"},
  // ];

  const {navigate} = useNavigation()

  const [pendingList, setPendingList] = useState<Array<any>>([])
  const [teachingList, setTeachingList] = useState<Array<any>>([])

  const getIdandUpdate = async () => {
    try {
      const trainerId = await AsyncStorage.getItem('Id')
      if (trainerId != null) {
        axios.get(`${BASE_URL}/trainers/${trainerId}/class/pending`).then((res) => {
          console.log(res.data.result)
          setPendingList(
            res.data.result.map((item)=>{
              return {
                classId: item.id,
                userId: item.user_id,
                userName: item.name,
                reqDay: item.day,
                reqTime: item.time,
              }
            })
          )
          axios.get(`${BASE_URL}/trainers/${trainerId}/class/teaching`).then((res) => {
            console.log(res.data.result)
            setTeachingList(
              res.data.result.map((item)=>{
                return {
                  classId: item.id,
                  userId: item.user_id,
                  userName: item.name,
                  day: item.day,
                  time: item.time,
                  remainingPt: item.remaining_pt
                }
              })
            )
          })
        }).catch((err) => console.log(err))
      } else {
        console.log("hi")
      }
    } catch (e) {console.log(e);}
  }

  useEffect(() => {
    getIdandUpdate()
  }, [])

  // useEffect(() => {
  //   axios.get()
  // }, [pendingList, teachingList])


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>회원 목록</Text>
      <View style={styles.separatorBold}/>
      <Text style={styles.txtTitle}>신청한 회원</Text>
      <View style={styles.separator}/>
      <View style={styles.userRequestList}>
        <FlatList
          keyExtractor={item => String(item.userId)}
          data = {pendingList}
          renderItem={({item}) => <UserReqListItem userName={item.userName}/>}
        />
      </View>
      <View style={styles.emptyView}></View>
      <Text style={styles.txtTitle}>나의 회원</Text>
      <View style={styles.separator}/>
      <View style={styles.myUserList}>
        <FlatList
          keyExtractor={item => String(item.classId)}
          data = {teachingList}
          renderItem={({item}) =>
            <MyUserListItem
              classId={item.classId}
              userId={item.userId}
              userName={item.userName}
              day={item.day}
              time={item.time}
              remainingPT={item.remainingPt}/>}
        />
      </View>
    </SafeAreaView>
  )
}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginHorizontal: 10
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5,
    alignSelf: 'flex-start'
  },
  emptyView: {
    marginVertical: 5,
    height: 1,
    width: '95%'
  },
  separatorBold: {
    marginVertical: 10,
    height: 2,
    width: '100%',
    backgroundColor: '#dddddd'
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '95%',
    backgroundColor: '#dddddd'
  },
  userRequestList: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
  myUserList: {
    flex: 2,
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    marginHorizontal: 10,
    marginRight: 10,
    alignSelf: 'flex-start',
  },
})