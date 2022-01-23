import {Text, View} from './Themed';
import {StyleSheet} from 'react-native'
import {Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component'

export default function TimeTable({teach}: {teach: {day: string, hour: number, userId: string}[]}) {

  const tableHead: Array<string> = ['' ,'mon', 'tue', 'wed', 'thur', 'fri']
  const tableTitle: Array<string> = ['06', '07', '08', '09', '10', '11', '12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
                    .map((item, index) => {
                      if(index <= 5) {
                        return item + ':00 AM'
                      } else {
                        return item + ':00 PM'
                      } 
                    })

  function convertHour(h: number): string {
    if(h > 12) {
      if(h === 22) {
        return '10:00 PM'
      } else {
        return `0${h-12}:00 PM`
      } 
    }
    else {
      if(h >= 10) {
        return `${h}:00 PM`
      } else {
        return `0${h}:00 AM`
      }
    }
  }

  function convertData(teach: {day: string, hour: number, userId: string}[]) {
    let tableData: string[][] = Array(tableTitle.length).fill('').map(() => Array(tableHead.length - 1).fill(''))
    for(var i = 0; i < teach.length ; i ++) {
      const col = tableHead.indexOf(teach[i].day)-1
      const row = tableTitle.indexOf(convertHour(teach[i].hour))
      tableData[row][col] = `${teach[i].userId}님`
    }
    return tableData
  }

  return( 
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1}}>
        <Row data = {tableHead} flexArr={[1,1,1,1,1,1]}  style={styles.head} textStyle={styles.text}/>
        <TableWrapper style={styles.wrapper}>
          <Col data = {tableTitle}  style={styles.title} textStyle={styles.text}/>
          <Rows data = {convertData(teach)} flexArr={[1,1,1,1,1]} style={styles.row} textStyle={styles.text}/>
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
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 45, backgroundColor: '#ffffff'  },
  text: { textAlign: 'center', fontSize: 15 }
  });