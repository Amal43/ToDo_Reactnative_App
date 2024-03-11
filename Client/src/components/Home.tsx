import React, { useEffect, useState } from 'react';
import {StyleSheet, Image,Text, View, TouchableOpacity,Dimensions, FlatList, ScrollView} from 'react-native';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { createTask, getAllTasks, updateTask } from '../Redux/Slices/TodoSlice';;
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { useDispatch } from 'react-redux';

export type Props = {

};

type FormData = {
    title: string
}
interface ITask{
    id:string
    title:string
    completed:boolean
}

const Home: React.FC<Props> = () => {
    const {control ,handleSubmit ,formState} = useForm<FormData>({mode:"onSubmit"});
    const dispatch = useDispatch()<any| object| AsyncThunkConfig>;
    const [tasks,setTasks] =useState<ITask[]>([]);
    const [added,setAdded] = useState<boolean>(false);
    const [updated,setUpdated] = useState<boolean>(false);

    async function onSubmit(values:FormData){
        let value={
            "title": values?.title,
        }
        console.log(value)
        try {
            await dispatch(createTask(value));
            setAdded(true);
        }catch (error) {
            console.log(error);  
        }
    }
    async function update(item:ITask){
        let value={
            "completed": !(item?.completed),
        }
        try {
            await dispatch(updateTask({value,item}));
            setUpdated(true);
        }catch (error) {
            console.log(error);  
        }

    }
    useEffect(() => {
        dispatch(getAllTasks()).then((result:any) => {
            setTasks(result.payload.data);
        }).catch((err:any) => {
        });
    }, []);
    useEffect(()=>{
        if(added){
            dispatch(getAllTasks()).then((result:any) => {
                setTasks(result.payload.data);
            }).catch((err:any) => {
            });
            setAdded(false);
        }
    },[added]);
    useEffect(()=>{
        if(updated){
            dispatch(getAllTasks()).then((result:any) => {
                setTasks(result.payload.data);
            }).catch((err:any) => {
            });
            setUpdated(false);
        }
    },[updated]);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Todo List</Text>
            <View  style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Controller
                    rules={{
                        required:true,
                    }}
                    control={control}
                    name='title'
                    render={({field})=>
                    <TextInput 
                        onChangeText={field.onChange} 
                        mode="flat"
                        label="ToDo"
                        activeOutlineColor="#4f4ff1"
                        outlineColor="#4f4ff1"
                        placeholder="add task .."
                        style={styles.input}
                    />
                }/>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    buttonColor="#4f4ff1"
                    textColor="white" 
                    mode="elevated"
                >
                    Add        
                </Button>
            </View>
            
            <ScrollView>
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={[
                                styles.itemText,
                                item.completed && styles.completedText,
                            ]}
                            >{item.title}</Text>
                        </View>
                        <Checkbox
                            status={item.completed ? 'checked' : 'unchecked'}
                            onPress={()=>{update(item)}}
                        />
                    </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height:"100%",
        width:"100%",
        marginTop: 8,
        flex: 1,
        alignItems: 'center',
    },
    heading:{
        fontSize:28,
        fontWeight:'bold',
        color:'#403838'
    },
    input:{
        fontSize:18,
        marginHorizontal:4,
        marginVertical:2,
        width:250,
        color:'#4f4ff1'
    },
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        width:'90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    itemText: {
        maxWidth: '100%',
        textDecorationLine: 'none',  
    },
    completedText: {
        textDecorationLine: 'line-through',  
    },
    
});

export default Home;