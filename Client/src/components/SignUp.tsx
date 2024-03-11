import React from 'react';
import {StyleSheet, View,Text, TouchableOpacity} from 'react-native';
import {useForm,Controller} from 'react-hook-form';
import { TextInput,Button } from 'react-native-paper';
import { registerUser } from '../Redux/Slices/AuthSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/nav';
import { useAppDispatch } from '../Redux/Hooks';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

export type Props = {
    
};
type FormData = {
    email: string
    username: string
    password:string
}


const SignUp: React.FC<Props> = () => {
    const {control ,handleSubmit ,formState} = useForm<FormData>({mode:"onSubmit"});
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch()<any| object| AsyncThunkConfig>;
    
    async function onSubmit(values:FormData){
        let value={
            "email": values?.email,
            "password": values?.password,
            "username":values?.username
        }
        try {
            await dispatch(registerUser(value));
            navigation.navigate('Login')
        }catch (error) {
            console.log(error);  
        }
    }
    return (
        <View style={styles.container}>
            <Controller
                rules={{
                    required:true,
                }}
                control={control}
                name='username'
                render={({field})=>
                <TextInput 
                    onChangeText={field.onChange} 
                    mode="outlined"
                    label="username"
                    activeOutlineColor="#4f4ff1"
                    outlineColor="#4f4ff1"
                    placeholder="username"
                    style={styles.input}
                />
            }/>
            <Controller
                rules={{
                    required:true,
                }}
                control={control}
                name='email'
                render={({field})=>
                <TextInput 
                    onChangeText={field.onChange} 
                    mode="outlined"
                    label="email"
                    activeOutlineColor="#4f4ff1"
                    outlineColor="#4f4ff1"
                    placeholder="email@gmail.com"
                    style={styles.input}
                />
            }/>
            <Controller
                rules={{
                    required:true,
                }}
                control={control}
                name='password'
                render={({field})=>
                <TextInput 
                    onChangeText={field.onChange} 
                    mode="outlined"
                    label="password"
                    activeOutlineColor="#4f4ff1"
                    outlineColor="#4f4ff1"
                    placeholder="password"
                    secureTextEntry
                    style={styles.input}
                />
            }/>
            <Button
                onPress={handleSubmit(onSubmit)}
                buttonColor="#4f4ff1"
                textColor="white" 
                style={{marginHorizontal:10,marginTop:40,width:250 ,paddingVertical:6}}
            >
                Sign Up           
            </Button>
            <View
                style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop:20,
                }}
            >
                <Text style={{fontSize: 16, fontWeight: 'normal',color:'#474343', paddingRight:6}}>
                    Already have an account?   
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text
                        style={{color:'#4f4ff1', fontWeight: 'bold', fontSize: 16}}>
                            Login 
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        fontSize:18,
        marginHorizontal:30,
        marginVertical:10,
        width:300,
        color:'#4f4ff1'
    }
});

export default SignUp;