import {Text, TouchableOpacity, View, StyleSheet, TextInput} from 'react-native'
import { RootStackScreenProps } from '../types'

export default function LoginScreen({navigation}: RootStackScreenProps<'Login'>) {
    return(
        <View style={styles.view}>
            <Text style={styles.text}>Login please~~</Text>
            <TextInput style={styles.input} placeholder='id' />
            <TextInput style={styles.input} placeholder='password' />
            <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Root')}>
                <Text style={styles.text}>Press here to log-in</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create(
    {
view: {flex: 1, alignItems: 'center', justifyContent:'center'},
text: {fontSize: 20},
touch: {alignItems: 'center',
    padding: 10,
    backgroundColor:'#dddddd',
    margin: 50
},
input: {
    height: 40,
    width: 200,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    },
}
)