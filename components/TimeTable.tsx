import {Text, View} from './Themed';
import {StyleSheet} from 'react-native'
import {Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component'

export default function TimeTable() {

  const tableHead: Array<String> = ['' ,'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const tableTitle: Array<String> = ['06', '07', '08', '09', '10', '11', '12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
                    .map((item, index) => {
                      if(index <= 5) {
                        return item + ':00 AM'
                      } else {
                        return item + ':00 PM'
                      } 
                    })
  const tableData: Array<any> = Array(tableTitle.length).fill(Array(tableHead.length - 1).fill('1'))

  return( 
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1}}>
        <Row data = {tableHead} flexArr={[1,1,1,1,1,1,1,1]}  style={styles.head} textStyle={styles.text}/>
        <TableWrapper style={styles.wrapper}>
          <Col data = {tableTitle}  style={styles.title} textStyle={styles.text}/>
          <Rows data = {tableData} flexArr={[1,1,1,1,1,1,1]} style={styles.row} textStyle={styles.text}/>
        </TableWrapper>
      </Table>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 50,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 45  },
  text: { textAlign: 'center', fontSize: 15 }
  });