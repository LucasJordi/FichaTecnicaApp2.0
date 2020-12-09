import React,{useState,useContext,useEffect} from 'react';
import {styles} from '../estilos/global'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import { View,Pressable,FlatList,TextInput,ImageBackground,StyleSheet,Alert,Text,Image,LogBox} from 'react-native';
import {firebase} from '../firebase/config'

import {Barra} from '../globais/barra'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Armazenamento from '../contexto/context';



export function Ficha({ navigation }) {
    
    const [fichas,setfichas]=useState()
    const [length,setlength]=useState()
    const [user,setuser]=useState();
    const alerta='Limite excedido. Aumente seu plano para mais benefícios.'
    const {plan,fire,user3}=useContext(Armazenamento)
    const testeplano=()=>{
        if(plan=='all'){
            navigation.navigate('Adicionar ficha')
        }else{
            if(plan=='free'){
                if(length>=3){
                    Alert.alert(alerta)
                }else{
                    
                    navigation.navigate('Adicionar ficha')
                }
            }
            if(plan=='basic'){
                if(length>=40){
                    Alert.alert(alerta)
                }else{
                    navigation.navigate('Adicionar ficha')

                }
            }
        }
    }
    useEffect(()=>{
       
        
        const base= async ()=>{
            try{
                
            await firebase.database().ref('Users/'+user3+'/ficha').on('value', (snapshot) =>{
           
                const li=[]
                li.length=0
                 snapshot.forEach((child)=>{
                    li.push({
                        id:child.key,
                            nomedareceita: child.val().nomedareceita,
                            custodareceita: child.val().custodareceita,
                            pesoprepara: child.val().pesoprepara,
                            pesodaporc: child.val().pesodaporc,
                            porcoes: child.val().porcoes,
                            custoporporc: child.val().custoporporc,
                            custoporkg: child.val().custoporkg,
                            ingredientes:child.val().ingredientes,
                            imagem:child.val().imagem
                    })
                })
                
                    setfichas(li)
                    LogBox.ignoreLogs(['Setting a timer']);
                    setlength(li.length)

                })
                
            
            
            }catch(e){
                    console.log('Erro ficha')
                }
        }
        base()
        
   },[fire])
    return (
      <View style={styles.container}>
        <Barra name={()=>navigation.openDrawer()}/>


        <View style={styles.container2}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image  style={styles.imagemenu} source={require('../imagens/ficha.png')}/>
                <Text>Ficha técnica</Text>

                <View style={{alignItems:'center',flexDirection:'row',left:'35%'}}>
                    <TouchableOpacity onPress={()=>testeplano()}>
                        <Image style={[styles.imagemenu,{width:30}]} source={require('../imagens/mais.png')}/>
                    </TouchableOpacity>
                    
                    

                </View>
                

            </View>
            

            <View style={{marginVertical:"10%"}}>
                <TextInput placeholder='Procurar...' style={{borderColor:'#6d6d6dff',fontSize:20,borderBottomWidth:1,height:25,paddingBottom:-10}} />

            
            </View>



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
                            <TouchableOpacity  onPress={()=>navigation.navigate('Ver ficha',{item})} style={{width:'100%',marginHorizontal:'1%',marginVertical:"2%"}}>
                                
                                <ImageBackground style={{alignItems:"center",justifyContent:'center',width:146,height:111}} source={require('../imagens/imageunk2.png')}>
                                    <Image style={{width:146,height:111}} source={{uri:item.imagem}} />
                                </ImageBackground>
                                
                                
                                <Text style={{width:140}}>{item.nomedareceita +'      R$ '+item.custodareceita.replace('.',',')}</Text>

                            </TouchableOpacity>

                         )}
                    />
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



export default Ficha