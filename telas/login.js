import React,{useContext,useEffect,useState} from 'react';
import {styles} from '../estilos/global'

import { Alert,StyleSheet,View,Text,Image,LogBox} from 'react-native';
import {firebase} from "../firebase/config"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PanGestureHandler, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import Armazenamento from '../contexto/context';

export function Login({ navigation }) {
    const [logar,setlogar] =useState(false);
    
    const [user,setuser] =useState('');
    const {todos,pegar,user3,assinatura}=useContext(Armazenamento)
    const [auth,setauth]=useState()
    const [pass,setpass] =useState('');
    const senha=async()=>{
        try{
            if(todos.indexOf(user.replace('.',''))>-1){
                await firebase.database().ref('Users/' + user.replace('.','')).on('value', (snapshot) => {
                    setauth(snapshot.val().senha)
                    
                  });
                  console.log(auth)
                  LogBox.ignoreLogs(['Setting a timer']);

            }
           
        }catch(e){
            console.log('Sem senha')
        }
    }
    const [b,setb]=useState()
    useEffect(()=>{
        
        
        
          
        pegar()
        senha()
    },[user,pass])

    const logando= async ()=>{
        console.log(todos.indexOf(user.replace('.',''))>-1)
        if(todos.indexOf(user.replace('.',''))>-1){
            try{
                
                    senha()
                
                if(auth==pass){
                    await AsyncStorage.setItem('@usuario', user.replace('.',''))
                    assinatura()
                    setlogar(true)
                    
                    
                    
                    
                    
                }else{
                    Alert.alert('Email ou senha inválidos!')
                }

              
               
                
                
            }catch(e){
                Alert.alert('Erro!')
            }

        }else{
            Alert.alert('Email ou senha inválidos!')
            
        }
        
    }
    

    
    
    return (
      
      
        <View style={[{alignItems:"center",backgroundColor:"white",width:"100%",height:2000},styles.container]}>
            <Image  source={require('../imagens/fazlogin.png')} />
            <View style={{width:"50%",justifyContent:'center'}}>
                <View style={{alignItems:"center",marginVertical:"20%"}}>
                  <Text style={styles.login}>Login</Text>
                </View>
               
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    <View style={styles2.form}>
                        <Text>Email</Text>
                        <View style={{flexDirection:"row"}}>
                            
                            <TextInput onChangeText={(value)=> {setuser(value.toLowerCase())}} placeholder="exemplo@exemplo.com" style={styles.input}/>
                            <Image style={styles.inputicon} source={require('../imagens/email2.png')} />
                        </View>
                        
                    </View>
                    <View>
                        <Text>Senha</Text>
                        <View style={{flexDirection:"row"}}>
                            <TextInput  secureTextEntry={true} onChangeText={(value)=> {setpass(value)}} placeholder="************" style={styles.input}/>
                            <Image style={styles.inputicon} source={require('../imagens/senha.png')} />
                        </View>

                        <TouchableOpacity>
                            <Text  >Esqueci minha senha</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{top:"20%"}}>
                        <TouchableOpacity onPress={()=>logando()} style={{justifyContent:"center",alignItems:"center",width:90,height:35,backgroundColor:"#fd9f00ff"}}>
                            <Text style={styles2.entrar}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
            </View>
            
            
     

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


export default Login