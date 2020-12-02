import  React,{useState,useContext,useEffect} from 'react';
import {styles} from '../estilos/global'
import * as Linking from 'expo-linking';
import { View,FlatList,ImageBackground,TouchableOpacity,StyleSheet,Button,Text,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Barra} from '../globais/barra'
import {Armazenamento} from '../contexto/context';


export function Caixa({navigation}) {
  
  

  
    
    
    return (
      <View style={styles.container}>
        <Barra name={()=>navigation.openDrawer()}/>
            <View style={{justifyContent:'center',alignItems:'center',marginBottom:'7%'}}>
              <ImageBackground source={require('../imagens/caixatotal.png')} style={{resizeMode: "cover",width:394,height:273,justifyContent: "center"}} ></ImageBackground>
              <TouchableOpacity style={{alignItems:'flex-end',width:"100%"}}>
                <Image source={require('../imagens/maiscaixa.png')} style={{resizeMode: "cover",marginHorizontal:'8%',width:30,height:30}}/>
              </TouchableOpacity>


            </View>
            <View style={{height:'80%'}}>
              <View style={{heigth:"90%",width:'100%',marginHorizontal:'5%',flexDirection:'row'}}>
                
                
                <View style={{alignItems:'center'}}>
                  <View style={{width:20,height:20,borderRadius:20,backgroundColor:'#fd9f00ff'}}></View>
                  <View style={{width:1,height:70,backgroundColor:'gray'}}></View>
                </View>
                
                <View style={{marginHorizontal:'5%',width:'70%'}}>
                  <View style={{width:"100%",flexDirection:'row',justifyContent:'space-between'}}>
                    
                    <Text style={styles1.text}>Pagamento recebido</Text>
                    <Text style={styles1.text}>10 Nov</Text>

                  </View>
                  <View tyle={{flexDirection:'row'}}>
                    
                    <Text style={styles1.text2} >Bolo  recheado 1kg</Text>
                    <Text style={[styles1.text2,{color:'black',fontWeight:'bold'}]}>R$10,00</Text>
                    
                  </View>
                  
                </View>

                

              </View>



              <View style={{heigth:"90%",width:'100%',marginHorizontal:'5%',flexDirection:'row'}}>
                
                
                <View style={{alignItems:'center'}}>
                  <View style={{width:20,height:20,borderRadius:20,backgroundColor:'#fd9f00ff'}}></View>
                  <View style={{width:1,height:70,backgroundColor:'gray'}}></View>
                </View>
                
                <View style={{marginHorizontal:'5%',width:'70%'}}>
                  <View style={{width:"100%",flexDirection:'row',justifyContent:'space-between'}}>
                    
                    <Text style={styles1.text}>Pagamento recebido</Text>
                    <Text style={styles1.text}>10 Nov</Text>

                  </View>
                  <View tyle={{flexDirection:'row'}}>
                    
                    <Text style={styles1.text2} >Brigadeiro  10unidades</Text>
                    <Text style={[styles1.text2,{color:'black',fontWeight:'bold'}]}>R$20,00</Text>
                    
                  </View>
                  
                </View>

                

              </View>
            </View>

            

       
        
      </View>
    );
}


const styles1 = StyleSheet.create({
    
  text: {
    fontSize:10,
    color:'gray'
    
    
  },
  text2: {
    fontSize:15,
    color:'gray'
    
    
  },

 
});  



export default Caixa