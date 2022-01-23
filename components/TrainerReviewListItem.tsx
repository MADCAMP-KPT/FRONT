import { View, Text, StyleSheet } from 'react-native'

export default function TrainerReviewListItem({score, text}: {
  score: number,
  text: String
}) {
  return (
    <>
      <View style={styles.container}>
        <Text>{text}</Text>
        <Text>{String(score)}</Text>
      </View>
      <View style={styles.separator}/>
    </>
  )
}


const styles = StyleSheet.create({
  separator: {
    marginVertical: 5,
    height: 1,
    width: '100%',
    backgroundColor: '#dddddd'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 4
  },
})