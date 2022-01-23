import { View, Text, StyleSheet, FlatList } from 'react-native';
import UserReqListItem from '../components/UserReqListItem';
import MyUserListItem from '../components/MyUserListItem';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrainerMyUserScreen() {

  const userRequestList = [
    {userId: 1, userName:"김기영"}, // todo: pt 날짜 정보도 보여주기?
    {userId: 2, userName:"박승민"},
    {userId: 3, userName:"김민희"},
    {userId: 4, userName:"강준서"},
  ];

  const myUserList = [
    {userId: 1, userName:"짱구"},
    {userId: 2, userName:"스누피"},
    {userId: 3, userName:"영구"},
  ];

  const {navigate} = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>회원 목록</Text>
      <View style={styles.separatorBold}/>
      <Text style={styles.txtTitle}>신청한 회원</Text>
      <View style={styles.separator}/>
      <View style={styles.userRequestList}>
        <FlatList
          keyExtractor={item => String(item.userId)}
          data = {userRequestList}
          renderItem={({item}) => <UserReqListItem userName={item.userName}/>}
        />
      </View>
      <View style={styles.emptyView}></View>
      <Text style={styles.txtTitle}>나의 회원</Text>
      <View style={styles.separator}/>
      <View style={styles.myUserList}>
        <FlatList
          keyExtractor={item => String(item.userId)}
          data = {myUserList}
          renderItem={({item}) => <MyUserListItem userId={item.userId} userName={item.userName}/>}
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