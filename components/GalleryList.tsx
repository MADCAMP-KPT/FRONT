import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native"


export default function GalleryList({imageData, date}: {imageData: Array<String>, date: String}) {

  return (
    <View style={styles.container}>
      <Text>{date}</Text>
      <View style={styles.separator}/> 
      <ScrollView horizontal={true}>
        {imageData.map((item, index) => {
          return (
            <TouchableOpacity key={index} >
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