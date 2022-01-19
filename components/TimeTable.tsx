import {Text, View} from './Themed';
import {StyleSheet} from 'react-native'
import {Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component'

export default function TimeTable() {

    const tableHead: Array<String> = ['' ,'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const tableTitle: Array<String> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
                                        .map((item, index) => {
                                            return item + ':00 PM'
                                        })
    const tableData: Array<any> = Array(tableTitle.length).fill(Array(tableHead.length - 1).fill('123123'))

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
    container: { width:1000 , padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' }
  });