import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal } from "react-native"


export default function GalleryList({imageData}: {imageData: Array<String>}) {

  return (
    <View style={styles.container}>
    <Text>2021.01.02</Text>
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
    borderWidth: 3,
    margin: 10,
    padding: 10,
  },
  tinyLogo: {
    width: 250,
    height: 250,
    borderRadius: 10,
    margin: 20
    },
})