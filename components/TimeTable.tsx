import { useNavigation } from '@react-navigation/native'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native'
import {Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component'

export default function TimeTable({teach}: {teach: {day: string, hour: number, userName: string, classId: number, remainingPT: number, userId: number}[]}) {

  const tableHead: Array<string> = ['' ,'mon', 'tue', 'wed', 'thur', 'fri']
  const tableName: Array<string> = ['', '월', '화', '수', '목', '금']
  const tableTitle: Array<string> = ['06', '07', '08', '09', '10', '11', '12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
                    .map((item, index) => {
                      if(index <= 5) {
                        return item + ':00 AM'
                      } else {
                        return item + ':00 PM'
                      } 
                    })

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

  const view = (userName: string, day: string, time: number, classId: number, rem: number, userId: number) => (
      <TouchableOpacity style={{flex: 1, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'center'}}
      onPress={() => navigation.navigate('UserDetail', 
                                          {classId: classId, userId: userId, day: day, time: time, remainingPT: rem})}
      >
        <View>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{userName} 님</Text>
        </View>
      </TouchableOpacity>
  )

  function convertData(teach: {day: string, hour: number, userName: string, classId: number, remainingPT: number, userId: number}[]) {
    let tableData: any[][] = Array(tableTitle.length).fill('').map(() => Array(tableHead.length - 1).fill(''))
    for(var i = 0; i < teach.length ; i ++) {
      const col = tableHead.indexOf(teach[i].day)-1
      const row = tableTitle.indexOf(convertHour(teach[i].hour))
      tableData[row][col] = view(teach[i].userName, teach[i].day, teach[i].hour, teach[i].classId, teach[i].remainingPT, teach[i].userId)
    }
    console.log(tableData);
    return tableData
  }

  return( 
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
        <Row data = {tableName} flexArr={[1,1,1,1,1,1]}  style={styles.head} textStyle={styles.header}/>
        <TableWrapper style={styles.wrapper}>
          <Col data = {tableTitle}  style={styles.title} textStyle={styles.text}/>
          <Rows data = {convertData(teach)} flexArr={[1,1,1,1,1]} style={styles.row} textStyle={styles.cell}/>
        </TableWrapper>
      </Table>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  head: { height: 50,  backgroundColor: '#f1f8ff'  },
  header: { textAlign: 'center', fontSize: 20 },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 45, backgroundColor: '#ffffff'  },
  text: { textAlign: 'center', fontSize: 13 },
  cell: { textAlign: 'center', fontSize: 13, backgroundColor: 'red' },
  });