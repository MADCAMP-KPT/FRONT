import { View, Text, Image, StyleSheet } from 'react-native'

export default function TrainerImgListItem({src}: {src: string}) {
  return (
    <Image 
      style={styles.image}
      source={{uri : src}}/>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  }
})