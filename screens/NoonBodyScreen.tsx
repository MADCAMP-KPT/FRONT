import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import GalleryList from "../components/GalleryList";

export default function NoonBodyScreen() {
  const ImageData : Array<any> = Array(10).fill('https://reactnative.dev/img/tiny_logo.png');


  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 40, textAlign: 'center', margin: 20}}>김기영의 인바디 갤러리</Text>
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <AntDesign name="pluscircle" size={48} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <GalleryList imageData={ImageData} />
        <GalleryList imageData={ImageData} />
        <GalleryList imageData={ImageData} />
        <GalleryList imageData={ImageData} />
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