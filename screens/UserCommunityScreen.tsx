import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Picker, FlatList, TouchableOpacity } from "react-native";
import DropdownMenu from "react-native-dropdown-menu";
import DropDownPicker from "react-native-dropdown-picker";
import UserCommuGymListItem from "../components/UserCommuGymListItem";
import BASE_URL from '../components/BASE_URL';
import axios from "axios";

export default function UserCommunityScreen() {

  // const gymList = [
  //   {gymId: 1, gymName:"라라휘트니스"},
  //   {gymId: 2, gymName:"엑슬휘트니스"},
  //   {gymId: 3, gymName:"아리랑휘트리스"},
  // ];

  const [myRegion, setMyRegion] = useState("서울")
  const tempRegionList:string[][] = [[]]
  const [regionList, setRegionList] = useState<string[][]>([[""]])
  const [gymList, setGymList] = useState<Array<any>>([])

  
  useEffect(()=> {
    axios.get(`${BASE_URL}/gyms/cities`)
      .then(
        res=>{
          res.data.result.map((item) => {
            tempRegionList[0].push(item.city)
          })
          setRegionList(tempRegionList)
        }
      ).catch((err)=>{
        console.log(err)
      })
  }, [])

  useEffect(()=> {
    axios.get(`${BASE_URL}/gyms/${myRegion}/all`)
      .then(
        res=>{
          setGymList(
            res.data.result.map((item) => {
              return {
                gymId: item.id,
                gymName: item.name
              }
            })
          )
          // console.log(gymList)
        }
      )
  }, [myRegion])

  return (
    <View style={styles.container}>
      <View style={styles.rowBox}>
        <Text style={styles.title}>KIM PT</Text>
        <View style={{width: 100, height: 10, transform: [{translateY: -10}, {translateX: -10}]}}>
          <DropdownMenu
            style={{flex: 1}}
            bgColor={'transparent'}
            activityTintColor={'skyblue'}
            optionTextStyle={{color: 'green', fontSize: 18}}
            titleStyle={{color: 'green', fontSize: 24, fontWeight: 'bold'}} 
            data={regionList}
            // maxHeight={100}
            handler={(selection, row) => setMyRegion((regionList)[selection][row])}>
          </DropdownMenu>
          
          {/* <DropDownPicker
            items={[
              {label: "서울", value: 1},
              {label: "대전", value: 2},
              {label: "대구", value: 3},
              {label: "부산", value: 4}]}
            // defaultIndex={0}
            containerStyle={{height: 40}}
            onChangeValue={item=> console.log(item.label)}
          /> */}
        </View>
      </View>
      
      <View style={styles.separator}/>

      {/* <TouchableOpacity
        style={{width: 50, height: 50}}
        onPress={()=>console.log(gymList)}>
        <Text>test</Text>
      </TouchableOpacity> */}
      
      <FlatList
        style={styles.flatList}
        keyExtractor={item => String(item.gymId)}
        data = {gymList}
        renderItem={({item}) => <UserCommuGymListItem gymId={item.gymId} gymName={item.gymName}/>}
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