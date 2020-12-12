import React,{useState,useContext,useEffect} from 'react';
import {styles} from '../estilos/global'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import { View,TextInput,Alert,StyleSheet,Dimensions,ImageBackground,FlatList,Text,Image,LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../firebase/config'
import {Barra} from '../globais/barra'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Armazenamento from "../contexto/context"


export function Descartaveis({ navigation }) {
    const [estoquemat,setestoquemat]=useState();
    const [length,setlength]=useState()
    
    const alerta='Limite excedido. Aumente seu plano para mais benefícios.'
    const {plan,fire,user3}=useContext(Armazenamento)
    const testeplano=()=>{
        if(plan=='all'){
            navigation.navigate('Adicionar descartavel')
        }else{
            if(plan=='free'){
                if(length>=3){
                    Alert.alert(alerta)
                }else{
                    
                    navigation.navigate('Adicionar descartavel')
                }
            }
            if(plan=='basic'){
                if(length>=20){
                    Alert.alert(alerta)
                }else{
                    navigation.navigate('Adicionar descartavel')

                }
            }
        }
    }
    
    

    useEffect(()=>{
        
        
        
        const base=async ()=>{
            try{ 
                
                
            await firebase.database().ref('Users/'+user3+'/descartaveis/').on('value', (snapshot) =>{
                
                const li=[]
                snapshot.forEach((child)=>{
                    li.push({
                        id:child.key,
                        nome: child.val().nome,                        
                        quantidade: child.val().quantidade,                      
                        valor:child.val().custounidade, 
                        unidade:child.val().unidade,                        
                        imagem:child.val().imagem
                    })
            })
            setestoquemat(li)
            setlength(li.length)
            LogBox.ignoreLogs(['Setting a timer']);
            
            

        })}catch(e){
            console.log('Erro! descartaveis')
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
                <Text>Estoque de descatáveis</Text>
                <View style={{alignItems:'center',flexDirection:'row',left:'15%'}}>
                    <TouchableOpacity onPress={()=>testeplano()}>
                        <Image style={[styles.imagemenu,{width:30}]} source={require('../imagens/mais.png')}/>
                    </TouchableOpacity>
                    
                    

                </View>
                

            </View>
            

            <View style={{marginVertical:"10%"}}>
                <TextInput placeholder='Procurar...' style={{borderColor:'#6d6d6dff',fontSize:20,borderBottomWidth:1,height:25,paddingBottom:-10}} />

            
            </View>



            <View style={{height:Dimensions.get('window').height,width:'200%'}}>
                
                <View style={{height:Dimensions.get('window').height*0.7}}>

                
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
                        data={estoquemat}
                        numColumns={2}
                        keyExtractor={item => item.id}
                        renderItem={({item})=>(
                            <TouchableOpacity onPress={()=> navigation.navigate('Ver descartavel',{item})} style={{width:146,marginHorizontal:'2%',marginVertical:"5%"}}>
                                
                                <ImageBackground style={{width:146,height:111}} source={require('../imagens/imageunk2.png')}>
                                    <Image style={{width:146,height:111}} source={{uri:item.imagem}} />

                                </ImageBackground>
                                
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



export default Descartaveis