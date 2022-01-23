import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native"
import { Dispatch, SetStateAction } from "react"


export default function GalleryList({imageData, date, arr, setArr}:
   {imageData: Array<String>, date: String, arr: String[][], setArr: Dispatch<SetStateAction<String[][]>>}) {

  return (
    <View style={styles.container}>
      <Text>{date}</Text>
      <View style={styles.separator}/> 
      <ScrollView horizontal={true}>
        {imageData.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => {
              for(var k = 0; k < arr.length ; k++) {
                if(arr[k][0] === item && arr[k][1] === date) {
                  return setArr(arr => arr.filter((item, i) => i != k))
                }
              }
              return
            }}>
              <Image style={styles.tinyLogo} source={{uri: `${item}`}} />
            </TouchableOpacity>
          )
        })} 
      </ScrollView>
    </View>      
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 20
    },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '100%',
    backgroundColor: '#dddddd'
    },
})