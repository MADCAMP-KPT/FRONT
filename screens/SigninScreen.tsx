import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { RootStackScreenProps } from "../types";
import { RadioButton } from "react-native-paper";
import { useState } from 'react'

export default function SigninScreen({navigation}: RootStackScreenProps<'Signin'>) {

    const [checked, setChecked] = useState('User');

    return(
        <View style={styles.view}>
            <Text style={styles.title}>김 PT 회원가입</Text>
            <View>
                <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                    <View style={{flexDirection: 'row'}}>
                        <RadioButton.Item style={styles.radio} label="회원 전용" value="User" color={'black'}/>
                        <RadioButton.Item style={styles.radio} label="트레이너 전용" value="Trainer" color={'black'}/>
                    </View>
                </RadioButton.Group>
            </View>
            <TextInput style={styles.input} placeholder='아이디' />
            <TextInput style={styles.input} placeholder='비밀번호' secureTextEntry={true} />
            <TextInput style={styles.input} placeholder='비밀번호 확인' secureTextEntry={true} />
            <TouchableOpacity style={styles.touch} onPress={() => (checked === 'User') ? navigation.navigate('UserSurvey') : navigation.navigate('TrainerSurvey')}>
                <Text style={styles.text}>가입하기!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {flex: 1, alignItems: 'center', justifyContent:'center'},
    text: {fontSize: 20},
    title: {fontSize: 60, fontWeight: 'bold', marginBottom: 50},
    touch: {alignItems: 'center',
        padding: 10,
        backgroundColor:'#dddddd',
        margin: 10
    },
    input: {
        height: 40,
        width: 200,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        },
    radio: {backgroundColor: "#dddddd", margin: 10, borderRadius: 20},
})