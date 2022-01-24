import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { RootStackScreenProps } from "../types";
import { AirbnbRating, Rating  } from "react-native-ratings";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import BASE_URL from "../components/BASE_URL";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { TextInput } from "react-native-paper";

export default function UserPostReviewScreen({route}: RootStackScreenProps<'UserPostReview'>) {
  
  const trainerId = route.params.trainerId
  const trainerName = route.params.trainerName

  const [trainerRating, setTrainerRating] = useState(0);
  const [review, setReview] = useState("");
  const [userId, setUserId] = useState(0);

  const navigation = useNavigation()

  const getIdandUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem('Id')
      if (userId != null) {
        setUserId(Number(userId))
      }
    } catch (e) {console.log(e);}
  }

  useEffect(() => {
    getIdandUpdate()
  }, [])

  const postReview = () => {
    axios.post(`${BASE_URL}/review`, {
      "trainer_id": trainerId,
      "user_id": userId,
      "content": review,
      "rating": trainerRating
    }).then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>{trainerName} 트레이너</Text>
        <View style={styles.separator}></View>
        <Text style={styles.review}>리뷰 작성하기</Text>
        <TextInput
          placeholder="트레이너님에 대한 리뷰를 작성해주세요."
          style={styles.reviewInput}
          multiline={true}
          onChangeText={(txt)=>setReview(txt)}
        />
        <AirbnbRating
          defaultRating={5}
          reviews={["싫어요", "별로예요", "보통이예요", "좋아요", "최고예요"]}
          onFinishRating={(val)=>setTrainerRating(val)}
        />
        
        <Text style={styles.warning}>트레이너에 대한 심한 비하/욕설이{"\n"}포함된 리뷰는 삭제될 수 있습니다.</Text>
        <TouchableOpacity
          style={styles.summitBtn}
          onPress={()=>{
            // console.log(trainerRating)
            postReview()
            alert("리뷰가 작성되었습니다.")
            navigation.goBack()
          }}>
          <Text style={styles.btnTxt}>리뷰 작성</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 8,
    paddingBottom: 0,
    marginHorizontal: 10,
    marginTop: 24
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5,
    alignSelf: 'flex-start'
  },
  separator: {
    marginTop: 5,
    height: 1,
    width: '100%',
    backgroundColor: '#dddddd'
  },
  review: {
    height: '4%',
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'flex-start',
    margin: 10
  },
  reviewInput: {
    width: '95%',
    height: '35%',
    backgroundColor: '#dddddd',
    padding: 20,
    paddingTop: 20,
    borderRadius: 20,
    fontSize: 18,
    marginBottom: 20,
  },
  warning: {
    marginVertical: 10,
    color: 'gray'
  },
  btnTxt: {
    fontSize: 20,
    fontWeight: '500',
    margin: 10,
  },
  summitBtn: {
    width: 100,
    height: 60,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 30
  },
})