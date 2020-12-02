import React,{useState,useContext,useEffect, Children} from 'react';
import {styles} from '../estilos/global'

import { View,FlatList,TextInput,StyleSheet,Alert,Text,Image,LogBox} from 'react-native';

import {firebase} from '../firebase/config'
import {Barra} from '../globais/barra'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Armazenamento from "../contexto/context"
import AsyncStorage from '@react-native-async-storage/async-storage';




export function Estoque({ navigation }) {
    const [estoquemat,setestoquemat]=useState();
    const {plano,plan,fire,user3}=useContext(Armazenamento)
    const [length,setlength]=useState()
    const [user,setuser]=useState( )
    const usuar=''
    const alerta='Limite excedido. Aumente seu plano para mais benefícios.'
    const testeplano=()=>{
        if(plan=='all'){
            navigation.navigate('Adicionar estoque')
        }else{
            if(plan=='free'){
                if(length>=10){
                    Alert.alert(alerta)
                }else{
                    
                    navigation.navigate('Adicionar estoque')
                }
            }
            if(plan=='basic'){
                if(length>=60){
                    Alert.alert(alerta)
                }else{
                    navigation.navigate('Adicionar estoque')

                }
            }
        }
    }
    
    const totalvalor=()=>{
        var tot=0

        try{estoquemat.forEach((child)=>{
            tot=tot+parseFloat(child.custounidade)*parseFloat(child.quantidade)


        })
            if(tot){
                return tot.toFixed(2)
            }else{
                return ''
            }
            
        }catch(e){
            console.log('erro')
        }
    }
    useEffect(()=>{

        
        
        
        
        const base= async ()=>{
           
            
            try { 
               
                
                
                
                
               await firebase.database().ref('Users/'+user3+'/estoquemat').on('value', (snapshot) =>{
                
                     const li=  []
                    
                     snapshot.forEach((child)=>{
                        li.push({
                            id:child.key,
                            nome: child.val().nome,
                            marca: child.val().marca,
                            quantidade: child.val().quantidade,
                            unidade: child.val().unidade,
                            unidadereceita:child.val().unidadereceita,
                            unidaeminima:child.val().unidademinima,

                            pesounidade:child.val().pesounidade,
                            custounidade:child.val().custounidade,
                            estoqueminimo:child.val().estoqueminimo,
                            imagem:child.val().imagem
                        })
                    })
                    setestoquemat(li)

                    setlength(li.length)
                    
                    console.log(plan)
                    LogBox.ignoreLogs(['Setting a timer']);
            
            

        })
            
            

        }catch(e){
            console.log('Erro estoque')
        }
    }
        
        base()
        
        
        
       
        
    },[plan])
    return (
      <View style={styles.container}>
        <Barra name={()=>navigation.openDrawer()}/>


        <View style={styles.container2}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image  style={styles.imagemenu} source={require('../imagens/estoque.png')}/>
                <Text>{'Estoque de matéria prima'}</Text>
                <View style={{alignItems:'center',flexDirection:'row',left:'15%'}}>
                    <TouchableOpacity onPress={()=>testeplano()}>
                        <Image style={[styles.imagemenu,{width:30}]} source={require('../imagens/mais.png')}/>
                    </TouchableOpacity>
                    
                    

                </View>
                

            </View>
            

            <View style={{marginVertical:"10%"}}>
                <TextInput placeholder='Procurar...' style={{borderColor:'#6d6d6dff',fontSize:20,borderBottomWidth:1,height:25,paddingBottom:-10}} />

            
            </View>

            <View style={{marginVertical:'2%'}}>
                <Text>{'Valor total do estoque: R$ '+totalvalor()}</Text>
            </View>

            <View style={{height:'80%',width:'200%'}}>
                
                <View style={{height:'70%'}}>

                
                    <FlatList
                        data={estoquemat}
                        numColumns={2}
                        keyExtractor={item => item.id}
                        renderItem={({item})=>(
                            <TouchableOpacity onPress={()=> navigation.navigate('Ver estoque',{item})} style={{width:'100%',marginHorizontal:'1%',marginVertical:"2%"}}>
                                <Image style={{resizeMode:'contain'}} source={require('../imagens/imageunk2.png')} />
                                <Text style={{width:140}}>{item.nome}</Text>

                            </TouchableOpacity>

                         )}
                    />
                </View>
                
            </View>

        </View>


        
      </View>
    );
}

 const styles1 = StyleSheet.create({
    
    view: {
      marginVertical:'5%',
      
      
    },
   
  });  



export default Estoque