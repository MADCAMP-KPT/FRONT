import * as React from 'react';
import { useState, Component, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from "react-native";
import Svg, {G, Circle} from 'react-native-svg';
import TrainerReviewListItem from '../components/TrainerReviewListItem';
import TrainerImgListItem from '../components/TrainerImgListItem';
import { RootStackScreenProps } from '../types';
import axios from 'axios';
import { Buffer } from 'buffer';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../components/BASE_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';


// function TrainerImgListItem(src: String) {
//   // props -> imageId, trainerId
//   // 서버 이미지 uri
//   return (
//     <View>
//       {/* <Text>{src}</Text> */}
//       {/* <Image source={{uri : `../assets/images/${src}` }}/> */}
//       <Image
//         style={styles.trainerImg}
//         source={require('../assets/images/imgTrainer.jpg')}>
//       </Image>
//     </View>
//   )
// }

export default function UserCommunityDetailScreen({route}: RootStackScreenProps<'UserCommunityDetail'>) {

  const trainerId = route.params.trainerId
  const [isMyTrainer, setIsMyTrainer] = useState(0)
  const [isReviewWrote, setIsReviewWrote] = useState(0)
  const [trainerImg, setTrainerImg] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.blog.daum.net%2Fdiable.666%2F317%3Fnp_nil_b%3D2&psig=AOvVaw3b8jjeV4Miq-OtOXsATdYf&ust=1642948340989000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCp4tPJxfUCFQAAAAAdAAAAABAI");
  const [trainerName, setTrainerName] = useState("")
  const [trainerAge, setTrainerAge] = useState(0)
  const [trainerCareer, setTrainerCareer] = useState("")
  const [trainerIntro, setTrainerIntro] = useState("")
  const [trainerRating, setTrainerRating] = useState(0)
  const [trainerReview, setTrainerReview] = useState<Array<any>>([])

  const trainderImgData = [
    {id:1, src: trainerImg},
    {id:2, src: "icon.png"}
  ]
  // const trainerReviewData = [
  //   {id: 1, score:5, text:"친절하고 좋아요~"},
  //   {id: 2, score:2, text:"운동을 너무 빡세게 시켜요 ㅠ"},
  //   {id: 3, score:3, text:"낫밷"},
  //   {id: 4, score:1, text:"좀 부담스럽네요;;"},
  //   {id: 5, score:1, text:"냠냠굿"},
  //   {id: 6, score:3, text:"낫밷"},
  //   {id: 7, score:1, text:"좀 부담스럽네요;;"},
  //   {id: 8, score:1, text:"냠냠굿"},
  // ]

  const radius = 100;
  const strokeWidth = 20;
  const halfCircle = radius+strokeWidth;
  const circleCircumference = 2*Math.PI*radius;
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const [percentage, setPercentage] = React.useState(0);
  const duration = 700;
  const delay = 0;
  const [donutColor, setDonutColor] = useState("")


  const getIdandUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem('Id')
      if (userId != null) {
        axios.get(`${BASE_URL}/users/${userId}/trainer/${trainerId}`).then((res) => {
          setIsMyTrainer(res.data.result[0].isMyTrainer)
          setIsReviewWrote(res.data.result[0].isReviewWrote)
        }).catch((err) => console.log(err))
      }
    } catch (e) {console.log(e);}
  }

  useEffect(() => {
    getIdandUpdate()
  }, [])


  React.useEffect(() => {   // todo : 트레이너 누를 때마다 애니메이션 작동 되게 해야함.
    axios.get(`${BASE_URL}/trainers/${trainerId}`)
      .then((res)=>{
        console.log(res.data.result[0])
        setTrainerName(res.data.result[0].name)
        setTrainerAge(res.data.result[0].age)
        setTrainerCareer(res.data.result[0].career)
        setTrainerIntro(res.data.result[0].intro)
        setTrainerRating(res.data.result[0].rating)
      }).catch((err)=>{
        console.log(err)
      })

    axios.get(`${BASE_URL}/trainers/${trainerId}/thumbnail`)
      .then(
      res => {
        // console.log(res.data[0].thumbnail);
    //     // let blob = new Blob([res.data], { type: "image/png" });
    //     // console.log(blob);
    //     // const url = window.URL.createObjectURL(blob);
    //     // setTrainerImg(url);
    //     // console.log(url);

    //     const Blob = RNFetchBlob.polyfill.Blob;
    //     let blob = Blob.readBlob(res.data,{ type: `image/png` } )
    //     console.log(blob);
    //     const url = window.URL.createObjectURL(blob);
    //     setTrainerImg(url);
    //     console.log(url);
        // console.log(res);
        setTrainerImg(res.data[0].thumbnail)
        // const photoURI = Base64ArrayBuffer.encode(res.data);
        // console.log(photoURI);
        // setTrainerImg(photoURI);
        // console.log(trainerImg);
      }    
    )

    // RNFetchBlob.fetch('GET', 'http://192.249.18.145:443/trainers/29/thumbnail').then(
    //   res => {
    //     console.log("hillhi");
    //     console.log(res);
    //   }
    // ).catch( err => {
    //   console.log(err);
    // }
    // )

    // input = 4.5

    axios.get(`${BASE_URL}/review/${trainerId}`).then((res)=>{
      setTrainerReview(
        res.data.result.map((item)=>{
          return {
            id: item.id,
            content: item.content,
            rating: item.rating
          }
        })
      )
    }).catch((err)=>console.log(err))
    
  }, [])

  React.useEffect(()=>{
    setPercentage(trainerRating*20)
  }, [trainerRating])

  React.useEffect(() => {
    if (percentage == 0) {
      setDonutColor('#868e96')
    } else if (percentage<20) {
      setDonutColor('#DF364C')
    } else if (percentage<40) {
      setDonutColor('#FF8A4C')
    } else if (percentage<60) {
      setDonutColor('#FFCC42')
    } else if (percentage<80) {
      setDonutColor('#A6E64C')
    } else {
      setDonutColor('#20E34D')
    }

    const animation = (toValue: number) => {
      return Animated.timing(animatedValue, {
        toValue,
        duration,
        delay,
        useNativeDriver: true,
      }).start()
    }
    
    animation(percentage);
    animatedValue.addListener((v) => {
      if (circleRef.current) {
        const strokeDashoffset = circleCircumference - (circleCircumference*v.value) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset
        })
      }
    })

    // return () => {
    //   animatedValue.removeAllListeners();
    // }
  }, [percentage])

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.rowTitleBox}>
        <Text style={styles.title}>{trainerName} 트레이너</Text>
        <TouchableOpacity
          style={styles.btnRequest}
          onPress={()=>navigation.navigate('UserApply', {trainerId: trainerId})}
        >
          <Text style={styles.btnTxt}>신청하기</Text>
          {/* todo : 신청하기 버튼을 space-btw 하는 법? */}
        </TouchableOpacity>
      </View>
      
      <View style={styles.separator}></View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        style={styles.scrollView}>
        <>
          <View style={styles.svg}>
            <Svg
              width={radius * 2}
              height={radius * 2}
              viewBox={`0 0 ${halfCircle*2} ${halfCircle*2}`}>
              <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                <Circle
                  cx='50%'
                  cy='50%'
                  stroke={donutColor}
                  strokeWidth={strokeWidth}
                  r={radius}
                  fill='transparent'
                  strokeOpacity={0.2}/>
                <AnimatedCircle
                  ref = {circleRef}
                  cx='50%'
                  cy='50%'
                  stroke={donutColor}
                  strokeWidth={strokeWidth}
                  r={radius}
                  fill='transparent'
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={circleCircumference}
                  strokeLinecap='round'/>
              </G>
              <Image
                style={styles.trainerImg}
                // source={require('../assets/images/imgTrainer.jpg')}
                source={{uri: `data:image/png;base64,${trainerImg}`}}
              >
              </Image>
            </Svg>
          </View>
          <Text style={styles.introTxt}>{trainerIntro}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRowContainer}>
              <Text style={styles.infoTitle}>나이</Text>
              <Text style={styles.infoTxt}>{trainerAge}</Text>
            </View>
            <View style={styles.infoRowContainer}>
              <Text style={styles.infoTitle}>운동 경력</Text>
              <Text style={styles.infoTxt}>{trainerCareer}</Text>
            </View>
          </View>
          <Text style={styles.reviewTitleTxt}>트레이너 사진</Text>
          <FlatList
            style={styles.imgFlatList}
            horizontal={true}
            keyExtractor={item => String(item.id)}
            data = {trainderImgData}
            renderItem={({item}) => <TrainerImgListItem src={item.src}/>}
          />
          <View style={styles.reviewTitleBox}>
            <Text style={styles.reviewTitleTxt}>회원들의 한줄평</Text>
            {isMyTrainer==1 && isReviewWrote==0 ?
            <TouchableOpacity>
              {/* 로그인한 유저의 (현재 혹은 과거) 트레이너가 맞는지 확인 */}
              <Text style={styles.reviewWriteTxt}
                onPress={()=>navigation.navigate('UserPostReview', {trainerId: trainerId, trainerName: trainerName})}
              >한줄평 쓰기
              </Text>
            </TouchableOpacity>
            :<></>}
          </View>
          <View style={styles.reviewContainer}>
            <FlatList
              contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => String(item.id)}
              data = {trainerReview}
              renderItem={({item}) =><TrainerReviewListItem text={item.content} score={item.rating}/>}
            />
          </View>
        </>
      </ScrollView>
    </View>
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
  scrollView: {
    width: '100%',
    marginBottom: 18
  },
  rowTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    width: '100%'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5,
  },
  separator: {
    marginTop: 5,
    height: 1,
    width: '100%',
    backgroundColor: '#dddddd'
  },
  svg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  trainerImg: {
    width: 150,
    height: 150,
    marginTop: 25,  // todo : 더 좋은 align 방법?
    resizeMode: 'contain',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 150/2
  },
  infoContainer: {
    flex: 4,
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    paddingTop: 20,
    marginBottom: 10,
  },
  introTxt: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10
  },
  infoRowContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  infoTxt: {
    fontSize: 16,
  },
  imgFlatList: {
    alignSelf: 'flex-start'
  },
  reviewTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 8
  },
  reviewTitleTxt: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    alignSelf: 'flex-start'
  },
  reviewWriteTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3AA7D6'
  },
  reviewContainer: {
    flex: 4,
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    paddingTop: 20,
  },
  btnRequest: {
    width: 80,
    height: 40,
    backgroundColor: '#3AA7D6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff'
  }
});