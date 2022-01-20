import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import TimeTable from '../components/TimeTable'
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, trainer Park!</Text>
      <Text style={styles.title}>Weekly timetable</Text>
      <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.title}>Logout</Text>
      </TouchableOpacity>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 6
    
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  touch: {alignItems: 'center',
    padding: 10,
    backgroundColor:'#dddddd',
    margin: 50
  },
});
