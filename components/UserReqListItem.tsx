import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function UserReqListItem({userName}:{
  userName : String
}) {

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{userName}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnAccept}>
          <Text style={styles.btnTxt}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnReject}>
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