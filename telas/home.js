import  React,{useState,useContext,useEffect} from 'react';
import {styles} from '../estilos/global'
import * as Linking from 'expo-linking';
import { View,FlatList,TouchableOpacity,Button,Text,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Barra} from '../globais/barra'
import {Armazenamento} from '../contexto/context';


export function HomeScreen({navigation}) {
  const {assinatura,user3}=useContext(Armazenamento)
  
  

  
    const[data,setdata]=useState([{key:'1',link:"https://go.hotmart.com/U43170247C",nome:'Curso online Bolos diet',image:require('../imagens/curso1.png')},{key:'2',nome:'Curso online copos e taças recheados',link:"https://go.hotmart.com/S43168993Q",image:require('../imagens/curso2.png')}])
    
    return (
      <View style={styles.container}>
        <Barra name={()=>navigation.openDrawer()}/>
        <View style={[styles.container2]}>
         <View style={{alignItems:'center'}}>
           
          <FlatList
            numColumns={2}
            data={data}
            keyExtractor={item=>item.key}
            
            renderItem={({item})=>(
              <View style={{marginHorizontal:'-2%',justifyContent:'center',alignItems:'center',marginVertical:'10%'}}>
                <Image source={item.image}/>
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

                
                <Text>Olá!</Text>
                <Text>Temos várias indicações para você!</Text>
              </>
            }
            
            />
          </View>   

        </View>


       
        
      </View>
    );
}





export default HomeScreen