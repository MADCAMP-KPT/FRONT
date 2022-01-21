import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";

export default function InBodyScreen() {

  const ImageData : Array<any> = Array(10).fill('../assets/images/momzzang.jpg');


  return(
    <View style={{flex: 1}}>
      <Text style={{fontSize: 40, textAlign: 'center', margin: 20}}>김기영의 인바디 갤러리</Text>
      <ScrollView>
        <View style={styles.container}>
          <Text>2021.01.01</Text>
          <ScrollView horizontal={true}>
            {ImageData.map((item, index) => {
              return (
                <TouchableOpacity key={index}>
                  <Image style={styles.tinyLogo} source={require('../assets/images/momzzang.jpg')} />
                </TouchableOpacity>
              )
            })} 
          </ScrollView>
        </View>
        <View style={styles.container}>
          <Text>2021.01.02</Text>
          <ScrollView horizontal={true}>
            {ImageData.map((item, index) => {
              return (
                <TouchableOpacity key={index}>
                  <Image style={styles.tinyLogo} source={require('../assets/images/momzzang.jpg')} />
                </TouchableOpacity>
              )
            })} 
          </ScrollView>
        </View>          
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 3,
    margin: 10,
    padding: 10,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 20
    },
})