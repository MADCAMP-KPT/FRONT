import { StyleSheet, View, Text } from "react-native";

export default function PTMemoItem({date, text}:{
  date: String,
  text: String
}){

  const parseDate = (date: String)=>{
    // date : "2022-9-25"
    var splitted = date.split("-")
    return splitted[0]+"년 "+splitted[1]+"월 "+splitted[2]+"일"
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parseDate(date)}</Text>
      <Text style={styles.contents}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: 200,
    height: 200,
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