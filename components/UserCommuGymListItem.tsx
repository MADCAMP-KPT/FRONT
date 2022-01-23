import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { RootTabScreenProps } from '../types';

export default function UserCommuGymListItem({gymId, gymName}:{
  gymId : number,
  gymName : String,
}) {

  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={()=>navigation.navigate('UserCommunityTrainer', {gymId: gymId})}>
      <Text style={styles.userName}>{gymName}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnReject}>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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