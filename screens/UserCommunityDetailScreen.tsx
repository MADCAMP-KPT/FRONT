import * as React from 'react';
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import Svg, {G, Circle} from 'react-native-svg';


export default function UserCommunityDetailScreen() {

  const trainerName = "김기영"

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
 

  React.useEffect(() => {   // todo : 트레이너 누를 때마다 애니메이션 작동 되게 해야함.
    setPercentage(60)
  }, [])

  React.useEffect(() => {

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trainerName} 트레이너</Text>
      <View style={styles.separator}></View>
      <View style={styles.svg}>
        <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${halfCircle*2} ${halfCircle*2}`}>
          <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
            <Circle
              cx='50%'
              cy='50%'
              stroke='tomato'
              strokeWidth={strokeWidth}
              r={radius}
              fill='transparent'
              strokeOpacity={0.2}/>
            <AnimatedCircle
              ref = {circleRef}
              cx='50%'
              cy='50%'
              stroke='tomato'
              strokeWidth={strokeWidth}
              r={radius}
              fill='transparent'
              strokeDasharray={circleCircumference}
              strokeDashoffset={circleCircumference}
              strokeLinecap='round'/>
          </G>
          <Image
            style={styles.trainerImg}
            source={require('../assets/images/imgTrainer.jpg')}>
          </Image>
        </Svg>
      </View>
      <Text>나는냐 김기영</Text>
      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5,
    alignSelf: 'flex-start'
  },
  separator: {
    marginVertical: 5,
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
  }
});