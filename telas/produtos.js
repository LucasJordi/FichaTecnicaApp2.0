import React,{useState,useContext,useEffect, Children} from 'react';
import {styles} from '../estilos/global'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import { View,FlatList,TextInput,StyleSheet,Text,Alert,Image,LogBox} from 'react-native';

import {firebase} from '../firebase/config'
import {Barra} from '../globais/barra'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Armazenamento from "../contexto/context"
import AsyncStorage from '@react-native-async-storage/async-storage';




export function Produtos({ navigation }) {
    
    const [fichas,setfichas]=useState()
    const [length,setlength]=useState()
    const [user,setuser]=useState();
    const alerta='Limite excedido. Aumente seu plano para mais benefícios.'
    const {plan,fire,user3}=useContext(Armazenamento)
    const testeplano=()=>{
        if(plan=='all'){
            navigation.navigate('Adicionar produto')
        }else{
            if(plan=='free'){
                if(length>=1){
                    Alert.alert(alerta)
                }else{
                    
                    navigation.navigate('Adicionar produto')
                }
            }
            if(plan=='basic'){
                if(length>=20){
                    Alert.alert(alerta)
                }else{
                    navigation.navigate('Adicionar produto')

                }
            }
        }
    }
    const totalvalor=()=>{
        var tot=0

        try{fichas.forEach((child)=>{
            tot=tot+parseFloat(child.valorsuge)


        })
            if(tot){
                return parseFloat(tot).toFixed(2)
            }else{
                return ' '
            }
            
        }catch(e){
            console.log('erro')
        }
    }
    useEffect(()=>{
       
        
        const base= async ()=>{
            try{
                
            await firebase.database().ref('Users/'+user3+'/produtos').on('value', (snapshot) =>{
           
                const li=[];
                snapshot.forEach((child)=>{
                    li.push({
                        id:child.key,
                            nomedareceita: child.val().nomedareceita,
                            custotal:child.val().custotal,
                            quantidade:child.val().quantidade,
                            tempodepreparo:child.val().tempodepreparo,
                            valorhh:child.val().valorhh,
                            valorsuge:child.val().valorsuge,
                            ingredientes:child.val().ingredientes
                    })
                })
                setfichas(li)
                setlength(li.length)
                LogBox.ignoreLogs(['Setting a timer']);
            

                })}catch(e){
                    console.log('Erro produtos')
                }
        }
        base()
   },[])
   
    
    return (
      <View style={styles.container}>
        <Barra name={()=>navigation.openDrawer()}/>


        <View style={styles.container2}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image  style={styles.imagemenu} source={require('../imagens/estoque.png')}/>
                <Text>Estoque de produtos</Text>
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
                        ListFooterComponent={
                            <>
                              <View style={styles.ads}>
                                <AdMobBanner
                                bannerSize="fullBanner"
                                adUnitID="ca-app-pub-3107661564294379/9507690326" // Test ID, Replace with your-admob-unit-id
                                 />
                              </View>
                             
              
                              
                              
                            </>
                          }
                        data={fichas}
                        numColumns={2}
                        keyExtractor={item => item.id}
                        renderItem={({item})=>(
                            <TouchableOpacity onPress={()=> navigation.navigate('Ver produto',{item})} style={{width:'100%',marginHorizontal:'1%',marginVertical:"2%"}}>
                                <Image style={{resizeMode:'contain'}} source={require('../imagens/imageunk2.png')} />
                                <Text style={{width:140}}>{item.nomedareceita}</Text>
                                <Text style={{width:140}}>{item.valorsuge.replace('.',',')}</Text>
                                

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



export default Produtos