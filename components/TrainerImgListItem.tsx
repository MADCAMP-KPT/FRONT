import { View, Text, Image, StyleSheet } from 'react-native'

export default function TrainerImgListItem({src}: {src: string}) {
  return (
    <Image 
      style={styles.image}
      source={{uri: `data:image/png;base64, ${src}`}}/>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginHorizontal: 5
  }
})