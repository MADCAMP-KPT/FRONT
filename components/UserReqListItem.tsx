import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios';
import BASE_URL from '../components/BASE_URL';

export default function UserReqListItem({userName, classId, pendingList, setPendingList, setTeachingList, teachingList}:{
  userName : String,
  classId: number,
  pendingList: any,
  setPendingList: any,
  setTeachingList: any,
  teachingList: any
}) {

  const acceptClass = () => {
    axios.put(`${BASE_URL}/class/${classId}/accept`).then((res)=>{
      // console.log(res.data.result)
      Alert.alert("PT 신청을 수락하셨습니다.")
      pendingList.map((e) => {
        if (e.classId == classId) {
          setTeachingList([...teachingList, e])
        }
      })
      setPendingList((pendingList)=>pendingList.filter((e) => e.classId !== classId))
      // setPendingList(pendingList.filter((e) => {e.classId !== classId}))
      // 위의 코드는 참/거짓으로 판단하지 않아서 아무것도 true를 반환하지 않음!! 유레카!!!
    }).catch((err)=>{console.log(err)})
  }

  const denyClass = () => {
    axios.put(`${BASE_URL}/class/${classId}/deny`).then((res)=>{
      // console.log(res.data.result)
      Alert.alert("PT 신청을 거절하셨습니다.")
      setPendingList(pendingList.filter(e => e.classId !== classId))
    }).catch((err)=>{console.log(err)})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{userName}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnAccept}
          onPress={()=>acceptClass()}>
          <Text style={styles.btnTxt}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnReject}
          onPress={()=>denyClass()}>
          <Text style={styles.btnTxt}>거절</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 5
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center',
  },
  btnContainer: {
    flexDirection: 'row'
  },
  btnAccept: {
    width: 60,
    height: 40,
    backgroundColor: '#3AA7D6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 10
  },
  btnReject: {
    width: 60,
    height: 40,
    backgroundColor: '#ED5834',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff'
  }
});