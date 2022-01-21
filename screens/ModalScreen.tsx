import { StyleSheet, Text, TouchableOpacity, View  } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그아웃 하시겠습니까?</Text>
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.btn}>
              <Text>아니오</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
              <Text>네</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 0,
    padding: 10,
  },
  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  btn: {
    flex: 1,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    fontSize: 20,
  }
});
