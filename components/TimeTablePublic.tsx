import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native'
import {Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component'

export default function TimeTablePublic(
  {teach, selectedCol, setSelectedCol, selectedRow, setSelectedRow}:
  {teach: {day: string, hour: number, userName: string, classId: number, remainingPT: number, userId: number}[], 
  setSelectedCol: any, selectedCol: any, selectedRow: any, setSelectedRow: any}) {

  const tableHead: Array<string> = ['' ,'mon', 'tue', 'wed', 'thur', 'fri']
  const tableName: Array<string> = ['', '월', '화', '수', '목', '금']
  
  
  const [bgColor, setBgColor] = useState('white');
  // If you want to change this array in table view, you should make new array and replace directly in Tablewrapper component(data)
  // Because, this array is used for calculating data index.
  const tableTitle: Array<string> = ['06', '07', '08', '09', '10', '11', '12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
                    .map((item, index) => {
                      if(index <= 5) {
                        return item + ':00 AM'
                      } else {
                        return item + ':00 PM'
                      } 
                    })

  // Get hour(number) and convert to AM, PM style
  function convertHour(h: number): string {
    if(h >= 12) {
      if(h === 22 || h === 12) {
        return `${(h === 22) ? 10 : 12}:00 PM`
      } else {
        return `0${h-12}:00 PM`
      } 
    }
    else {
      if(h >= 10) {
        return `${h}:00 AM`
      } else {
        return `0${h}:00 AM`
      }
    }
  }

  const navigation = useNavigation();

  // Private component for already reservated cells. You can add any styles, or any jsx elements inside.
  const invalidTime = (userName: string, day: string, time: number, classId: number, rem: number, userId: number) => (
      <View style={{flex: 1, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>X</Text>
      </View>
  )

  const validTime = (day: number, time: number) => (
    <TouchableOpacity style={{flex: 1, backgroundColor: bgColor, alignItems: 'center', justifyContent: 'center'}}
      onPress={()=>{
        // console.log(day); console.log(time);
        setSelectedRow(time)
        setSelectedCol(day)
      }}
    // onPress={() => navigation.navigate('UserDetail', {classId: classId, userId: userId, day: day, time: time, remainingPT: rem})}
    >
    </TouchableOpacity>
  )

  const selectedTime = (row: number, col: number) => (
    <TouchableOpacity style={{flex: 1, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center'}}
      // onPress={()=>{
        // console.log(day); console.log(time);
      // }}
    >
    </TouchableOpacity>
  )

  // Convert received data to table data array.
  function convertData(teach: {day: string, hour: number, userName: string, classId: number, remainingPT: number, userId: number}[], selectedRow, selectedCol) {
    let tableData: any[][] = Array(tableTitle.length).fill('').map((i, j) => Array(tableHead.length - 1).fill('').map((obj, col)=> validTime(col, j)))
    for(var i = 0; i < teach.length ; i ++) {
      const col = tableHead.indexOf(teach[i].day)-1
      const row = tableTitle.indexOf(convertHour(teach[i].hour))
      tableData[row][col] = invalidTime(teach[i].userName, teach[i].day, teach[i].hour, teach[i].classId, teach[i].remainingPT, teach[i].userId)
    }
    tableData[selectedRow][selectedCol] = selectedTime(selectedRow, selectedCol)
    // console.log(tableData);
    return tableData
  }

  return( 
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
        <Row data = {tableName} flexArr={[1,1,1,1,1,1]}  style={styles.head} textStyle={styles.header}/>
        <TableWrapper style={styles.wrapper}>
          <Col data = {tableTitle}  style={styles.title} textStyle={styles.text}/>
          <Rows data = {convertData(teach, selectedRow, selectedCol)} flexArr={[1,1,1,1,1]} style={styles.row} textStyle={styles.cell}/>
        </TableWrapper>
      </Table>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '95%',
    alignSelf: 'center'
  },
  head: { height: 50,  backgroundColor: '#f1f8ff'  },
  header: { textAlign: 'center', fontSize: 20 },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 45, backgroundColor: '#ffffff'  },
  text: { textAlign: 'center', fontSize: 13 },
  cell: { textAlign: 'center', fontSize: 13, backgroundColor: 'red' },
  });