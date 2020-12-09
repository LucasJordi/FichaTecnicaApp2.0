import  React,{useState,useContext,useEffect} from 'react';
import {styles} from '../estilos/global'
import * as Linking from 'expo-linking';
import { View,FlatList,TouchableOpacity,Dimensions,Button,Text,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import {Barra} from '../globais/barra'
import {Armazenamento} from '../contexto/context';


export function HomeScreen({navigation}) {
  const {assinatura,user3}=useContext(Armazenamento)
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  
  

  
  const[data,setdata]=useState([
    {key:'1',link:"https://go.hotmart.com/U43170247C",nome:'Curso online Bolos diet.',image:require('../imagens/curso1.png')},
    {key:'2',nome:'Curso online copos e taças recheados.',link:"https://go.hotmart.com/S43168993Q",image:require('../imagens/curso2.png')},
    {key:'3',nome:'Curso online panetones.',link:"https://go.hotmart.com/J43170070K",image:require('../imagens/curso3.png')},
    {key:'4',nome:'Curso online decorações com bico de confeitar.',link:"https://go.hotmart.com/R43170215D",image:require('../imagens/curso4.png')},
    {key:'5',nome:'Curso online doces finos.',link:"https://go.hotmart.com/C43170179A",image:require('../imagens/curso5.png')},
    {key:'6',nome:'Curso online naked e drip cake.',link:"https://go.hotmart.com/X43170094D",image:require('../imagens/curso6.png')},
    {key:'7',nome:'Curso online pasta americana para iniciantes.',link:"https://go.hotmart.com/M43170151V",image:require('../imagens/curso6.png')},
    {key:'8',nome:'Curso online brigadeiro gourmet.',link:"https://go.hotmart.com/C43169239W",image:require('../imagens/curso8.png')},
    {key:'9',nome:'Curso online taças recheadas e panetones profissional.',link:"https://go.hotmart.com/S43168993Q",image:require('../imagens/curso9.png')},
    {key:'10',nome:'Curso online topo de bolo lucrativo.',link:"https://go.hotmart.com/B43169504B",image:require('../imagens/curso10.png')},
    {key:'11',nome:'Curso online mestre do espetinho.',link:"https://go.hotmart.com/N43168807M",image:require('../imagens/curso11.png')},
    {key:'12',nome:'Apostila digital com +200 receitas gourmet.',link:"https://go.hotmart.com/A43170440C",image:require('../imagens/curso12.png')},
    {key:'13',nome:'Livro de receitas de geladinho gourmet.',link:"https://go.hotmart.com/U43176486P",image:require('../imagens/curso13.png')},
    {key:'14',nome:'Livro digital de balas gourmet.',link:"https://go.hotmart.com/Q43169584M",image:require('../imagens/curso14.png')},
  ])
    
    return (
      <View style={styles.container}>
        <Barra name={()=>navigation.openDrawer()}/>
        <View style={[styles.container3]}>
         <View style={{alignItems:'center',width:windowWidth,height:windowHeight-80}}>
           
          <FlatList
            numColumns={2}
            data={data}
            keyExtractor={item=>item.key}
            
            renderItem={({item})=>(
              <View style={{justifyContent:'center',alignItems:'center',marginVertical:'2%',width:'50%'}}>
                <Image style={{width:152,height:152}} source={item.image}/>
                <Text style={{width:'60%',textAlign:'center'}}>{item.nome}</Text>
                <View style={{width:100,marginVertical:'2%'}}>
                  
                  <Button 
                    title='Ver'
                    onPress={()=>{Linking.openURL(item.link)}}
                  />
                </View>
                
              </View>

            )

            }

            ListHeaderComponent={
              <>
                <View style={styles.ads2}>
                  <AdMobBanner
                  bannerSize="fullBanner"
                  adUnitID="ca-app-pub-3107661564294379/9507690326" // Test ID, Replace with your-admob-unit-id
                   />
                </View>
               

                
                <Text>Olá!</Text>
                <Text>Temos várias indicações para você!</Text>
              </>
            }

            ListFooterComponent={
              <>
                <View style={styles.ads2}>
                  <AdMobBanner
                  bannerSize="fullBanner"
                  adUnitID="ca-app-pub-3107661564294379/9507690326" // Test ID, Replace with your-admob-unit-id
                   />
                </View>
               

                
                
              </>
            }
            
            />
          </View>   

        </View>


       
        
      </View>
    );
}





export default HomeScreen