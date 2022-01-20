import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState } from 'react'
import { RadioButton } from "react-native-paper";
import { RootStackScreenProps } from "../types";

export default function TrainerSurveyScreen({navigation}: RootStackScreenProps<'TrainerSurvey'>) {

    const [sex, setSex] = useState('남')

    return(
       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 50, fontWeight: 'bold', margin: 5}}>잠깐!</Text>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>회원님들이 볼 수 있도록 정보를 작성해주세요</Text>
            <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 3, margin: 50, padding: 20, }}>
                <View style={styles.input}>
                    <Text style={styles.text}>이름</Text>
                    <TextInput style={styles.tinput} placeholder='name' />
                </View>
                <View style={styles.input}>
                    <Text style={styles.text}>소속</Text>
                    <TextInput style={styles.tinput} placeholder='company' />
                </View>
                <View style={styles.input}>
                    <Text style={styles.text}>성별</Text>
                    <RadioButton.Group onValueChange={newValue => setSex(newValue)} value={sex}>
                        <View style={{flexDirection: 'row'}}>
                            <RadioButton.Item style={styles.radio} label="남성" value="Man" color={'black'}/>
                            <RadioButton.Item style={styles.radio} label="여성" value="Woman" color={'black'}/>
                        </View>
                    </RadioButton.Group>
                </View>
                <View style={styles.input}>
                    <Text style={styles.text}>경력</Text>
                    <TextInput style={styles.multiinput} placeholder=' ex) 수상경력, 근무이력 등' multiline={true} />
                </View>
                <View style={styles.input}>
                    <Text style={styles.text}>한줄소개</Text>
                    <TextInput style={styles.multiinput} placeholder=' 자유롭게 자신을 소개해주세요' multiline={true} />
                </View>
                <Text>회원가입 후 마이페이지에서 SNS 연동 및 사진을 업로드할 수 있습니다!</Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signin')}> 
                        <Text>뒤로가기</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Root')}>
                        <Text>작성 완료!</Text>    
                    </TouchableOpacity> 
                </View>
            </View>
            
       </View> 
    )
};

const styles = StyleSheet.create({
    button: {
        fontSize: 30,
        backgroundColor: '#f0c0c0',
        padding: 20,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderRadius: 20
    },
    input: {
        flexDirection: 'row',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    text: {
        textDecorationLine: 'underline',
        fontSize: 20,
        margin: 5
    },
    tinput: {
        width: 200,
        borderWidth: 1,
        padding: 10,
        fontSize: 20,
        margin: 5,
        borderRadius: 10
    },
    radio: {
        borderWidth: 1,
        margin: 5,
        borderRadius: 10,

    },
    multiinput: {
        height: 80,
        width: 250,
        borderWidth: 1,
        fontSize: 15,
        margin: 5,
        borderRadius: 10
    }
})