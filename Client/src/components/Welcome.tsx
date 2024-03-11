import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Image,Text, View, TouchableOpacity} from 'react-native';
import type { NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/nav';

export type Props = {

};

const Welcome: React.FC<Props> = () => {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/welcome.png")} style={styles.img} /> 
            <TouchableOpacity
                onPress={()=> navigation.navigate("Login")}
                style={styles.btn}
            >
                <Text style={styles.text} >
                Login
                </Text>
            </TouchableOpacity>     

            <TouchableOpacity
                onPress={()=> navigation.navigate("Signup")}
                style={styles.btn}
            >
                <Text style={styles.text}>
                    Signup
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img:{
        height: '70%',
        width:'90%', 
        resizeMode: 'contain' 
    },
    text:{
        color: "white", 
        fontSize: 25, 
        fontWeight: 'bold'
    },
    btn:{
        backgroundColor: "#4f4ff1",
        borderRadius: 100,
        alignItems: 'center',
        width: 300,
        paddingVertical: 5,
        marginVertical: 10,
    }
});

export default Welcome;