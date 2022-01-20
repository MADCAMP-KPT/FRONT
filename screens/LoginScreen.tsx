import { Text, TouchableOpacity, View, StyleSheet, TextInput} from 'react-native'
import { useState } from 'react'
import { RootStackScreenProps } from '../types'
import { RadioButton } from 'react-native-paper'

export default function LoginScreen({navigation}: RootStackScreenProps<'Login'>) {

    const [checked, setChecked] = useState('User');
    // 전체를 둥글게 감싸는 뷰 하나 추가해보기
    return(
        <View style={styles.view}>
            <Text style={styles.title}>김 PT</Text>
            <View>
                <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                    <View style={{flexDirection: 'row'}}>
                        <RadioButton.Item style={styles.radio} label="회원 로그인" value="User" color={'black'}/>
                        <RadioButton.Item style={styles.radio} label="트레이너 로그인" value="Trainer" color={'black'}/>
                    </View>
                </RadioButton.Group>
            </View>
            <TextInput style={styles.input} placeholder='id' />
            <TextInput style={styles.input} placeholder='password' secureTextEntry={true} />
            <TouchableOpacity style={styles.touch} onPress={() => (checked === 'User') ? navigation.navigate('UserRoot') : navigation.navigate('Root')}>
                <Text style={styles.text}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text style={{color:'blue', textDecorationLine: 'underline'}}>
                    회원가입
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {flex: 1, alignItems: 'center', justifyContent:'center'},
    text: {fontSize: 20},
    title: {fontSize: 100, fontWeight: 'bold', marginBottom: 50},
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