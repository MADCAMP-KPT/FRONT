import { StyleSheet, View, Text } from "react-native";

export default function PTMemoItem({date, text}:{
  date: String,
  text: String
}){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{date}</Text>
      <Text style={styles.contents}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    backgroundColor: '#dddddd',
    marginRight: 15,    // 마지막 item 마진??
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  contents: {
    fontSize: 16,
    marginTop: 16
  }
});