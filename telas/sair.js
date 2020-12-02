import React,{useContext,useEffect,useState} from 'react';
import {styles} from '../estilos/global'

import { Alert,StyleSheet,View,Text,Image,LogBox} from 'react-native';
import {firebase} from "../firebase/config"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TextInput,ActivityIndicator, TouchableOpacity } from 'react-native-gesture-handler';

import Armazenamento from '../contexto/context';

export function Sair({ navigation }) {
    const {logout}=useContext(Armazenamento)
    useEffect(()=>{
        logout()
    })
    
    
    return (
      
      
        <View style={[{justifyContent:"center",alignItems:"center",backgroundColor:"#00ccffff",width:"100%",height:"100%"},styles.container]}>
            
            
        

        </View>

        
    );
}

export const userNameKey= '@usuario'
    

const styles2 = StyleSheet.create({
    form:{
        marginBottom:"10%"
    },
    entrar:{
        fontSize:20
    }
})


export default Sair