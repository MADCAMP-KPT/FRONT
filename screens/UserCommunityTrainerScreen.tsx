import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Picker, FlatList, TouchableOpacity } from "react-native";
import DropdownMenu from "react-native-dropdown-menu";
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const [gymName, setGymName] = useState("");
  const [trainerList, setTrainerList] = useState<Array<any>>([]);

  const [ratingUpdate, setRatingUpdate] = useState(0);

  useEffect(()=> {
    axios.get(`${BASE_URL}/gyms/${gymId}`)
      .then((res)=>{
        setGymName(res.data.result[0].name)
      }).catch((err)=>{
        console.log(err)
      })

    axios.get(`${BASE_URL}/gyms/${gymId}/trainers`)
      .then(
        res=>{
          setTrainerList(
            res.data.result.map((item) => {
              return {
                trainerId: item.id,
                trainerName: item.name,
                rating: item.rating
              }
            })
          )
        }
      ).catch((err) => console.log(err))
  }, [ratingUpdate])

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowBox}>
        <Text style={styles.title}>{gymName}</Text>
        
      </View>
      
      <View style={styles.separator}/>
      
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item, index) => String(item.trainerId)}
        data = {trainerList}
        renderItem={({item}) => <UserCommuTrainerListItem trainerId={item.trainerId} trainerName={item.trainerName} gymName={gymName} ratingUpdate={ratingUpdate} setRatingUpdate={setRatingUpdate}/>}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    // justifyContent: 'center',
    padding: 8,
    marginHorizontal: 10,
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
    marginBottom: 5,
    height: 1,
    width: '100%',
    zIndex: -1,
    backgroundColor: '#dddddd'
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
})