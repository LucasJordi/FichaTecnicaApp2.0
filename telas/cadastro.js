import React,{useContext,useState,useEffect} from 'react';
import {styles} from '../estilos/global'

import { ScrollView,Alert,Dimensions,StyleSheet,View,Text,Image,LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from "../firebase/config"

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';



export function Cadastro({ navigation }) {
    const [nome,setnome]=useState('')
    const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
    const [sobrenome,setsobrenome]=useState('')
    const [email,setemail]=useState('')
    const [senha,setsenha]=useState('')
    const [confirma,confirmasenha]=useState('')
    const [negocio,setnegocio]=useState('')
    const [cor,setcor]=useState('black')

    
    

    const [todos,settodos]=useState()
    

    function pegarusuarios() {
        firebase.database().ref('Users/').on('value', (snapshot) => {
          const highscore = snapshot.val();
          const usuarios =Object.keys(highscore)
          const u='lucasjordi24@gmailcomrrr'
          console.log("Usuários cadastrados: " +usuarios.indexOf(u) );
        });
        LogBox.ignoreLogs(['Setting a timer']);
    }

    useEffect(()=>{
        const pegar= ()=>{

            try {
                firebase.database().ref('Users/').on('value', (snapshot) => {
                    const highscore = snapshot.val();
                    const usuarios =Object.keys(highscore)
                    settodos(usuarios)
                   
                  });
                  LogBox.ignoreLogs(['Setting a timer']);

            }catch(e){
                console.log('Sem usuários')

            }

           
        }
        const as= async()=>{
            const a =await AsyncStorage.getItem('@usuario')
            console.log(a)
        }
        pegar();
        as()
    },[])

    const cadastro=async ()=>{
        

        
        
        if(nome!=''&& sobrenome!=''&& email!=''&& senha!=''&& confirma!=''&& negocio!=''&&senha==confirma){
            if(todos.indexOf(email.replace('.',''))==-1){


                firebase
                    .database()
                    .ref('Users/' + email.replace('.',''))
                    .set({
                        email: email,
                        senha:senha,
                        negocio:negocio,
                        nome:nome,
                        sobrenome:sobrenome,
                        conta:'free',
                        vencimento:''

                    });

                Alert.alert("Cadastro realizado com sucesso!")

            }else{
                Alert.alert('Email já cadastrado!')
            }

        }else{
            Alert.alert('Ops!','Todos os dados precisam ser preenchidos de forma correta!')

        }
        
    }
    
    
    
    
    return (
      
      
        <View style={[{justifyContent:"flex-start",top:"1%",alignItems:"center",backgroundColor:"#00ccffff",width:windowWidth,height:"300%"},styles.container]}>
            <Image source={require('../imagens/fazcadastro.png')} />
            <ScrollView style={{width:windowWidth*0.8}}>
                
                <View style={{alignItems:"center",marginVertical:"20%"}}>
                  <Text style={styles.login}>Cadastrar</Text>
                </View>
               

                    <View style={{alignItems:"flex-start",justifyContent:"flex-start",height:"70%",width:windowWidth}}>
                        

                        
                        <View style={styles2.form}>
                            <Text>Nome</Text>
                            <View style={{flexDirection:"row"}}>
                                
                                <TextInput  onChangeText={(value)=>{setnome(value)}} style={styles2.input}/>
                                <Image style={styles.inputicon} source={require('../imagens/nome.png')} />
                            </View>
                            
                        </View>
                        <View style={styles2.form}>
                            <Text>Sobrenome</Text>
                            <View style={{flexDirection:"row"}}>
                                <TextInput onChangeText={(value)=>{setsobrenome(value)}} style={styles2.input}/>
                                <Image style={styles.inputicon} source={require('../imagens/sobrenome.png')} />
                            </View>

                        
                            
                        </View >
                        <View style={styles2.form}>
                            <Text>Email</Text>
                            <View style={{flexDirection:"row"}}>
                                <TextInput keyboardType="email-address" onChangeText={(value)=>{setemail(value.toLowerCase())}} style={styles2.input}/>
                                <Image style={styles.inputicon} source={require('../imagens/email.png')} />
                            </View>

                        
                            
                        </View>
                        <View style={styles2.form}>
                            <Text>Senha</Text>
                            <View style={{flexDirection:"row"}}>
                                <TextInput secureTextEntry={true} onChangeText={(value)=>{setsenha(value)}}  style={styles2.input}/>
                                <Image style={styles.inputicon} source={require('../imagens/senhac.png')} />
                            </View>

                        
                            
                        </View>
                        <View style={styles2.form}>
                            <Text>Confirme a senha</Text>
                            <View style={{flexDirection:"row"}}>
                                <TextInput secureTextEntry={true} onChangeText={(value)=>{confirmasenha(value)}} style={styles2.input}/>
                                <Image style={styles.inputicon} source={require('../imagens/confsenha.png')} />
                            </View>
                            
                            

                        
                            
                        </View>
                       
                        <View style={styles2.form}>
                            <Text>Nome do negócio</Text>
                            <View style={{flexDirection:"row"}}>
                                <TextInput onChangeText={(value)=>{setnegocio(value)}} style={styles2.input}/>
                                <Image style={styles.inputicon} source={require('../imagens/confsenha.png')} />
                            </View>

                        
                            
                        </View>
                        <View style={styles2.form}>
                            <TouchableOpacity onPress={()=>cadastro()} style={{justifyContent:"center",alignItems:"center",width:90,height:35,backgroundColor:"#00afffff"}}>
                                <Text style={styles2.entrar}>Criar</Text>
                            </TouchableOpacity>
                        </View>
                       
                    </View>
                
                
            </ScrollView>
            
            
     

        </View>

        
    );
}



const styles2 = StyleSheet.create({
    form:{
        marginBottom:"10%"
    },
    entrar:{
        fontSize:20
    },
    input:{
        borderBottomWidth:0.5,
        borderColor:"#00afffff",
        width:"100%",
        fontSize:20
      },

})


export default Cadastro