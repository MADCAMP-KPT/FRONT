import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Picker, FlatList, TouchableOpacity } from "react-native";
import DropdownMenu from "react-native-dropdown-menu";
import DropDownPicker from "react-native-dropdown-picker";
import { RootStackScreenProps } from '../types';
import UserCommuTrainerListItem from "../components/UserCommuTrainerListItem";
import axios from "axios";
import BASE_URL from "../components/BASE_URL";

export default function UserCommunityTrainerScreen({route}: RootStackScreenProps<'UserCommunityTrainer'>) {

  // const trainerList = [
  //   {trainerId: 1, trainerName:"김기영"},
  //   {trainerId: 2, trainerName:"김기일"},
  //   {trainerId: 3, trainerName:"김니일"},
  // ];

  let gymId = route.params.gymId
  const [trainerList, setTrainerList] = useState<Array<any>>([]);

  useEffect(()=> {
    axios.get(`${BASE_URL}/gyms/${gymId}/trainers`)
      .then(
        res=>{
          setTrainerList(
            res.data.result.map((item) => {
              return {
                trainerId: item.id,
                trainerName: item.name,
              }
            })
          )
        }
      )
  }, [])

  
  return (
    <View style={styles.container}>
      <View style={styles.rowBox}>
        <Text style={styles.title}>KIM PT</Text>
        
      </View>
      
      <View style={styles.separator}/>
      
      <FlatList
        style={styles.flatList}
        keyExtractor={item => String(item.trainerId)}
        data = {trainerList}
        renderItem={({item}) => <UserCommuTrainerListItem trainerId={item.trainerId} trainerName={item.trainerName}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    // justifyContent: 'center',
    padding: 8,
    marginHorizontal: 10,
    marginVertical: 24
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 5,
  },
  separator: {
    marginTop: 5,
    height: 1,
    width: '100%',
    zIndex: -1,
    backgroundColor: '#dddddd'
  },
  flatList: {
    zIndex: -1
  },
})