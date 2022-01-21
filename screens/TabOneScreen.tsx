import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import TimeTable from '../components/TimeTable'
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>김기영 트레이너님 주간 일정표</Text>
      <View style={styles.separator} />
      <ScrollView>
        <TimeTable />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 6
    
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});
